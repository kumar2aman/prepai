import { Router } from "express";

import { ephemeralTokenRouter } from "../api/v1/ephemeral-token.js";
import { convertAudioRouter } from "../api/v1/convert-audio.js";




const router: Router = Router();

router.use("/token", ephemeralTokenRouter);
router.use("/convertAudio", convertAudioRouter);


export { router };
