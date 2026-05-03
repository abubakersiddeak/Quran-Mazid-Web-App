import { Bookmark, House, Blocks, Book } from "lucide-react";
import Image from "next/image";
import React from "react";

export default function LeftSidebar() {
  return (
    <aside className="w-16 border-r border-border flex-col items-center justify-center py-6 gap-8 hidden md:flex bg-background">
      <div className="absolute top-2 cursor-pointer">
        <Image src={"/mainicon.png"} height={40} width={40} alt="Icon" />
      </div>

      <div className="flex flex-col gap-6 items-center text-muted-foreground cursor-pointer">
        <button
          title="Home"
          className="p-2 cursor-pointer rounded-lg transition-all duration-300 text-muted-foreground hover:text-primary hover:bg-accent hover:shadow-[0_0_15px_hsl(var(--primary))] group"
        >
          <House
            size={24}
            className="group-hover:scale-110 transition-transform"
          />
          <span
            className="absolute left-17 -translate-x-1/2 
    hidden group-hover:block 
    text-xs px-2 py-1 rounded-md whitespace-nowrap bg-popover text-popover-foreground border border-border"
          >
            Home
          </span>
        </button>
        <button
          title="Read Quran"
          className="p-2 cursor-pointer rounded-lg transition-all duration-300 text-muted-foreground hover:text-primary hover:bg-accent hover:shadow-[0_0_15px_hsl(var(--primary))] group"
        >
          <Book size={20} />
          <span
            className="absolute left-17 -translate-x-1/2 
    hidden group-hover:block 
    text-xs bg-popover text-popover-foreground px-2 py-1 rounded-md whitespace-nowrap border border-border"
          >
            Read Quran
          </span>
        </button>
        <button
          title="Bookmark"
          className="p-2 cursor-pointer rounded-lg transition-all duration-300 text-muted-foreground hover:text-primary hover:bg-accent hover:shadow-[0_0_15px_hsl(var(--primary))] group"
        >
          <Bookmark size={20} />
          <span
            className="absolute left-17 -translate-x-1/2 
    hidden group-hover:block 
    text-xs bg-popover text-popover-foreground px-2 py-1 rounded-md whitespace-nowrap border border-border"
          >
            Bookmark
          </span>
        </button>
        <button className="p-2 cursor-pointer rounded-lg transition-all duration-300 text-muted-foreground hover:text-primary hover:bg-accent hover:shadow-[0_0_15px_hsl(var(--primary))] group">
          <Blocks size={20} />
          <span
            className="absolute left-17 -translate-x-1/2 
    hidden group-hover:block 
    text-xs bg-popover text-popover-foreground px-2 py-1 rounded-md whitespace-nowrap border border-border"
          >
            Others
          </span>
        </button>
      </div>
    </aside>
  );
}
