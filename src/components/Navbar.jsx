import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setThemeMode } from "../store/themeSlice";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { GlobeIcon, Moon, Sun, Menu, X } from "lucide-react";
import { userLogout } from "../services/auth";

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [avatarOpen, setAvatarOpen] = useState(false);

  const theme = useSelector((state) => state.theme.mode);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userToken = localStorage.getItem("token");

  const handleLogout = async () => {
    await userLogout();
    localStorage.removeItem("token");
    navigate("/");
  };

  const setTheme = () => {
    dispatch(setThemeMode(theme === "light" ? "dark" : "light"));
  };

  const navClass =
    theme === "dark"
      ? "bg-gradient-to-r from-gray-900 via-gray-800 to-black shadow-lg"
      : "bg-gray-50 border-b border-gray-100 shadow-sm";

  const linkClass = ({ isActive }) =>
    `px-2 py-2 text-base font-medium transition-all duration-200 relative ${
      isActive
        ? "text-[#372b70] after:content-[''] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-[#372b70]"
        : theme === "dark"
        ? "text-gray-300 hover:text-white"
        : "text-gray-700 hover:text-[#372b70]"
    }`;

  const mobileLinkClass = ({ isActive }) =>
    `block py-3 px-4 text-base font-medium transition-all duration-200 ${
      isActive
        ? "text-[#372b70] bg-purple-50 dark:bg-gray-800"
        : theme === "dark"
        ? "text-gray-300 hover:text-white hover:bg-gray-800"
        : "text-gray-700 hover:text-[#372b70] hover:bg-gray-50"
    }`;

  return (
    <div className="w-full flex justify-center  ">
      <nav
        className={` w-[90%] p-3  top-8 rounded-3xl z-50 mt-8  shadow-gray-400  transition-all duration-300 ${navClass}`}
      >
        <div className="flex justify-between items-center h-20 mx-auto">
          {/* Logo */}
          <Link to="/" className="flex flex-col items-center gap-3 group">
            <div className="w-12 h-12 rounded-full bg-[#372b70] flex items-center justify-center shadow-md group-hover:shadow-lg transition-all duration-300">
              <svg width="32" height="32" viewBox="0 0 100 100" fill="none">
                <circle cx="50" cy="50" r="20" fill="white" opacity="0.3" />
                <circle cx="50" cy="50" r="12" fill="white" />
                <path
                  d="M50 10 L50 30 M50 70 L50 90 M10 50 L30 50 M70 50 L90 50"
                  stroke="white"
                  strokeWidth="3"
                />
                <circle cx="50" cy="20" r="4" fill="white" />
                <circle cx="50" cy="80" r="4" fill="white" />
                <circle cx="20" cy="50" r="4" fill="white" />
                <circle cx="80" cy="50" r="4" fill="white" />
              </svg>
            </div>
            <div className="hidden sm:block">
              <div
                className={`text-sm font-medium ${
                  theme === "dark" ? "text-gray-400" : "text-gray-500"
                }`}
              >
                Tradesmen Online Limited
              </div>
            </div>
          </Link>

          <div className="flex ">

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-2">
            <NavLink to="/" className={linkClass}>
              Home
            </NavLink>
            <NavLink to="/directory" className={linkClass}>
              Directory
            </NavLink>
            <NavLink to="/about" className={linkClass}>
              About us
            </NavLink>
            <NavLink to="/sme-awards" className={linkClass}>
              SME Awards
            </NavLink>
          </div>

          {/* Right Side Buttons */}
          <div className="hidden lg:flex items-center gap-3">
            {!userToken ? (
              <>
                <Link
                  to="/homeowner"
                  className="px-4 py-2.5 rounded-full bg-[#372b70] text-white text-sm hover:bg-[#2d2259] transition-all duration-300 shadow-md hover:shadow-lg"
                >
                  Homeowner
                </Link>
                <Link
                  to="/tradesperson"
                  className="px-4 py-2.5 rounded-full border-2 border-[#372b70] text-[#372b70] text-sm hover:bg-[#372b70] hover:text-white transition-all duration-300"
                >
                  Tradesperson
                </Link>
              </>
            ) : (
              <div className="relative">
                <button
                  onClick={() => setAvatarOpen((v) => !v)}
                  className="w-10 h-10 rounded-full bg-[#372b70] text-white font-medium flex items-center justify-center shadow-md hover:shadow-lg transition-all duration-300"
                >
                  U
                </button>
                {avatarOpen && (
                  <div
                    className={`absolute right-0 mt-2 w-48 rounded-lg shadow-xl overflow-hidden z-50 ${
                      theme === "dark"
                        ? "bg-gray-800 text-gray-100"
                        : "bg-white text-gray-900"
                    }`}
                  >
                    <Link
                      to="/account"
                      className="block px-4 py-3 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                      onClick={() => setAvatarOpen(false)}
                    >
                      Account
                    </Link>
                    <Link
                      to="/settings"
                      className="block px-4 py-3 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                      onClick={() => setAvatarOpen(false)}
                    >
                      Settings
                    </Link>
                    <button
                      onClick={async () => {
                        setAvatarOpen(false);
                        await handleLogout();
                      }}
                      className="w-full text-left px-4 py-3 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors border-t border-gray-200 dark:border-gray-700"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Theme Toggle */}
            <button
              onClick={setTheme}
              className={`p-2 rounded-lg border transition-all duration-300 ${
                theme === "dark"
                  ? "border-gray-700 bg-gray-800 text-gray-200 hover:bg-gray-700"
                  : "border-gray-200 bg-white text-gray-700 hover:bg-gray-50"
              }`}
            >
              {theme === "light" ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            {/* Language */}
            <button
              className={`px-2 py-2 rounded-lg border text-sm font-medium transition-all duration-300 ${
                theme === "dark"
                  ? "border-gray-700 bg-gray-800 text-gray-200 hover:bg-gray-700"
                  : "border-gray-200 bg-white text-gray-700 hover:bg-gray-50"
              }`}
            >
              AR / EN
            </button>
          </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileOpen((v) => !v)}
            className={`lg:hidden p-2 rounded-lg transition-all duration-300 ${
              theme === "dark"
                ? "text-gray-300 hover:bg-gray-800"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div
            className={`lg:hidden border-t transition-all duration-300 ${
              theme === "dark"
                ? "border-gray-800 bg-gray-900"
                : "border-gray-100 bg-white"
            }`}
          >
            <div className="px-4 py-4 space-y-1">
              <NavLink
                to="/"
                className={mobileLinkClass}
                onClick={() => setMobileOpen(false)}
              >
                Home
              </NavLink>
              <NavLink
                to="/directory"
                className={mobileLinkClass}
                onClick={() => setMobileOpen(false)}
              >
                Directory
              </NavLink>
              <NavLink
                to="/about"
                className={mobileLinkClass}
                onClick={() => setMobileOpen(false)}
              >
                About us
              </NavLink>
              <NavLink
                to="/sme-awards"
                className={mobileLinkClass}
                onClick={() => setMobileOpen(false)}
              >
                SME Awards
              </NavLink>

              <div className="pt-4 border-t border-gray-200 dark:border-gray-700 space-y-3">
                {!userToken ? (
                  <>
                    <Link
                      to="/homeowner"
                      className="block text-center px-6 py-3 rounded-full bg-[#372b70] text-white font-medium shadow-md"
                      onClick={() => setMobileOpen(false)}
                    >
                      Homeowner
                    </Link>
                    <Link
                      to="/tradesperson"
                      className="block text-center px-6 py-3 rounded-full border-2 border-[#372b70] text-[#372b70] font-medium"
                      onClick={() => setMobileOpen(false)}
                    >
                      Tradesperson
                    </Link>
                  </>
                ) : (
                  <button
                    onClick={handleLogout}
                    className="w-full px-6 py-3 rounded-full bg-red-600 text-white font-medium"
                  >
                    Logout
                  </button>
                )}

                <div className="flex gap-3 justify-center pt-2">
                  <button
                    onClick={setTheme}
                    className={`p-3 rounded-lg border ${
                      theme === "dark"
                        ? "border-gray-700 bg-gray-800 text-gray-200"
                        : "border-gray-200 bg-white text-gray-700"
                    }`}
                  >
                    {theme === "light" ? <Sun size={20} /> : <Moon size={20} />}
                  </button>
                  <button
                    className={`px-4 py-3 rounded-lg border text-sm font-medium ${
                      theme === "dark"
                        ? "border-gray-700 bg-gray-800 text-gray-200"
                        : "border-gray-200 bg-white text-gray-700"
                    }`}
                  >
                    AR / EN
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </nav>
    </div>
  );
};

export default Navbar;
