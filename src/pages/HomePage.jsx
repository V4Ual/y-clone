import React, { useState } from "react";
import { Youtube, CirclePlus } from "lucide-react";
import SearchBar from "@components/SearchBar";
import VideoGrid from "@components/VideoGrid";
import EmptyState from "@components/EmptyState";
import { useVideoListPublicHook } from "@hooks/index";

export const HomePage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { publicVideoList, handleVideoWatch, createChannel } =
    useVideoListPublicHook();

  console.log({ publicVideoList });

  return (
    <div className="min-h-screen bg-gray-900">
      <header className="sticky top-0 z-10 bg-gray-900/95 backdrop-blur-sm px-4 py-4 border-b border-gray-700">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center">
            <Youtube className="w-8 h-8 text-red-600 mr-2" />
            <h1 className="text-xl font-bold text-white">YouTube</h1>
          </div>
          <div className="w-full max-w-3xl mx-4">
            <SearchBar
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
            />
          </div>
          <div className="w-8">
            <button onClick={() => createChannel()}>
              <CirclePlus size={40} color="white" strokeWidth={1} />
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6">
        {publicVideoList ? (
          <VideoGrid
            playVideo={handleVideoWatch}
            videos={publicVideoList}
            // userDetails={userDetails}
          />
        ) : (
          <EmptyState searchQuery={searchQuery} />
        )}
      </main>
    </div>
  );
};
