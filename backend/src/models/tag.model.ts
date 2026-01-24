import { Schema, model, Types } from "mongoose";

export interface TagDocument {
  name: string;
  userId: Types.ObjectId;
}

const tagSchema = new Schema<TagDocument>({
  name: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

tagSchema.index({ name: 1, userId: 1 }, { unique: true });

export const Tag = model<TagDocument>("Tag", tagSchema);
