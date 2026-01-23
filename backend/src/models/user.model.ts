import mongoose, { Schema } from "mongoose";

interface IUser {
  userName: string;
  password: string;
  email: string;
}

const userSchema = new Schema<IUser>(
  {
    userName: { type: String, required: true, trim: true },
    password: { type: String, required: true, select: false },
    email: { type: String, unique: true, required: true },
  },
  {
    timestamps: true,
  },
);

export const UserModel = mongoose.model<IUser>("User", userSchema);
