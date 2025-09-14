// src/components/AudioLiveComponent.js
"use client";

import { useRef, useState } from "react";
import { getEphemeralToken } from "./lib/ephemeralToken";
import { startGeminiSession } from "./lib/geminiLiveService";
import { recordAudioAndConvert } from "./lib/mediaRecorder";


export default function AudioLiveComponent() {
  const [status, setStatus] = useState("");
  const sessionRef = useRef<any>(null);

  async function handleStartSession() {
    const token = await getEphemeralToken();
    if (!token) {
      setStatus("⚠️ Failed to get ephemeral token.");
      return;
    }
    const session = await startGeminiSession(token, setStatus);
    if(!session) {
      setStatus("⚠️ Failed to start Gemini session.");
      return;
    }
    sessionRef.current =  session;
  }

  async function handleStartRecording() {
    if (!sessionRef.current) {
      setStatus("⚠️ Please start a Gemini session first.");
      return;
    }
    setStatus("🎙️ Recording...");
    const base64Pcm = await recordAudioAndConvert();
    if (base64Pcm) {
      setStatus("✅ Converted! Sending to Gemini...");
      sessionRef.current.sendRealtimeInput({
        audio: {
          data: base64Pcm,
          mimeType: "audio/pcm;rate=16000",
        },
      });
    } else {
      setStatus("❌ Audio conversion failed.");
    }
  }

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">🎤 Gemini Live Audio</h1>
      <button onClick={handleStartSession} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">
        Start Gemini Session
      </button>
      <button onClick={handleStartRecording} className="mt-4 ml-2 px-4 py-2 bg-green-500 text-white rounded">
        Record & Send Audio
      </button>
      <p className="mt-4">{status}</p>
    </div>
  );
}