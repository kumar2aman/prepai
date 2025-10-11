import "dotenv/config";
import { GoogleGenAI } from "@google/genai";


interface audio {
  data: Buffer;
  mimeType: string;
}


export async function convertToText(audio: audio) {

    console.log("Converting to text...");
  const ai = new GoogleGenAI({apiKey: process.env.GEMINI_API_KEY!});

        console.log("buffer", audio.data.length);
    const base64AudioFile = audio.data.toString("base64");

    console.log("base64AudioFile", base64AudioFile.length);

  const contents = [
    { text: "Please convert this audio to text" },
    {
      inlineData: {
        mimeType:
          audio.mimeType,
          data: base64AudioFile,
      },
    },
  ];

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: contents,
  });
  console.log(response.text);
}


