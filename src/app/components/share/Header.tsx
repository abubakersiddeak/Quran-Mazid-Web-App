"use client";
import { Heart, Search, Settings, LucideIcon } from "lucide-react";
import { ModeToggle } from "../ModeToggle";

const IconButton = ({
  Icon,
  label,
  onClick,
}: {
  Icon: LucideIcon;
  label: string;
  onClick?: () => void;
}) => (
  <div className="group relative flex h-9 w-9 items-center justify-center transition-all duration-300">
    <button
      onClick={onClick}
      className="absolute inset-0 cursor-pointer rounded-full border border-border bg-card transition-all group-hover:border-primary group-hover:bg-accent group-hover:shadow-[0_0_15px_hsl(var(--primary))]"
    />

    <Icon
      className="z-10 text-muted-foreground transition-colors group-hover:text-primary cursor-pointer"
      size={18}
    />

    <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 scale-0 rounded-md bg-popover px-2 py-1 text-[10px] text-popover-foreground transition-all group-hover:scale-100 z-20 shadow-xl border border-border">
      {label}
    </span>
  </div>
);

export default function Header() {
  const handleSearch = () => alert("Search Clicked");

  const handleSettings = () => console.log("Settings Opened");
  const NAV_ITEMS = [
    { icon: Search, label: "Search", action: handleSearch },

    { icon: Settings, label: "Settings", action: handleSettings },
  ];
  return (
    <header className="flex h-16 items-center justify-between border-b border-border px-6 bg-background">
      <div>
        <h1 className="text-xl font-bold text-foreground tracking-tight">
          Quran Mazid
        </h1>
        <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
          Read, Study, and Learn The Quran
        </p>
      </div>

      <div className="flex items-center gap-3">
        <div className="hidden items-center gap-3 sm:flex">
          {NAV_ITEMS.map((item) => (
            <IconButton
              key={item.label}
              Icon={item.icon}
              label={item.label}
              onClick={item.action}
            />
          ))}
        </div>
        <ModeToggle />
        <button
          onClick={() => alert("Thank you for your support!")}
          className="ml-2 flex cursor-pointer items-center gap-2 rounded-full bg-primary px-4 py-2 text-xs font-bold text-primary-foreground transition-all hover:bg-primary/90 active:scale-95 shadow-lg"
        >
          Support Us <Heart size={14} fill="currentColor" />
        </button>
      </div>
    </header>
  );
}
