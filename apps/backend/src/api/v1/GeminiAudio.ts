import { Router } from "express";
import { rawPcmToWebM } from "../../utils/convert-audio/convertPcmtoWebm.js";
import { convertToText } from "../../utils/assemblyaiSTT.js";



// --- memory store (can be moved to DB or session later)
export const chatHistory: { role: "ai" | "user"; text: string }[] = [];

const router: Router = Router();

router.post("/", async (req, res) => {
  try {
    const { audio } = req.body;

    if (!audio || !audio.data || !audio.mimeType) {
      return res.status(400).send("Invalid audio payload received.");
    }

    // 1. Convert raw PCM to WebM (Gemini response audio)
    const webmBuffer = await rawPcmToWebM(audio.data, 24000);
    const base64Webm = webmBuffer.toString("base64");

    // 2. Transcribe Gemini's own audio voice to text
    const response = await convertToText({
      data: base64Webm,
      mimeType: "audio/webm",
    });

    if (!response) {
      return res.status(500).json({ error: "Failed to transcribe AI audio." });
    }

    // 3. Save the transcription as AI chat
    chatHistory.push({ role: "ai", text: response });

    console.log(" Stored AI response as text:", response);

    // res.status(200).json({ text: response }); // optional: return to frontend
  } catch (error) {
    console.error("Error during AI voice transcription:", error);
    res.status(500).json({ error: "Failed to transcribe AI audio." });
  }
});

export { router as geminiAudioRouter };
