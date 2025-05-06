import axios from "axios";
import { config } from "../config/config";
import Cookies from "js-cookie";
import { fetchRefreshToken } from "@services/index";

axios.defaults.withCredentials = true;

const api = axios.create({
  baseURL: config.BASE_API,
  withCredentials: true,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access_token");
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  function (response) {
    return response;
  },
  async function (error) {
    const originalRequest = error.config;

    if (error.response?.status === 498 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const response = await fetchRefreshToken();
        const newAccessToken = response.data.accessToken;
        localStorage.setItem("access_token", newAccessToken);
        api.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${newAccessToken}`;
        originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        console.error("Token refresh failed:", refreshError.message);
        return Promise.reject(refreshError);
      }
    }

    if (error.response.status === 400) {
      console.log("ERROR:", error.message);
    } else if (error.response.status === 401) {
      localStorage.removeItem("access_token");
    } else if (error.response.status === 409) {
    } else if (error.response.status === 403) {
      console.log("ERROR:", error.message);
    } else {
      console.log("ERROR:", error.message);
    }

    return Promise.reject(error);
  }
);

export { api };
