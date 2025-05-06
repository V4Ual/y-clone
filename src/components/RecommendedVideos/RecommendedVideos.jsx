import React from "react";
import VideoCard from "./VideoCard";

const RecommendedVideos = ({ videos, handleVideoWatch }) => {
  return (
    <div className="flex flex-col gap-3">
      {videos &&
        videos.map((video) => <VideoCard handleVideoWatch={handleVideoWatch}  key={video.id} video={video} />)}
    </div>
  );
};

export default RecommendedVideos;
