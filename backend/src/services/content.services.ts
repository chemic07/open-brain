import {
  embeddingQueue,
  type EmbeddingJobData,
} from "../../shared/config/queue.config";
import { Link } from "../models/link.model";
import { AppError } from "../utils/app_error";
import type { ContentInput } from "../validation/content.schema";
import { findOrCreateTags } from "./tag.services";
import { Content } from "../models/content.model";

//#region  add content
export async function addContentService(data: ContentInput, userId: string) {
  // find or create link
  let link = await Link.findOne({ url: data.link });

  if (!link) {
    link = await Link.create({ url: data.link, title: data.title });
  }

  // prevent duplicate save
  const exists = await Content.findOne({ link: link._id, userId });
  if (exists) throw new AppError("Content already exists", 409);

  // tags
  let tagIds: any[] = [];
  if (data.tags?.length) {
    tagIds = await findOrCreateTags(data.tags, userId);
  }

  // create content
  const content = await Content.create({
    link: link._id,
    userId,
    type: data.type,
    title: data.title,
    tags: tagIds,
  });

  //send a job to the queue
  // queue embedding job
  const jobData: EmbeddingJobData = {
    contentId: content._id.toString(),
    userId,
    url: data.link,
    title: data.title,
  };

  try {
    console.log("adding a job");
    await embeddingQueue.add("embed", jobData, {
      jobId: `embed-${content._id}`,
      priority: 1,
    });

    console.log("job added ");
  } catch (err) {
    console.error("Failed to queue embedding job:", err);
    // optional: mark content as failed / pending
  }

  return content;
}

//#endregion

//#region fetch all

export async function getAllContentService(userId: string) {
  return await Content.find({ userId }).populate("tags").populate("link");
}

export async function deleteContentService(id: string, userId: string) {
  const deleted = await Content.findOneAndDelete({ _id: id, userId });

  if (!deleted) {
    throw new AppError("Content not found", 404);
  }

  return deleted;
}
//#endregion
