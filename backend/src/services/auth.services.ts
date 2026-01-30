import { UserModel } from "../models/user.model";
import { PlanType } from "../types/user";
import { AppError } from "../utils/app_error";
import type { SigninInput, SignupInput } from "../validation/auth.schema";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

//#region  signup
export async function signupService(data: SignupInput) {
  const { userName, email, password } = data;

  const existingUser = await UserModel.findOne({ email });

  if (existingUser) {
    throw new AppError("EMAIL_EXITS", 400);
  }

  const hashPassword = await bcrypt.hash(password, 10);

  const user = await UserModel.create({
    userName,
    email,
    password: hashPassword,
    plan: PlanType.FREE,
    tokens: {
      totalRemaining: parseInt(Bun.env.INITIAL_TOKENS!),
      lastRefillDate: new Date(),
    },
    isSubscribed: false,
  });

  return user;
}
//#endregion
//#region login
export async function loginServices(data: SigninInput) {
  const { email, password } = data;
  const existingUser = await UserModel.findOne({ email }).select("+password");

  if (!existingUser) {
    throw new AppError("INVALID_CREDENTIALS", 400);
  }

  const isMatch = await bcrypt.compare(password, existingUser.password);

  if (!isMatch) {
    throw new AppError("INVALID_CREDENTIALS", 400);
  }

  if (!process.env.JWT_SECRET || !process.env.JWT_EXPIRES_IN) {
    throw new AppError("JWT ENV VAR MISSING", 500);
  }

  const token = jwt.sign(
    { userId: existingUser._id.toString() },
    process.env.JWT_SECRET as string,
    { expiresIn: "7d" },
  );

  return {
    token,
    user: {
      id: existingUser._id,
      userName: existingUser.userName,
      email: existingUser.email,
      plan: existingUser.plan,
      tokensRemaining: existingUser.tokens.totalRemaining,
      isSubscribed: existingUser.isSubscribed,
    },
  };
}
//#endregion
