// src/components/OrderDetails.jsx
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import api from "../services/api";
import { addService, clearOrder } from "../store/orderSlice";
import toast from "react-hot-toast";

const OrderDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme.mode);

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  // ========================
  // Fetch order
  // ========================
  useEffect(() => {
    if (!id) return;

    api
      .get(`/orders/${id}.json`)
      .then((res) => {
        setOrder(res.data || null);
      })
      .catch((err) => {
        console.error("Error fetching order:", err);
        setOrder(null);
      })
      .finally(() => setLoading(false));
  }, [id]);

  // ========================
  // Cancel order
  // ========================
  const cancelOrder = async () => {
    if (!order) return;

    try {
      await api.patch(`/orders/${id}.json`, {
        status: "ملغية",
      });

      setOrder((prev) => ({ ...prev, status: "ملغية" }));
      toast.success("Order canceled successfully");
    } catch (err) {
      console.error("Cancel failed:", err);
      toast.error("Failed to cancel order");
    }
  };

  // ========================
  // Reorder
  // ========================
  const reorder = () => {
    if (!order?.serviceType) return;

    dispatch(clearOrder());

    dispatch(
      addService({
        id: `reorder-${id}`,
        name: order.serviceType,
        category: order.serviceType,
      })
    );

    toast.success("Service added to your order");
    navigate("/checkout"); // أو أي صفحة cart عندك
  };

  // ========================
  // Guards
  // ========================
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Order not found.
      </div>
    );
  }

  const isCancelable = order.status === "جديدة";
  const isCompleted = order.status === "مكتملة";

  return (
    <section
      className={`min-h-screen py-10 ${
        theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"
      }`}
    >
      <div className="max-w-3xl mx-auto px-4">
        <div
          className={`p-6 rounded-xl shadow space-y-4 ${
            theme === "dark" ? "bg-gray-800" : "bg-white"
          }`}
        >
          <h1 className="text-2xl font-bold">Order Details</h1>

          <div className="space-y-1">
            <p>
              <span className="font-medium">Service:</span> {order.serviceType}
            </p>

            <p>
              <span className="font-medium">Date:</span> {order.date || "—"}
            </p>

            <p>
              <span className="font-medium">Status:</span>{" "}
              <span
                className={`font-semibold ${
                  order.status === "جديدة"
                    ? "text-yellow-400"
                    : order.status === "مكتملة"
                    ? "text-green-500"
                    : "text-red-500"
                }`}
              >
                {order.status}
              </span>
            </p>
          </div>

          {/* ACTIONS */}
          <div className="flex gap-3 pt-4">
            {isCancelable && (
              <button
                onClick={cancelOrder}
                className="px-4 py-2 rounded-md bg-red-600 hover:bg-red-700 text-white"
              >
                Cancel Order
              </button>
            )}

            {(isCompleted || order.status === "ملغية") && (
              <button
                onClick={reorder}
                className="px-4 py-2 rounded-md bg-indigo-600 hover:bg-indigo-700 text-white"
              >
                Reorder
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default OrderDetails;
