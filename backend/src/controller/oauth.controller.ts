import type { Request, Response } from "express";
import jwt from "jsonwebtoken";
import type { UserDocument } from "../models/user.model";

const generateTokenAndRedirect = (req: Request, res: Response) => {
  const { userdata } = req.user as any;
  console.log("userdata", userdata);
  const user = req.user as UserDocument;

  console.log("user", user);
  if (!user) {
    return res.redirect(
      `${process.env.CLIENT_URL}/auth/signin?error=oauth_user_missing`,
    );
  }

  console.log(user);
  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET!, {
    expiresIn: "7d",
  });

  //fe route
  res.redirect(`${process.env.CLIENT_URL}/auth/google/callback?token=${token}`);
};

export const oauthController = {
  googleCallback: generateTokenAndRedirect,
  twitterCallback: generateTokenAndRedirect,
};
