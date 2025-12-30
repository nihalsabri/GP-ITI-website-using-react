
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { loadStripe } from "@stripe/stripe-js";
import {
    Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { clearOrder } from "../store/orderSlice";
import { useState } from "react";
import { ref, set } from 'firebase/database'; 
import { database } from '../services/firebaseConfig'; 

const stripePromise = loadStripe("pk_test_51ShLlXQ8ZGyN4bjshA3QIVvPVm9OdjZesEoWn3LCi4oNsHZrumC7nX8yrMpqB5ivPRtf90wOJVOBR6dkjG9fQGQ1003rZ0iLG4"); 

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { services, tradesperson } = useSelector((state) => state.order);
  const user = useSelector((state) => state.app.user);
  const total = services.reduce((sum, s) => sum + (s.price || 0), 0);

const handleSubmit = async (event) => {
  event.preventDefault();
  if (!stripe || !elements) return;

  setLoading(true);
  setError(null);

  try {
    const response = await fetch("/api/create-payment", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        amount: total,
        orderId: "order-" + Date.now(),
          tradespersonId: tradesperson.id,
          services: services,
    user: user,
      }),
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.error || "Failed to create payment");


    const cardElement = elements.getElement(CardElement);
    const { error } = await stripe.confirmCardPayment(data.clientSecret, {
      payment_method: {
        card: cardElement,
      },
    });

    if (error) {
      setError(error.message);
      return;
    }
  const orderId = Date.now().toString();
      const orderData = {
        id: orderId,
        clientId: user?.uid || user?.id,
        clientName: user?.name || user?.displayName,
        clientPhone: user?.phone || '',
        clientAddress: user?.address || '',
        address: user?.address || '',
        phone: user?.phone || '',
        technicianId: tradesperson?.id,
        tradespersonid: tradesperson?.id,
        technicianName: tradesperson?.name,
        services: services,
        serviceType: services.map(s => s.name).join(', '),
        total: total,
        status: 'pending',
        createdAt: new Date().toISOString(),
      };

      await set(ref(database, `orders/${orderId}`), orderData);
      await set(ref(database, `Tradespeople/${tradesperson.id}/orders/${orderId}`), orderData);
await set(ref(database, `Tradespeople/${tradesperson?.id}/orders/${orderId}`), orderData);
   await set(ref(database, `Tradespeople/${user.uid}/orders/${orderId}`), orderData); 

    alert(t("Payment successful!"));
    dispatch(clearOrder());
    navigate("/");

  } catch (err) {
    setError(err.message || t("Payment failed"));
  } finally {
    setLoading(false);
  }
};
if (!stripe) {
  return <p className="text-red-500">Stripe failed to load. Please refresh.</p>;
}
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h3 className="font-semibold">{t("Card Details")}</h3>

      <div
        className="p-3 border rounded-md"
        style={{ backgroundColor: "#f9fafb", direction: "ltr"}}
      >
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />
      </div>

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <button
        type="submit"
        disabled={!stripe || loading}
        className={`w-full py-3 rounded-md text-white ${
          loading ? "bg-gray-500" : "bg-[#372B70] hover:bg-white hover:text-[#372B70] hover:border hover:border-[#372B70]"
        }`}
      >
        {loading ? t("Processing...") : `${t("Pay")} ${total} EGP`}
      </button>
    </form>
  );
};

const Checkout = () => {
  const { t, i18n } = useTranslation();
    const dir = i18n.language === "ar" ? "rtl" : "ltr";
  const { services, tradesperson } = useSelector((state) => state.order);
  const theme = useSelector((state) => state.theme.mode);

  if (!tradesperson || services.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        {t("No services selected")}
      </div>
    );
  }

  const total = services.reduce((sum, s) => sum + (s.price || 0), 0);

  return (
    <section
      dir={dir}
      className={`min-h-screen py-10 ${
        theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"
      }`}
    >
      <div className="max-w-md mx-auto px-4">
        <h1 className="text-2xl font-bold mb-6">{t("Checkout")}</h1>

        <div
          className={`p-5 rounded-xl mb-6 ${
            theme === "dark" ? "bg-gray-800" : "bg-white"
          }`}
        >
          <h2 className="font-semibold mb-3">{t("Order Summary")}</h2>
          <p className="mb-2">
            <strong>{tradesperson.name}</strong>
          </p>
          <ul className="space-y-2 mb-4">
            {services.map((s) => (
              <li key={s.id} className="flex justify-between">
                <span>{s.name}</span>
                <span>{s.price} EGP</span>
              </li>
            ))}
          </ul>
          <div className="border-t pt-3 flex justify-between font-bold">
            <span>{t("Total")}</span>
            <span>{total} EGP</span>
          </div>
        </div>

        {/* Stripe Provider */}
        <Elements stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      </div>
    </section>
  );
};

export default Checkout;
