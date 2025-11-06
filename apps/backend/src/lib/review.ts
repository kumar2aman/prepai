import "dotenv/config";

import { GoogleGenAI } from "@google/genai";
import { prompt } from "../config/prompt.js";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY_STT! });

export async function result(): Promise<string> {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
  });
  if (!response.text) {
    throw new Error("Failed to generate response");
  }
  return response.text;
}


