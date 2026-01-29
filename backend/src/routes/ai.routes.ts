import { Router } from "express";
import authMiddleware from "../middleware/auth.middleware";
import { searchContent } from "../controller/ai.controller";

const aiRouter = Router();

// Semantic search
aiRouter.post("/api/v1/ai/search", authMiddleware, searchContent);

//ai chat with context
aiRouter.post("/api/v1/ai/chat", authMiddleware);

export default aiRouter;
