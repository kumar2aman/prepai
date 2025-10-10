import { GoogleGenAI, Modality } from "@google/genai";
import { Prompt } from "../app/config/prompt";
import axios from "axios";

let nextPlaybackTime = 0;
const audioContext = new AudioContext({ sampleRate: 24000 });

export async function startGeminiSession(
  token: string,
  onStatusChange: (status: string) => void
) {
  onStatusChange("🔗 Connecting to Gemini...");

  // --- NEW (Step 1): Create an array to store the raw audio chunks ---
  let allAudioChunks: Uint8Array[] = [];

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
          const base64 = msg.data;
          const byteArray = Uint8Array.from(atob(base64), (c) =>
            c.charCodeAt(0)
          );

          // --- NEW (Step 2): Push the raw byte chunk into our array ---
          allAudioChunks.push(byteArray);

          // The original real-time playback logic remains the same
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

        // --- MODIFIED (Step 3): Detect the end of the turn ---
        if (msg.serverContent?.turnComplete) {
          console.log(
            "✅ Turn complete. Processing all stored audio chunks..."
          );

          if (allAudioChunks.length > 0) {
            // --- NEW (Step 4): Concatenate all chunks into a single Uint8Array ---
            const totalLength = allAudioChunks.reduce(
              (acc, value) => acc + value.length,
              0
            );
            const fullAudioData = new Uint8Array(totalLength);

            let offset = 0;
            for (const chunk of allAudioChunks) {
              fullAudioData.set(chunk, offset);
              offset += chunk.length;
            }

            const audioBase64 = Buffer.from(fullAudioData).toString("base64");

            const payload = {
              audio: {
                data: audioBase64,
                mimeType: "audio/raw; encoding=signed-integer; rate=24000 ",
              },
            };

            const res = await axios.post(
              "http://localhost:3001/api/v1/convertAudio",
              payload,
              {
                headers: { "Content-Type": "application/json" },
                responseType: "arraybuffer",
              }
            );

            console.log("Full audio data assembled:", fullAudioData.length);
          }
          console.log("Resetting audio chunks for the next turn.");
          allAudioChunks = [];
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
