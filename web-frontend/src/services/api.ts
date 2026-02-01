import axios from "axios";
import { showToast } from "../utils/toast";

const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_END_POINT,
});

console.log("All Vite Envs:", import.meta.env.VITE_BACKEND_END_POINT);
//sending token with every req
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

//if req failed
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/auth/signin";
    }

    //show not enough token toast
    if (error.response && error.response.status === 403) {
      const errorMessage =
        error.response.data?.message || "Insufficient tokens!";

      showToast({
        type: "error",
        message: "Insufficient tokens!",
        options: {
          duration: 5000,
          description: errorMessage,
        },
      });
    }

    return Promise.reject(error);
  },
);

export default api;
