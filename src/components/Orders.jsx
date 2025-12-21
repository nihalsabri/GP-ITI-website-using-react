// src/components/Orders.jsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import { useSelector, useDispatch } from "react-redux";
import { clearOrder, addService } from "../store/orderSlice";

const Orders = () => {
  const { client } = useSelector((state) => state.order);
  const theme = useSelector((state) => state.theme.mode);
  const dispatch = useDispatch();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

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

  const cancelOrder = async (orderId) => {
    await api.patch(`/orders/${orderId}.json`, {
      status: "canceled",
    });

    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: "canceled" } : o))
    );
  };

  const reorder = (order) => {
    dispatch(clearOrder());

    order.services.forEach((s) => dispatch(addService(s)));

    // redirect لاحقًا للـ checkout
    alert("Services added again to order 🛒");
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <section
      className={`min-h-screen py-10 ${
        theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-50"
      }`}
    >
      <div className="max-w-5xl mx-auto px-4 space-y-6">
        <h1 className="text-2xl font-bold">My Orders</h1>

        {orders.length === 0 && (
          <p className="opacity-60">You have no orders yet.</p>
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
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-semibold">{order.tradespersonName}</h3>
                <p className="text-sm text-indigo-500">{order.trade}</p>
                <p className="text-sm mt-1">
                  Status: <span className="font-semibold">{order.status}</span>
                </p>
              </div>

              <div className="flex gap-2">
                <Link
                  to={`/orders/${order.id}`}
                  className="px-3 py-1 rounded bg-indigo-600 text-white text-sm"
                >
                  View
                </Link>

                {order.status === "pending" && (
                  <button
                    onClick={() => cancelOrder(order.id)}
                    className="px-3 py-1 rounded bg-red-600 text-white text-sm"
                  >
                    Cancel
                  </button>
                )}

                {(order.status === "completed" ||
                  order.status === "canceled") && (
                  <button
                    onClick={() => reorder(order)}
                    className="px-3 py-1 rounded bg-gray-600 text-white text-sm"
                  >
                    Reorder
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
