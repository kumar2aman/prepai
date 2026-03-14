import "dotenv/config";
import { Router } from "express";
import bcrypt from "bcryptjs";
import { prisma } from "@prepai/db";
import jwt from "jsonwebtoken";
import { signinSchema, signupSchema } from "../../../types/schema.js";
import { getCookieOptions } from "../../../lib/cookieConfig.js";
import passport from "passport";

const router: Router = Router();

router.post("/signup", async (req, res) => {
  const user = signupSchema.safeParse(req.body);

  console.log("user:", user);
  if (!user.success) {
    return res.status(400).json({ error: "No user data received." });
  }
  try {
    const existingUser = await prisma.user.findFirst({
      where: {
        email: user.data?.email,
        username: user.data?.username,
      },
    });

    
    if(existingUser && existingUser?.email && existingUser?.username) {
        return res.status(400).json("User email and username already exists.");
    }
    
    if(existingUser?.provider && existingUser?.provider !== "local") {
        return res.status(400).json("User already exists.");
    }

    const encryptedpassword = await bcrypt.hash(user.data?.password!, 10);

    const response = await prisma.user.create({
      data: {
        username: user.data?.username,
        email: user.data?.email,
        password: encryptedpassword,
        provider: "local",
      },
    });

    if (!response) {
      return res.status(400).json({ error: "Failed to create user" });
    }
 

    const userData = await prisma.userData.create({
      data: {
        userId: response.id,
      },
    });

    res.status(200).json({ message: "User created successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to create user" });
  }
});

router.post("/signin", async (req, res) => {
  const user = signinSchema.safeParse(req.body);

  if (!user.success) {
    return res.status(400).json("No user data received.");
  }

  const existingUser = await prisma.user.findUnique({
    where: {
      email: user.data?.email,
    },
  });

  if (!existingUser || !existingUser.password) {
    return res.status(400).json({ error: "User does not exist." });
  }

  const isPasswordValid = await bcrypt.compare(
    user.data?.password!,
    existingUser.password,
  );

  if (!isPasswordValid) {
    return res.status(400).json({ error: "Invalid password." });
  }

  const userId = existingUser.id;

  const token = jwt.sign({ userId }, process.env.JWT_SECRET!, {
    expiresIn: "2d",
  });

  res.cookie("token", token, getCookieOptions());

  res.status(200).json({ message: "Login successful" });
});

router.get(
  "/google",
  passport.authenticate("google", { scope: ["email", "profile"] }),
);

router.get(
  "/google/callback",
  passport.authenticate("google", { session: false, failureRedirect: "/signin" },),
  async (req: any, res: any) => {
    const userId = req.user.id;
    const token = jwt.sign({ userId }, process.env.JWT_SECRET!, {
      expiresIn: "2d",
    });

     await prisma.userData.create({
      data: {
        userId: userId,
      },
    });
    res.cookie("token", token, getCookieOptions());
    res.redirect(`${process.env.FRONTEND_URL}/dashboard`);
  },
);

router.post("/logout", async (req, res) => {
  const { maxAge, ...clearOptions } = getCookieOptions();
  res.clearCookie("token", clearOptions);
  res.status(200).json({ message: "Logout successful" });
});

export { router as authRouter };
