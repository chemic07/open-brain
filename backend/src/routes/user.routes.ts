import { Router } from "express";
import { validate } from "../middleware/validate.middleware";
import {
  changePasswordSchema,
  updateUserProfileSchema,
} from "../validation/user.schema";
import authMiddleware from "../middleware/auth.middleware";
import {
  changePassword,
  deleteAccount,
  getUserStats,
  updateUserProfile,
} from "../controller/user.controller";

const userRouter = Router();

//update user profile
userRouter.patch(
  "/user/profile",
  authMiddleware,
  validate(updateUserProfileSchema),
  updateUserProfile,
);

//change pass
userRouter.post(
  "/user/change-password",
  authMiddleware,
  validate(changePasswordSchema),
  changePassword,
);

//delete account
userRouter.delete("/user/account", authMiddleware, deleteAccount);

//get stats
userRouter.get("/user/stats", authMiddleware, getUserStats);
export default userRouter;
