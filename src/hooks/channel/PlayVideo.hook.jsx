import { fetchVideoDetails } from "@services/index";
import { urlDataGet } from "@utils/index";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";

export const usePlayVideoHook = () => {
  const urlParams = urlDataGet();
  const videoId = urlParams.get("v");
  const [videoDetails, setVideoDetails] = useState();

  const fetchVideo = async () => {
    const response = await fetchVideoDetails(videoId);
    if (response.status) {
      setVideoDetails(response.data);
    } else {
      toast.error(response.message);
    }
  };

  useEffect(() => {
    fetchVideo();
  }, [videoId]);

  return {
    videoDetails,
  };
};
