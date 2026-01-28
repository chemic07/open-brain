import { Router } from "express";

const userRouter = Router();

//update user profile
userRouter.patch("/user/profile");
userRouter.post("/user/change-password");
userRouter.delete("/user/change-password");
export default userRouter;
