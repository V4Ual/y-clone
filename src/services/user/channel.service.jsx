import { api } from "@axiosApi/index";

export const fetchChannelCreate = async (channelData) => {
  try {
    const response = await api.post("/v1/user/channel/create", channelData);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};
