export enum PlanType {
  FREE = "free",
  PLUS = "plus",
  PRO = "pro",
}

export interface UserTokens {
  totalRemaining: number;
  lastRefillDate: string;
}

export default interface User {
  id: string;
  userName: string;
  email: string;
  plan: PlanType;
  tokens: UserTokens;
  isSubscribed: boolean;
  stripeSubscriptionId?: string;
  createdAt?: string;
  updatedAt?: string;
}
