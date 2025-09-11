import { Router } from "express";

import { ephemeralTokenRouter } from "../api/ephemeral-token.js";
import { convertAudioRouter } from "../api/convert-audio.js";



const router: Router = Router();

router.use("/token", ephemeralTokenRouter);
router.use("/convertAudio", convertAudioRouter);


export { router };
