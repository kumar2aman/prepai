import { Router } from "express";
import { authMiddleware } from "../../auth-middleware.js";
import prisma from "../../db.js";

const router: Router = Router();

router.post("/createsession", authMiddleware, async (req, res) => {
  const userId = req.userId;
  const data = req.body;

  if (!userId) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  if (!data) {
    return res.status(400).json({ error: "No data received." });
  }

  try {
    await prisma.session.create({
      data: {
        userId: userId,
        totalSession: 1, //  total session is hard coded for now..
        name: data as string,
      },
    });

    res.status(200).json("session created");
  } catch (error) {
    console.error("Prisma Create Error:", error);
    res.status(500).json({ error: "Failed to create session" });
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
    });
    res.status(200).json(sessions);
  } catch (error) {
    console.error("Prisma Create Error:", error);
    res.status(500).json({ error: "Failed to fetch user data" });
  }
});

export { router as sessionRouter };
