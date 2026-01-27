import { Router } from "express";
import { validate } from "../middleware/validate.middleware";
import { signupSchema, signinSchema } from "../validation/auth.schema";
import { signUp, fetchUser, signIn } from "../controller/auth.controller";
import authMiddleware from "../middleware/auth.middleware";

const authRouter = Router();

authRouter.post("/api/v1/auth/signup", validate(signupSchema), signUp);
authRouter.post("/api/v1/auth/signin", validate(signinSchema), signIn);
authRouter.get("/api/v1/auth/me", authMiddleware, fetchUser);

export default authRouter;
