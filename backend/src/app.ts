import express from "express";
import session from "express-session";
import authRouter from "./routes/auth.routes";
import errorMiddlerware from "./middleware/error.middlerware";
import contentRouter from "./routes/content.routes";
import cors from "cors";
import shareRouter from "./routes/share.routes";
import userRouter from "./routes/user.routes";
import aiRouter from "./routes/ai.routes";
import paymentRouter from "./routes/payment.routes";
import { handleWebhook } from "./controller/payment.controller";
import passport from "passport";
import oauthRouter from "./routes/oauth.routes";
import "./config/passport";
const app = express();

app.post(
  "/api/v1/payment/webhook",
  express.raw({ type: "application/json" }),
  handleWebhook,
);

app.use(
  session({
    secret: process.env.SESSION_SECRET!,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 24 * 60 * 60 * 1000,
    },
  }),
);

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true,
  }),
);

// init passport
app.use(passport.initialize());
app.use(passport.session());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(paymentRouter);
app.use(authRouter);
app.use("/api/v1/auth", oauthRouter);
app.use("/api/v1/", userRouter);
app.use("/api/v1/content", contentRouter);
app.use(shareRouter);
app.use(aiRouter);
app.use(errorMiddlerware);

export default app;
