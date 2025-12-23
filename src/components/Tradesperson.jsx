import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import api from "../services/api";
import { setTradesperson } from "../store/orderSlice";
import ServiceCard from "../components/ServiceCard";

const tradeServiceMap = {
  "electric technician": "Electrical",
  plumber: "Plumbing",
  carpenter: "Carpentry",
};

const tradeLabelMap = {
  "electric technician": "Electrician",
  electrician: "Electrician",
  plumber: "Plumber",
  carpenter: "Carpenter",
};

const areaKeyMap = {
  Sohag: "area.sohag",
  Girga: "area.girga",
  Tema: "area.tema",
  Tahta: "area.tahta",
  Akhmim: "area.akhmim",
  Sadfa: "area.sadfa",
  "El-Maragha": "area.elMaragha",
};

const Tradesperson = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme.mode);
  const { t, i18n } = useTranslation();

  const [person, setPerson] = useState(null);
  const [services, setServices] = useState([]);
  const [rating, setRating] = useState(0);
  const [loading, setLoading] = useState(true);

  /* ================= FETCH PERSON ================= */
  useEffect(() => {
    if (!id) return;

    api
      .get(`/Tradespeople/${id}.json`)
      .then((res) => {
        if (!res.data) {
          setPerson(null);
        } else {
          setPerson({ id, ...res.data });
          setRating(res.data.rating || 0);
        }
      })
      .catch(() => setPerson(null))
      .finally(() => setLoading(false));
  }, [id]);

  /* ================= SAVE IN REDUX ================= */
  useEffect(() => {
    if (!person) return;

    dispatch(
      setTradesperson({
        id: person.id,
        name: person.name,
        trade: person.trade,
      })
    );
  }, [person, dispatch]);

  /* ================= FETCH SERVICES ================= */
  useEffect(() => {
    if (!person?.trade) return;

    const mappedCategory = tradeServiceMap[person.trade.toLowerCase()];
    if (!mappedCategory) return;

    api.get("/services.json").then((res) => {
      const list = Object.values(res.data || {});
      setServices(list.filter((s) => s.category === mappedCategory));
    });
  }, [person]);

  /* ================= RATE ================= */
  const submitRating = async (value) => {
    setRating(value);
    await api.patch(`/Tradespeople/${id}.json`, { rating: Number(value) });
  };

  /* ================= GUARDS ================= */
  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        {t("Loading...")}
      </div>
    );

  if (!person)
    return (
      <div className="min-h-screen flex items-center justify-center">
        {t("Tradesperson not found.")}
      </div>
    );

  const translatedTrade =
    tradeLabelMap[person.trade?.toLowerCase()] || person.trade;

  return (
    <section
      dir={i18n.language === "ar" ? "rtl" : "ltr"}
      className={`min-h-screen py-10 ${
        theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"
      }`}
    >
      <div className="max-w-5xl mx-auto px-4 space-y-10">
        {/* ================= PROFILE ================= */}
        <div
          className={`p-6 rounded-xl shadow ${
            theme === "dark" ? "bg-gray-800" : "bg-white"
          }`}
        >
          <h1 className="text-2xl font-bold">{person.name}</h1>
          <p className="text-indigo-500 mb-2">{t(translatedTrade)}</p>

          <p>📞 {person.phone || "—"}</p>
          <p>✉️ {person.email || "—"}</p>

          <p className="mt-3">
            ⭐ {t("Current rating")}: {rating}
          </p>

          {/* AREAS */}
          {Array.isArray(person.areas) && person.areas.length > 0 && (
            <div className="mt-4">
              <p className="font-medium mb-2">📍 {t("Areas served")}:</p>
              <div className="flex flex-wrap gap-2">
                {person.areas.map((area, i) => (
                  <span
                    key={i}
                    className={`px-3 py-1 rounded-full text-sm ${
                      theme === "dark"
                        ? "bg-gray-700"
                        : "bg-gray-200 text-gray-800"
                    }`}
                  >
                    {t(areaKeyMap[area] || area)}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* RATE */}
          <div className="mt-4">
            <label className="block mb-1 font-medium">
              {t("Rate this tradesperson")}
            </label>
            <select
              value={rating}
              onChange={(e) => submitRating(e.target.value)}
              className={`px-3 py-2 rounded border ${
                theme === "dark"
                  ? "bg-gray-700 border-gray-600"
                  : "bg-white border-gray-300"
              }`}
            >
              {[1, 2, 3, 4, 5].map((r) => (
                <option key={r} value={r}>
                  {r} ⭐
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* ================= SERVICES ================= */}
        <section>
          <h2 className="text-xl font-semibold mb-4">{t("Services")}</h2>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Special Service */}
            {person.specialService && (
              <ServiceCard
                isSpecial
                tradespersonId={person.id}
                service={{
                  name: person.specialService.name,
                  description: person.specialService.description,
                  price: person.specialService.price,
                  category: "Special",
                }}
              />
            )}

            {/* Regular Services */}
            {services.map((service) => (
              <ServiceCard
                key={service.id}
                service={service}
                tradespersonId={person.id}
              />
            ))}
          </div>
        </section>
      </div>
    </section>
  );
};

export default Tradesperson;
