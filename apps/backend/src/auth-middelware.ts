import type { NextFunction, Request, Response } from "express";
import jwt, { type JwtPayload } from "jsonwebtoken";

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;

  console.log("authHeader", authHeader);

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const token = authHeader.split(" ")[1];

  console.log("token", token);  

  try {
    const decodedToken = jwt.verify(token as string, process.env.JWT_SECRET!);
    console.log("decodedToken", decodedToken);
    req.userId = (decodedToken as unknown as JwtPayload).userid as unknown as string;
    console.log("req.userId", req.userId);
    next();
  } catch (error) {
    return res.status(401).json({ error: "Invalid token" });
  }
}
