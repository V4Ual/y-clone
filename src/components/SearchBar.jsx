import React from "react";
import { Search, X } from "lucide-react";

const SearchBar = ({ searchQuery, setSearchQuery }) => {
  const handleClearSearch = () => {
    setSearchQuery("");
  };
  return (
    <div className="relative w-full max-w-2xl mx-auto">
      <div className="relative flex items-center">
        <input
          type="text"
          placeholder="Search videos"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full py-3 pl-12 pr-10 bg-gray-800 text-gray-100 rounded-full outline-none focus:ring-2 focus:ring-red-500/20 transition-all duration-300 placeholder-gray-400"
        />
        <Search className="absolute left-4 w-5 h-5 text-gray-400" />

        {searchQuery && (
          <button
            onClick={handleClearSearch}
            className="absolute right-3 p-1 rounded-full hover:bg-gray-700 transition-colors duration-200"
            aria-label="Clear search"
          >
            <X className="w-4 h-4 text-gray-400" />
          </button>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
