// src/components/TradespeopleCard.jsx
import { Link } from "react-router-dom";
import { Star, Phone, Mail, Calendar } from "lucide-react";
import { useSelector } from "react-redux";
import { useTranslation } from 'react-i18next';

const TradespeopleCard = ({
  id,
  name,
  trade,
  rating,
  experience,
  phone,
  email,
  createdAt,
  imageUrl,
}) => {
  const theme = useSelector((state) => state.theme.mode);
  const { t } = useTranslation();
  return (
    <Link to={`/tradespeople/${id}`} className="block h-full">
      <div
        className={`group h-full rounded-2xl p-5 transition-all duration-300 shadow
        ${
          theme === "dark"
            ? "bg-gray-800 hover:bg-gray-750 text-white"
            : "bg-white hover:shadow-lg text-gray-900"
        }`}
      >
        <div className="flex gap-5 items-start min-w-0">
          {/* Avatar / Image */}
          <div className="w-28 h-28 rounded-xl overflow-hidden bg-gray-200 flex-shrink-0">
            {imageUrl ? (
              <img
                src={imageUrl}
                alt={name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-3xl font-bold text-indigo-600">
                {name?.[0]}
              </div>
            )}
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0 space-y-2">
            {/* Name */}
            <h3 className="text-xl font-semibold group-hover:text-indigo-500 transition truncate">
              {name}
            </h3>

            {/* Trade */}
            <p className="text-indigo-500 text-sm font-medium truncate">
              {trade}
            </p>

            {/* Rating */}
            <div className="flex items-center gap-1 text-sm">
              <Star className="w-4 h-4 text-yellow-400 fill-yellow-400 shrink-0" />
              <span className="font-medium">{rating ?? 0}</span>
              <span className="opacity-60">(rating)</span>
            </div>

            {/* Experience */}
            {experience !== undefined && (
              <p className="text-sm opacity-80 truncate">
                🛠 {t("Experience")}: {experience} years
              </p>
            )}

            {/* Contact */}
            <div className="pt-2 space-y-1 text-sm min-w-0">
              {phone && (
                <div className="flex items-center gap-2 min-w-0">
                  <Phone className="w-4 h-4 text-indigo-500 shrink-0" />
                  <span className="truncate">{phone}</span>
                </div>
              )}

              {email && (
                <div className="flex items-center gap-2 min-w-0">
                  <Mail className="w-4 h-4 text-indigo-500 shrink-0" />
                  <span className="truncate">{email}</span>
                </div>
              )}

              {createdAt && (
                <div className="flex items-center gap-2 opacity-70 min-w-0">
                  <Calendar className="w-4 h-4 shrink-0" />
                  <span className="truncate">
                   {t("Joined")} {new Date(createdAt).toLocaleDateString()}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default TradespeopleCard;
