import { configureStore } from "@reduxjs/toolkit";

import themeReducer from "./themeSlice";
import LangReducer from "./LangSlice";
import orderReducer from "./orderSlice";

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    lang: LangReducer,
    order: orderReducer,
  },
});
