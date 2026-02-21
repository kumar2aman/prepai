import { Router } from "express";

import { ephemeralTokenRouter } from "../api/v1/ephemeral-token.js";
import { userinfoRouter } from "../api/v1/user/userInfo.js";
import { geminiAudioRouter } from "../api/v1/geminiAudio.js";
import { statsRouter } from "../api/v1/user/stats.js";
import { userAudioRouter } from "../api/v1/userAudio.js";
import { sessionRouter } from "../api/v1/session.js";

const router: Router = Router();

router.use("/token", ephemeralTokenRouter);
router.use("/useraudio", userAudioRouter);
router.use("/geminiaudio", geminiAudioRouter);
router.use("/user", userinfoRouter);
router.use("/user", statsRouter);
router.use("/session", sessionRouter);

export { router };
