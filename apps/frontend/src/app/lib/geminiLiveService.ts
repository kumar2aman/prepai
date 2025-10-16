import { GoogleGenAI, Modality } from "@google/genai";
import { Prompt } from "../config/prompt";
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
        if (msg.data) {
          const byteArray = Uint8Array.from(atob(msg.data), (c) =>
            c.charCodeAt(0)
          );

          currentTurnChunks.push(byteArray); // ✅ Gather audio for this turn

          // Real-time playback
          const int16Array = new Int16Array(byteArray.buffer);
          const float32Array = new Float32Array(int16Array.length);
          for (let i = 0; i < int16Array.length; i++) {
            float32Array[i] = int16Array[i] / 32768;
          }

          const audioBuffer = audioContext.createBuffer(1, float32Array.length, 24000);
          audioBuffer.copyToChannel(float32Array, 0);
          const source = audioContext.createBufferSource();
          source.buffer = audioBuffer;
          source.connect(audioContext.destination);
          const startTime = Math.max(audioContext.currentTime, nextPlaybackTime);
          source.start(startTime);
          nextPlaybackTime = startTime + audioBuffer.duration;
        }

        if (msg.serverContent?.turnComplete) {
          console.log("✅ Turn complete. Processing all stored audio chunks...");
          console.log(`🔹 Received ${currentTurnChunks.length} chunks for Turn #${turnCounter}`);

          if (currentTurnChunks.length > 0) {
            const totalLength = currentTurnChunks.reduce((acc, value) => acc + value.length, 0);
            const fullAudioData = new Uint8Array(totalLength);

            let offset = 0;
            for (const chunk of currentTurnChunks) {
              fullAudioData.set(chunk, offset);
              offset += chunk.length;
            }

            console.log(`🎯 Turn #${turnCounter}: audio length = ${fullAudioData.length}`);
            turnCounter++;

            const base64Audio = Buffer.from(fullAudioData).toString("base64");

            const payload = {
              audio: {
                data: base64Audio,
                mimeType: "audio/raw; encoding=signed-integer; channels=1; rate=24000",
              },
            };

            try {
              await axios.post("http://localhost:3001/api/v1/geminiAudio", payload, {
                headers: { "Content-Type": "application/json" },
                responseType: "arraybuffer",
              });

              console.log("✅ Audio sent for transcription");
            } catch (err) {
              console.error("❌ Failed to send audio:", err);
            }
          }

          currentTurnChunks = []; // 🔄 Reset
        }
      },

      onerror: (err) => {
        console.error("Error:", err);
        onStatusChange("❌ Disconnected");
      },

      onclose: () => onStatusChange("❌ Disconnected"),
    },
  });

  nextPlaybackTime = audioContext.currentTime;
  return session;
}
