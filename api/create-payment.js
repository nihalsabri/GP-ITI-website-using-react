import Stripe from "stripe";
/* eslint-env node */
const stripe = new Stripe(process.env.VITE_STRIPE_SECRET_KEY,  { apiVersion: "2024-06-20",}); // eslint-disable-line no-undef

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { amount, orderId } = req.body;

    if (typeof amount !== "number" || amount <= 0) {
      return res.status(400).json({ error: "Invalid amount" });
    }
 const amountInPiastres = Math.round(amount * 100);
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amountInPiastres, 
      currency: "egp",
      description: `Order ${orderId}`,
      metadata: { orderId },
    });


    res.status(200).json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error("Stripe error:", error);
    res.status(500).json({ error: error.message });
  }
}
