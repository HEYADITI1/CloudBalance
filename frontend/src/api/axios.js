import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  res => res,
  err => {
    const status = err.response?.status;

    if (status === 401) {
      // Token invalid / expired
      localStorage.removeItem("token");
      window.location.href = "/login";
    }

    if (status === 403) {
      // Logged in but not authorized
      window.location.href = "/not-authorized";
    }

    return Promise.reject(err);
  }
);

export default api;
