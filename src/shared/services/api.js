// src/shared/services/api.js
import axios from "axios";

export const api = axios.create({
  baseURL: "https://your-backend.com/api", 
  headers: {
    "Content-Type": "application/json",
  },
});
