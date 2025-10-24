import { Router } from "express";

import { chatHistory } from "./GeminiAudio.js";
import { convertToText } from "../../utils/assemblyaiSTT.js";

const router: Router = Router();

router.post("/", async (req, res) => {
  try {
    const { audio } = req.body;

    if (!audio || !audio.data) {
      return res.status(400).send("No audio data received.");
    }

    // 2. Transcribe user audio in background
    convertToText(audio)
      .then((response) => {
        if (response && response.trim().length > 0) {
          const lastUserMessage = chatHistory
            .filter((msg) => msg.role === "user")
            .pop();

          if (lastUserMessage?.text !== response) {
            chatHistory.push({ role: "user", text: response });
            console.log(`User said: "${response}"`);
          } else {
            console.log("⚠️ Duplicate user message, skipping");
          } 
        }
      })
      .catch((err) => {
        console.error("❌ Transcription error:", err);
      });
  } catch (error: any) {
    console.error("Stack:", error);
    res.status(500).send("Internal server error during audio conversion.");
  }
});

export { router as userAudioRouter };
