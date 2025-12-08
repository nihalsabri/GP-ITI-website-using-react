import React, { useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { setThemeMode } from "../store/themeSlice";
import { NavLink, Link } from "react-router-dom"; // <- use react-router-dom
import { Moon, Sun } from "lucide-react";

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const theme = useSelector((state) => state.theme.mode);
  const dispatch = useDispatch();

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
        font-semibold
        border-b-2 border-indigo-600 dark:border-indigo-400
        pb-1
      `
        : theme === "dark"
        ? "text-gray-300 hover:text-white font-medium"
        : "text-gray-700 hover:text-indigo-700 font-medium"
    }`;

  // mobile uses same logic but as block
  const mobileLinkClass = ({ isActive }) =>
    `block py-2 ${linkClass({ isActive })}`;

  return (
    <nav
      className={`w-full sticky top-0 z-40 transition-all duration-300 ${navClass}`}
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

            {/* Login/Register لما تتعمل */}
            <button className="px-4 py-2 hidden md:flex rounded-md bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition-shadow shadow">
              Login / Register
            </button>

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

            <div className="flex gap-2 justify-around items-center pt-3 border-t border-gray-700/30">
              <button className="text-center px-3 py-2 rounded-md bg-indigo-600 text-white">
                Login / Register
              </button>
              <div className="flex items-center gap-2 justify-around ">
                <button
                  onClick={setTheme}
                  className=" px-3 py-2 rounded-md border"
                >
                  {theme === "light" ? <Sun size={20} /> : <Moon size={20} />}
                </button>
                <button className=" px-3 py-2 rounded-md border">
                  AR / EN
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
