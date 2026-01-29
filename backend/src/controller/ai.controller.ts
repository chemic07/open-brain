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
    const { query, limit = 5 } = req.body;

    if (!query) return res.status(400).json({ error: "Query is required" });

    const queryEmbedding = await AIService.generateEmbedding(query);

    const results = await Embedding.aggregate([
      {
        $vectorSearch: {
          index: "embedding_index",
          path: "embedding",
          queryVector: queryEmbedding,
          numCandidates: 200,
          limit: 20,
          filter: { userId: new Types.ObjectId(userId) },
        },
      },
      {
        $group: {
          _id: "$contentId", // group be parent content
          maxScore: { $max: { $meta: "vectorSearchScore" } },
          relevantChunk: { $first: "$text" },
        },
      },
      { $sort: { maxScore: -1 } }, // resort
      { $limit: limit }, // limit max 5 unique items
      {
        $lookup: {
          from: "contents",
          localField: "_id",
          foreignField: "_id",
          as: "content",
        },
      },
      { $unwind: "$content" },
      {
        $project: {
          _id: 0,
          contentId: "$_id",
          similarity: "$maxScore",
          // relevantChunk: 1,
          content: 1,
        },
      },
    ]);

    console.log(process.env.FILTER_THRESHOLD);
    const finalResult = results.filter(
      (result) => result.similarity > parseFloat(process.env.FILTER_THRESHOLD!),
    );

    res.json({
      query,
      total: finalResult.length,
      finalResult,
    });
  } catch (err) {
    next(err);
  }
}
