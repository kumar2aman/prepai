'use client';

import { getEphemeralToken } from '@/lib/ephemeralToken';
import { startGeminiSession } from '@/lib/geminiLiveService';
import { recordAudioAndConvert } from '@/lib/mediaRecorder';
import axios from 'axios';
import { AudioLines, Mic, StopCircle } from 'lucide-react';
import { useRef, useState } from 'react';


export default function VoiceInterviewPage() {
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


    async   function handlestopSession() {
        try {
         
          const response = await axios.get(
            "http://localhost:3001/api/v1/chatHistory",
            {
              withCredentials: true,
            }
          );
          console.log("Chat history:", response.data);
        } catch (error) {
          console.error("Error fetching chat history:", error);
        }
       }


  return (
    <main className="min-h-screen bg-black flex flex-col items-center justify-center text-white relative overflow-hidden">
      {/* Glowing Circle */}
      <div className="relative w-64 h-64 rounded-full flex items-center justify-center bg-black border-4 border-white shadow-[0_0_30px_#00f2fe]">
        {/* Sound Wave Icon */}
        <AudioLines  className="w-10 h-10  border-white" />
       
     </div>

      {/* Controls */}
      <div className="mt-10 flex gap-6 items-center">
        {/* Mic Button */}
        <button
          onClick={handleStartRecording}
          className="p-4 rounded-full border border-green-500 text-green-400 hover:bg-green-900 transition-all"
        >
          <Mic size={20} />
        </button>

        {/* Start/Stop Button */}
        <button
          onClick={handleStartSession}
          className="bg-white text-black font-semibold py-2 px-6 rounded-lg shadow-md hover:shadow-xl transition"
        >
          Start Interview
        </button>

        {/* Stop Button */}
        <button
             onClick={handlestopSession}
          className="p-4 rounded-full border border-red-500 text-red-500 hover:bg-red-900 transition-all"
        >
          <StopCircle size={20} />
        </button>
      </div>

      {/* Background Accent Light */}
      <div className="absolute bottom-0 right-0 w-48 h-48 bg-orange-600 blur-3xl opacity-30 rounded-full z-0" />
      <div className="absolute top-0 left-0 w-48 h-48 bg-blue-500 blur-3xl opacity-20 rounded-full z-0" />
    </main>
  );
}
