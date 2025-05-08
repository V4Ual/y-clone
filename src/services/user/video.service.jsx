import { api } from "@axiosApi/index";

export const fetchVideoListDetails = async (all) => {
  try {
    const response = await api.get(`/v1/user/video/list?isAll=${all}`);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const fetchVideoDetails = async (videoId) => {
  try {
    const response = await api.get(`/v1/user/video/details?videoId=${videoId}`);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const fetchVideoUpload = async (videoData) => {
  try {
    const response = await api.post(`/v1/user/video/create`, videoData);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};
