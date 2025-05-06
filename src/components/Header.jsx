import React from "react";
import { Search, Menu, Mic, Video, Bell, User } from "lucide-react";

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-[#0F0F0F] z-50 flex items-center justify-between px-4 border-b border-[#272727]">
      <div className="flex items-center">
        {/* <button className="p-2 mr-2 rounded-full hover:bg-[#272727] transition-colors">
          <Menu className="w-6 h-6" />
        </button> */}
        <div className="flex items-center">
          <div className="font-bold text-xl flex items-center">
            <Video className="w-8 h-8 text-red-600 mr-1" />
            <span>YouTube</span>
          </div>
        </div>
      </div>

      <div className="hidden md:flex items-center flex-grow max-w-2xl mx-8">
        <div className="flex w-full">
          <input
            type="text"
            placeholder="Search"
            className="w-full px-4 py-2 bg-[#121212] border border-[#303030] rounded-l-full focus:outline-none focus:border-blue-500"
          />
          <button className="bg-[#222222] px-5 rounded-r-full border border-l-0 border-[#303030] hover:bg-[#272727] transition-colors">
            <Search className="w-5 h-5 text-white" />
          </button>
        </div>
        {/* <button className="ml-4 p-2 bg-[#181818] rounded-full hover:bg-[#272727] transition-colors">
          <Mic className="w-5 h-5" />
        </button> */}
      </div>

      <div className="flex items-center">
        {/* <button className="p-2 mx-1 rounded-full hover:bg-[#272727] transition-colors">
          <Video className="w-6 h-6" />
        </button>
        <button className="p-2 mx-1 rounded-full hover:bg-[#272727] transition-colors">
          <Bell className="w-6 h-6" />
        </button>
        <button className="w-8 h-8 mx-2 rounded-full bg-purple-600 flex items-center justify-center">
          <User className="w-5 h-5" />
        </button> */}
      </div>
    </header>
  );
};

export default Header;
