import axios from "axios";
import { getCookie } from "cookies-next";

const axiosClient = axios.create({
  baseURL: process.env.BACK_END_SERVICES,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosClient.interceptors.request.use(
  (config) => {
    const token = getCookie("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosClient;
