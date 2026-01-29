import { Router } from "express";
import authMiddleware from "../middleware/auth.middleware";

const aiRouter = Router();

// Semantic search
aiRouter.post("/api/v1/ai/search", authMiddleware);

//ai chat with context
aiRouter.post("/api/v1/ai/chat", authMiddleware);

export default aiRouter;
