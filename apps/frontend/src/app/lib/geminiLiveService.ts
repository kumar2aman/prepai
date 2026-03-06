import { GoogleGenAI, Modality } from "@google/genai";
import { Prompt } from "../config/prompt";

export async function startGeminiSession(
  token: string,
  onStatusChange: (status: string) => void,
  onAiTranscriptUpdate: (text: string) => void,
  onUserTranscriptUpdate: (text: string) => void
) {
  onStatusChange("🔗 Connecting to Gemini...");

  const audioContext = new AudioContext({ sampleRate: 24000 });
  let nextPlaybackTime = 0;
  let isSocketOpen = false;
  let fullTranscript = "";
  let userTranscript = "";

  const ai = new GoogleGenAI({
    apiKey: token,
    httpOptions: { apiVersion: "v1alpha" },
  });

  const session = await ai.live.connect({
    model: "gemini-2.5-flash-native-audio-preview-12-2025",
    config: {
      responseModalities: [Modality.AUDIO],
      inputAudioTranscription: {},
      outputAudioTranscription: {},
      systemInstruction: Prompt,
    },
    callbacks: {
      onopen: () => {
        isSocketOpen = true;
        onStatusChange("🔌 Connected");
      },
      onmessage: async (msg: any) => {
        // console.log("Gemini message received:", msg); // Verbose
        // ----- Handle AI audio playback -----
        const audioPart = msg.serverContent?.modelTurn?.parts?.find(
          (p: any) => p.inlineData
        );

        if (audioPart?.inlineData?.data) {
          if (audioContext.state === "suspended") await audioContext.resume();

          try {
            const binaryString = atob(audioPart.inlineData.data);
            const bytes = new Uint8Array(binaryString.length);
            for (let i = 0; i < binaryString.length; i++) bytes[i] = binaryString.charCodeAt(i);

            if (bytes.byteLength % 2 !== 0) return; // safety check

            const int16Array = new Int16Array(bytes.buffer);
            const float32Array = new Float32Array(int16Array.length);
            for (let i = 0; i < int16Array.length; i++) float32Array[i] = int16Array[i] / 32768;

            const audioBuffer = audioContext.createBuffer(1, float32Array.length, 24000);
            audioBuffer.copyToChannel(float32Array, 0);

            const source = audioContext.createBufferSource();
            source.buffer = audioBuffer;
            source.connect(audioContext.destination);

            const startTime = Math.max(audioContext.currentTime, nextPlaybackTime);
            source.start(startTime);
            nextPlaybackTime = startTime + audioBuffer.duration;
          } catch (e) {
            console.error("Audio decoding error:", e);
          }
        }

        // ----- Handle transcripts -----
        if (msg.serverContent?.inputTranscription) {
          userTranscript += msg.serverContent.inputTranscription.text;
        }
        if (msg.serverContent?.outputTranscription) {
          fullTranscript += msg.serverContent.outputTranscription.text;
        }

        if (msg.serverContent?.turnComplete) {
          if (userTranscript.trim()) onUserTranscriptUpdate(userTranscript.trim());
          if (fullTranscript.trim()) onAiTranscriptUpdate(fullTranscript.trim());
          userTranscript = "";
          fullTranscript = "";
        }
      },
      onerror: (err) => {
        isSocketOpen = false;
        onStatusChange("❌ Disconnected");
      },
      onclose: (ev) => {
        isSocketOpen = false;
        onStatusChange("❌ Disconnected");
      },
    },
  });

  // ----- Safe send audio method -----
  (session as any).sendAudio = (base64Chunk: string) => {
    if (!isSocketOpen) return;
    
    try {
      session.sendRealtimeInput({
        audio: { data: base64Chunk, mimeType: "audio/pcm;rate=16000" },
      });
    } catch (e: any) {
      const msg = e.message || String(e);
      if (msg.includes("CLOSED") || msg.includes("CLOSING")) {
        isSocketOpen = false;
      } else {
        console.warn("Error sending audio to Gemini:", e);
      }
    }
  };

  // ----- Reset playback for new turn -----
  (session as any).resetPlayback = () => {
    nextPlaybackTime = 0;
  };

  return session;
}