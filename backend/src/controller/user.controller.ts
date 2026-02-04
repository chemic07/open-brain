import type { NextFunction, Request, Response } from "express";
import {
  changePasswordServices,
  getUserProfileService,
  getUserStatsService,
  updateUserProfileServices,
} from "../services/user.services";
import { deleteContentService } from "../services/content.services";

export async function getUserProfile(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const userId = req.userId;

    if (!userId) {
      return res.status(401).json({ error: "UNAUTHORIZED" });
    }

    const user = await getUserProfileService(userId);
    console.log(user);
    return res.status(200).json(user);
  } catch (error) {
    next(error);
  }
}

export async function getUserStats(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const userId = req.userId;

    if (!userId) {
      return res.status(401).json({ error: "UNAUTHORIZED" });
    }

    const stats = await getUserStatsService(userId);

    return res.status(200).json(stats);
  } catch (error) {
    next(error);
  }
}

export async function updateUserProfile(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const userId = req.userId!;
    const { userName, email } = req.body;

    const user = await updateUserProfileServices(req.userId!, {
      email,
      userName,
    });
    return res.status(200).json(user);
  } catch (error: any) {
    next(error);
  }
}

export async function changePassword(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const { newPassword, oldPassword } = req.body;
    const userData = await changePasswordServices(
      req.userId!,
      oldPassword,
      newPassword,
    );
    return res.status(200).json({ message: "Password changed successfully" });
  } catch (error: any) {
    next(error);
  }
}

export async function deleteAccount(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const deleted = await deleteContentService(req.userId!, req.body.password);
    if (!deleted) {
      return res.status(400).json({ message: "Failed to delete account" });
    }
    return res.status(200).json({ message: "Account deleted successfully" });
  } catch (error: any) {
    next(error);
  }
}
