import React from "react";
import VideoCard from "./VideoCard";

const VideoGrid = ({ videos, userDetails, playVideo }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6">
      {videos?.data?.map((video) => (
        <VideoCard
          playVideo={playVideo}
          key={video.id}
          video={video}
          userDetails={userDetails}
        />
      ))}
    </div>
  );
};

export default VideoGrid;
