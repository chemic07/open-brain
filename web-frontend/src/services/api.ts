import axios from "axios";

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
      window.location.href = "/auth/signin"; // Force redirect to login
    }
    return Promise.reject(error);
  },
);

export default api;
