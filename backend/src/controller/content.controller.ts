import type { NextFunction, Request, Response } from "express";
import {
  addContentService,
  deleteContentService,
  getAllContentService,
} from "../services/content.services";
import type { ContentInput } from "../validation/content.schema";

export async function addContent(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const userId = req.userId!;
    const data: ContentInput = req.body;

    const content = await addContentService(data, userId);

    return res.status(201).json(content);
  } catch (err: any) {
    next(err);
  }
}

export async function getAllContent(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const userId = req.userId!;

    const contents = await getAllContentService(userId);

    return res.status(200).json(contents);
  } catch (error: any) {
    next(error);
  }
}

export async function deleteContentById(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const userId = req.userId;
    const { id: contentId } = req.params;

    const deleted = await deleteContentService(contentId as string, userId!);

    res.status(200).json({ message: "Content deleted" });
  } catch (error) {
    next(error);
  }
}
