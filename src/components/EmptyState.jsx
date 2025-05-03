import React from "react";
import { VideoOff } from "lucide-react";

const EmptyState = ({ searchQuery }) => {
  return (
    <div className="flex flex-col items-center justify-center py-16">
      <VideoOff className="w-16 h-16 text-gray-700 mb-4" />
      <h2 className="text-xl font-semibold text-gray-200 mb-2">
        No videos found
      </h2>
      <p className="text-gray-400 text-center max-w-md">
        {searchQuery ? (
          <>
            No videos match your search for "
            <span className="font-medium text-gray-300">{searchQuery}</span>".
          </>
        ) : (
          <>No videos available. Please check back later.</>
        )}
      </p>
    </div>
  );
};

export default EmptyState;
