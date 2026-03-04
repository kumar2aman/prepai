export const getCookieOptions = () => {
  const isProduction = process.env.NODE_ENV === "production";
  return {
    httpOnly: true,
    secure: isProduction,
    sameSite: "lax" as const,                      //"lax" for both
    maxAge: 2 * 24 * 60 * 60 * 1000,
    path: "/",
    ...(isProduction && { domain: ".7labs.in" }),   //shared domain only in prod
  };
};

