import { ShareLink } from "../models/share_link.model";
import { Content } from "../models/content.model";
import { hashString } from "../utils/random_hash";
import { AppError } from "../utils/app_error";

export async function generateShareLinkService(userId: string) {
  // if already done get that and send it again
  let shareLink = await ShareLink.findOne({ userId });

  if (shareLink) {
    return shareLink.hash;
  }

  // random hash
  const hash = hashString();

  shareLink = await ShareLink.create({
    hash,
    userId,
    isActive: true,
  });

  return shareLink.hash;
}

export async function getSharedContentService(hash: string) {
  const shareLink = await ShareLink.findOne({ hash, isActive: true });

  if (!shareLink) {
    throw new AppError("INVALID_SHARE_LINK", 404);
  }

  const contents = await Content.find({ userId: shareLink.userId })
    .populate("link")
    .populate("tags")
    .sort({ createdAt: -1 });

  return contents;
}

export async function toggleShareLinkService(
  userId: string,
  isActive: boolean,
) {
  const shareLink = await ShareLink.findOneAndUpdate(
    { userId },
    { isActive },
    { new: true },
  );

  if (!shareLink) {
    throw new AppError("SHARE_LINK_NOT_FOUND", 404);
  }

  return shareLink;
}
