import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import api from "../services/api";
import { addService } from "../store/orderSlice";

const tradeServiceMap = {
  "electric technician": "Electrical",
  plumber: "Plumbing",
  carpenter: "Carpentry",
};

const Tradesperson = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme.mode);

  const [person, setPerson] = useState(null);
  const [services, setServices] = useState([]);
  const [rating, setRating] = useState(0);
  const [loading, setLoading] = useState(true);

  // ========================
  // Fetch tradesperson
  // ========================
  useEffect(() => {
    if (!id) return;

    api
      .get(`/Tradespeople/${id}.json`)
      .then((res) => {
        if (!res.data) {
          setPerson(null);
        } else {
          setPerson(res.data);
          setRating(res.data.rating || 0);
        }
      })
      .catch((err) => {
        console.error("Error fetching tradesperson:", err);
        setPerson(null);
      })
      .finally(() => setLoading(false));
  }, [id]);

  // ========================
  // Fetch services by trade
  // ========================
  useEffect(() => {
    if (!person?.trade) return;

    const mappedCategory = tradeServiceMap[person.trade];
    if (!mappedCategory) return;

    api
      .get("/services.json")
      .then((res) => {
        const data = res.data || {};
        const servicesArray = Object.values(data);

        const filtered = servicesArray.filter(
          (service) => service.category === mappedCategory
        );

        setServices(filtered);
      })
      .catch((err) => console.error("Error fetching services:", err));
  }, [person]);

  // ========================
  // Submit rating
  // ========================
  const submitRating = async (value) => {
    setRating(value);

    try {
      await api.patch(`/tradespeople/${id}.json`, {
        rating: Number(value),
      });
    } catch (err) {
      console.error("Rating update failed:", err);
    }
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

  if (!person) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Tradesperson not found.
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
        {/* ========== PROFILE ========== */}
        <div
          className={`p-6 rounded-xl shadow ${
            theme === "dark" ? "bg-gray-800" : "bg-white"
          }`}
        >
          <h1 className="text-2xl font-bold">{person.name}</h1>
          <p className="text-indigo-500 mb-2">{person.trade}</p>

          <p>📞 {person.phone}</p>
          <p>✉️ {person.email}</p>

          <p className="mt-3">⭐ Current rating: {person.rating}</p>

          <div className="mt-4">
            <label className="block mb-1 font-medium">
              Rate this tradesperson
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

        {/* ========== SERVICES ========== */}
        <section>
          <h2 className="text-xl font-semibold mb-4">Services</h2>

          {services.length === 0 ? (
            <p className="text-gray-400">
              No services available for this tradesperson.
            </p>
          ) : (
            <div className="grid md:grid-cols-2 gap-6">
              {services.map((service, idx) => (
                <div
                  key={idx}
                  className={`p-5 rounded-xl border ${
                    theme === "dark"
                      ? "bg-gray-800 border-gray-700"
                      : "bg-white border-gray-200"
                  }`}
                >
                  <h3 className="font-semibold text-lg">{service.name}</h3>

                  <p className="text-sm text-gray-400 mb-3">
                    {service.description}
                  </p>

                  <p className="font-bold mb-4">{service.price} EGP</p>

                  <button
                    onClick={() =>
                      dispatch(
                        addService({
                          ...service,
                          tradespersonId: id,
                          tradespersonName: person.name,
                        })
                      )
                    }
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-md"
                  >
                    Add to Order
                  </button>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </section>
  );
};

export default Tradesperson;
