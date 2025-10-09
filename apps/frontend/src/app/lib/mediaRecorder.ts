// src/lib/mediaRecorder.ts
import axios from "axios";

export async function recordAudioAndConvert(): Promise<string | null> {
  const chunks: Blob[] = [];

  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const recorder = new MediaRecorder(stream, { mimeType: "audio/webm" });

    recorder.ondataavailable = (e) => chunks.push(e.data);

    return new Promise((resolve, reject) => {
      recorder.onstop = async () => {
        const audioBlob = new Blob(chunks, { type: "audio/webm" });
        try {
          const res = await axios.post(
            "http://localhost:3001/api/v1/convertAudio",
            audioBlob,
            {
              headers: { "Content-Type": "audio/webm" },
              responseType: "arraybuffer",
            }
          );
          const base64Pcm = Buffer.from(new Uint8Array(res.data)).toString("base64");
          resolve(base64Pcm);
        } catch (error) {
          console.error("Audio conversion failed:", error);
          reject(null);
        }
      };

      recorder.start();
      console.log("🎙️ Recording...");

      setTimeout(() => {
        if (recorder.state === "recording") {
          recorder.stop();
        }
      }, 5000);
    });
  } catch (error) {
    console.error("Error accessing microphone:", error);
    return null;
  }
}