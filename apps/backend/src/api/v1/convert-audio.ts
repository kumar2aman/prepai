import { Router } from "express";
import express from "express";
import { webmToPCM } from "../../utils/createRawPcm.js";
import { convertToText } from "../../utils/convertSTT.js";




const router: Router = Router();


router.use(express.json());

router.post("/", async (req, res) => {
  console.log("convert audio endpoint called!");

  const {audio} = req.body;


  console.log(audio)

  if (!audio) {
    return res.status(407).send("No audio data received.");
  }

   const pcmBuffer = await webmToPCM(audio.data);

  if (pcmBuffer) {
    res.status(200).send(pcmBuffer);
  }

   convertToText(audio);
});

export { router as convertAudioRouter };
