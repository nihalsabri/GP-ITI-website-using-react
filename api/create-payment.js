
import Stripe from "stripe";

export default async function handler(req, res) {
  console.log("STRIPE_SECRET_KEY loaded:", !!process.env.STRIPE_SECRET_KEY);
  if (process.env.STRIPE_SECRET_KEY) {
    console.log("Key starts with:", process.env.STRIPE_SECRET_KEY.substring(0, 10));
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { amount, orderId } = req.body;

    if (!amount || typeof amount !== "number" || amount <= 0) {
      return res.status(400).json({ error: "Invalid or missing amount" });
    }

    if (!process.env.STRIPE_SECRET_KEY) {
      console.error("Missing STRIPE_SECRET_KEY");
      return res.status(500).json({ error: "Server configuration error" });
    }

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: "2024-06-20",
    });

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), 
      currency: "egp",
      description: `Order ${orderId}`,
      metadata: { orderId },
    });

    return res.status(200).json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error("Stripe Error:", error); 

    return res
      .status(500)
      .json({ error: error.message || "Failed to create payment intent" });
  }
}
