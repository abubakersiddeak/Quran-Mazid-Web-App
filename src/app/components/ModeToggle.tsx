"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

export function ModeToggle() {
  const { setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="group relative flex h-9 w-9 items-center justify-center transition-all duration-300">
          <button
            className="cursor-pointer absolute inset-0 cursor-pointer rounded-full border border-gray-700 bg-[#1a1a1a] transition-all 
                       group-hover:border-green-600 group-hover:bg-green-500/10 
                       group-hover:shadow-[0_0_15px_rgba(34,197,94,0.3)] active:scale-90"
          />

          <Sun className="z-10 h-[18px] w-[18px] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90 text-gray-500 group-hover:text-green-500" />
          <Moon className="absolute z-10 h-[18px] w-[18px] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0 text-gray-500 group-hover:text-green-500" />

          {/* Tooltip */}
          <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 scale-0 rounded-md bg-black px-2 py-1 text-[10px] text-white transition-all group-hover:scale-100 z-20 shadow-xl border border-gray-800">
            Theme
          </span>
        </div>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="bg-[#0f0f0f] border-gray-800 text-gray-300"
      >
        <DropdownMenuItem
          className="cursor-pointer hover:bg-green-500/10 focus:bg-green-500/10"
          onClick={() => setTheme("light")}
        >
          Light
        </DropdownMenuItem>
        <DropdownMenuItem
          className="cursor-pointer hover:bg-green-500/10 focus:bg-green-500/10"
          onClick={() => setTheme("dark")}
        >
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem
          className="cursor-pointer hover:bg-green-500/10 focus:bg-green-500/10"
          onClick={() => setTheme("system")}
        >
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
