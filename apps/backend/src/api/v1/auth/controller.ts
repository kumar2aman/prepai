import { Router } from "express";
import express from "express";
import bcrypt from "bcryptjs";
import prisma from "../../../db.js";
import jwt from "jsonwebtoken";
import { signinSchema, signupSchema } from "../../../types/schema.js";


const router: Router = Router();

router.use(express.json());

router.post("/signup", async (req, res) => {

  console.log("signup endpoint called!");
  const user = signupSchema.safeParse(req.body);

   console.log(user);

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

    if (existingUser?.email) {
      return res.status(400).json("User email already exists.");
    }
    if (existingUser?.username) {
      return res.status(400).json("Username already exists.");
    }

    const encryptedpassword = await bcrypt.hash(user.data?.password!, 10);

    const response = await prisma.user.create({
      data: {
        username: user.data?.username,
        email: user.data?.email,
        password: encryptedpassword,
      },
    });

    res
      .status(200)
      .json({ message: "User created successfully", response: response });
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

  if (!existingUser) {
    return res.status(400).json({ error: "User does not exist." });
  }

  const isPasswordValid = await bcrypt.compare(
    user.data?.password!,
    existingUser.password
  );

  if (!isPasswordValid) {
    return res.status(400).json({ error: "Invalid password." });
  }

  const userid = existingUser.id;

  const token = jwt.sign({ userid }, process.env.JWT_SECRET!, {
    expiresIn: "2d",
  });

  res.status(200).json({ token });
});

export { router as authRouter };
