import React, { useState } from "react";
import { ThumbsUp, ThumbsDown, MoreHorizontal } from "lucide-react";

const VideoInfo = ({ title, views, published }) => {
  return (
    <div className="mt-4">
      <h1 className="text-xl font-bold">{title}</h1>
      <div className="flex items-center mt-2 text-sm text-gray-400">
        <span>{views} views</span>
        <span className="mx-1">•</span>
        <span>{published}</span>
      </div>
    </div>
  );
};

export default VideoInfo;
