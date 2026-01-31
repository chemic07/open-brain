import type { Request, Response, NextFunction } from "express";
import { UserModel } from "../models/user.model";

export const checkTokenLimit = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userId = req.userId;

    const user = await UserModel.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.tokens.totalRemaining < 300) {
      return res.status(403).json({
        message: "Insufficient tokens. Please upgrade your plan.",
        remaining: user.tokens.totalRemaining,
      });
    }
    next();
  } catch (error) {
    next(error);
  }
};
