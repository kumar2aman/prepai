import "dotenv/config";

import { GoogleGenAI } from "@google/genai";
import { prompt } from "../config/prompt.js";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY_STT! });

export async function result(): Promise<string> {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: "object",
        properties: {
          progress: { type: "string" },
          score: { type: "number" },
          level: { type: "number" },
          accuracy: { type: "number" },
          streak: { type: "number" },
        },
        required: ["progress", "score", "level", "accuracy", "streak"],
      },
      thinkingConfig: {
        includeThoughts: false,
      },
    },
    contents: prompt,
  });
  if (!response.text) {
    throw new Error("Failed to generate response");
  }
  // console.log( response.text);

  try {
    return JSON.parse(response.text);
  } catch (e) {
    console.error("Failed to parse AI response as JSON", response.text);
    throw new Error("Invalid JSON format returned");
  }
}
