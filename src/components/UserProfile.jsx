// src/components/UserProfile.jsx
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import api from "../services/api";
import { toast } from "react-hot-toast";
import { User, Mail, Phone, Image, Edit2, X } from "lucide-react";

const UserProfile = () => {
  const theme = useSelector((state) => state.theme.mode);

  const storedClient = JSON.parse(localStorage.getItem("client"));

  const [client, setClient] = useState(null);
  const [orders, setOrders] = useState([]);
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    profilePic: "",
  });

  // ================= FETCH CLIENT =================
  useEffect(() => {
    if (!storedClient?.id) return;

    api
      .get(`/clients/${storedClient.id}.json`)
      .then((res) => {
        if (!res.data) return;

        setClient(res.data);
        setForm({
          name: res.data.name || "",
          phone: res.data.phone || "",
          profilePic: res.data.profilePic || "",
        });

        const ordersArray = res.data.orders
          ? Object.values(res.data.orders)
          : [];

        setOrders(ordersArray);
      })
      .catch(() => toast.error("Failed to load profile"));
  }, [storedClient?.id]);

  // ================= SAVE PROFILE =================
  const saveProfile = async () => {
    try {
      await api.patch(`/clients/${storedClient.id}.json`, {
        name: form.name,
        phone: form.phone,
        profilePic: form.profilePic,
      });

      setClient((prev) => ({ ...prev, ...form }));
      setEditing(false);
      toast.success("Profile updated successfully");
    } catch {
      toast.error("Failed to update profile");
    }
  };

  if (!client) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading profile...
      </div>
    );
  }

  return (
    <section
      className={`min-h-screen py-10 ${
        theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"
      }`}
    >
      <div className="max-w-5xl mx-auto px-4 space-y-10">
        {/* ================= PROFILE CARD ================= */}
        <div
          className={`p-6 rounded-2xl shadow relative ${
            theme === "dark" ? "bg-gray-800" : "bg-white"
          }`}
        >
          <button
            onClick={() => setEditing(true)}
            className="absolute top-4 right-4 flex items-center gap-1 text-sm text-indigo-500 hover:underline"
          >
            <Edit2 size={16} /> Edit
          </button>

          <div className="flex items-center gap-6">
            <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center">
              {client.profilePic ? (
                <img
                  src={client.profilePic}
                  alt={client.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <User size={40} className="text-gray-500" />
              )}
            </div>

            <div>
              <h1 className="text-2xl font-bold">{client.name}</h1>
              <p className="opacity-70">{client.email}</p>
            </div>
          </div>

          <div className="mt-6 grid md:grid-cols-2 gap-4 text-sm">
            <p className="flex items-center gap-2">
              <Phone size={16} /> {client.phone || "—"}
            </p>
            <p className="flex items-center gap-2">
              <Mail size={16} /> {client.email}
            </p>
          </div>
        </div>

        {/* ================= ORDERS ================= */}
        {orders.length > 0 && (
          <div
            className={`rounded-2xl p-6 shadow ${
              theme === "dark" ? "bg-gray-800" : "bg-white"
            }`}
          >
            <h2 className="text-xl font-bold mb-6">Your Orders</h2>

            <div className="space-y-4">
              {orders.map((order, idx) => (
                <div
                  key={idx}
                  className={`p-4 rounded-xl border ${
                    theme === "dark"
                      ? "border-gray-700 bg-gray-900"
                      : "border-gray-200 bg-gray-50"
                  }`}
                >
                  <div className="flex justify-between items-center mb-2">
                    <div>
                      <p className="font-semibold">
                        👨‍🔧 {order.tradespersonName}
                      </p>
                      <p className="text-sm opacity-70">{order.trade}</p>
                    </div>

                    <span
                      className={`text-xs px-3 py-1 rounded-full ${
                        order.status === "completed"
                          ? "bg-green-500/20 text-green-500"
                          : order.status === "cancelled"
                          ? "bg-red-500/20 text-red-500"
                          : "bg-yellow-500/20 text-yellow-500"
                      }`}
                    >
                      {order.status || "pending"}
                    </span>
                  </div>

                  {order.services && (
                    <ul className="text-sm space-y-1 mb-3">
                      {order.services.map((s, i) => (
                        <li key={i} className="flex justify-between">
                          <span>{s.name}</span>
                          <span>{s.price} EGP</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  <div className="flex justify-between text-sm font-medium">
                    <span>Total</span>
                    <span>{order.total || 0} EGP</span>
                  </div>

                  {order.createdAt && (
                    <p className="text-xs opacity-60 mt-2">
                      Ordered on{" "}
                      {new Date(order.createdAt).toLocaleDateString()}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* ================= EDIT MODAL ================= */}
      {editing && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div
            className={`w-full max-w-lg p-6 rounded-xl relative ${
              theme === "dark" ? "bg-gray-800" : "bg-white"
            }`}
          >
            <button
              onClick={() => setEditing(false)}
              className="absolute top-4 right-4"
            >
              <X />
            </button>

            <h2 className="text-xl font-bold mb-4">Edit Profile</h2>

            <div className="space-y-4">
              <input
                className="w-full px-3 py-2 rounded border bg-transparent"
                placeholder="Full name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />

              <input
                className="w-full px-3 py-2 rounded border bg-transparent"
                placeholder="Phone"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
              />

              <input
                className="w-full px-3 py-2 rounded border bg-transparent"
                placeholder="Profile image URL"
                value={form.profilePic}
                onChange={(e) =>
                  setForm({ ...form, profilePic: e.target.value })
                }
              />

              <button
                onClick={saveProfile}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-md"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default UserProfile;
