import React, { useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { setThemeMode } from "../store/themeSlice";
import { NavLink, Link, useNavigate } from "react-router-dom"; // <- use react-router-dom
import { GlobeIcon, Moon, Sun } from "lucide-react";
import { userLogout } from "../services/auth";

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [avatarOpen, setAvatarOpen] = useState(false); // <- avatar dropdown state

  const theme = useSelector((state) => state.theme.mode);
  const dispatch = useDispatch();

  const userToken = localStorage.getItem("token");

  const navigate = useNavigate(); // <-- added so handleLogout can navigate

  const handleLogout = async () => {
    // Put your logout logic here
    // console.log("Logout clicked");
    await userLogout();
    localStorage.removeItem("token");
    navigate("/");
  };

  const setTheme = () => {
    dispatch(setThemeMode(theme === "light" ? "dark" : "light"));
  };

  // Improve contrast for light mode: slightly darker text + subtle border
  const navClass =
    theme === "dark"
      ? "bg-gradient-to-r from-gray-900 via-gray-800 to-black shadow-[0_0_10px_rgba(0,0,0,0.7)]"
      : "bg-white border-b border-gray-200 shadow-sm"; // lighter shadow + border for separation

  // Improved link styles to be more visible in light mode
  const linkClass = ({ isActive }) =>
    `px-3 py-2 text-sm transition-all duration-200 ${
      isActive
        ? `
        text-indigo-500 
        font-bold
        border-b-2 border-indigo-600 dark:border-indigo-400
        pb-1
      `
        : theme === "dark"
        ? "text-gray-300 hover:text-white font-semibold"
        : "text-gray-700 hover:text-indigo-700 font-semibold"
    }`;

  // mobile uses same logic but as block
  const mobileLinkClass = ({ isActive }) =>
    `block py-2 ${linkClass({ isActive })}`;

  return (
    <nav
      className={`w-full sticky top-0 z-40 py-2 transition-all duration-300 ${navClass}`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand */}
          <div className="flex items-center gap-3">
            <Link to="/" className="flex items-center gap-3">
              <div
                className={`w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold shadow-md transition-all duration-300
                ${theme === "dark" ? "bg-indigo-700" : "bg-indigo-600"}`}
              >
                AP
              </div>
              <span
                className={`hidden sm:inline-block text-lg font-semibold transition-all duration-300
                ${theme === "dark" ? "text-gray-100" : "text-gray-900"}`}
              >
                A placeholder for now
              </span>
            </Link>
          </div>

          {/* Desktop */}
          <div className="hidden md:flex md:items-center md:gap-6">
            <NavLink to="/" className={linkClass}>
              Home
            </NavLink>
            <NavLink to="/about" className={linkClass}>
              About
            </NavLink>
            <NavLink to="/services" className={linkClass}>
              Services
            </NavLink>
            <NavLink to="/contact" className={linkClass}>
              Contact
            </NavLink>
          </div>

          <div className="flex items-center gap-3">
            {/* Theme toggle */}
            <button
              onClick={setTheme}
              className={` items-center hidden md:flex gap-2 px-3 py-2 rounded-md border text-sm transition
                 transform hover:scale-105 shadow-sm
                ${
                  theme === "dark"
                    ? "border-gray-700 bg-gray-800 text-gray-200"
                    : "border-gray-200 bg-white text-gray-700"
                }`}
              aria-label="Toggle theme"
            >
              {theme === "light" ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            {/* Language */}
            <button
              className={`px-3 py-2 hidden md:flex rounded-md border text-sm transition transform hover:scale-105 shadow-sm
                ${
                  theme === "dark"
                    ? "border-gray-700 bg-gray-800 text-gray-200"
                    : "border-gray-200 bg-white text-gray-700"
                }`}
              aria-label="Language selector"
            >
              AR / EN
            </button>

            {/* Login/Register لما تتعمل (keep visible only if no token) */}
            {!userToken && (
              <Link
                to="/login"
                className="hidden md:inline-block text-center px-3 py-2 rounded-md bg-indigo-600 text-white"
              >
                Login / Register
              </Link>
            )}

            {/* Avatar (show when token exists) */}
            {userToken && (
              <div className="relative">
                <button
                  onClick={() => setAvatarOpen((v) => !v)}
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-medium shadow-sm transition
                    ${
                      theme === "dark"
                        ? "bg-indigo-700 text-white"
                        : "bg-indigo-600 text-white"
                    }`}
                  aria-label="User menu"
                >
                  {/* Placeholder initial — replace with real user picture when available */}
                  U
                </button>

                {/* Dropdown */}
                {avatarOpen && (
                  <div
                    className={`absolute right-0 mt-2 w-44 rounded-md overflow-hidden shadow-lg z-50 ${
                      theme === "dark"
                        ? "bg-gray-800 text-gray-100"
                        : "bg-white text-gray-900"
                    }`}
                  >
                    <div className="py-2">
                      <Link
                        to="/account"
                        className="block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700"
                        onClick={() => setAvatarOpen(false)}
                      >
                        Account
                      </Link>
                      <Link
                        to="/settings"
                        className="block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700"
                        onClick={() => setAvatarOpen(false)}
                      >
                        Settings
                      </Link>
                      <button
                        onClick={async () => {
                          setAvatarOpen(false);
                          await handleLogout();
                        }}
                        className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700"
                      >
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Mobile button */}
            <div className="md:hidden">
              <button
                onClick={() => setMobileOpen((v) => !v)}
                className={`p-2 rounded-md border transition
                  ${
                    theme === "dark"
                      ? "border-gray-700 bg-gray-800"
                      : "border-gray-200 bg-white"
                  }`}
                aria-label="Open menu"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d={
                      mobileOpen
                        ? "M6 18L18 6M6 6l12 12"
                        : "M3 6h18M3 12h18M3 18h18"
                    }
                    stroke={theme === "dark" ? "#E5E7EB" : "#374151"}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile */}
      {mobileOpen && (
        <div
          className={`md:hidden border-t transition-all duration-300
      ${
        theme === "dark"
          ? "border-gray-800 bg-gray-900"
          : "border-gray-100 bg-white"
      }`}
        >
          <div className="px-4 pt-4 pb-6 space-y-3">
            <NavLink to="/" end className={mobileLinkClass}>
              Home
            </NavLink>
            <NavLink to="/about" className={mobileLinkClass}>
              About Us
            </NavLink>
            <NavLink to="/services" className={mobileLinkClass}>
              Services
            </NavLink>
            <NavLink to="/contact" className={mobileLinkClass}>
              Contact
            </NavLink>

            {/* Divider + bottom section LIKE YOU HAD IT */}
            <div className="flex flex-col gap-3 items-center pt-6 border-t border-gray-700/30">
              {/* Login/Register button (ONLY if no token) */}
              {!userToken && (
                <Link
                  to="/login"
                  className="text-center px-4 py-2 rounded-md bg-indigo-600 text-white shadow hover:bg-indigo-700 transition"
                >
                  Login / Register
                </Link>
              )}

              {/* Theme + Language buttons EXACTLY AS YOU HAD THEM */}
              <div className="flex gap-3 items-center">
                <button
                  onClick={setTheme}
                  className={`px-3 py-2 rounded-md border ${
                    theme === "dark"
                      ? "border-gray-700 bg-gray-800 text-gray-200"
                      : "border-gray-200 bg-white text-gray-700"
                  }`}
                >
                  {theme === "light" ? <Sun size={20} /> : <Moon size={20} />}
                </button>

                <button
                  className={`px-3 py-2 rounded-md border ${
                    theme === "dark"
                      ? "border-gray-700 bg-gray-800 text-gray-200"
                      : "border-gray-200 bg-white text-gray-700"
                  }`}
                >
                  <GlobeIcon size={20} />
                </button>
              </div>

              {/* Logout button (ONLY if logged in) */}
              {userToken && (
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 rounded-md bg-red-600 text-white shadow hover:bg-red-700 transition w-full"
                >
                  Logout
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
