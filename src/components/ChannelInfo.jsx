import React, { useState } from "react";
import { BadgeCheck } from "lucide-react";

const ChannelInfo = ({ channelInfo, isVerified = false }) => {
  const [isSubscribed, setIsSubscribed] = useState(false);
  
  console.log({channelInfo})

  return (
    <div className="flex items-start justify-between py-4">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-600 to-blue-500 flex items-center justify-center text-lg font-bold">
          M
        </div>
        <div>
          <div className="flex items-center gap-1">
            <h3 className="font-medium">{channelInfo?.channel_name}</h3>
            {isVerified && <BadgeCheck className="w-4 h-4 text-gray-400" />}
          </div>
          <p className="text-sm text-gray-400">0 subscribers</p>
        </div>
      </div>

      <button
        className={`px-4 py-2 rounded-full font-medium transition-colors ${
          isSubscribed
            ? "bg-[#272727] text-white hover:bg-[#3a3a3a]"
            : "bg-white text-black hover:bg-gray-200"
        }`}
        onClick={() => setIsSubscribed(!isSubscribed)}
      >
        {isSubscribed ? "Subscribed" : "Subscribe"}
      </button>
    </div>
  );
};

export default ChannelInfo;
