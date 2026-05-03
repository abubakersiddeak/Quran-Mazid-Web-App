import { Bookmark, House, Blocks, Book } from "lucide-react";
import Image from "next/image";
import React from "react";

export default function LeftSidebar() {
  return (
    <aside className="w-16 border-r border-gray-800 flex flex-col items-center justify-center py-6 gap-8 hidden md:flex">
      <div className="absolute top-2 cursor-pointer">
        <Image src={"/mainicon.png"} height={40} width={40} alt="Icon" />
      </div>

      <div className="flex flex-col gap-6 items-center text-gray-500 cursor-pointer">
        <button
          title="Home"
          className="p-2 cursor-pointer rounded-lg transition-all duration-300 text-gray-500 hover:text-green-500 hover:bg-green-500/10 hover:shadow-[0_0_15px_rgba(34,197,94,0.3)] group"
        >
          <House
            size={24}
            className="group-hover:scale-110 transition-transform"
          />
          <span
            className="absolute left-17 -translate-x-1/2 
    hidden group-hover:block 
    text-xs bg-black text-white px-2 py-1 rounded-md whitespace-nowrap"
          >
            Home
          </span>
        </button>
        <button
          title="Read Quran"
          className="p-2 cursor-pointer rounded-lg transition-all duration-300 text-gray-500 hover:text-green-500 hover:bg-green-500/10 hover:shadow-[0_0_15px_rgba(34,197,94,0.3)] group"
        >
          <Book size={20} />
          <span
            className="absolute left-17 -translate-x-1/2 
    hidden group-hover:block 
    text-xs bg-black text-white px-2 py-1 rounded-md whitespace-nowrap"
          >
            Read Quran
          </span>
        </button>
        <button
          title="Bookmark"
          className="p-2 cursor-pointer rounded-lg transition-all duration-300 text-gray-500 hover:text-green-500 hover:bg-green-500/10 hover:shadow-[0_0_15px_rgba(34,197,94,0.3)] group"
        >
          <Bookmark size={20} />
          <span
            className="absolute left-17 -translate-x-1/2 
    hidden group-hover:block 
    text-xs bg-black text-white px-2 py-1 rounded-md whitespace-nowrap"
          >
            Bookmark
          </span>
        </button>
        <button className="p-2 cursor-pointer rounded-lg transition-all duration-300 text-gray-500 hover:text-green-500 hover:bg-green-500/10 hover:shadow-[0_0_15px_rgba(34,197,94,0.3)] group">
          <Blocks size={20} />
          <span
            className="absolute left-17 -translate-x-1/2 
    hidden group-hover:block 
    text-xs bg-black text-white px-2 py-1 rounded-md whitespace-nowrap"
          >
            Others
          </span>
        </button>
      </div>
    </aside>
  );
}
