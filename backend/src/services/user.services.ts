import { UserModel } from "../models/user.model";
import bcrypt from "bcrypt";
import { AppError } from "../utils/app_error";
import { Content } from "../models/content.model";
import { Tag } from "../models/tag.model";
import { ShareLink } from "../models/share_link.model";
import mongoose from "mongoose";
import type { updateUserProfileInput } from "../validation/user.schema";

//#region  getUserProfile
export async function getUserProfileService(userId: string) {
  const user = await UserModel.findById(userId).select("-password");

  if (!user) {
    throw new AppError("User not found", 404);
  }

  return user;
}
//#endregion

//#region  changepass
export async function changePasswordServices(
  userId: string,
  oldPassword: string,
  newPassword: string,
) {
  const user = await UserModel.findById(userId).select("+password");

  if (!user) {
    throw new AppError("User not found", 404);
  }

  //check for old and nw
  const isMatch = await bcrypt.compare(oldPassword, user.password);
  if (!isMatch) {
    throw new AppError("OLD_PASS_WRONG", 400);
  }

  //both same old and new
  const isSame = await bcrypt.compare(newPassword, user.password);
  if (isSame) {
    throw new AppError("New password must be different from old password", 400);
  }

  //hashing it again
  const hashedPassword = await bcrypt.hash(newPassword, 10);
  user.password = hashedPassword;

  await user.save();
  console.log(user);
  return user;
}

//#endregion
//#region  delteuser
export async function deleteUserServices(
  userId: string,
  password: string,
): Promise<boolean> {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const user = await UserModel.findById(userId)
      .select("+password")
      .session(session);

    if (!user) {
      throw new AppError("USER_NOT_FOUND", 404);
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      throw new AppError("INVALID_CREDENTIALS", 400);
    }

    await Content.deleteMany({ userId }).session(session);
    await Tag.deleteMany({ userId }).session(session);
    await ShareLink.deleteOne({ userId }).session(session);
    await UserModel.findByIdAndDelete(userId).session(session);

    await session.commitTransaction();
    return true;
  } catch (err) {
    await session.abortTransaction();
    throw err;
  } finally {
    session.endSession();
  }
}

//#endregion
//#region  updateprofile
export async function updateUserProfileServices(
  userId: string,
  { email, userName }: updateUserProfileInput,
) {
  const user = await UserModel.findByIdAndUpdate(
    userId,
    { userName, email },
    { new: true, runValidators: true },
  );

  if (!user) {
    throw new AppError("USER_NOT_FOUND", 404);
  }

  return user;
}

//#endregion
//#region stats
export async function getUserStatsService(userId: string) {
  const objectUserId = new mongoose.Types.ObjectId(userId);

  const [totalContent, contentByType, totalTags, recentContent] =
    await Promise.all([
      Content.countDocuments({ userId }),
      Content.aggregate([
        { $match: { userId: objectUserId } },
        { $group: { _id: "$type", count: { $sum: 1 } } },
      ]),
      Tag.countDocuments({ userId }),
      Content.findOne({ userId })
        .sort({ createdAt: -1 })
        .select("createdAt type")
        .lean(),
    ]);

  return {
    totalContent,
    contentByType: {
      video: 0,
      image: 0,
      article: 0,
      tweet: 0,
      ...Object.fromEntries(
        contentByType.map((item) => [item._id, item.count]),
      ),
    },
    totalTags,
    recentContent,
  };
}
//#endregion
