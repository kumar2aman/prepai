
import { GoogleGenAI, Modality } from "@google/genai";
import { Prompt } from "../config/prompt";

let nextPlaybackTime = 0;
const audioContext = new AudioContext({ sampleRate: 24000 });

export async function startGeminiSession(token: string, onStatusChange: (status: string) => void) {
  onStatusChange("🔗 Connecting to Gemini...");
  
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
          const byteArray = Uint8Array.from(atob(base64), c => c.charCodeAt(0));
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
          console.log("✅ Turn complete");
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