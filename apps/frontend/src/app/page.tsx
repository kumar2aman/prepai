"use client";

import { useRef, useState } from "react";
import { GoogleGenAI, Modality, TuningMode } from "@google/genai";
import axios from "axios";

export default function AudioLiveComponent() {
  const [status, setStatus] = useState("");
  const sessionRef = useRef<any>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);

    const audioContext = new AudioContext({ sampleRate: 24000 });

  const playbackQueue = useRef<AudioBuffer[]>([]);
let nextPlaybackTime = audioContext.currentTime;




  async function getEphemeralToken() {
    try {
      const res = await axios.get("http://localhost:3001/api/token");
      console.log("Ephemeral token:", res.data);
      return res.data.token;
    } catch (error) {
      console.error("Error fetching ephemeral token:", error);
      return null;
    }
  }

  async function startSession() {
    setStatus("🔗 Connecting to Gemini...");
    const token = await getEphemeralToken();
    console.log("Token:", token);
    if (!token) {
      setStatus("⚠️ Failed to get ephemeral token.");
      return;
    }

    const ai = new GoogleGenAI({
      apiKey: token,
      httpOptions: { apiVersion: "v1alpha" },
    });

    const session = await ai.live.connect({
      model: "gemini-2.0-flash-live-001",
      config: {
        responseModalities: [Modality.AUDIO], // or Modality.AUDIO
       
        systemInstruction:"You are a helpful assistant and answer in a friendly tone, say fastly 2x speed and concisely",
      },
      callbacks: {
        onopen: () => setStatus("🔌 Connected"),
    

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

    // Schedule playback with a queue
    const source = audioContext.createBufferSource();
    source.buffer = audioBuffer;
    source.connect(audioContext.destination);

    // Schedule playback with proper timing
    const startTime = Math.max(audioContext.currentTime, nextPlaybackTime);
    source.start(startTime);


nextPlaybackTime = startTime + audioBuffer.duration ;

  }

  if (msg.serverContent?.turnComplete) {
    console.log("✅ Turn complete");
  }
},

        onerror: (err) => console.error("Error:", err),
        onclose: () => setStatus("❌ Disconnected"),
      },
    });

    nextPlaybackTime = audioContext.currentTime;


    sessionRef.current = session;
  }

  async function startRecording() {
    try {
      if (!sessionRef.current) {
        setStatus("⚠️ Please start a Gemini session first.");
        return;
      }

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream, { mimeType: "audio/webm" });
      mediaRecorderRef.current = recorder;

      recorder.ondataavailable = (e) => {
        chunksRef.current.push(e.data);
      };

      recorder.onstop = async () => {
        const audioBlob = new Blob(chunksRef.current, { type: "audio/webm" });
        chunksRef.current = []; // Clear chunks for next recording

        setStatus("🔄 Converting audio...");

        try {
          // Use Axios to post the Blob
          const res = await axios.post(
            "http://localhost:3001/api/convertAudio",
            audioBlob,
            {
              headers: {
                "Content-Type": "audio/webm",
              },
              responseType: "arraybuffer", // Get raw binary data
            }
          );

          // Convert the ArrayBuffer to a Base64 string

          console.log("res.data", res.data);
          // Safely convert ArrayBuffer -> base64
          const base64Pcm = Buffer.from(new Uint8Array(res.data)).toString(
            "base64"
          );

          setStatus("✅ Converted! Sending to Gemini...");

          const session = sessionRef.current;
          session.sendRealtimeInput({
            audio: {
              data: base64Pcm,
              mimeType: "audio/pcm;rate=16000",
            },
          });
        } catch (error) {
          setStatus("❌ Audio conversion failed.");
          console.error("Error converting and sending audio:", error);
        }
      };

      recorder.start();
      setStatus("🎙️ Recording...");

      // Stop after 5 seconds
      setTimeout(() => {
        if (recorder.state === "recording") {
          recorder.stop();
        }
      }, 5000);
    } catch (error) {
      setStatus("❌ Error accessing microphone.");
      console.error(error);
    }
  }

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">🎤 Gemini Live Audio</h1>

      <button
        onClick={startSession}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
      >
        Start Gemini Session
      </button>

      <button
        onClick={startRecording}
        className="mt-4 ml-2 px-4 py-2 bg-green-500 text-white rounded"
      >
        Record & Send Audio
      </button>

      <p className="mt-4">{status}</p>
    </div>
  );
}
