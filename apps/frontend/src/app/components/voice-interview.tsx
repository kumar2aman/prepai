'use client';

import { getEphemeralToken } from '@/lib/ephemeralToken';
import { startGeminiSession } from '@/lib/geminiLiveService';

import axios from 'axios';
import { AudioLines, Mic, StopCircle } from 'lucide-react';
import { useRef, useState } from 'react';
import { cancelRecording, startRecording, stopRecording } from '../lib/mediaRecorder';

export default function VoiceInterviewPage() {
  const [status, setStatus] = useState("");
  const [recording, setRecording] = useState(false);
  const sessionRef = useRef<any>(null);

  async function handleStartSession() {
    setStatus("🔗 Starting session...");
    const token = await getEphemeralToken();
    if (!token) {
      setStatus("⚠️ Failed to get ephemeral token.");
      return;
    }
    const session = await startGeminiSession(token, setStatus);
    if (!session) {
      setStatus("⚠️ Failed to start Gemini session.");
      return;
    }
    sessionRef.current = session;
    setStatus("✅ Session started. Click mic to record.");
  }

  async function handleToggleRecording() {
    if (!sessionRef.current) {
      setStatus("⚠️ Please start a Gemini session first.");
      return;
    }

    if (recording) {
      // Stop recording
      setStatus("⏹️ Stopping recording...");
      try {
        const base64Pcm = await stopRecording();
        if (base64Pcm) {
          setStatus("📤 Sending to Gemini...");
          sessionRef.current.sendRealtimeInput({
            audio: {
              data: base64Pcm,
              mimeType: "audio/pcm;rate=16000",
            },
          });
          setStatus("✅ Audio sent! Waiting for response...");
        } else {
          setStatus("❌ Audio conversion failed");
        }
      } catch (error) {
        console.error("Error stopping recording:", error);
        setStatus("❌ Failed to stop recording");
      }
      setRecording(false);
    } else {
      // Start recording
      try {
        await startRecording();
        setStatus("🎙️ Recording... Click mic again to stop");
        setRecording(true);
      } catch (error) {
        console.error("Error starting recording:", error);
        setStatus("❌ Microphone access denied");
      }
    }
  }

  async function handleStopSession() {
    try {
      setStatus("🛑 Ending interview...");
      
      if (recording) {
        setRecording(false);
        // Cancel ongoing recording
       
        cancelRecording();
      }

      if (sessionRef.current) {
        sessionRef.current.disconnect();
        sessionRef.current = null;
      }

      const response = await axios.get(
        "http://localhost:3001/api/v1/chatHistory",
        { withCredentials: true }
      );
      
      console.log("📜 Chat history:", response.data);
      setStatus("🏁 Interview ended. Check console for chat history.");
    } catch (error) {
      console.error("Error fetching chat history:", error);
      setStatus("❌ Error ending session");
    }
  }

  return (
    <main className="min-h-screen bg-black flex flex-col items-center justify-center text-white relative overflow-hidden">
      {/* Glowing Circle */}
      <div
        className={`relative w-64 h-64 rounded-full flex items-center justify-center bg-black border-4 transition-all duration-300 ${
          recording
            ? 'border-red-500 shadow-[0_0_40px_#ff0000] animate-pulse'
            : 'border-white shadow-[0_0_30px_#00f2fe]'
        }`}
      >
        <AudioLines className={`w-16 h-16 ${recording ? 'text-red-400' : 'text-white'}`} />
      </div>

      {/* Status */}
      <p className="mt-6 text-sm text-gray-300 text-center max-w-md">
        {status || "Click 'Start Interview' to begin"}
      </p>

      {/* Controls */}
      <div className="mt-10 flex gap-6 items-center">
        {/* Mic Button */}
        <button
          onClick={handleToggleRecording}
          disabled={!sessionRef.current}
          className={`p-5 rounded-full border-2 transition-all duration-300 ${
            recording
              ? 'border-red-500 text-red-400 bg-red-900/40 shadow-[0_0_20px_#ff0000]'
              : 'border-green-500 text-green-400 hover:bg-green-900/30 hover:shadow-[0_0_20px_#00ff00]'
          } disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-transparent`}
          title={recording ? "Stop recording" : "Start recording"}
        >
          <Mic size={24} />
        </button>

        {/* Start Button */}
        <button
          onClick={handleStartSession}
          disabled={!!sessionRef.current}
          className="bg-white text-black font-semibold py-3 px-8 rounded-lg shadow-lg hover:shadow-2xl hover:scale-105 transition-all disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:scale-100"
        >
          Start Interview
        </button>

        {/* Stop Button */}
        <button
          onClick={handleStopSession}
          disabled={!sessionRef.current}
          className="p-5 rounded-full border-2 border-red-500 text-red-500 hover:bg-red-900/30 hover:shadow-[0_0_20px_#ff0000] transition-all disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-transparent"
          title="End interview"
        >
          <StopCircle size={24} />
        </button>
      </div>

      {/* Recording Indicator */}
      {recording && (
        <div className="mt-6 flex items-center gap-2 text-red-400 animate-pulse">
          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
          <span className="text-sm font-medium">RECORDING</span>
        </div>
      )}

      {/* Background Accent Light */}
      <div className="absolute bottom-0 right-0 w-48 h-48 bg-orange-600 blur-3xl opacity-30 rounded-full z-0" />
      <div className="absolute top-0 left-0 w-48 h-48 bg-blue-500 blur-3xl opacity-20 rounded-full z-0" />
    </main>
  );
}