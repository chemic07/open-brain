import type { NextFunction, Request, Response } from "express";
import { AIService } from "../../worker/services/ai.services";
import { Embedding } from "../../shared/models/embedding.model";
import { Types } from "mongoose";

export async function searchContent(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const userId = req.userId!;
    const { query, limit = 10 } = req.body;

    if (!query) return res.status(400).json({ error: "Query is required" });

    const queryEmbedding = await AIService.generateEmbedding(query);

    const results = await Embedding.aggregate([
      {
        $vectorSearch: {
          index: "embedding_index",
          path: "embedding",
          queryVector: queryEmbedding,
          numCandidates: 200,
          limit,
          filter: {
            userId: new Types.ObjectId(userId),
          },
        },
      },
      {
        $lookup: {
          from: "contents",
          localField: "contentId",
          foreignField: "_id",
          as: "content",
        },
      },
      { $unwind: "$content" },
      {
        $project: {
          similarity: { $meta: "vectorSearchScore" },
          text: 1,
          content: 1,
        },
      },
    ]);

    res.json({
      query,
      total: results.length,
      results,
    });
  } catch (err) {
    next(err);
  }
}
