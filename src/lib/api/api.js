// lib/api.js
import axios from "axios";

// const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000";

const api = axios.create({
  baseURL: "https://backend-orpin-nu-20.vercel.app/",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
