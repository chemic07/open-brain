import mongoose, { Schema } from "mongoose";

interface UserDocument {
  userName: string;
  password: string;
  email: string;
}

const userSchema = new Schema<UserDocument>(
  {
    userName: { type: String, required: true, trim: true },
    password: { type: String, required: true, select: false },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  },
);

export const UserModel = mongoose.model<UserDocument>("User", userSchema);
