import  { Router } from "express";

import { chatHistory } from "./geminiAudio.js";

import { enqueue } from "../../lib/queue.js";

const router: Router = Router();

router.post("/", async (req, res) => {
  console.log("Received user audio...");
  try {
    const { audio } = req.body;
console.log(" user audio = ",audio.data.length)
    if (!audio || !audio.data) {
      return res.status(400).send("No audio data received.");
    }



    // 2. Transcribe user audio in background
   const response = await enqueue(audio.data);

   if(!response){
    return res.status(400).send("No response from queue.");
   }
      
   chatHistory.push({ role: "user", text: response });
      console.log(" Stored user response as text:", response);
  } catch (error: any) {
    console.error("Stack:", error);
    res.status(500).send("Internal server error during audio conversion.");
  }
});

export { router as userAudioRouter };
