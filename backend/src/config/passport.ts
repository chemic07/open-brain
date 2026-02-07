import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Strategy as TwitterStrategy } from "passport-twitter";
import { AuthProviderType, UserModel } from "../models/user.model";
import { PlanType } from "../types/user";

// google
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      callbackURL: process.env.GOOGLE_CALLBACK_URL!,
    },
    async (_accessToken, _refreshToken, profile, done) => {
      try {
        let user = await UserModel.findOne({ googleId: profile.id });
        if (!user && profile.emails?.[0]?.value) {
          user = await UserModel.findOne({
            email: profile.emails[0].value,
          });

          if (user) {
            user.googleId = profile.id;
            user.authProvider = AuthProviderType.GOOGLE;
            user.profilePicture = profile.photos?.[0]?.value;
            await user.save();
          }
        }

        if (!user) {
          user = await UserModel.create({
            googleId: profile.id,
            email: profile.emails?.[0]?.value,
            userName:
              profile.displayName || profile.emails?.[0]?.value.split("@")[0],
            authProvider: AuthProviderType.GOOGLE,
            profilePicture: profile.photos?.[0]?.value,
            plan: PlanType.FREE,
          });
        }

        done(null, user);
      } catch (err) {
        done(err as Error);
      }
    },
  ),
);

// twitter
passport.use(
  new TwitterStrategy(
    {
      consumerKey: process.env.TWITTER_CONSUMER_KEY!,
      consumerSecret: process.env.TWITTER_CONSUMER_SECRET!,
      callbackURL: process.env.TWITTER_CALLBACK_URL!,
      includeEmail: true,
    },
    async (_token, _tokenSecret, profile, done) => {
      try {
        let user = await UserModel.findOne({ twitterId: profile.id });

        const email = profile.emails?.[0]?.value;

        if (!user && email) {
          user = await UserModel.findOne({ email });

          if (user) {
            user.twitterId = profile.id;
            user.authProvider = AuthProviderType.TWITTER;
            user.profilePicture = profile.photos?.[0]?.value;
            await user.save();
          }
        }

        if (!user) {
          user = await UserModel.create({
            twitterId: profile.id,
            email,
            userName: profile.displayName || profile.username,
            authProvider: AuthProviderType.TWITTER,
            profilePicture: profile.photos?.[0]?.value,
            plan: PlanType.FREE,
          });
        }

        done(null, user);
      } catch (err) {
        done(err as Error);
      }
    },
  ),
);

export default passport;
