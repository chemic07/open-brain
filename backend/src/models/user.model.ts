import mongoose, { Schema } from "mongoose";
import { PlanType } from "../types/user";

interface UserDocument {
  userName: string;
  password: string;
  email: string;
  plan: PlanType;
  tokens: {
    totalRemaining: number;
    lastRefillDate: Date;
  };
  isSubscribed: boolean;
  stripeCustomerId?: string;
  stripeSubscriptionId?: string; //stripe
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
    plan: {
      type: String,
      enum: Object.values(PlanType),
      default: PlanType.FREE,
    },
    tokens: {
      totalRemaining: {
        type: Number,
        default: 1000, // deafult token
      },
      lastRefillDate: {
        type: Date,
        default: Date.now,
      },
    },
    isSubscribed: {
      type: Boolean,
      default: false,
    },
    stripeCustomerId: { type: String, unique: true, sparse: true },
    stripeSubscriptionId: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

export const UserModel = mongoose.model<UserDocument>("User", userSchema);
