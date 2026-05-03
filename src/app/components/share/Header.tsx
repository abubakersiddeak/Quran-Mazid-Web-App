import { Heart, Search, Settings, SunMoon, LucideIcon } from "lucide-react";
import React from "react";

const NAV_ITEMS = [
  { icon: Search, label: "Search" },
  { icon: SunMoon, label: "Theme" },
  { icon: Settings, label: "Settings" },
];
const IconButton = ({ Icon, label }: { Icon: LucideIcon; label: string }) => (
  <div className="group relative flex h-9 w-9 items-center justify-center transition-all duration-300">
    <button className="absolute inset-0 cursor-pointer rounded-full border border-gray-700 bg-[#1a1a1a] transition-all group-hover:border-green-600 group-hover:bg-green-500/10 group-hover:shadow-[0_0_15px_rgba(34,197,94,0.3)]" />

    <Icon
      className="z-10 text-gray-500 transition-colors group-hover:text-green-500 cursor-pointer"
      size={18}
    />

    <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 scale-0 rounded-md bg-black px-2 py-1 text-[10px] text-white transition-all group-hover:scale-100 z-20 shadow-xl border border-gray-800">
      {label}
    </span>
  </div>
);

export default function Header() {
  return (
    <header className="flex h-16 items-center justify-between border-b border-gray-800 bg-[#0f0f0f] px-6">
      <div>
        <h1 className="text-xl font-bold text-white tracking-tight">
          Quran Mazid
        </h1>
        <p className="text-[10px] uppercase tracking-[0.2em] text-gray-500">
          Read, Study, and Learn The Quran
        </p>
      </div>

      <div className="flex items-center gap-3">
        <div className="hidden items-center gap-3 sm:flex">
          {NAV_ITEMS.map((item) => (
            <IconButton key={item.label} Icon={item.icon} label={item.label} />
          ))}
        </div>

        <button className="ml-2 flex cursor-pointer items-center gap-2 rounded-full bg-green-600 px-4 py-2 text-xs font-bold text-white transition-all hover:bg-green-700 active:scale-95 shadow-lg shadow-green-900/20">
          Support Us <Heart size={14} fill="currentColor" />
        </button>
      </div>
    </header>
  );
}
