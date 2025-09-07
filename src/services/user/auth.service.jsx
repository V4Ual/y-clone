import { api } from "@axiosApi/index";

export const fetchLogin = async (userData) => {
  try {
    const response = await api.post("/v1/user/auth/login", userData, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const fetchRefreshToken = async () => {
  try {
    const response = await api.get("/v1/user/auth/refresh", {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};
