import axios from "axios";

const baseURL = import.meta.env.VITE_API_BASE_URL || "https://your-backend-url.herokuapp.com";

export const api = axios.create({
  baseURL,
  withCredentials: false,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("auth_token");
  if (token) {
    config.headers = config.headers ?? {};
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error?.response?.status === 401) {
      // Optionally handle global unauthorized state
      // e.g., redirect to login or clear tokens
    }
    return Promise.reject(error);
  }
);

export default api;