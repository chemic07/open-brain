import mongoose, { Schema, Types } from "mongoose";

export interface EmbeddingDocument {
  contentId: Types.ObjectId;
  userId: Types.ObjectId;

  chunkIndex: number;
  text: string;
  embedding: number[];

  metadata?: {
    title?: string;
    description?: string;
    url?: string;
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
      index: true,
    },

    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    chunkIndex: {
      type: Number,
      required: true,
    },

    //chunk  text
    text: {
      type: String,
      required: true,
    },

    embedding: {
      type: [Number],
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

//preventing same duplicate chunk for same content
embeddingSchema.index({ contentId: 1, chunkIndex: 1 }, { unique: true });

export const Embedding = mongoose.model<EmbeddingDocument>(
  "Embedding",
  embeddingSchema,
);
