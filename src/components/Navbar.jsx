import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setThemeMode } from "../store/themeSlice";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { GlobeIcon, Moon, Sun } from "lucide-react";
import { userLogout } from "../services/auth";

const Navbar = () => {
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

  const mobileLinkClass = ({ isActive }) =>
    `block py-2 text-sm ${isActive ? "text-indigo-500 font-semibold" : ""}`;

  return (
    <nav className={`sticky top-0 z-40 ${navClass}`}>
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
              Home
            </NavLink>
            <NavLink to="/about" className={linkClass}>
              About
            </NavLink>
            <NavLink to="/services" className={linkClass}>
              Services
            </NavLink>
            <NavLink to="/tradespeople" className={linkClass}>
              Tradespeople
            </NavLink>
            <NavLink to="/contact" className={linkClass}>
              Contact
            </NavLink>
          </div>

          {/* Right */}
          <div className="flex items-center gap-3">
            {/* Desktop Theme */}
            <button
              onClick={toggleTheme}
              className={`hidden md:flex p-2 rounded-md border ${
                theme === "dark"
                  ? "bg-gray-800 border-gray-700"
                  : "bg-white border-gray-200"
              }`}
            >
              {theme === "light" ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            {/* Desktop Language */}
            <button
              className={`hidden md:flex p-2 rounded-md border ${
                theme === "dark"
                  ? "bg-gray-800 border-gray-700"
                  : "bg-white border-gray-200"
              }`}
            >
              <GlobeIcon size={18} />
            </button>

            {/* Login */}
            {!token && (
              <Link
                to="/login"
                className="hidden md:block px-3 py-2 rounded-md bg-indigo-600 text-white"
              >
                Login / Register
              </Link>
            )}

            {/* Avatar */}
            {token && (
              <div className="relative group">
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

                  {/* Online */}
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-gray-900" />
                </button>

                {/* Tooltip */}
                <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition bg-black text-white text-xs px-2 py-1 rounded">
                  {userName}
                </div>

                {/* Dropdown */}
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
                      onClick={() => setAvatarOpen(false)}
                      className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      Account
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Mobile button */}
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
        <div
          className={`md:hidden px-4 py-4 ${
            theme === "dark" ? "bg-gray-900" : "bg-white"
          }`}
        >
          <NavLink to="/" className={mobileLinkClass}>
            Home
          </NavLink>
          <NavLink to="/about" className={mobileLinkClass}>
            About
          </NavLink>
          <NavLink to="/services" className={mobileLinkClass}>
            Services
          </NavLink>
          <NavLink to="/tradespeople" className={mobileLinkClass}>
            Tradespeople
          </NavLink>
          <NavLink to="/contact" className={mobileLinkClass}>
            Contact
          </NavLink>

          {/* Mobile theme + language */}
          <div className="flex gap-3 mt-4 pt-4 border-t border-gray-700/40">
            <button
              onClick={toggleTheme}
              className={`flex-1 flex justify-center p-2 rounded-md border ${
                theme === "dark"
                  ? "bg-gray-800 border-gray-700"
                  : "bg-white border-gray-200"
              }`}
            >
              {theme === "light" ? <Sun size={16} /> : <Moon size={16} />}
            </button>

            <button
              className={`flex-1 flex justify-center p-2 rounded-md border ${
                theme === "dark"
                  ? "bg-gray-800 border-gray-700"
                  : "bg-white border-gray-200"
              }`}
            >
              <GlobeIcon size={16} />
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
