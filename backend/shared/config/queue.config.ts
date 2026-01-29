import { Queue } from "bullmq";

console.log(process.env.REDIS_HOST);
console.log(process.env.REDIS_PORT);
console.log(process.env.REDIS_PASSWORD);

export const embeddingQueue = new Queue("embedding-jobs", {
  connection: {
    host: process.env.REDIS_HOST!,
    port: Number(process.env.REDIS_PORT!),
    password: process.env.REDIS_PASSWORD!,
    tls: {},
  },
});

export interface EmbeddingJobData {
  contentId: string;
  userId: string;
  url: string;
  title: string;
}
