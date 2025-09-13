import { Router } from "express";

import bcrypt from "bcryptjs";
import prisma from "../../../db.js";

const router: Router = Router();

router.post("/", async (req, res) => {
  const user = req.body;

  if (!user) {
    return res.status(400).json("No user data received.");
  }

  const existingUser = await prisma.user.findUnique({
    where: {
      email: user.email,
      username: user.username,
    },
  });

  if (existingUser?.email) {
    return res.status(400).send("User email already exists.");
  }
  if (existingUser?.username) {
    return res.status(400).send("Username already exists.");
  }


const encryptedpassword = await bcrypt.hash(user.password, 10);

  const response = prisma.user.create({
    data: {
      username: user.username,
      email: user.email,
      password: encryptedpassword,
    },
  });

  res.status(200).json({ message:"User created successfully" });


});


export { router as signinHandler };