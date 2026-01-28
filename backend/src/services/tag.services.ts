import { Tag } from "../models/tag.model";

//#region  find or create
export async function findOrCreateTags(tagNames: string[], userId: string) {
  const tagIds = [];

  for (const name of tagNames) {
    let tag = await Tag.findOne({ name: name.toLowerCase(), userId });

    if (!tag) {
      tag = await Tag.create({ name, userId });
    }

    tagIds.push(tag._id);
  }

  return tagIds;
}
//#endregion
