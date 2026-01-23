import { Router } from "express";
import { validate } from "../middleware/validate.middleware";
import { signupSchema, signinSchema } from "../validation/auth.schema";
import signUp, { signIn } from "../controller/auth.controller";

const authRouter = Router();

authRouter.post("/api/v1/signup", validate(signupSchema), signUp);
authRouter.post("/api/v1/signin", validate(signinSchema), signIn);

export default authRouter;
