import { Router } from "express";
import passport from "passport";
import { oauthController } from "../controller/oauth.controller";
import type { Response, Request, NextFunction } from "express";

const oauthRouter = Router();

// Google OAuth
oauthRouter.get(
  "/google",
  (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate("google", {
      scope: ["profile", "email"],
    })(req, res, next);
  },
);
oauthRouter.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: `${process.env.CLIENT_URL}/auth/signin?error=google_auth_failed`,
    session: false,
  }),
  oauthController.googleCallback,
);

// Twitter OAuth
oauthRouter.get(
  "/twitter",
  (req: Request, res: Response, next: NextFunction) => {
    console.log("twitter");
    passport.authenticate("twitter")(req, res, next);
    console.log("twitter done");
  },
);

oauthRouter.get(
  "/twitter/callback",
  passport.authenticate("twitter", {
    failureRedirect: `${process.env.CLIENT_URL}/auth/signin?error=twitter_auth_failed`,
    session: false,
  }),
  oauthController.twitterCallback,
);

export default oauthRouter;
