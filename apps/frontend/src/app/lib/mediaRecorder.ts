// src/lib/mediaRecorder.ts
import axios from "axios";

let mediaRecorder: MediaRecorder | null = null;
let audioChunks: Blob[] = [];
let stream: MediaStream | null = null;

/**
 * Start recording audio
 */
export async function startRecording(): Promise<void> {
  try {
    stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    mediaRecorder = new MediaRecorder(stream, { mimeType: "audio/webm" });

    audioChunks = [];

    mediaRecorder.ondataavailable = (e) => {
      if (e.data.size > 0) {
        audioChunks.push(e.data);
        console.log(`📦 Chunk received: ${e.data.size} bytes`);
      }
    };

    mediaRecorder.start();
    console.log("🎙️ Recording started...");
  } catch (error) {
    console.error("❌ Error accessing microphone:", error);
    throw error;
  }
}

/**
 * Convert Uint8Array to base64 in chunks (avoids stack overflow)
 */
function uint8ArrayToBase64(uint8Array: Uint8Array): string {
  const CHUNK_SIZE = 0x8000; // 32KB chunks
  let binary = '';
  
  for (let i = 0; i < uint8Array.length; i += CHUNK_SIZE) {
    const chunk = uint8Array.subarray(i, Math.min(i + CHUNK_SIZE, uint8Array.length));
    binary += String.fromCharCode.apply(null, Array.from(chunk));
  }
  
  return btoa(binary);
}

/**
 * Stop recording and convert to PCM in browser
 */
export async function stopRecording(): Promise<string | null> {
  console.log("🛑 stopRecording() called");
  
  return new Promise((resolve, reject) => {
    if (!mediaRecorder || mediaRecorder.state !== "recording") {
      console.error("❌ No active recording to stop");
      reject(new Error("No active recording"));
      return;
    }

    const timeout = setTimeout(() => {
      console.error("❌ stopRecording timeout after 10s");
      cleanup();
      reject(new Error("Stop recording timeout"));
    }, 10000);

    const cleanup = () => {
      clearTimeout(timeout);
      stream?.getTracks().forEach((track) => {
        track.stop();
        console.log("🔇 Audio track stopped");
      });
      stream = null;
      mediaRecorder = null;
    };

    mediaRecorder.onstop = async () => {
      console.log("⏹️ MediaRecorder stopped event fired");
      console.log(`📊 Total chunks collected: ${audioChunks.length}`);

      if (audioChunks.length === 0) {
        console.error("❌ No audio chunks recorded");
        cleanup();
        reject(new Error("No audio data"));
        return;
      }

      const audioBlob = new Blob(audioChunks, { type: "audio/webm" });
      console.log(`🎵 Audio blob size: ${audioBlob.size} bytes`);

      if (audioBlob.size === 0) {
        console.error("❌ Audio blob is empty");
        cleanup();
        reject(new Error("Empty audio blob"));
        return;
      }

      try {
        console.log("🔄 Converting to PCM in browser...");
        const conversionStart = Date.now();
        
        // Get arrayBuffer and clone for multiple uses
        const arrayBuffer = await audioBlob.arrayBuffer();
        console.log(`📦 ArrayBuffer size: ${arrayBuffer.byteLength} bytes`);
        
        // Clone for transcription
        const arrayBufferClone = arrayBuffer.slice(0);
        
        // Create audio context at 16kHz
        const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)({ 
          sampleRate: 16000 
        });
        
        const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
        console.log(`🎼 Decoded audio: ${audioBuffer.duration.toFixed(2)}s, ${audioBuffer.sampleRate}Hz`);
        
        // Get mono PCM data
        const pcmData = audioBuffer.getChannelData(0);
        const int16Array = new Int16Array(pcmData.length);
        
        // Convert float32 to int16
        for (let i = 0; i < pcmData.length; i++) {
          const s = Math.max(-1, Math.min(1, pcmData[i]));
          int16Array[i] = s < 0 ? s * 0x8000 : s * 0x7FFF;
        }
        
        // ✅ Convert to base64 using chunked method
        const uint8View = new Uint8Array(int16Array.buffer);
        const base64Pcm = uint8ArrayToBase64(uint8View);
        
        await audioContext.close();
        
        const conversionDuration = Date.now() - conversionStart;
        console.log(`✅ Browser conversion completed in ${conversionDuration}ms`);
        console.log(`📤 PCM base64 length: ${base64Pcm.length} chars`);

        // ✅ Send WebM to backend for transcription (using cloned buffer)
        const uint8ArrayWebm = new Uint8Array(arrayBufferClone);
        const base64Webm = uint8ArrayToBase64(uint8ArrayWebm);

        // axios.post("http://localhost:3001/api/v1/convertAudio", {
        //   audio: {
        //     data: base64Webm,
        //     mimeType: "audio/webm",
        //   },
        // }).then(() => {
        //   console.log("📝 Transcription request sent");
        // }).catch(err => {
        //   console.error("❌ Transcription error:", err.message);
        // });

        cleanup();
        resolve(base64Pcm);
      } catch (error: any) {
        console.error("❌ Browser conversion error:", error.message || error);
        cleanup();
        reject(error);
      }
    };

    console.log("🔴 Calling mediaRecorder.stop()...");
    try {
      mediaRecorder.stop();
    } catch (error) {
      console.error("❌ Error calling stop():", error);
      cleanup();
      reject(error);
    }
  });
}

/**
 * Check if currently recording
 */
export function isRecording(): boolean {
  return mediaRecorder?.state === "recording";
}

/**
 * Cancel recording without converting
 */
export function cancelRecording(): void {
  console.log("🚫 Cancelling recording...");
  if (mediaRecorder) {
    try {
      if (mediaRecorder.state === "recording") {
        mediaRecorder.stop();
      }
    } catch (error) {
      console.error("Error stopping recorder:", error);
    }
  }
  
  stream?.getTracks().forEach((track) => track.stop());
  stream = null;
  mediaRecorder = null;
  audioChunks = [];
  console.log("✅ Recording cancelled and cleaned up");
}