import type { Request, Response } from "express";
import { UserModel } from "../models/user.model";
import { Content } from "../models/content.model";
import { Tag } from "../models/tag.model";
import mongoose from "mongoose";
import {
  changePasswordServices,
  getUserStatsService,
  updateUserProfileServices,
} from "../services/user.services";
import { deleteContentService } from "../services/content.services";

export async function getUserStats(req: Request, res: Response) {
  try {
    const userId = req.userId;

    if (!userId) {
      return res.status(401).json({ error: "UNAUTHORIZED" });
    }

    const stats = await getUserStatsService(userId);

    return res.status(200).json(stats);
  } catch (error) {
    console.error("getUserStats error:", error);
    return res.status(500).json({ error: "FAILED_TO_FETCH_STATS" });
  }
}

export async function updateUserProfile(req: Request, res: Response) {
  try {
    const userId = req.userId!;
    const { userName, email } = req.body;

    const user = await updateUserProfileServices(req.userId!, {
      email,
      userName,
    });
    return res.status(200).json(user);
  } catch (error: any) {
    if ((error as Error).message === "USER_NOT_FOUND") {
      return res.status(400).json({ message: "User not found" });
    }
    return res.status(500).json({ error: "Failed to update profile" });
  }
}

export async function changePassword(req: Request, res: Response) {
  try {
    const { newPassword, oldPassword } = req.body;
    const userData = await changePasswordServices(
      req.userId!,
      oldPassword,
      newPassword,
    );
    return res.status(200).json({ message: "Password changed successfully" });
  } catch (error: any) {
    if ((error as Error).message === "OLD_PASS_WRONG") {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    return res.status(500).json({ error: "Failed to change password" });
  }
}

export async function deleteAccount(req: Request, res: Response) {
  try {
    const deleted = await deleteContentService(req.userId!, req.body.password);
    if (!deleted) {
      return res.status(400).json({ message: "Failed to delete account" });
    }
    return res.status(200).json({ message: "Account deleted successfully" });
  } catch (error: any) {
    if ((error as Error).message === "USER_NOT_FOUND") {
      return res.status(400).json({ message: "User not found" });
    } else if ((error as Error).message === "INVALID_CREDENTIALS") {
      return res.status(400).json({ message: "Password is incorrect" });
    }
    return res.status(500).json({ error: "Failed to change password" });
  }
}
