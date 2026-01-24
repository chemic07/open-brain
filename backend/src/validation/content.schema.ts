import { z } from "zod";
import { ContentType } from "../models/content.model";

export const ContentSchema = z.object({
  title: z.string().min(1),
  type: z.enum(ContentType),
  tags: z.array(z.string()).optional(),
  url: z.string().includes("http"),
});

export type ContentInput = z.infer<typeof ContentSchema>;
