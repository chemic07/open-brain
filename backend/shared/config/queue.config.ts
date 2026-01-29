import { Queue } from "bullmq";

export const embeddingQueue = new Queue("embedding-jobs", {
  connection: {
    host: process.env.REDIS_HOST!,
    port: Number(process.env.REDIS_PORT!),
    password: process.env.REDIS_PASSWORD!,
  },
});

console.log("setup finish here ");

export interface EmbeddingJobData {
  contentId: string;
  userId: string;
  url: string;
  title: string;
}
