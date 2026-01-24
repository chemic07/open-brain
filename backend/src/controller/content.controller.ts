import type { Request, Response } from "express";
import {
  addContentService,
  deleteContentService,
  getAllContentService,
} from "../services/content.services";
import type { ContentInput } from "../validation/content.schema";

export async function addContent(req: Request, res: Response) {
  try {
    const userId = req.userId!;
    const data: ContentInput = req.body;

    const content = await addContentService(data, userId);

    return res.status(201).json(content);
  } catch (err: any) {
    console.error(err);
    return res.status(400).json({ error: err.message });
  }
}

export async function getAllContent(req: Request, res: Response) {
  try {
    const userId = req.userId!;

    const contents = await getAllContentService(userId);

    return res.status(200).json(contents);
  } catch (error: any) {
    console.error(error);
    return res.status(500).json({ error: "Failed to fetch content" });
  }
}

export async function deleteContentById(req: Request, res: Response) {
  try {
    const userId = req.userId;
    const { id: contentId } = req.params;

    const deleted = await deleteContentService(contentId as string, userId!);

    res.status(200).json({ message: "Content deleted" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to fetch content" });
  }
}
