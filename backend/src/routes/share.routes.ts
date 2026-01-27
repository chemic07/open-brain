import { Router } from "express";
import authMiddleware from "../middleware/auth.middleware";
import {
  generateShareLink,
  getSharedContent,
  toggleShareLink,
} from "../controller/share.controller";

const shareRouter = Router();

//proctected
shareRouter.post("/api/v1/share/generate", authMiddleware, generateShareLink);
shareRouter.patch("/api/v1/share/toggle", authMiddleware, toggleShareLink);

//public
shareRouter.get("/api/v1/share/:hash", getSharedContent);

export default shareRouter;
