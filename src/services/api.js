// src/services/api.js
import axios from "axios";

const api = axios.create({
  baseURL: "https://gp-iti-1c920-default-rtdb.firebaseio.com",
});

export default api;
