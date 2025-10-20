import "dotenv/config";

import { GoogleGenAI } from "@google/genai";
import { prompt } from "../config/prompt.js";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY_STT! });

export async function main() {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
  });
  console.log(response.text);
}


