import React from "react";
import { MoreVertical, BadgeCheck } from "lucide-react";

const VideoCard = ({ video, handleVideoWatch }) => {
  return (
    <div
      className="flex gap-3 group"
      onClick={() => handleVideoWatch(video.video_id)}
    >
      <div className="w-40 h-24 flex-shrink-0 relative rounded-lg overflow-hidden">
        <img
          src={video.thumbnail}
          alt={video.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-1 right-1 bg-black bg-opacity-80 px-1 text-xs rounded">
          {video.duration}
        </div>
      </div>

      <div className="flex-grow flex flex-col">
        <div className="flex justify-between">
          <h3 className="font-medium text-sm line-clamp-2 group-hover:text-blue-400 transition-colors">
            {video.title}
          </h3>
          <button className="opacity-0 group-hover:opacity-100 transition-opacity">
            <MoreVertical className="w-4 h-4" />
          </button>
        </div>

        <div className="mt-1 flex items-center text-xs text-gray-400">
          <span>{video.channel}</span>
          {video.isVerified && <BadgeCheck className="w-3 h-3 ml-1" />}
        </div>

        <div className="text-xs text-gray-400 mt-1">
          <span>{video.views} views</span>
          <span className="mx-1">•</span>
          <span>{video.timePosted}</span>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
