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

        const audioBuffer = await audioBlob.arrayBuffer();

        const base64Audio = Buffer.from(audioBuffer).toString("base64");

        const payload = {
          audio: {
            data: base64Audio,
            mimeType: "audio/webm; rate=16000; channels=1; ",
          },
        };

        try {
          const res = await axios.post(
            "http://localhost:3001/api/v1/convertAudio",
            payload,
            {
              headers: { "Content-Type": "application/json" },
              responseType: "arraybuffer",
            }
          );
          const base64Pcm = Buffer.from(new Uint8Array(res.data)).toString(
            "base64"
          );
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