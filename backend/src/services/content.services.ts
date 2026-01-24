import { Content } from "../models/content.model";
import { Link } from "../models/link.model";
import { AppError } from "../utils/app_error";
import type { ContentInput } from "../validation/content.schema";
import { findOrCreateTags } from "./tag.services";

export async function addContentService(data: ContentInput, userId: string) {
  // find or create link
  let link = await Link.findOne({ url: data.url });

  if (!link) {
    link = await Link.create({ url: data.url, title: data.title });
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
  return await Content.create({
    link: link._id,
    userId,
    type: data.type,
    title: data.title,
    tags: tagIds,
  });
}

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
