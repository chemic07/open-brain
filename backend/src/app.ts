import express from "express";
import authRouter from "./routes/auth";
import errorMiddlerware from "./middleware/error.middlerware";
import contentRouter from "./routes/content";

const app = express();

app.use(express.json());

app.use(authRouter);
app.use("/api/v1/content", contentRouter);

app.use(errorMiddlerware);

export default app;
