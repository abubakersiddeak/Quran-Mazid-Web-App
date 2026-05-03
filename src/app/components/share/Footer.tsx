import { Moon, MoreHorizontal, PlayIcon, Settings } from "lucide-react";

import React from "react";

export default function Footer() {
  return (
    <footer className="h-20 border-t border-gray-800 bg-[#0f0f0f] px-6 flex items-center justify-between">
      <div className="hidden sm:block">
        <h4 className="text-sm font-bold text-white">Al Fatihah : 7</h4>
        <p className="text-[11px] text-gray-500">Mishary Rashid Alafasy</p>
      </div>

      <div className="flex flex-col items-center gap-1 flex-1 max-w-md mx-auto">
        <div className="flex items-center gap-6">
          <button className="text-gray-500 hover:text-white">
            <MoreHorizontal size={18} />
          </button>
          <button className="text-white bg-green-600 rounded-full p-2">
            <PlayIcon size={20} fill="white" />
          </button>
          <button className="text-gray-500 hover:text-white">
            <Settings size={18} />
          </button>
        </div>
        <div className="w-full flex items-center gap-3">
          <span className="text-[10px] text-gray-500">00:34</span>
          <div className="h-1 bg-gray-800 flex-1 rounded-full overflow-hidden">
            <div className="h-full bg-green-600 w-1/3"></div>
          </div>
          <span className="text-[10px] text-gray-500">05:20</span>
        </div>
      </div>

      <div className="hidden md:flex items-center gap-4 text-gray-500">
        <Moon size={18} />
        <Settings size={18} />
      </div>
    </footer>
  );
}
