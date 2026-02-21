import { Router } from "express";

import { authMiddleware } from "../../../auth-middleware.js";
import { prisma } from "@prepai/db/client";

const router: Router = Router();

export let userStats = {};

router.get("/stats", authMiddleware, async (req, res) => {
  const userId = req.userId;

  if (!userId) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const user = await prisma.userData.findUnique({
      where: {
        userId,
      },
    });

    if (!user) {
      return res.status(404).json({ error: "User data not found" });
    }

    res.status(200).json(user);
    userStats = user;
  } catch (error) {
    console.error("Prisma Create Error:", error);
    res.status(500).json({ error: "Failed to fetch user data" });
  }
});

export { router as statsRouter };
