import { Schema, model } from "mongoose";

export interface LinkDocument {
  url: string;
  title?: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}

const linkSchema = new Schema<LinkDocument>(
  {
    url: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    title: {
      type: String,
      trim: true,
    },

    description: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true },
);

export const Link = model<LinkDocument>("Link", linkSchema);
