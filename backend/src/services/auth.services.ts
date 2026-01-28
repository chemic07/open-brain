import { UserModel } from "../models/user.model";
import type { SigninInput, SignupInput } from "../validation/auth.schema";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

//#region  signup
export async function signupService(data: SignupInput) {
  const { userName, email, password } = data;

  const existingUser = await UserModel.findOne({ email });

  if (existingUser) {
    throw new Error("EMAIL_EXITS");
  }

  const hashPassword = await bcrypt.hash(password, 10);

  const user = UserModel.create({
    userName,
    email,
    password: hashPassword,
  });

  return user;
}
//#endregion
//#region login
export async function loginServices(data: SigninInput) {
  const { email, password } = data;
  const existingUser = await UserModel.findOne({ email }).select("+password");

  if (!existingUser) {
    throw new Error("INVALID_CREDENTIALS");
  }

  const isMatch = bcrypt.compare(password, existingUser.password);

  if (!isMatch) {
    throw new Error("INVALID_CREDENTIALS");
  }

  if (!process.env.JWT_SECRET || !process.env.JWT_EXPIRES_IN) {
    throw new Error("JWT ENV VAR MISSING");
  }

  const token = jwt.sign(
    { userId: existingUser._id.toString() },
    process.env.JWT_SECRET as string,
    { expiresIn: "7d" },
  );

  return {
    token,
    userName: existingUser.userName,
    email,
  };
}
//#endregion
