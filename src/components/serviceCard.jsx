
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { addService, removeService } from "../store/orderSlice"; 

const ServiceCard = ({ service, isSpecial = false, tradespersonId }) => {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme.mode);
  const { t } = useTranslation();


  const selectedServices = useSelector((state) => state.order.services);

const serviceId = isSpecial ? service.id || `special-${tradespersonId}` : service.id;


  const isAdded = selectedServices.some((s) => s.id === serviceId);

  const handleToggle = () => {
    if (isAdded) {
      dispatch(removeService(serviceId));
    } else {
      dispatch(
        addService({
          id: serviceId,
          name: service.name,
          price: service.price,
          description: service.description || null,
          category: service.category || (isSpecial ? "Special" : "General"),
        })
      );
    }
  };

  return (
    <div
      className={`p-5 rounded-xl border transition ${
        isSpecial
          ? theme === "dark"
            ? "bg-gray-800 border-indigo-500"
            : "bg-white border-indigo-400"
          : theme === "dark"
          ? "bg-gray-800 border-gray-700"
          : "bg-white border-gray-200"
      }`}
    >
      {isSpecial && (
        <span className="text-xs uppercase text-indigo-500 font-semibold">
          {t("Exclusive Service")}
        </span>
      )}

      <h3 className="font-semibold text-lg mt-1">{service.name}</h3>

      {service.description && (
        <p className="text-sm text-gray-400 mb-3">{service.description}</p>
      )}

      <p className="font-bold mb-4">{service.price} EGP</p>

      <button
        onClick={handleToggle}
        className={`w-full py-2 rounded-md text-white font-medium transition ${
          isAdded
            ? "bg-red-600 hover:bg-red-700"
            : "bg-indigo-600 hover:bg-indigo-700"
        }`}
      >
        {isAdded ? t("Remove from Order") : t("Add to Order")}
      </button>
    </div>
  );
};

export default ServiceCard;
