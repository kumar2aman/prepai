import { Router } from "express";
import { chatHistory } from "./GeminiAudio.js";
import { main } from "../../lib/review.js";

const router: Router = Router();

router.get("/", async (req, res) => {
  try {
    console.log("Fetching chat history...");
    main();
    res.status(200).json(chatHistory);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch chat history" });
  }
});

export { router as chatHistoryRouter };
