import { Router } from "express";
import { authMiddleware } from "../../auth-middleware.js";
import { prisma } from "@prepai/db";
import { result } from "../../lib/review.js";
import { chatHistory } from "./geminiAudio.js";


const router: Router = Router();

router.post("/createsession", authMiddleware,  async (req, res) => {
  const userId = req.userId;
  const data = req.body;

  if (!userId) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  if (!data) {
    return res.status(400).json({ error: "No data received." });
  }

  console.log("data:", data.name);

  // Clear previous session's chat history
  chatHistory.length = 0;

  try {
    const session = await prisma.session.create({
      data: {
        userId: userId,
        name: data.name as string,
      },
    });

    res.status(200).json(session);
  } catch (error) {
    console.error("Prisma Create Error:", error);
    res.status(500).json({ error: "Failed to create session" });
  }
});

router.get("/create_sessiondata", authMiddleware, async (req, res) => {
  console.log("create_sessiondata route called");
  const userId = req.userId;
  const { sessionId } = req.query;
  console.log("userid from sessiondata is userId:", userId, "sessionId:", sessionId);
  
  if (!userId) {
    return res.status(401).json({ error: "Unauthorized form create_sessiondata" });
  }

  try {
    const data = await result() as any;  
    console.log("data:", data);
    if (!data) {
      return res.status(400).json({ error: "No data received." });
    }

    // Update global user statistics
    await prisma.userData.update({
      where: {
        userId: userId,
      },
      data: {
        ...data,
      },
    });

    // Update specific session statistics if sessionId is provided
    if (sessionId) {
      await prisma.session.update({
        where: {
          id: sessionId as string,
          userId: userId,
        },
        data: {
          score: data.score,
          level: data.level,
          accuracy: data.accuracy,
          streak: data.streak,
          progress: data.progress,
        },
      });
    }

    res.status(200).json({ message: "session data created", data });
  } catch (error) {
    console.error("Prisma Update Error:", error);
    res.status(500).json({ error: "Failed to create user data" });
  }
});

router.get("/getsession", authMiddleware, async (req, res) => {
  const userId = req.userId;
  if (!userId) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const sessions = await prisma.session.findMany({
      where: {
        userId: userId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    res.status(200).json(sessions);
  } catch (error) {
    console.error("Prisma Create Error:", error);
    res.status(500).json({ error: "Failed to fetch user data" });
  }
});


router.get("/totalsession", authMiddleware, async (req, res) => {
  const userId = req.userId;

  if (!userId) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const sessions = await prisma.session.count({
      where: {
        userId: userId,
      },
    });
    res.status(200).json(sessions);
  } catch (error) {
    console.error("Prisma Create Error:", error);
    res.status(500).json({ error: "Failed to fetch user data" });
  }
})

export { router as sessionRouter };



