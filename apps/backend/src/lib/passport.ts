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
         if(user && user.provider !== "google"){
             return done(new Error("User already exists"), undefined);
         }


        if(!user){
            user = await prisma.user.create({
                data: {
                    email,
                    username: profile.displayName,
                    provider: "google"
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