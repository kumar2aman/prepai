import { Router } from "express";

import { authMiddleware } from "../../auth-middleware.js";
import prisma from "../../db.js";


const router: Router = Router();

router.post("/", authMiddleware, async (req, res) => {
  const userId = req.userId;
console.log("userId:",userId);
  if (!userId) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  
  console.log(req.body);


  const userData = req.body;

  console.log("userData:", userData);
  try {
    await prisma.userData.create({
     
      data: {
         userId: userId,  
        ...userData,
      },
    });

    res.status(200).json({ message: "User data saved successfully" });
  } catch (error) {
     console.error("Prisma Create Error:", error);
    res.status(500).json({ error: "Failed to save user data" });
  }
});

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

    res.status(200).json(user);
  } catch (error) {
    console.error("Prisma Create Error:", error);
    res.status(500).json({ error: "Failed to fetch user data" });
  }
});

export { router as userDataRouter };
