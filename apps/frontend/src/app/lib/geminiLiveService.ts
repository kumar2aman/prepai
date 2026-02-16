import { GoogleGenAI, Modality } from "@google/genai";
import { Prompt } from "../config/prompt";

let ws: WebSocket | null = null;

let fullTranscript = "";
let userTranscript = "";

export async function startGeminiSession(
  token: string,
  onStatusChange: (status: string) => void,
  onAiTranscriptUpdate: (text: string) => void,
  onUserTranscriptupdate: (userText: string) => void,
) {
  onStatusChange("🔗 Connecting to Gemini...");
  const audioContext = new AudioContext({ sampleRate: 24000 });
  let nextPlaybackTime = 0;
  const ai = new GoogleGenAI({
    apiKey: token,
    httpOptions: { apiVersion: "v1alpha" },
  });

  const session = await ai.live.connect({
    model: "gemini-2.5-flash-native-audio-preview-12-2025", // Ensure this matches the latest available model for that read the doc for google genai api
    config: {
      responseModalities: [Modality.AUDIO],
      inputAudioTranscription: {
        languageCode: "en-us",
      },
      outputAudioTranscription: {},
      systemInstruction: Prompt,
    },
    callbacks: {
      onopen: () => onStatusChange("🔌 Connected"),
      onmessage: async (msg: any) => {
        // 1. Correctly parse the nested audio data
        const audioPart = msg.serverContent?.modelTurn?.parts?.find(
          (p: any) => p.inlineData,
        );
        if (audioPart?.inlineData?.data) {
          if (audioContext.state === "suspended") await audioContext.resume();

          try {
            // 2. Safely convert Base64 to Int16 PCM
            const binaryString = atob(audioPart.inlineData.data);
            const bytes = new Uint8Array(binaryString.length);
            for (let i = 0; i < binaryString.length; i++) {
              bytes[i] = binaryString.charCodeAt(i);
            }

            // Alignment check: Int16 requires 2 bytes per sample
            if (bytes.byteLength % 2 !== 0) return;

            const int16Array = new Int16Array(bytes.buffer);
            const float32Array = new Float32Array(int16Array.length);

            for (let i = 0; i < int16Array.length; i++) {
              float32Array[i] = int16Array[i] / 32768; // Normalize PCM
            }

            // 3. Schedule playback without gaps
            const audioBuffer = audioContext.createBuffer(
              1,
              float32Array.length,
              24000,
            );
            audioBuffer.copyToChannel(float32Array, 0);

            const source = audioContext.createBufferSource();
            source.buffer = audioBuffer;
            source.connect(audioContext.destination);

            const startTime = Math.max(
              audioContext.currentTime,
              nextPlaybackTime,
            );
            source.start(startTime);
            nextPlaybackTime = startTime + audioBuffer.duration;
          } catch (e) {
            console.error("Audio decoding error:", e);
          }
        }
        if (msg.serverContent?.inputTranscription) {
          userTranscript += msg.serverContent.inputTranscription.text;
        }

        if (msg.serverContent?.outputTranscription) {
          fullTranscript += msg.serverContent.outputTranscription.text;
        }

        // Detect end of sentence to prepare for next turn
        if (msg.serverContent?.turnComplete) {
          if (userTranscript.trim()) {
            onUserTranscriptupdate(userTranscript.trim());
            console.log("userTranscript trimed", userTranscript.trim());
          }
          if (fullTranscript.trim()) {
            onAiTranscriptUpdate(fullTranscript.trim());
            console.log("fullTranscript trimed", fullTranscript.trim());
          }
          userTranscript = "";
          fullTranscript = "";
        }
      },
      onerror: (err) => {
        console.error("Error:", err);
        onStatusChange("❌ Disconnected");
      },
      onclose: () => onStatusChange("❌ Disconnected"),
    },
  });

  // Helper to reset timing when user starts a new record turn
  (session as any).resetPlayback = () => {
    nextPlaybackTime = 0;
  };

  return session;
}
