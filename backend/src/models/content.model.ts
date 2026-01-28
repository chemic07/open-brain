import mongoose, { mongo, Schema, Types } from "mongoose";

export enum ContentType {
  VIDEO = "video",
  IMAGE = "image",
  ARTICLE = "article",
  TWEET = "tweet",
}

interface ContentDocument {
  title: string;
  type: ContentType;
  tags: Types.ObjectId[];
  link: Types.ObjectId;
  userId: Types.ObjectId;
}

const contentSchema = new Schema<ContentDocument>(
  {
    link: {
      type: Schema.Types.ObjectId,
      ref: "Link",
      required: true,
    },

    type: {
      type: String,
      enum: Object.values(ContentType),
      required: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    tags: [
      {
        type: Schema.Types.ObjectId,
        ref: "Tag",
      },
    ],

    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
  },
  { timestamps: true },
);

contentSchema.index({ link: 1, userId: 1 }, { unique: true });
export const Content = mongoose.model<ContentDocument>(
  "Content",
  contentSchema,
);
