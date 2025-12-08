// themeSlice.js
import { createSlice } from "@reduxjs/toolkit";

// Load saved theme OR fallback to light
const savedTheme = localStorage.getItem("theme") || "light";

const themeSlice = createSlice({
  name: "theme",
  initialState: {
    mode: savedTheme, // load from localStorage on startup
  },
  reducers: {
    toggleThemeMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
      localStorage.setItem("theme", state.mode); // save change
    },
    setThemeMode: (state, action) => {
      state.mode = action.payload;
      localStorage.setItem("theme", action.payload); // save change
    },
  },
});

export const { toggleThemeMode, setThemeMode } = themeSlice.actions;
export default themeSlice.reducer;
