import { formatSubscribers } from "@utils/formate";
import React from "react";

const ChannelHeader = ({ channel }) => {
  return (
    <div className="space-y-4">
      <div className="h-48 w-full overflow-hidden">
        <img
          src={channel.banner}
          alt={`${channel.name} banner`}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="flex items-start gap-6 px-6">
        <img
          src={channel.avatar}
          alt={channel.name}
          className="w-24 h-24 rounded-full border-4 border-gray-900"
        />

        <div className="flex-1">
          <h1 className="text-2xl font-bold text-gray-100 mb-1">
            {channel.name}
          </h1>
          <div className="text-gray-400 text-sm space-y-1">
            <p>
              {formatSubscribers(channel.subscribers)} subscribers •{" "}
              {channel.totalViews.toLocaleString()} views
            </p>
            <p>{channel.description}</p>
            <p>Joined {channel.joinedDate}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChannelHeader;
