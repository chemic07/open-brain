import type { Token } from "../auth";

export type Plan = "Free" | "Plus" | "Pro";

export interface UserChangePasswordPayload {
  oldPassword: string;
  newPassword: string;
}

export interface UpdateUserProfilePayload {
  userName: string;
  email: string;
}

export interface DeleteUserPayload {
  password: string;
}

export interface UserStats {
  totalContent: number;
  contentByType: {
    video: number;
    image: number;
    article: number;
    tweet: number;
  };
  totalTags: number;
  recentActivity: {
    lastContentAdded?: string;
    lastLogin?: string;
  };
}

export interface UserProfile {
  _id: string;
  name: string;
  password?: string;
  email: string;
  plan?: Plan;
  tokens: Token;
  isSubscribed: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface UserState {
  userProfile: UserProfile | null;
  stats: UserStats | null;
  loading: boolean;
  error: string | null;
  updateSuccess: boolean;
}
