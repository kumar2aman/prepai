import "dotenv/config";
import { GoogleGenAI } from "@google/genai";
import { Router } from "express";
import { authMiddleware } from "../../auth-middelware.js";

const router: Router = Router();

const client = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });

router.get("/", authMiddleware, async (req, res) => {
  try {
    const expireTime = new Date(Date.now() + 30 * 60 * 1000).toISOString();

    const token: any = await client.authTokens.create({
      config: {
        uses: 1, // The default
        expireTime: expireTime, // Default is 30 mins
        newSessionExpireTime: new Date(
          Date.now() + 1 * 60 * 1000
        ).toISOString(), // Default 1 minute in the future
        httpOptions: { apiVersion: "v1alpha" },
      },
    });

    res.status(200).json({ token: token.name });
  } catch (error) {
    res.status(500).json({ error: "Failed to create ephemeral token" });
  }
});

export { router as ephemeralTokenRouter };
