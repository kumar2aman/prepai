import { Router } from "express";

import { ephemeralTokenRouter } from "../api/v1/ephemeral-token.js";

import { userinfoRouter } from "../api/v1/userinfo/userinfo.js";
import {  geminiAudioRouter } from "../api/v1/GeminiAudio.js";
import { chatHistoryRouter } from "../api/v1/chatHistory.js";
import { userDataRouter } from "../api/v1/userData.js";
import { userAudioRouter } from "../api/v1/userAudio.js";

const router: Router = Router();

router.use("/token", ephemeralTokenRouter);
router.use("/useraudio", userAudioRouter);
router.use("/geminiaudio", geminiAudioRouter);
router.use("/userinfo", userinfoRouter);
router.use("/chathistory",chatHistoryRouter) ;
router.use("/userdata",userDataRouter)

export { router };
