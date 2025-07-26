import axios from "axios";
import { jotaiStore, accessTokenAtom, userAtom } from "../store/store";

// const API_URL = "http://localhost:5000/api";
const API_URL = `${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}`;

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const accessToken = jotaiStore.get(accessTokenAtom);
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401) {
      const isAuthEndpoint =
        originalRequest.url.includes("/auth/login") ||
        originalRequest.url.includes("/auth/register");

      if (isAuthEndpoint) {
        console.warn(
          "401 received on an authentication endpoint. Letting the component handle the error.",
        );
        return Promise.reject(error);
      } else {
        console.error(
          "Unauthorized access on protected route: Access token invalid or expired. Forcing logout.",
        );
        jotaiStore.set(accessTokenAtom, null);
        jotaiStore.set(userAtom, null);
        localStorage.removeItem("accessToken");
        localStorage.removeItem("user");
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  },
);

export default api;
