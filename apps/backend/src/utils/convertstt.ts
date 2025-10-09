import "dotenv/config";
import { GoogleGenAI } from "@google/genai";




export async function convertToText(buffer: Buffer) {

    console.log("Converting to text...");
  const ai = new GoogleGenAI({apiKey: process.env.GEMINI_API_KEY!});

        console.log("buffer", buffer.length);
    const base64AudioFile = buffer.toString("base64");

    console.log("base64AudioFile", base64AudioFile.length);

  const contents = [
    { text: "Please convert this audio to text" },
    {
      inlineData: {
        mimeType:
          "audio/webm; codecs=opus; samplerate=16000; channels=1",
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


