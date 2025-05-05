import ChannelHeader from "@components/ChannelHeader";
import VideoGrid from "@components/VideoGrid";
import React from "react";
import { useSelector } from "react-redux";

export const ChannelPage = ({channel,channelVideos}) => {
  const userDetails = useSelector(state => state.user)
  
  return (
    <div className="min-h-screen bg-gray-900">
      <ChannelHeader channel={userDetails} />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h2 className="text-xl font-semibold text-gray-100 mb-6">Videos</h2>
        <VideoGrid videos={channelVideos} />
      </div>
    </div>
  );
};
