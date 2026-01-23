import mongoose, { Schema } from "mongoose";

interface IUser {
  name: string;
  password: string;
  email: string;
}

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true, trim: true },
    password: { type: String, required: true, select: false },
    email: { type: String, unique: true, required: true },
  },
  {
    timestamps: true,
  },
);

export const UserModel = mongoose.model<IUser>("User", userSchema);
