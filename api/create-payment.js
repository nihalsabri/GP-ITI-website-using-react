import Stripe from "stripe";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set } from "firebase/database";


const firebaseConfig = {
  apiKey: "AIzaSyB7PSnQphwZ73NhvKl460VW7AfDP70J4Jk",
  authDomain: "gp-iti-1c920.firebaseapp.com",
  databaseURL: "https://gp-iti-1c920-default-rtdb.firebaseio.com",
  projectId: "gp-iti-1c920",
  storageBucket: "gp-iti-1c920.firebasestorage.app",
  messagingSenderId: "752793572883",
  appId: "1:752793572883:web:1fa9b3ec35cc8919f0d1e6",
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
export default async function handler(req, res) {
  console.log("STRIPE_SECRET_KEY loaded:", !!process.env.STRIPE_SECRET_KEY); // eslint-disable-line no-undef

  if (process.env.STRIPE_SECRET_KEY) { // eslint-disable-line no-undef
    console.log("Key starts with:", process.env.STRIPE_SECRET_KEY.substring(0, 10)); // eslint-disable-line no-undef
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
const { amount, orderId, user, tradespersonId, services } = req.body;
    if (!amount || typeof amount !== "number" || amount <= 0) {
      return res.status(400).json({ error: "Invalid or missing amount" });
    }

    if (!process.env.STRIPE_SECRET_KEY) { // eslint-disable-line no-undef

      console.error("Missing STRIPE_SECRET_KEY");
      return res.status(500).json({ error: "Server configuration error" });
    }

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, { // eslint-disable-line no-undef
      apiVersion: "2024-06-20", 
    });

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), 
      currency: "egp",
      description: `Order ${orderId}`,
      metadata: { orderId },
    });
if (orderId && tradespersonId && services && services.length > 0) {
      const orderData = {
        id: orderId,
        clientId: user?.uid || user?.id || "unknown",
        clientName: user?.name || user?.displayName || "Unknown Client",
        clientPhone: user?.phone || '',
        clientAddress: user?.address || '',
        tradespersonId: tradespersonId,
        technicianName: services[0]?.technicianName || tradesperson?.name || "Unknown Technician",
        services: services,
        serviceType: services.map(s => s.name).join(', '),
        total: amount,
        status: 'pending',
        createdAt: new Date().toISOString(),
      };

      await set(ref(database, `orders/${orderId}`), orderData);
      await set(ref(database, `Tradespeople/${tradespersonId}/orders/${orderId}`), orderData);
    }
    return res.status(200).json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error("Stripe Error:", error); 

    return res
      .status(500)
      .json({ error: error.message || "Failed to create payment intent" });
  }
}
