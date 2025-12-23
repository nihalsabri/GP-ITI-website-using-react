import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setThemeMode } from "../store/themeSlice";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { GlobeIcon, Moon, Sun } from "lucide-react";
import { userLogout } from "../services/auth";
import { useTranslation } from "react-i18next";

const Navbar = () => {
  const { t, i18n } = useTranslation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [avatarOpen, setAvatarOpen] = useState(false);

  const theme = useSelector((state) => state.theme.mode);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const client = token
    ? JSON.parse(localStorage.getItem("client") || "{}")
    : null;

  const userName = client?.name || client?.email || "User";
  const profilePic = client?.profilePic || "";
  const fallbackLetter = userName[0]?.toUpperCase() || "U";

  const toggleTheme = () => {
    dispatch(setThemeMode(theme === "light" ? "dark" : "light"));
  };

  const toggleLang = () => {
    const newLang = i18n.language === "en" ? "ar" : "en";
    i18n.changeLanguage(newLang);
  };

  const handleLogout = async () => {
    await userLogout();
    localStorage.removeItem("token");
    localStorage.removeItem("client");
    navigate("/");
  };

  const navClass =
    theme === "dark"
      ? "bg-gradient-to-r from-gray-900 via-gray-800 to-black"
      : "bg-white border-b border-gray-200";

  const linkClass = ({ isActive }) =>
    `px-3 py-2 text-sm transition ${
      isActive
        ? "text-indigo-500 font-bold border-b-2 border-indigo-600"
        : theme === "dark"
        ? "text-gray-300 hover:text-white"
        : "text-gray-700 hover:text-indigo-700"
    }`;

  return (
    <nav className={`py-6 sticky top-0 z-40 ${navClass}`}>
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold">
              AP
            </div>
            <span
              className={`hidden sm:inline font-semibold ${
                theme === "dark" ? "text-gray-100" : "text-gray-900"
              }`}
            >
              A placeholder for now
            </span>
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex gap-6">
            <NavLink to="/" className={linkClass}>
              {t("Home")}
            </NavLink>
            <NavLink to="/about" className={linkClass}>
              {t("About")}
            </NavLink>
            {/* <NavLink to="/services" className={linkClass}>
              {t("Services")}
            </NavLink> */}
            <NavLink to="/tradespeople" className={linkClass}>
              {t("Tradespeople")}
            </NavLink>
            <NavLink to="/contact" className={linkClass}>
              {t("Contact")}
            </NavLink>
          </div>

          {/* Right */}
          <div className="flex items-center gap-3">
            {/* Theme */}
            <button
              onClick={toggleTheme}
              className="hidden md:flex p-2 rounded-md border"
            >
              {theme === "light" ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            {/* Language */}
            <button
              onClick={toggleLang}
              className="hidden md:flex p-2 rounded-md border"
            >
              <GlobeIcon size={18} />
            </button>

            {/* Login */}
            {!token && (
              <Link
                to="/login"
                className="hidden md:block px-3 py-2 rounded-md bg-indigo-600 text-white"
              >
                {t("Login / Register")}
              </Link>
            )}

            {/* Avatar */}
            {token && (
              <div className="relative">
                <button
                  onClick={() => setAvatarOpen((v) => !v)}
                  className="relative w-10 h-10 rounded-full border-2 border-green-500 overflow-hidden"
                >
                  {profilePic ? (
                    <img
                      src={profilePic}
                      alt={userName}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-indigo-600 text-white font-semibold">
                      {fallbackLetter}
                    </div>
                  )}
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
                </button>

                {avatarOpen && (
                  <div
                    className={`absolute right-0 mt-2 w-44 rounded-md shadow-lg ${
                      theme === "dark"
                        ? "bg-gray-800 text-gray-100"
                        : "bg-white text-gray-900"
                    }`}
                  >
                    <Link
                      to="/profile"
                      className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                      onClick={() => setAvatarOpen(false)}
                    >
                      {t("Account")}
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      {t("Logout")}
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Mobile */}
            <button
              onClick={() => setMobileOpen((v) => !v)}
              className="md:hidden p-2 border rounded-md"
            >
              ☰
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden px-4 py-4 bg-gray-900 text-white space-y-3">
          <NavLink to="/" onClick={() => setMobileOpen(false)}>
            {t("Home")}
          </NavLink>
          <NavLink to="/about" onClick={() => setMobileOpen(false)}>
            {t("About")}
          </NavLink>
          {/* <NavLink to="/services" onClick={() => setMobileOpen(false)}>
            {t("Services")}
          </NavLink> */}
          <NavLink to="/tradespeople" onClick={() => setMobileOpen(false)}>
            {t("Tradespeople")}
          </NavLink>
          <NavLink to="/contact" onClick={() => setMobileOpen(false)}>
            {t("Contact")}
          </NavLink>

          <div className="flex gap-3 pt-4 border-t border-gray-700">
            <button onClick={toggleTheme} className="flex-1 border p-2">
              {theme === "light" ? <Sun size={16} /> : <Moon size={16} />}
            </button>
            <button onClick={toggleLang} className="flex-1 border p-2">
              <GlobeIcon size={16} />
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
