import { fetchPublicVideoList } from "@services/index";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const useVideoListPublicHook = () => {
  const userDetails = useSelector((state) => state.user);
  const [publicVideoList, setPublicVideoList] = useState();
  const navigation = useNavigate();

  const fetchVideoList = async () => {
    const response = await fetchPublicVideoList();
    if (response.status) {
      setPublicVideoList(response.data);
    } else {
      toast.error(response.message);
    }
  };

  useEffect(() => {
    fetchVideoList();
  }, []);

  const handleVideoWatch = (videoId) => {
    navigation(`/watch?v=${videoId}`);
    window.location.reload();
  };
  const createChannel = () => {
    if (userDetails.is_channel) {
      navigation("/channel-details");
    } else {
      navigation("/channel");
    }
  };

  return {
    publicVideoList,
    handleVideoWatch,
    createChannel,
  };
};
