// src/components/Orders.jsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import { useSelector, useDispatch } from "react-redux";
import { clearOrder, addService } from "../store/orderSlice";
import { useTranslation } from "react-i18next";

const Orders = () => {
  const { t, i18n } = useTranslation();

  const { client } = useSelector((state) => state.order);
  const theme = useSelector((state) => state.theme.mode);
  const dispatch = useDispatch();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const dir = i18n.language === "ar" ? "rtl" : "ltr";

  // ========================
  // Fetch user orders
  // ========================
  useEffect(() => {
    if (!client?.id) return;

    api
      .get("/orders.json")
      .then((res) => {
        const data = res.data || {};
        const arr = Object.entries(data)
          .map(([id, order]) => ({ id, ...order }))
          .filter((o) => o.clientId === client.id);

        setOrders(arr);
      })
      .finally(() => setLoading(false));
  }, [client]);

  // ========================
  // Cancel order
  // ========================
  const cancelOrder = async (orderId) => {
    try {
      await api.patch(`/orders/${orderId}.json`, {
        status: "canceled",
      });

      setOrders((prev) =>
        prev.map((o) => (o.id === orderId ? { ...o, status: "canceled" } : o))
      );
    } catch {
      alert(t("Failed to cancel order"));
    }
  };

  // ========================
  // Reorder
  // ========================
  const reorder = (order) => {
    dispatch(clearOrder());

    order.services?.forEach((s) => dispatch(addService(s)));

    alert(t("Services added again to order"));
    // لاحقًا: navigate("/checkout")
  };

  // ========================
  // Guards
  // ========================
  if (loading) {
    return <p className="text-center mt-10">{t("Loading...")}</p>;
  }

  return (
    <section
      dir={dir}
      className={`min-h-screen py-10 ${
        theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"
      }`}
    >
      <div className="max-w-5xl mx-auto px-4 space-y-6">
        <h1 className="text-2xl font-bold">{t("My Orders")}</h1>

        {orders.length === 0 && (
          <p className="opacity-60">{t("You have no orders yet.")}</p>
        )}

        {orders.map((order) => (
          <div
            key={order.id}
            className={`p-5 rounded-xl border ${
              theme === "dark"
                ? "bg-gray-800 border-gray-700"
                : "bg-white border-gray-200"
            }`}
          >
            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
              <div>
                <h3 className="font-semibold">{order.tradespersonName}</h3>
                <p className="text-sm text-indigo-500">{order.trade}</p>
                <p className="text-sm mt-1">
                  {t("Status")}:{" "}
                  <span className="font-semibold">{order.status}</span>
                </p>
              </div>

              <div className="flex gap-2">
                <Link
                  to={`/orders/${order.id}`}
                  className="px-3 py-1 rounded bg-indigo-600 text-white text-sm"
                >
                  {t("View")}
                </Link>

                {order.status === "pending" && (
                  <button
                    onClick={() => cancelOrder(order.id)}
                    className="px-3 py-1 rounded bg-red-600 text-white text-sm"
                  >
                    {t("Cancel")}
                  </button>
                )}

                {(order.status === "completed" ||
                  order.status === "canceled") && (
                  <button
                    onClick={() => reorder(order)}
                    className="px-3 py-1 rounded bg-gray-600 text-white text-sm"
                  >
                    {t("Reorder")}
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Orders;
