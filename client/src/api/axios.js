import axios from "axios";
import { getAuthToken } from "../utils/cookies";

const instance = axios.create({
  baseURL: "http://localhost:3000",
});

// ✅ Interceptor: tambahkan Authorization header jika ada token
instance.interceptors.request.use((config) => {
  const token = getAuthToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default instance;
