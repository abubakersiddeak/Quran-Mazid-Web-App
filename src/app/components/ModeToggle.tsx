"use client";

import * as React from "react";
import { Moon, Sun, SunMoon } from "lucide-react";
import { useTheme } from "next-themes";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";

export function ModeToggle() {
  const { setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="group  relative flex rounded-full h-9 w-9 items-center justify-center transition-all duration-300">
          <Button className=" absolute inset-0 cursor-pointer h-9 w-9 rounded-full border  border-border bg-card transition-all group-hover:border-primary group-hover:bg-accent group-hover:shadow-[0_0_15px_hsl(var(--primary))]" />

          <SunMoon className="z-10  text-muted-foreground transition-colors group-hover:text-primary cursor-pointer" />

          <span className="absolute text-popover-foreground bg-popover -bottom-8 left-1/2 -translate-x-1/2 scale-0 rounded-md  px-2 py-1 text-[10px]  transition-all group-hover:scale-100 z-20 shadow-xl border border-border">
            Theme
          </span>
        </div>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className=" ">
        <DropdownMenuItem
          className="cursor-pointer "
          onClick={() => setTheme("light")}
        >
          Light
        </DropdownMenuItem>
        <DropdownMenuItem
          className="cursor-pointer "
          onClick={() => setTheme("dark")}
        >
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem
          className="cursor-pointer"
          onClick={() => setTheme("system")}
        >
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
