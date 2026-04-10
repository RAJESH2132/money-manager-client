import axios from "axios";
import { BASE_URL } from "./apiEndpoints";

const TOKEN_KEY = "token";

const axiosConfig = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Endpoints that do NOT require Authorization header
const excludeEndpoints = [
  "/login",
  "/register",
  "/status",
  "/activate",
  "/health",
];

// Request interceptor
axiosConfig.interceptors.request.use(
  (config) => {
    const shouldSkipToken = excludeEndpoints.some((endpoint) =>
      config.url?.startsWith(endpoint),
    );

    if (!shouldSkipToken) {
      const accessToken = localStorage.getItem(TOKEN_KEY);

      if (accessToken) {
        config.headers = config.headers || {};
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
    }

    return config;
  },
  (error) => Promise.reject(error),
);

// Response interceptor
axiosConfig.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const { status } = error.response;

      if (status === 401 && window.location.pathname !== "/login") {
        // Unauthorized → redirect to login
        window.location.href = "/login";
      } else if (status === 500) {
        console.error("Server error. Please try again later.");
      }
    } else if (error.code === "ECONNABORTED") {
      console.error("Request timeout. Please try again.");
    } else {
      console.error("Network error. Please check your connection.");
    }

    return Promise.reject(error);
  },
);

export default axiosConfig;
