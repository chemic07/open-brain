import mongoose, { Schema, Types } from "mongoose";

export interface EmbeddingDocument {
  contentId: Types.ObjectId;
  userId: Types.ObjectId;
  embedding: number[];
  text: string;
  metadata?: {
    title: string;
    description: string;
    url: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

const embeddingSchema = new Schema<EmbeddingDocument>(
  {
    contentId: {
      type: Schema.Types.ObjectId,
      ref: "Content",
      required: true,
      unique: true,
      index: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    embedding: {
      type: [Number],
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    metadata: {
      title: String,
      description: String,
      url: String,
    },
  },
  { timestamps: true },
);

export const Embedding = mongoose.model<EmbeddingDocument>(
  "Embedding",
  embeddingSchema,
);
