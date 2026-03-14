import { CookieOptions } from "express";

export const getCookieOptions = (): CookieOptions => {
  const isProduction = process.env.NODE_ENV === "production";

  return {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? "none" : "lax",
    maxAge: 2 * 24 * 60 * 60 * 1000,
    path: "/",
    ...(isProduction && { domain: ".7labs.in" }),
  };
};