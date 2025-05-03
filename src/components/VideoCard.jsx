import { formatViews } from "@utils/formate";
import React from "react";
import { Link } from "react-router-dom";

const VideoCard = ({ video }) => {
  return (
    <div className="group cursor-pointer transition-transform duration-300 hover:-translate-y-1">
      <div className="relative rounded-xl overflow-hidden mb-2">
        <img
          src={video.thumbnail}
          alt={video.title}
          className="w-full aspect-video object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute bottom-2 right-2 bg-black/80 px-1.5 py-0.5 rounded text-xs text-white font-medium">
          {video.duration}
        </div>
      </div>

      <div className="flex gap-3">
        <div className="flex-shrink-0">
          <Link to={`/channel/${video.id}`}>
            <div className="w-9 h-9 rounded-full overflow-hidden ring-2 ring-transparent hover:ring-red-500 transition-all duration-300">
              <img
                src={video.channelAvatar}
                alt={video.channelName}
                className="w-full h-full object-cover"
              />
            </div>
          </Link>
        </div>

        <div className="flex-1 overflow-hidden">
          <h3 className="font-medium text-[15px] leading-tight line-clamp-2 mb-1 text-gray-100">
            {video.title}
          </h3>

          <div className="text-sm text-gray-400">
            <Link
              to={`/channel/${video.id}`}
              className="line-clamp-1 hover:text-gray-200 transition-colors duration-200"
            >
              {video.channelName}
            </Link>
            <div className="flex items-center">
              <span>{formatViews(video.views)}</span>
              <span className="mx-1">•</span>
              <span>{video.uploadedAt}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
