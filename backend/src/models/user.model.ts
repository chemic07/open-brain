import mongoose, { Document, Schema } from "mongoose";
import { PlanType } from "../types/user";

export enum AuthProviderType {
  LOCAL = "local",
  GOOGLE = "google",
  TWITTER = "twitter",
}

export interface UserDocument extends Document {
  userName: string;
  password?: string;
  email: string;
  plan: PlanType;
  tokens: {
    totalRemaining: number;
    lastRefillDate: Date;
  };
  isSubscribed: boolean;
  stripeCustomerId?: string;

  googleId?: string;
  twitterId?: string;
  profilePicture?: string;
  authProvider: AuthProviderType;
  stripeSubscriptionId?: string; //stripe
}

const userSchema = new Schema<UserDocument>(
  {
    userName: { type: String, required: true, trim: true },
    password: {
      type: String,
      required: function (this: UserDocument) {
        return this.authProvider === "local";
      },
      select: false,
    },
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

    googleId: {
      type: String,
      sparse: true,
    },
    twitterId: {
      type: String,
      sparse: true,
    },
    profilePicture: {
      type: String,
    },
    authProvider: {
      type: String,
      enum: Object.values(AuthProviderType),
      default: AuthProviderType.LOCAL,
    },
  },
  {
    timestamps: true,
  },
);

export const UserModel = mongoose.model<UserDocument>("User", userSchema);
