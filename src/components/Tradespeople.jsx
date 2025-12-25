import React, { useEffect, useState } from "react";
import api from "../services/api";
import TradespeopleCard from "../components/TradespeopleCard";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

const Tradespeople = () => {
  const { t } = useTranslation();

  const [tradespeople, setTradespeople] = useState([]);
  const [selectedTrade, setSelectedTrade] = useState("");

  const theme = useSelector((state) => state.theme.mode);

  useEffect(() => {
    const fetchTradespeople = async () => {
      try {
        const res = await api.get("/Tradespeople.json");

        if (res.data) {
          const list = Object.values(res.data);
          setTradespeople(list);
        }
      } catch (err) {
        console.error("Failed to fetch tradespeople", err);
      }
    };

    fetchTradespeople();
  }, []);

  const filteredTradespeople = selectedTrade
    ? tradespeople.filter(
        (person) => person.trade?.toLowerCase() === selectedTrade.toLowerCase()
      )
    : tradespeople;

  return (
    <section
      className={`
        min-h-screen transition-colors duration-300
        ${
          theme === "dark"
            ? "bg-gradient-to-b from-gray-900 via-gray-900 to-black text-gray-100"
            : "bg-gray-50 text-gray-900"
        }
      `}
    >
      <div className="max-w-6xl mx-auto px-4 py-6">
        {/* Filter */}
        <div className="mb-6 flex gap-3">
          <select
            value={selectedTrade}
            onChange={(e) => setSelectedTrade(e.target.value)}
            className={`
              rounded-md px-4 py-2 text-sm font-medium
              border transition focus:outline-none focus:ring-2 focus:ring-indigo-500
              bg-transparent
              ${
                theme === "dark"
                  ? "border-gray-600 text-gray-100"
                  : "border-gray-300 text-gray-900"
              }
            `}
          >
            <option className="bg-gray-900 text-white" value="">
              {t("All Trades")}
            </option>
            <option
              className="bg-gray-900 text-white"
              value="electric technician"
            >
              {t("Electrician")}
            </option>
            <option className="bg-gray-900 text-white" value="plumber">
              {t("Plumber")}
            </option>
            <option className="bg-gray-900 text-white" value="carpenter">
              {t("Carpenter")}
            </option>
          </select>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTradespeople.map((person) => (
            <TradespeopleCard
              key={person.id}
              id={person.id}
              name={person.name}
              trade={person.trade}
              rating={person.rating}
              experience={person.experience}
              phone={person.phone}
              email={person.email}
              createdAt={person.createdAt}
              imageUrl={person.imageUrl}
            />
          ))}
        </div>

        {/* Empty state */}
        {filteredTradespeople.length === 0 && (
          <p className="text-center text-gray-500 mt-10">
            {t("No tradespeople found.")}
          </p>
        )}



        
      </div>
    </section>
  );
};

export default Tradespeople;
