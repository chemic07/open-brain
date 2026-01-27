import type { Request, Response } from "express";
import {
  generateShareLinkService,
  getSharedContentService,
  toggleShareLinkService,
} from "../services/share.services";

export async function generateShareLink(req: Request, res: Response) {
  try {
    const userId = req.userId!;
    const hash = await generateShareLinkService(userId);

    return res.status(200).json({
      shareUrl: `/share/${hash}`,
      hash,
    });
  } catch (error: any) {
    console.error(error);
    return res.status(500).json({ error: "Failed to generate share link" });
  }
}

export async function getSharedContent(req: Request, res: Response) {
  try {
    const { hash } = req.params;
    const contents = await getSharedContentService(hash as string);

    return res.status(200).json(contents);
  } catch (error: any) {
    if (error.message === "INVALID_SHARE_LINK") {
      return res
        .status(404)
        .json({ error: "Share link not found or inactive" });
    }
    console.error(error);
    return res.status(500).json({ error: "Failed to fetch shared content" });
  }
}

export async function toggleShareLink(req: Request, res: Response) {
  try {
    const userId = req.userId!;
    const { isActive } = req.body;

    const shareLink = await toggleShareLinkService(userId, isActive);

    return res.status(200).json(shareLink);
  } catch (error: any) {
    console.error(error);
    return res.status(500).json({ error: "Failed to toggle share link" });
  }
}
