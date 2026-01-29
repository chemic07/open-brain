import express from "express";
import authRouter from "./routes/auth.routes";
import errorMiddlerware from "./middleware/error.middlerware";
import contentRouter from "./routes/content.routes";
import cors from "cors";
import shareRouter from "./routes/share.routes";
import userRouter from "./routes/user.routes";
import aiRouter from "./routes/ai.routes";

const app = express();
app.use(cors());
app.use(express.json());

app.use(authRouter);
app.use("/api/v1/", userRouter);
app.use("/api/v1/content", contentRouter);
app.use(shareRouter);
app.use(aiRouter);

app.use(errorMiddlerware);

export default app;
