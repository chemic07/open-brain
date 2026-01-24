import type { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/app_error";

export default function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  console.error(err.stack);

  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      success: false,
      error: err.message,
    });
  }

  return res.status(500).json({
    success: false,
    error: "Internal Server Error",
  });
}
