import axios from "axios";
import { BASE_URL } from "./apiEndpoints";
import { clearAuthData, getStoredToken } from "./authStorage";

const axiosConfig = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

const excludeEndpoints = ["/login", "/register", "/status", "/activate", "/health"];

axiosConfig.interceptors.request.use(
  (config) => {
    const shouldSkipToken = excludeEndpoints.some((endpoint) =>
      config.url?.startsWith(endpoint),
    );

    if (!shouldSkipToken) {
      const accessToken = getStoredToken();

      if (accessToken) {
        config.headers = config.headers || {};
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
    }

    return config;
  },
  (error) => Promise.reject(error),
);

axiosConfig.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const { status } = error.response;

      if (status === 401 && window.location.pathname !== "/login") {
        clearAuthData();
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
