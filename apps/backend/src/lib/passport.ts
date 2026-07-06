import { prisma } from "@prepai/db";
import "dotenv/config";
import passport from "passport";
import { Strategy as GoogleStrategy, Profile } from "passport-google-oauth20";

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      callbackURL: `${process.env.BACKEND_URL}/api/v1/auth/google/callback`,
    },
    async (
      accessToken: string,
      refreshToken: string,
      profile: Profile,
      done
    ) => {
      
      try {
        const email = profile.emails?.[0]?.value;
        if(!email){
          return done(new Error("Email not found"), undefined);
        }
        let user = await prisma.user.findUnique({
            where:{
                email
            }
        })

        console.log("user:", user)
        if(user && user.provider !== "google"){
             return done(new Error("User already exists"), undefined);
        }

        console.log("user 2:", user)
        if(!user){
            // Ensure username is unique to avoid P2002 constraint errors
            let username = (profile.displayName || email.split("@")[0] || "user") as string;
            const existingUsername = await prisma.user.findUnique({
                where: { username }
            });
            if (existingUsername) {
                username = `${username}_${Math.random().toString(36).substring(2, 7)}`;
            }

            user = await prisma.user.create({
                data: {
                    email,
                    username,
                    provider: "google",
                    userdata:{
                        create:{}
                    }
                }
            })
        }
        return done(null, user);
      } catch (error) {
        return done(error as Error, undefined);
      }
    }
  )
);

export default passport;