import ChannelInfo from "@components/ChannelInfo";
import RecommendedVideos from "@components/RecommendedVideos/RecommendedVideos";
import VideoInfo from "@components/VideoInfo";
import VideoPlayer from "@components/VideoPlayer/VideoPlayer";
import { usePlayVideoHook, useVideoList } from "@hooks/index";
import { formatTime } from "@utils/formate";
import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";

const VideoViewPage = () => {
  const { videoDetails } = usePlayVideoHook();
  const { channelVideos, handleVideoWatch } = useVideoList(true);
  const userDetails = useSelector((state) => state.user);

  return (
    <div className="flex flex-col lg:flex-row gap-6 mt-4">
      <div className="lg:w-2/3">
        <div className="flex flex-col">
          <VideoPlayer videoDetails={videoDetails} />
          <VideoInfo
            title={videoDetails?.title}
            views={videoDetails?.views}
            published={formatTime(videoDetails?.createdAt)}
          />
          {/* <VideoActions likes="2.6K" /> */}
          <ChannelInfo channelInfo={userDetails} />
        </div>
      </div>
      <div className="lg:w-1/3">
        <div className="flex flex-col gap-6">
          {/* <div className="bg-[#212121] rounded-xl overflow-hidden"></div> */}

          <RecommendedVideos
            handleVideoWatch={handleVideoWatch}
            videos={channelVideos?.data}
          />
        </div>
      </div>
    </div>
  );
};

export default VideoViewPage;
