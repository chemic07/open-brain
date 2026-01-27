import { Schema, model, Types } from "mongoose";

export interface ShareLinkDocument {
  hash: string; // hashing to make the link random and secure
  userId: Types.ObjectId;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const shareLinkSchema = new Schema<ShareLinkDocument>(
  {
    hash: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true, // this makes it only one link per user
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true },
);

export const ShareLink = model<ShareLinkDocument>("ShareLink", shareLinkSchema);
