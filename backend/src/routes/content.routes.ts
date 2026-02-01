import { Router } from "express";
import authMiddleware from "../middleware/auth.middleware";
import {
  addContent,
  getAllContent,
  deleteContentById,
  searchContentByWord,
} from "../controller/content.controller";
import { validate } from "../middleware/validate.middleware";
import { ContentSchema } from "../validation/content.schema";

const contentRouter = Router();

contentRouter.post("/", authMiddleware, validate(ContentSchema), addContent);
contentRouter.get("/", authMiddleware, getAllContent);
contentRouter.delete("/:id", authMiddleware, deleteContentById);
contentRouter.get("/search", authMiddleware, searchContentByWord);
export default contentRouter;
