import axios from "axios";
import { config } from "../config/config";

const api = axios.create({
  baseURL: config.BASE_API,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
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
  function (error) {
    if (error.response.status === 400) {
      console.log("ERROR:", error.message);
    } else if (error.response.status === 403) {
      console.log("ERROR:", error.message);
    } else if (error.response.status === 409) {
      console.log("ERROR:", error.message);
    } else {
      console.log("ERROR:", error.message);
    }

    return Promise.reject(error);
  }
);

export { api };
