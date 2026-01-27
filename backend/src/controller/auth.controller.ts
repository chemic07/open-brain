import type { Request, Response } from "express";
import type { SigninInput, SignupInput } from "../validation/auth.schema";
import { loginServices, signupService } from "../services/auth.services";
import { UserModel } from "../models/user.model";

export async function signUp(req: Request, res: Response) {
  try {
    const user: SignupInput = req.body;

    const userData = await signupService(user);

    if (!userData) {
      return res.status(400).json({ message: "Signup failed" });
    }

    return res.status(201).json({ message: "User created" });
  } catch (error: any) {
    if ((error as Error).message === "EMAIL_EXITS") {
      return res.status(400).json({ message: "Email already exists" });
    }

    return res.status(500).json({ error: error.message });
  }
}

export async function signIn(req: Request, res: Response) {
  try {
    const user: SigninInput = req.body;

    const userData = await loginServices(user);

    if (!userData) {
      return res.status(400).json({ message: "Login failed" });
    }

    return res.status(200).json(userData);
  } catch (error) {
    if ((error as Error).message === "INVALID_CREDENTIALS") {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    return res.status(500).json({ error: "Internal server error" });
  }
}

export async function fetchUser(req: Request, res: Response) {
  try {
    const user = await UserModel.findById(req.userId);
    res.status(200).json(user);
  } catch (error: any) {
    console.log(error.message);
    return res.status(500).json({ error: "Internal server error" });
  }
}
