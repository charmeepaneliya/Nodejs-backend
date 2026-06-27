import passport from "passport";
import { Strategy as GoogleStrategy} from "passport-google-oauth20";
import dotenv from "dotenv";
import User from "../model/User.js";

dotenv.config({ path: "./.env" });

// const GoogleStrategy = googlePassport.Strategy;

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.CLIENT_CALLBACK_URL,
    },

    async function (accessToken, refreshToken, profile, done) {
      try {
        const alredyUser = await User.findOne({ googleId: profile.id });

        console.log("profile",profile);

        if (!alredyUser) {
          const newUser = await User.create({
            googleId: profile.id,
            name: profile.displayName,
            email: profile.emails[0]?.value,
          });
          done(null, newUser);
        }
        done(null, alredyUser);
      } catch (error) {
        throw new Error(error.message);
      }
    },
  ),
);
export default passport;