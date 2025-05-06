import { formatSubscribers, formatTime } from "@utils/formate";
import React from "react";
import { useNavigate } from "react-router-dom";

const ChannelHeader = ({ channel }) => {
  const navigation = useNavigate();
  return (
    <div className="space-y-4">
      <div className="h-48 w-full overflow-hidden">
        <img
          src={channel?.thumbnail}
          alt={`${channel?.channel_name} banner`}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="flex items-start gap-6 px-6">
        <img
          src={channel?.channel_image}
          alt={channel?.channel_name}
          className="w-24 h-24 rounded-full border-4 border-gray-900"
        />

        <div className="flex-1">
          <h1 className="text-2xl font-bold text-gray-100 mb-1">
            {channel?.channel_name}
          </h1>
          <div className="text-gray-400 text-sm space-y-1">
            <p>
              {/* {formatSubscribers(channel?.subscribers)} subscribers •{" "}
              {channel?.totalViews?.toLocaleString()} views */}
            </p>
            <p>{channel?.description}</p>
            <p>Joined {formatTime(channel?.updated_at)}</p>
          </div>
        </div>

        <div>
          <button
            onClick={() => navigation("/upload")}
            className="border-1 bg-red-600 border-black font-semibold text-black rounded-3xl px-5 py-2"
          >
            Add video
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChannelHeader;
