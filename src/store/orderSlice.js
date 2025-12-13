import { createSlice } from "@reduxjs/toolkit";

const orderSlice = createSlice({
  name: "order",
  initialState: {
    services: [], // selected services
  },
  reducers: {
    addService: (state, action) => {
      const exists = state.services.find((s) => s.id === action.payload.id);
      if (!exists) {
        state.services.push(action.payload);
      }
    },
    removeService: (state, action) => {
      state.services = state.services.filter((s) => s.id !== action.payload);
    },
    clearOrder: (state) => {
      state.services = [];
    },
  },
});

export const { addService, removeService, clearOrder } = orderSlice.actions;

export default orderSlice.reducer;
