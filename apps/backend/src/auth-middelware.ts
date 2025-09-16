import type { NextFunction, Request, Response } from "express";
import jwt, { type JwtPayload } from "jsonwebtoken";

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;

  if (!authHeader || authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decodedToken = jwt.verify(token as string, process.env.JWT_SECRET!);
    req.userId = (decodedToken as unknown as JwtPayload).userId as unknown as string;
    next();
  } catch (error) {
    return res.status(401).json({ error: "Invalid token" });
  }
}
