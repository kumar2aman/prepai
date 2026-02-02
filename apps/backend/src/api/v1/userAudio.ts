import { Router } from "express";

import { chatHistory } from "./geminiAudio.js";



const router: Router = Router();

router.post("/", async (req, res) => {
  console.log("Received user audio...");
  try {
    const data = req.body;

    chatHistory.push({ role: "user", text: data.text });
    console.log("  user response:", data);

    res.sendStatus(200);
  } catch (error: any) {
    console.error("Stack:", error);
    res.status(500).send("Internal server error during audio conversion.");
  }
});

export { router as userAudioRouter };
