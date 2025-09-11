import { Router } from "express";

import { webmToPCM } from "../utils/createRawPcm.js";

const router: Router = Router();

router.post("/", async (req, res) => {
  console.log("convert audio endpoint called!");

  const rawAudio = req.body;

  if (!rawAudio) {
    return res.status(407).send("No audio data received.");
  }

  const pcmBuffer = await webmToPCM(rawAudio);

  res.status(200).send(pcmBuffer);
});

export { router as convertAudioRouter };
