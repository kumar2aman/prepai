"use client";

import { Suspense } from "react";
import VoiceInterviewPage from "../components/interviewPage/voice-interview";

function Page() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-black flex flex-col items-center justify-center text-white space-y-4">
        <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
        <p className="text-sm font-medium tracking-wider text-blue-200/80">Loading interview session...</p>
      </div>
    }>
      <VoiceInterviewPage />
    </Suspense>
  );
}

export default Page;
