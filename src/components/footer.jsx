import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="w-full bg-[#342560] text-white mt-12">
      <div className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Company info */}
        <div>
          <h3 className="font-semibold mb-3">فنى معاك</h3>

          <address className="not-italic text-sm space-y-1 text-gray-100">
            <div>سوهاح</div>

            <div className="mt-3 font-semibold">
              {t("footer.tel")}:{" "}
              <span className="font-normal">01234 567890</span>
            </div>

            <div className="font-semibold">
              {t("footer.email")}:{" "}
              <span className="font-normal">fnym3ak@gmail.com</span>
            </div>
          </address>
        </div>

        {/* Navigation */}
        <div>
          <h4 className="font-semibold mb-3">{t("footer.navigation")}</h4>

          <ul className="space-y-2 text-gray-100">
            <li>
              <Link to="/" className="hover:underline">
                {t("Home")}
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:underline">
                {t("About")}
              </Link>
            </li>
            <li>
              <Link to="/services" className="hover:underline">
                {t("Services")}
              </Link>
            </li>
            <li>
              {/* <Link to="/contact" className="hover:underline">
                {t("Contact")}
              </Link> */}
            </li>
          </ul>
        </div>

        {/* More info */}
        <div>
          <h4 className="font-semibold mb-3">{t("footer.moreInfo")}</h4>

          <ul className="space-y-2 text-gray-100 text-sm">
            <li>{t("footer.privacy")}</li>
            <li>{t("footer.cookies")}</li>
            <li>{t("footer.terms")}</li>
            <li>{t("footer.resolving")}</li>
          </ul>
        </div>

        {/* Social */}
        <div>
          <h4 className="font-semibold mb-3">{t("footer.follow")}</h4>

          <div className="flex items-center gap-3 mb-4">
            <Link
              to="#"
              className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition"
            >
              F
            </Link>
            <Link
              to="#"
              className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition"
            >
              I
            </Link>
          </div>

          {/* <div className="w-full bg-white rounded-sm p-4 mb-4">
            <div className="w-full h-16 bg-gray-200 flex items-center justify-center text-gray-600">
              {t("footer.placeholderImage")}
            </div>
          </div> */}

          <p className="text-sm text-gray-100 font-semibold">
            {t("footer.tagline")}
          </p>
        </div>
      </div>

      <div className="border-t border-white/10 pt-6 pb-6">
        <div className="max-w-6xl mx-auto px-6 text-sm text-gray-200">
          {t("footer.copyright")}
        </div>
      </div>
    </footer>
  );
}
