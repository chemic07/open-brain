import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2026-01-28.clover",
});

export const STRIPE_PLANS = {
  PLUS: {
    priceId: process.env.STRIPE_PLUS_PRICE_ID!,
    name: "Plus",
    price: 149,
    tokens: 10000,
  },
  PRO: {
    priceId: process.env.STRIPE_PRO_PRICE_ID!,
    name: "Pro",
    price: 399,
    tokens: 50000,
  },
};
