import type { NextFunction, Request, Response } from "express";
import {
  generateShareLinkService,
  getSharedContentService,
  toggleShareLinkService,
} from "../services/share.services";

export async function generateShareLink(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const userId = req.userId!;
    const hash = await generateShareLinkService(userId);

    return res.status(200).json({
      shareUrl: `/share/${hash}`,
      hash,
    });
  } catch (error: any) {
    next(error);
  }
}

export async function getSharedContent(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const { hash } = req.params;
    const contents = await getSharedContentService(hash as string);

    return res.status(200).json(contents);
  } catch (error: any) {
    next(error);
  }
}

export async function toggleShareLink(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const userId = req.userId!;
    const { isActive } = req.body;

    const shareLink = await toggleShareLinkService(userId, isActive);

    return res.status(200).json(shareLink);
  } catch (error: any) {
    next(error);
  }
}
