import { Router } from "express";

import { ephemeralTokenRouter } from "../api/v1/ephemeral-token.js";
import { convertAudioRouter } from "../api/v1/convert-audio.js";
import { userinfoRouter } from "../api/v1/userinfo/userinfo.js";

const router: Router = Router();

router.use("/token", ephemeralTokenRouter);
router.use("/convertAudio", convertAudioRouter);
router.use("/userinfo", userinfoRouter);

export { router };
