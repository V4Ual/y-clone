import { api } from "@axiosApi/index";

export const fetchUserDetails = async (channelData) => {
  try {
    const response = await api.get("/v1/user/details");
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};
