export interface CreateCheckoutPayload {
  plan: "PLUS" | "PRO";
}

export interface CheckoutResponse {
  sessionId: string;
  url: string;
}

export interface Subscription {
  status: string;
  currentPeriodEnd: Date;
  cancelAtPeriodEnd: boolean;
}

export interface SubscriptionResponse {
  isSubscribed: boolean;
  plan: string;
  tokens: {
    totalRemaining: number;
    lastRefillDate: Date;
  };
  subscription?: Subscription;
}

export interface PaymentState {
  loading: boolean;
  error: string | null;
  subscription: SubscriptionResponse | null;
}
