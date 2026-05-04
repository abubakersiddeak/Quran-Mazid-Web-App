"use client";
import { Heart, Search, Settings, LucideIcon, Menu } from "lucide-react";
import { ModeToggle } from "../ModeToggle";
import { HeaderProps } from "@/types/Interface";
import { useFont } from "@/context/FontContext";

const IconButton = ({
  Icon,
  label,
  onClick,
}: {
  Icon: LucideIcon;
  label: string;
  onClick?: () => void;
}) => (
  <button
    onClick={onClick}
    aria-label={label}
    className="
      group relative cursor-pointer flex h-9 w-9 items-center justify-center
      rounded-full border border-border bg-card
      transition-all duration-300
      hover:border-primary hover:bg-accent
      hover:shadow-[0_0_15px_hsl(var(--primary))]
      active:scale-95
    "
  >
    <Icon
      size={18}
      className="
        text-muted-foreground transition-colors
        group-hover:text-primary
      "
    />

    {/* tooltip */}
    <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 scale-0 rounded-md bg-popover px-2 py-1 text-[10px] text-popover-foreground transition-all group-hover:scale-100 z-20 shadow-xl border border-border">
      {label}
    </span>
  </button>
);

export default function Header({
  handleBurgarClick,
  handleSearchClick,
}: HeaderProps) {
  const { setIsSettingsOpen } = useFont();

  const handleSettings = () => {
    setIsSettingsOpen(true);
  };

  const NAV_ITEMS = [
    { icon: Search, label: "Search", action: handleSearchClick },
    { icon: Settings, label: "Settings", action: handleSettings },
  ];

  return (
    <header className="flex h-16 items-center justify-between border-b border-border px-6 bg-background">
      <div className="flex md:block gap-2 justify-center items-center">
        <button
          onClick={handleBurgarClick}
          className="md:hidden p-2 rounded-md hover:bg-accent transition"
        >
          <Menu />
        </button>

        <h1 className="text-xl font-bold text-foreground tracking-tight">
          Quran Mazid
        </h1>

        <p className="text-[10px] hidden md:block uppercase tracking-[0.2em] text-muted-foreground">
          Read, Study, and Learn The Quran
        </p>
      </div>

      <div className="flex items-center gap-3">
        <div className="flex items-center gap-3">
          {NAV_ITEMS.map((item) => (
            <IconButton
              key={item.label}
              Icon={item.icon}
              label={item.label}
              onClick={item.action}
            />
          ))}

          <ModeToggle />
        </div>

        <button
          onClick={() => alert("Thank you for your support!")}
          className="
            ml-2 hidden md:flex cursor-pointer items-center gap-2
            rounded-full bg-primary px-4 py-2 text-xs font-bold
            text-primary-foreground transition-all
            hover:bg-primary/90 active:scale-95
            shadow-lg
          "
        >
          Support Us <Heart size={14} fill="currentColor" />
        </button>
      </div>
    </header>
  );
}
