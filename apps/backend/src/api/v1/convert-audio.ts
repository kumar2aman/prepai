import { Router } from "express";

import { webmToPCM } from "../../utils/createRawPcm.js";
import { convertToText } from "../../utils/convertstt.js";

const router: Router = Router();

router.post("/", async (req, res) => {
  console.log("convert audio endpoint called!");

  const rawAudio = req.body;

  if (!rawAudio) {
    return res.status(407).send("No audio data received.");
  }

  const pcmBuffer = await webmToPCM(rawAudio);

  if (pcmBuffer) {
    res.status(200).send(pcmBuffer);
  }

  convertToText(rawAudio);
});

export { router as convertAudioRouter };
