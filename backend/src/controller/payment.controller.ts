import { UserModel } from "../models/user.model";
import type { Request, Response, NextFunction } from "express";
import { stripe, STRIPE_PLANS } from "../config/stripe";

export async function createCheckoutSession(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    console.log("init the check out");
    console.log(process.env.STRIPE_PLUS_PRICE_ID || "not found");
    console.log(process.env.STRIPE_PRO_PRICE_ID || "not found");
    const userId = req.userId!;
    const { plan } = req.body; // plsu pro

    if (!plan || !STRIPE_PLANS[plan as keyof typeof STRIPE_PLANS]) {
      return res.status(400).json({ error: "Invalid plan selected" });
    }

    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const selectedPlan = STRIPE_PLANS[plan as keyof typeof STRIPE_PLANS];

    // stripe session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price: selectedPlan.priceId,
          quantity: 1,
        },
      ],
      mode: "subscription",
      success_url: `${process.env.CLIENT_URL}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.CLIENT_URL}/payment/cancel`,
      customer_email: user.email,
      metadata: {
        userId: userId,
        plan: plan,
      },
    });

    console.log(session);
    return res.status(200).json({
      sessionId: session.id,
      url: session.url,
    });
  } catch (error: any) {
    console.error("error:", error);
    next(error);
  }
}

export async function cancelSubscription(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const userId = req.userId!;
    const user = await UserModel.findById(userId);

    if (!user || !user.stripeSubscriptionId) {
      return res.status(400).json({ error: "No active subscription found" });
    }

    // cancel at any pr
    const subscription = await stripe.subscriptions.update(
      user.stripeSubscriptionId,
      {
        cancel_at_period_end: true,
      },
    );

    return res.status(200).json({
      message: "Subscription will be cancelled at the end of billing period",
      cancelAt: new Date(subscription.canceled_at! * 1000),
    });
  } catch (error: any) {
    console.error("Cancel subscription error:", error);
    next(error);
  }
}

export async function handleWebhook(req: Request, res: Response) {
  const sig = req.headers["stripe-signature"] as string;
  let event;
  try {
    event = await stripe.webhooks.constructEventAsync(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!,
    );
  } catch (err: any) {
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  //event
  if (event.type === "checkout.session.completed") {
    const session = event.data.object as any;

    if (session.metadata && session.metadata.userId) {
      const { userId, plan } = session.metadata;

      await UserModel.findByIdAndUpdate(userId, {
        plan,
        isSubscribed: true,
        stripeCustomerId: session.customer,
        stripeSubscriptionId: session.subscription,
        $inc: { "tokens.totalRemaining": plan === "PLUS" ? 10000 : 50000 },
      });
    }
  }
  res.json({ received: true });
}
