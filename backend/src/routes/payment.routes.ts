import express from "express";

import { Router } from "express";
import authMiddleware from "../middleware/auth.middleware";
import {
  cancelSubscription,
  createCheckoutSession,
  handleWebhook,
} from "../controller/payment.controller";

const paymentRouter = Router();

paymentRouter.post(
  "/api/v1/payment/create-checkout",
  authMiddleware,
  createCheckoutSession,
);
paymentRouter.post(
  "/api/v1/payment/cancel",
  authMiddleware,
  cancelSubscription,
);

paymentRouter.post(
  "/api/v1/payment/webhook",
  express.raw({ type: "application/json" }),
  handleWebhook,
);

export default paymentRouter;
