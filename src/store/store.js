import { configureStore } from "@reduxjs/toolkit";

import themeReducer from "./themeSlice";
import langReducer from "./langSlice";
import orderReducer from "./orderSlice";

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    lang: langReducer,
    order: orderReducer,
  },
});
