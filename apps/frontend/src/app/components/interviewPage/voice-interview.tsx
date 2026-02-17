"use client";

import {  useEffect, useRef, useState } from "react";
import {  StopCircle, AudioLines, PowerOff } from "lucide-react";
import { startGeminiSession } from "../../lib/geminiLiveService";
import {
  startRecording,
  stopRecording,
 
} from "../../lib/mediaRecorder";
import { getEphemeralToken } from "../../lib/ephemeralToken";

import axios from "axios";
import useSessionTimer from "../../lib/chatSessionTimer";

export default function VoiceInterviewPage() {
  const [status, setStatus] = useState("Ready");
  const [recording, setRecording] = useState(false);
  const sessionRef = useRef<any>(null);
  const [aitranscript, setAiTranscript] = useState("");
  const [usertranscript, setUserTranscript] = useState("");
  const [duration, setDuration] = useState<number>(0);
  const [isActive, setIsActive] = useState(false);

  const { timeLeft, resetTimer } = useSessionTimer({
    initialTimeoutSeconds: 120,
    redirectPath: "/dashboard",
    isActive: isActive,
  });

  useEffect(() => {
    setDuration(timeLeft);
    if (timeLeft <= 0) {
      handleEndSession();
      resetTimer();
      setIsActive(false);
    }
  }, [timeLeft]);

 async function handleStartSession() {
  const token = await getEphemeralToken();
  if (!token) {
    setStatus("Failed to fetch ephemeral token");
    return;
  }

  const session = await startGeminiSession(
    token,
    setStatus,
    (aiText) => {
      setAiTranscript(aiText);
      axios.post("http://localhost:3001/api/v1/geminiaudio", {
         text: aiText, 
        }) 
      .catch((err) => console.error("Error sending AI audio:", err));
    },
    (userText) => {
      setUserTranscript(userText);
      axios.post("http://localhost:3001/api/v1/useraudio", {
        text:userText
      })
      .catch((err) => console.error("Error sending user audio:", err));
    }
  );

  sessionRef.current = session;

 

  // 🎤 START RECORDING IMMEDIATELY (no toggle)
  await startRecording((base64Chunk: string) => {
    session.sendRealtimeInput({
      audio: {
        data: base64Chunk,
        mimeType: "audio/pcm;rate=16000",
      },
    });
  });

   setStatus("Listening...");
   setRecording(true);
   setIsActive(true);
}


  // --- NEW: Function to disconnect Gemini ---
async function handleEndSession() {
  if (sessionRef.current) {
    stopRecording(); // stop mic

    if (typeof sessionRef.current.disconnect === "function") {
      sessionRef.current.disconnect();
    } else if (typeof sessionRef.current.close === "function") {
      sessionRef.current.close();
    }

    sessionRef.current = null;
    setStatus("Disconnected");
    setIsActive(false);
  }
}



  const sendSession = async () => {
    console.log("button clicked");
    const response = await axios.get(
      "http://localhost:3001/api/v1/session/create_sessiondata",
      {
        withCredentials: true,
      },
    );
    console.log("Session data:", response.data);
  };

  return (
    <div className="relative flex flex-col items-center justify-between min-h-screen bg-black text-white overflow-hidden font-sans selection:bg-blue-500/30">
      {/* Background Gradients */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-900/20 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-900/20 rounded-full blur-[120px] animate-pulse delay-1000" />
      </div>

      {/* Header */}
      <header className="absolute top-0 left-0 w-full flex justify-between items-center p-6 z-10">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-blue-500 animate-pulse" />
          <span className="text-sm font-medium tracking-wider text-blue-200/80">
            PREPAI LIVE
          </span>
        </div>
        <div className="flex items-center gap-4">
          <div
            className={`px-3 py-1 rounded-full text-xs font-semibold border ${
              status === "Connected"
                ? "bg-green-500/10 border-green-500/50 text-green-400"
                : status === "Listening..."
                  ? "bg-blue-500/10 border-blue-500/50 text-blue-400"
                  : "bg-gray-800 border-gray-700 text-gray-400"
            }`}
          >
            {status}
          </div>
          {status === "Listening..." && (
            <div className="px-3 py-1 rounded-full text-x font-semibold border bg-red-500 text-white border-red-200">
              {duration}s
            </div>
          )}
        </div>
      </header>

      {/* Main Visualizer Area */}
      <main className="flex-1 flex flex-col items-center justify-center w-full z-10 relative">
        <div className="relative">
          {/* Central Circle */}
          <div
            className={`relative w-64 h-64 rounded-full flex items-center justify-center transition-all duration-500 ${
              recording
                ? "scale-110 shadow-[0_0_80px_rgba(59,130,246,0.6)]"
                : "shadow-[0_0_40px_rgba(59,130,246,0.2)]"
            }`}
          >
            {/* Ripple Effects when recording */}
            {recording && (
              <>
                <div className="absolute w-full h-full rounded-full border border-blue-500/30 animate-[ping_2s_linear_infinite]" />
                <div className="absolute w-full h-full rounded-full border border-blue-400/20 animate-[ping_2s_linear_infinite_0.5s]" />
              </>
            )}

            {/* Core Visualizer */}
            <div className="w-full h-full rounded-full bg-gradient-to-tr from-blue-900 to-slate-900 flex items-center justify-center border border-white/10 backdrop-blur-3xl overflow-hidden relative group">
              {!sessionRef.current ? (
                <AudioLines className="w-20 h-20 text-white/20 group-hover:text-white/40 transition-colors" />
              ) : (
                <div className="flex items-center gap-1 h-12">
                  {[...Array(5)].map((_, i) => (
                    <div
                      key={i}
                      className={`w-2 bg-blue-400 rounded-full transition-all duration-100 ${
                        recording ? "animate-bounce" : "h-2 bg-blue-500/30"
                      }`}
                      style={{
                        height: recording
                          ? `${Math.random() * 40 + 10}px`
                          : "8px",
                        animationDelay: `${i * 0.1}s`,
                      }}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Status Text under visualizer */}
          <div className="absolute -bottom-16 w-full text-center">
            <p className="text-xl font-light text-slate-300 tracking-wide">
              {sessionRef.current
                ? recording
                  ? "I'm listening..."
                  : "Tap to speak"
                : "Initialize to start"}
            </p>
          </div>
        </div>
      </main>

      {/* Transcripts Overlay */}
      {(aitranscript || usertranscript) && (
        <div className="absolute bottom-32 w-full px-8 max-w-3xl text-center z-10 mx-auto left-0 right-0 space-y-4">
          {usertranscript && (
            <p
              className="text-lg text-white/60 font-light"
              style={{ textShadow: "0 2px 10px rgba(0,0,0,0.5)" }}
            >
              "{usertranscript}"
            </p>
          )}
          {aitranscript && (
            <p
              className="text-2xl text-white font-medium leading-relaxed"
              style={{ textShadow: "0 2px 20px rgba(0,0,0,0.8)" }}
            >
              {aitranscript}
            </p>
          )}
        </div>
      )}

      {/* Controls */}
      <div className="mb-8 z-20">
        {!sessionRef.current ? (
          <button
            onClick={handleStartSession}
            className="group relative px-8 py-4 bg-white text-black rounded-full font-bold text-lg hover:scale-105 transition-all duration-200 shadow-[0_0_40px_rgba(255,255,255,0.3)] hover:shadow-[0_0_60px_rgba(255,255,255,0.5)]"
          >
            <span className="relative z-10 flex items-center gap-2">
              <PowerOff size={20} className="rotate-90" /> Initialize Session
            </span>
          </button>
        ) : (
          <div className="flex items-center gap-6 p-4 rounded-3xl bg-white/5 backdrop-blur-md border border-white/10 shadow-2xl">
            {/* End Call */}
            <button
              onClick={handleEndSession}
              className="p-4 rounded-full bg-red-500/20 text-red-400 hover:bg-red-500 hover:text-white transition-all duration-300"
              title="End Session"
            >
              <StopCircle size={24} />
            </button>

      

            {/* Placeholder for future settings */}
            <div className="w-14 h-14 rounded-full bg-white/5 flex items-center justify-center text-white/20 border border-white/5">
              <div className="w-1.5 h-1.5 rounded-full bg-white/20" />
              <div className="w-1.5 h-1.5 rounded-full bg-white/20 mx-1" />
              <div className="w-1.5 h-1.5 rounded-full bg-white/20" />
            </div>
          </div>
        )}
      </div>

      <div onClick={sendSession} className="bg-green-300 text-white  ">
        <button>
  save button
        </button>
      
      </div>
    </div>
  );
}
