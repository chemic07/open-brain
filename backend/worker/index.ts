import { Worker, Queue } from "bullmq";
import { processEmbedding } from "./processors/embedding.processor";
import connectdb from "../src/config/db";

await connectdb();

const connection = {
  host: Bun.env.REDIS_HOST!,
  port: parseInt(Bun.env.REDIS_PORT!),
  password: Bun.env.REDIS_PASSWORD,
};

console.log("started the worker");

const worker = new Worker(
  "embedding-jobs",
  async (job) => processEmbedding(job),
  { connection },
);

worker.on("ready", () => console.log("ready"));
worker.on("error", (err) => console.error("Worker error", err));
