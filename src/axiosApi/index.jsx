import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api",
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
    } else if (error.response.status === 401) {
      console.log("ERROR:", error.message);
    } else if (error.response.status === 409) {
      console.log("ERROR:", error.message);
    } else {
      console.log("ERROR:", error.message);
    }

    return Promise.reject(error);
  }
);

export default api;
