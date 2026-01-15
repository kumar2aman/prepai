import { Router } from "express";

import { authMiddleware } from "../../auth-middleware.js";
import prisma from "../../db.js";

const router: Router = Router();

router.get("/", authMiddleware, async (req, res) => {
  const userId = req.userId;
  if (!userId) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const user = await prisma.userData.findFirst({
      where: {
        id: userId,
      },
    });

    if (!user) {
      return res.status(404).json({ error: "User data not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error("Prisma Create Error:", error);
    res.status(500).json({ error: "Failed to fetch user data" });
  }
});

export { router as userDataRouter };
