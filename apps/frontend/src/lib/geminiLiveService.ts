import { GoogleGenAI, Modality } from "@google/genai";
import { Prompt } from "../app/config/prompt";
import axios from "axios";

let nextPlaybackTime = 0;
let turnCounter = 1;
const audioContext = new AudioContext({ sampleRate: 24000 });

export async function startGeminiSession(
  token: string,
  onStatusChange: (status: string) => void
) {
  onStatusChange("🔗 Connecting to Gemini...");

  let currentTurnChunks: Uint8Array[] = [];

  const ai = new GoogleGenAI({
    apiKey: token,
    httpOptions: { apiVersion: "v1alpha" },
  });

  const session = await ai.live.connect({
    model: "gemini-live-2.5-flash-preview",
    config: {
      responseModalities: [Modality.AUDIO],
      systemInstruction: Prompt,
    },
    callbacks: {
      onopen: () => onStatusChange("🔌 Connected"),

      onmessage: async (msg) => {
        // ✅ Only collect audio within the same turn
        if (msg.data) {
          const byteArray = Uint8Array.from(atob(msg.data), (c) =>
            c.charCodeAt(0)
          );

          currentTurnChunks.push(byteArray);

          // Real-time playback (existing code)
          const int16Array = new Int16Array(byteArray.buffer);
          const float32Array = new Float32Array(int16Array.length);
          for (let i = 0; i < int16Array.length; i++) {
            float32Array[i] = int16Array[i] / 32768;
          }

          const audioBuffer = audioContext.createBuffer(
            1,
            float32Array.length,
            24000
          );
          audioBuffer.copyToChannel(float32Array, 0);
          const source = audioContext.createBufferSource();
          source.buffer = audioBuffer;
          source.connect(audioContext.destination);
          const startTime = Math.max(
            audioContext.currentTime,
            nextPlaybackTime
          );
          source.start(startTime);
          nextPlaybackTime = startTime + audioBuffer.duration;
        }

        // ✅ Process ONLY when turn is complete
        if (msg.serverContent?.turnComplete) {
          console.log("✅ Turn complete. Processing stored audio chunks...");
          console.log(
            `🔹 Turn #${turnCounter}: ${currentTurnChunks.length} chunks`
          );

          if (currentTurnChunks.length > 0) {
            // Create a COPY to avoid race conditions
            const chunksToProcess = [...currentTurnChunks];

            // ✅ IMMEDIATELY clear for next turn
            currentTurnChunks = [];

            const totalLength = chunksToProcess.reduce(
              (acc, value) => acc + value.length,
              0
            );
            const fullAudioData = new Uint8Array(totalLength);

            let offset = 0;
            for (const chunk of chunksToProcess) {
              fullAudioData.set(chunk, offset);
              offset += chunk.length;
            }

            console.log(
              `🎯 Turn #${turnCounter}: ${fullAudioData.length} bytes`
            );

            const base64Audio = Buffer.from(fullAudioData).toString("base64");

            const payload = {
              audio: {
                data: base64Audio,
                mimeType:
                  "audio/raw; encoding=signed-integer; channels=1; rate=24000",
              },
              turnNumber: turnCounter,
            };

            try {
              const result = await axios.post(
                "http://localhost:3001/api/v1/geminiAudio",
                payload,
                { headers: { "Content-Type": "application/json" } }
              );

              console.log(`✅ Turn #${turnCounter} sent:`, result.data?.text);
            } catch (err) {
              console.error("❌ Failed to send audio:", err);
            }

            turnCounter++;
          } else {
            console.log(`⚠️ Turn #${turnCounter} had no audio`);
            turnCounter++;
          }
        }
      },
    },
  });

  nextPlaybackTime = audioContext.currentTime;
  return session;
}
