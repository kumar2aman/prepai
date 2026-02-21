// import "dotenv/config";
// import { GoogleGenAI } from "@google/genai";

// interface audio {
//   data: string;
//   mimeType: string;
// }

// export async function convertToText(audio: audio) {
//   const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });

//   const contents = [
//     {
//       text: `You are a strict transcription-only engine.

// **CRITICAL RULES:**
// 1. Transcribe ONLY the audio you hear in THIS file
// 2. Do NOT include any previous messages or conversation history
// 3. Do NOT add greetings, explanations, or context
// 4. If the audio is silent or unintelligible, return empty string
// 5. Return ONLY the new spoken words

// Output format: Just the transcribed text, nothing else.`,
//     },
//     {
//       inlineData: {
//         mimeType: audio.mimeType,
//         data: audio.data,
//       },
//     },
//   ];

//   const response = await ai.models.generateContent({
//     model: "gemini-2.5-flash",
//     contents: contents,
//   });

//   const text = response.text?.trim() || "";

//   // Additional cleanup
//   if (
//     text.toLowerCase().includes("i'm cpt") ||
//     text.toLowerCase().includes("i'm crap") ||
//     text.toLowerCase().includes("ai interviewer")
//   ) {
//     console.log("⚠️ Detected repeated intro, filtering...");
//     // Try to extract only new content
//     const lines = text.split(/[.!?]+/).filter(Boolean);
//     return lines[lines.length - 1]?.trim() || "";
//   }

//   return text;
// }
