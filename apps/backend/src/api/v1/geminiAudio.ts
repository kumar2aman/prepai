import { Router } from "express";


// --- memory store (can be moved to DB or session later)
export const chatHistory: { role: "ai" | "user"; text: string }[] = [];


const router: Router = Router();

router.post("/", async (req, res) => {
  console.log("Received AI audio...");
  const data = req.body;
  try {
  

    // 3. Save the transcription as AI chat
    chatHistory.push({ role: "ai", text: data.text });

    res.sendStatus(200);

  

    // res.status(200).json({ text: response }); // optional: return to frontend
  } catch (error) {
    console.error("Error during AI voice transcription:", error);
    res.status(500).json({ error: "Failed to transcribe AI audio." });
  }
});

export { router as geminiAudioRouter };
