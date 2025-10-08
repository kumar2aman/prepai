import type { NextFunction, Request, Response } from "express";
import jwt, { type JwtPayload } from "jsonwebtoken";


export function authMiddleware(req: Request, res: Response, next: NextFunction) {

  const token = req.cookies.token;

  console.log("req.cookies.token", req.cookies.token);

  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const decodedToken = jwt.verify(token as string, process.env.JWT_SECRET!);
    console.log("decodedToken", decodedToken);
    req.userId = (decodedToken as unknown as JwtPayload)
      .userid as unknown as string;
    console.log("req.userId", req.userId);
    next();
  } catch (error) {
    return res.status(401).json({ error: "Invalid token" });
  }
}
