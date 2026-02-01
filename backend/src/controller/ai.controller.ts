import type { NextFunction, Request, Response } from "express";
import { AIService } from "../../worker/services/ai.services";
import { Embedding } from "../../shared/models/embedding.model";
import { Types } from "mongoose";
import { UserModel } from "../models/user.model";

//#region  semantic search
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
        $lookup: {
          from: "links",
          localField: "content.link",
          foreignField: "_id",
          as: "content.link",
        },
      },
      { $unwind: "$content.link" },
      {
        $lookup: {
          from: "tags",
          localField: "content.tags",
          foreignField: "_id",
          as: "content.tags",
        },
      },
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

    console.log(finalResult);
    res.json({
      query,
      total: finalResult.length,
      finalResult,
    });
  } catch (err) {
    next(err);
  }
}

//#endregion
//#region chatwithAI
export async function chatWithAI(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const userId = req.userId!;
    const { message, conversationHistory } = req.body;

    if (!message || !message.trim()) {
      return res.status(400).json({ error: "Message is required" });
    }

    //  embedding gen
    const queryEmbedding = await AIService.generateEmbedding(message);

    //search with vector
    const relevantContent = await Embedding.aggregate([
      {
        $vectorSearch: {
          index: "embedding_index",
          path: "embedding",
          queryVector: queryEmbedding,
          numCandidates: 100,
          limit: 10,
          filter: { userId: new Types.ObjectId(userId) },
        },
      },
      {
        $group: {
          _id: "$contentId",
          maxScore: { $max: { $meta: "vectorSearchScore" } },
          relevantText: { $first: "$text" },
          metadata: { $first: "$metadata" },
        },
      },
      { $sort: { maxScore: -1 } },
      { $limit: 10 }, // top 10
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
        $lookup: {
          from: "links",
          localField: "content.link",
          foreignField: "_id",
          as: "content.link",
        },
      },
      { $unwind: "$content.link" },
      {
        $project: {
          title: "$content.title",
          url: "$content.link.url",
          description: "$content.link.description",
          relevantText: 1,
          similarity: "$maxScore",
        },
      },
    ]);

    //  filter by  threshold
    // const threshold = parseFloat(process.env.FILTER_THRESHOLD!);
    const filteredContent = relevantContent.filter(
      (item: any) => item.similarity > 0.5,
    );

    // check if have content
    if (filteredContent.length === 0) {
      return res.status(200).json({
        message:
          "I don't have any relevant information about that in your saved content. Could you rephrase your question or ask about something else?",
        sources: [],
        hasContext: false,
      });
    }

    // building cotext
    const context = filteredContent
      .map(
        (item: any, index: number) =>
          `[Source ${index + 1}]
        Title: ${item.title}
        URL: ${item.url}
        Content: ${item.relevantText || item.description || ""}
        ---`,
      )
      .join("\n\n");

    console.log(context);

    //gemini call
    const aiResponse = await AIService.chatWithContext(
      message,
      context,
      conversationHistory,
    );

    // -token on each req
    const TOKEN_COST = -300;
    const updatedUser = await UserModel.findByIdAndUpdate(
      userId,
      { $inc: { "tokens.totalRemaining": TOKEN_COST } },
      { new: true },
    );

    // return
    return res.status(200).json({
      message: aiResponse,
      sources: filteredContent.map((item: any, index: number) => ({
        id: index + 1,
        title: item.title,
        url: item.url,
        similarity: Math.round(item.similarity * 100),
      })),
      hasContext: true,
    });
  } catch (error: any) {
    console.error("AI Chat error:", error);
    next(error);
  }
}

//#endregion
