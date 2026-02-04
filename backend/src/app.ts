import express from "express";
import authRouter from "./routes/auth.routes";
import errorMiddlerware from "./middleware/error.middlerware";
import contentRouter from "./routes/content.routes";
import cors from "cors";
import shareRouter from "./routes/share.routes";
import userRouter from "./routes/user.routes";
import aiRouter from "./routes/ai.routes";
import paymentRouter from "./routes/payment.routes";
import { handleWebhook } from "./controller/payment.controller";

const app = express();
app.use(
  cors({
    origin: "*", // For development, this allows your phone to connect
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  }),
);
app.post(
  "/api/v1/payment/webhook",
  express.raw({ type: "application/json" }),
  handleWebhook,
);
app.use(express.json());

app.use(paymentRouter);
app.use(authRouter);
app.use("/api/v1/", userRouter);
app.use("/api/v1/content", contentRouter);
app.use(shareRouter);
app.use(aiRouter);
app.use(errorMiddlerware);

export default app;
