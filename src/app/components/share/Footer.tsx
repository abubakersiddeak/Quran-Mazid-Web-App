import { Moon, MoreHorizontal, PlayIcon, Settings } from "lucide-react";

import React from "react";

export default function Footer() {
  return (
    <footer className="h-20 border-t border-border px-6 flex items-center justify-between bg-background">
      <div className="hidden sm:block">
        <h4 className="text-sm font-bold text-foreground">Al Fatihah : 7</h4>
        <p className="text-[11px] text-muted-foreground">
          Mishary Rashid Alafasy
        </p>
      </div>

      <div className="flex flex-col items-center gap-1 flex-1 max-w-md mx-auto">
        <div className="flex items-center gap-6">
          <button className="text-muted-foreground hover:text-foreground">
            <MoreHorizontal size={18} />
          </button>
          <button className="text-primary-foreground bg-primary rounded-full p-2">
            <PlayIcon size={20} fill="currentColor" />
          </button>
          <button className="text-muted-foreground hover:text-foreground">
            <Settings size={18} />
          </button>
        </div>
        <div className="w-full flex items-center gap-3">
          <span className="text-[10px] text-muted-foreground">00:34</span>
          <div className="h-1 bg-muted flex-1 rounded-full overflow-hidden">
            <div className="h-full bg-primary w-1/3"></div>
          </div>
          <span className="text-[10px] text-muted-foreground">05:20</span>
        </div>
      </div>

      <div className="hidden md:flex items-center gap-4 text-muted-foreground">
        <Moon size={18} />
        <Settings size={18} />
      </div>
    </footer>
  );
}
