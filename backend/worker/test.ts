import { Worker, Queue } from "bullmq";

const connection = {
  host: Bun.env.REDIS_HOST!,
  port: parseInt(Bun.env.REDIS_PORT!),
  password: Bun.env.REDIS_PASSWORD,
};

console.log("started the worker");

const worker = new Worker(
  "embedding-jobs",
  async (job) => {
    console.log("Processing job", job.data);
  },
  { connection },
);

worker.on("ready", () => console.log("ready"));
worker.on("error", (err) => console.error("Worker error", err));
