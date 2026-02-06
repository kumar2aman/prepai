import { Router } from "express";
import { authMiddleware } from "../../auth-middleware.js";
import prisma from "../../db.js";
import { result } from "../../lib/review.js";

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
        name: data.name as string,
      },
    });

    res.status(200).json("session created");
  } catch (error) {
    console.error("Prisma Create Error:", error);
    res.status(500).json({ error: "Failed to create session" });
  }
});

router.post("/create_sessiondata", authMiddleware, async (req, res) => {

  const userId = req.userId;
 
  const data = await result(); //  TODO: Needed to be tested before creation of session data
  console.log("data:", data);
  if (!userId) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  if (!data) {
    return res.status(400).json({ error: "No data received." });
  }

  try {
    await prisma.userData.update({
      where: {
        userId: userId,
      },
      data: {
        ...data,
      },
    });

    res.status(200).json("user data created");
  } catch (error) {
    console.error("Prisma Create Error:", error);
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
    });
    res.status(200).json(sessions);
  } catch (error) {
    console.error("Prisma Create Error:", error);
    res.status(500).json({ error: "Failed to fetch user data" });
  }
});

export { router as sessionRouter };
