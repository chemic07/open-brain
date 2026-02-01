import {
  embeddingQueue,
  type EmbeddingJobData,
} from "../../shared/config/queue.config";
import { Link } from "../models/link.model";
import { AppError } from "../utils/app_error";
import type { ContentInput } from "../validation/content.schema";
import { findOrCreateTags } from "./tag.services";
import { Content } from "../models/content.model";
import { UserModel } from "../models/user.model";
import { PlanType } from "../types/user";
import { Embedding } from "../../shared/models/embedding.model";

//#region  add content
export async function addContentService(data: ContentInput, userId: string) {
  const user = await UserModel.findById(userId);
  if (!user) throw new AppError("User not found", 404);

  console.log("user plan " + user.plan);
  console.log("user limit " + process.env.ADD_LINK_LIMIT!);
  if (user.plan === PlanType.FREE) {
    const currentCount = await Content.countDocuments({ userId });
    //limit 50 to free user
    const limit = parseInt(process.env.ADD_LINK_LIMIT ?? "5");

    if (currentCount >= limit) {
      throw new AppError(
        `Limit reached: Free plan is restricted to ${limit} links. Please upgrade to Plus.`,
        403,
      );
    }
  }

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

//#region searchContentByword

export async function searchContentByWordService(
  userId: string,
  query: string,
) {
  try {
    // build search query
    const searchRegex = new RegExp(query, "i");

    const results = await Content.find({
      userId,
      $or: [
        { title: { $regex: searchRegex } },
        { "link.url": { $regex: searchRegex } },
        { "link.title": { $regex: searchRegex } },
        // { "link.description": { $regex: searchRegex } },
        // { "tags.name": { $regex: searchRegex } },
      ],
    })
      .populate("link")
      .populate("tags")
      .sort({ createdAt: -1 })
      .limit(50);

    return results;
  } catch (error) {
    console.error("Word search error:", error);
    throw new Error("Failed to search content");
  }
}
//#endregion

//#region fetch all

export async function getAllContentService(userId: string) {
  return await Content.find({ userId }).populate("tags").populate("link");
}

export async function deleteContentService(id: string, userId: string) {
  // del content
  const deletedContent = await Content.findOneAndDelete({ _id: id, userId });

  if (!deletedContent) {
    throw new AppError("Content not found", 404);
  }

  //del all embeding with ref to deleted content id
  await Embedding.deleteMany({ contentId: id, userId });

  // check if other users are ref the link
  const isLinkShared = await Content.exists({ link: deletedContent.link });

  if (!isLinkShared) {
    // if noone is using delete the global
    await Link.findByIdAndDelete(deletedContent.link);
  }

  return deletedContent;
}
//#endregion
