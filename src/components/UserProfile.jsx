import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import api from "../services/api";
import { toast } from "react-hot-toast";
import { User, Mail, Phone, MapPin, Edit2, X } from "lucide-react";

const UserProfile = () => {
  const theme = useSelector((state) => state.theme.mode);
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar";

  const storedClient = JSON.parse(localStorage.getItem("client"));

  const [client, setClient] = useState(null);
  const [orders, setOrders] = useState([]);
  const [editing, setEditing] = useState(false);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    profilePic: "",
    address: "",
  });

  /* ================= FETCH CLIENT ================= */
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
          address: res.data.address || "",
        });

        setOrders(res.data.orders ? Object.values(res.data.orders) : []);
      })
      .catch(() => toast.error(t("profile.loadError")));
  }, [storedClient?.id, t]);

  /* ================= SAVE PROFILE ================= */
  const saveProfile = async () => {
    try {
      await api.patch(`/clients/${storedClient.id}.json`, form);
      setClient((prev) => ({ ...prev, ...form }));
      setEditing(false);
      toast.success(t("profile.updated"));
    } catch {
      toast.error(t("profile.updateError"));
    }
  };

  if (!client) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        {t("common.loading")}
      </div>
    );
  }

  return (
    <section
      dir={isRTL ? "rtl" : "ltr"}
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
          {/* EDIT BUTTON */}
          <button
            onClick={() => setEditing(true)}
            className={`absolute top-4 flex items-center gap-1 text-sm text-indigo-500 hover:underline
              ${isRTL ? "left-4" : "right-4"}
            `}
          >
            <Edit2 size={16} />
            {t("profile.edit")}
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
              <p className="text-sm opacity-60 mt-1">
                {orders.length} {t("profile.ordersPlaced")}
              </p>
            </div>
          </div>

          <div className="mt-6 grid md:grid-cols-2 gap-4 text-sm">
            <p className="flex items-center gap-2">
              <Phone size={16} /> {client.phone || "—"}
            </p>

            <p className="flex items-center gap-2">
              <Mail size={16} /> {client.email}
            </p>

            <p className="flex items-center gap-2 md:col-span-2">
              <MapPin size={16} />
              {client.address || t("profile.noAddress")}
            </p>
          </div>

          {client.createdAt && (
            <p className="text-xs opacity-60 mt-4">
              {t("profile.memberSince")}{" "}
              {new Date(client.createdAt).toLocaleDateString()}
            </p>
          )}
        </div>
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
              className={`absolute top-4 ${isRTL ? "left-4" : "right-4"}`}
            >
              <X />
            </button>

            <h2 className="text-xl font-bold mb-4">
              {t("profile.editProfile")}
            </h2>

            <div className="space-y-4">
              <input
                className="w-full px-3 py-2 rounded border bg-transparent"
                placeholder={t("profile.fullName")}
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />

              <input
                className="w-full px-3 py-2 rounded border bg-transparent"
                placeholder={t("profile.phone")}
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
              />

              <input
                className="w-full px-3 py-2 rounded border bg-transparent"
                placeholder={t("profile.address")}
                value={form.address}
                onChange={(e) => setForm({ ...form, address: e.target.value })}
              />

              <input
                className="w-full px-3 py-2 rounded border bg-transparent"
                placeholder={t("profile.profileImage")}
                value={form.profilePic}
                onChange={(e) =>
                  setForm({ ...form, profilePic: e.target.value })
                }
              />

              <button
                onClick={saveProfile}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-md"
              >
                {t("common.save")}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default UserProfile;
