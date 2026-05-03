import { Search } from "lucide-react";
import React from "react";

export default function Header() {
  return (
    <header className="h-16 border-b border-gray-800 flex items-center justify-between px-6 bg-[#0f0f0f]">
      <div>
        <h1 className="text-xl font-bold text-white">Quran Mazid</h1>
        <p className="text-[10px] text-gray-500 uppercase tracking-widest">
          Read, Study, and Learn The Quran
        </p>
      </div>
      <div className="flex items-center gap-4">
        <div className="relative hidden sm:block">
          <Search className="absolute left-3 top-2 text-gray-500" size={18} />
          <input
            type="text"
            placeholder="Search Surah"
            className="bg-[#1a1a1a] border border-gray-700 rounded-md py-1.5 pl-10 pr-4 text-sm focus:outline-none focus:border-green-600 w-64"
          />
        </div>
        <button className="bg-green-600 hover:bg-green-700 text-white text-xs font-semibold px-4 py-2 rounded-md">
          Support Us ❤️
        </button>
      </div>
    </header>
  );
}
