import React from "react";

import { useDispatch, useSelector } from "react-redux";
import { setThemeMode } from "../store/themeSlice";

const Navbar = () => {
  const theme = useSelector((state) => state.theme.mode);
  const dispatch = useDispatch();

  const setTheme = () => {
    dispatch(setThemeMode(theme === "light" ? "dark" : "light"));
  };
  return (
    <div>
      <p className="text-2xl font-medium"> Navbar </p>

      <button
        onClick={() => setTheme(theme)}
        className={`${
          theme === "dark"
            ? "bg-transparent hover:bg-gray-800"
            : "bg-gray-100 hover:bg-gray-200"
        } px-4 py-1 rounded shadow-md`}
      >
        {theme === "light" ? "Light" : "Dark"}
      </button>
    </div>
  );
};

export default Navbar;
