import { Router } from "express";
import { validate } from "../middleware/validate.middleware";
import { signupSchema } from "../validation/auth.schema";
import signUp, { signIn } from "../controller/auth.controller";

const authRouter = Router();

authRouter.post("/api/signup", validate(signupSchema), signUp);
authRouter.post("/api/signin", validate(signupSchema), signIn);

export default authRouter;
