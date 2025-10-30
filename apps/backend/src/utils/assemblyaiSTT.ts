
import { AssemblyAI } from "assemblyai";
import fs from "fs";
import path from "path";
import { promisify } from "util";

const writeFile = promisify(fs.writeFile);
const unlink = promisify(fs.unlink);

const client = new AssemblyAI({
  apiKey: process.env.ASSEMBLYAI_API_KEY!, // Get free key at assemblyai.com
});

interface Audio {
  data: string;
  mimeType: string;
}

export async function convertToText(audio: Audio): Promise<string> {
  const startTime = Date.now();
  let tempPath = "";

  try {
    const tempDir = path.join(process.cwd(), "temp");
    if (!fs.existsSync(tempDir)) {
      fs.mkdirSync(tempDir, { recursive: true });
    }

    tempPath = path.join(tempDir, `audio-${Date.now()}.webm`);
    const buffer = Buffer.from(audio.data, "base64");
    await writeFile(tempPath, buffer);

    console.log('Transcribing...');

    const transcript = await client.transcripts.transcribe({
      audio: tempPath,
      language_code: "en",
    });

    const duration = Date.now() - startTime;
    const text = transcript.text?.trim() || "";

   


    return text;
  } catch (error: any) {
    console.error("❌ AssemblyAI error:", error.message);
    return "";
  } finally {
    if (tempPath && fs.existsSync(tempPath)) {
      await unlink(tempPath).catch(() => {});
    }
  }
}