import ChannelInfo from "@components/ChannelInfo";
import RecommendedVideos from "@components/RecommendedVideos/RecommendedVideos";
import VideoInfo from "@components/VideoInfo";
import VideoPlayer from "@components/VideoPlayer/VideoPlayer";
import { usePlayVideoHook, useVideoList } from "@hooks/index";
import { formatTime } from "@utils/formate";
import React, { useRef } from "react";
import { useSelector } from "react-redux";

const VideoViewPage = () => {
  const { videoDetails } = usePlayVideoHook();
  const { channelVideos, handleVideoWatch } = useVideoList(true);
  const userDetails = useSelector((state) => state.user);

  console.log(videoDetails);
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
          <div className="bg-[#212121] rounded-xl overflow-hidden">
            {/* <div className="p-4 flex items-start gap-4">
              <div className="w-32 h-18 bg-[#181818] rounded overflow-hidden relative flex-shrink-0">
                <img
                  src="https://images.pexels.com/photos/2873486/pexels-photo-2873486.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                  alt="Next video thumbnail"
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-1 right-1 bg-black bg-opacity-70 px-1 text-xs">
                  4:12
                </div>
              </div>
              <div>
                <h3 className="font-medium text-sm leading-tight line-clamp-2">
                  Next: Pakka Local Full Video Song ["Janatha Garage"]
                </h3>
                <p className="text-sm text-gray-400 mt-1">Mix - Film</p>
              </div>
            </div> */}
          </div>

          {/* <div className="flex overflow-x-auto gap-2 py-2 scrollbar-hide">
            <span className="px-3 py-1 bg-white text-black rounded-full text-sm font-medium whitespace-nowrap">
              All
            </span>
            <span className="px-3 py-1 bg-[#272727] rounded-full text-sm font-medium whitespace-nowrap">
              Anirudh Ravichander
            </span>
            <span className="px-3 py-1 bg-[#272727] rounded-full text-sm font-medium whitespace-nowrap">
              Tamil Cinema
            </span>
            <span className="px-3 py-1 bg-[#272727] rounded-full text-sm font-medium whitespace-nowrap">
              Music Videos
            </span>
          </div> */}

          <RecommendedVideos handleVideoWatch={handleVideoWatch} videos={channelVideos?.data} />
        </div>
      </div>
    </div>
  );
};

export default VideoViewPage;
