import { fetchVideoListDetails } from "@services/index";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export const useVideoList = (isAll = false) => {
  const userDetails = useSelector((state) => state.user);
  const [channelVideos, setChannelVideos] = useState([]);

  const navigation = useNavigate();

  const fetchVideoList = async () => {
    const response = await fetchVideoListDetails(isAll);
    if (response.status) {
      setChannelVideos((prev) => ({ ...prev, ...response.data }));
    }
  };

  useEffect(() => {
    fetchVideoList();
  }, [isAll]);

  const handleVideoWatch = (videoId) => {
    console.log(videoId);
    navigation(`/watch?v=${videoId}`);
  };

  const createChannel = () => {
    if (userDetails.is_channel) {
      navigation("/channel-details");
    } else {
      navigation("/channel");
    }
  };

  return {
    createChannel,
    handleVideoWatch,
    channelVideos,
  };
};


