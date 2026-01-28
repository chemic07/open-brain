import { z } from "zod";
import { ContentType } from "../models/content.model";

export const ContentSchema = z.object({
  title: z
    .string()
    .min(1, { message: "Title is required and cannot be empty" }),
  type: z.enum(ContentType, "Conten should be tweet | video | image | article"),
  tags: z.array(z.string()).optional(),
  link: z
    .string()
    .includes("http", {
      message: "Link must be a valid URL starting with http",
    })
    .min(1, { message: "Link is required" }),
});

export type ContentInput = z.infer<typeof ContentSchema>;
