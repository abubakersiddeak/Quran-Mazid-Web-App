"use client";
import { SurahListSidebarProps } from "@/types/Interface";
import { Surah } from "@/types/typeLib";
import clsx from "clsx";
import Link from "next/link";
import { Search } from "lucide-react";
import React, { useState, useMemo } from "react";

export default function SurahListSidebar({
  openSurahList,
  activeSurah,
  allSurahs,
}: SurahListSidebarProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const handleNotDeveloped = () => {
    alert("This feature is not developed yet");
  };

  const filteredSurahs = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();
    if (!query) return allSurahs;

    return allSurahs.filter(
      (s) =>
        s.englishName.toLowerCase().includes(query) ||
        s.number.toString() === query,
    );
  }, [allSurahs, searchQuery]);

  return (
    <section
      className={clsx(
        "w-full lg:w-80 border-r  border-border flex flex-col md:hidden lg:flex bg-background",
        openSurahList ? " " : " hidden",
      )}
    >
      <div className="p-4 flex flex-col gap-4">
        {/* TAB BUTTONS */}
        <div className="flex gap-2">
          <button className="flex-1 bg-primary py-2 cursor-pointer rounded text-sm font-medium text-primary-foreground border border-border">
            Surah
          </button>
          <button
            onClick={handleNotDeveloped}
            className="flex-1 py-2 rounded text-sm cursor-pointer font-medium text-muted-foreground hover:bg-accent transition-colors"
          >
            Juz
          </button>
          <button
            onClick={handleNotDeveloped}
            className="flex-1 py-2 rounded text-sm font-medium cursor-pointer text-muted-foreground hover:bg-accent transition-colors"
          >
            Page
          </button>
        </div>

        {/* SEARCH INPUT */}
        <div className="relative">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
            size={16}
          />
          <input
            type="text"
            placeholder="Search Surah..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-muted/50 border border-border rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-primary/30 transition-all"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar px-4 pb-4 flex flex-col gap-2">
        {filteredSurahs.length === 0 ? (
          <p className="text-center text-xs text-muted-foreground py-10">
            No surah found
          </p>
        ) : (
          filteredSurahs.map((surah) => {
            const isActive = activeSurah === surah.number;

            return (
              <Link
                key={surah.number}
                href={`/surah/${surah.number}`}
                className={`flex items-center p-3 rounded-lg cursor-pointer transition-colors ${
                  isActive
                    ? "bg-accent border border-primary/30"
                    : "hover:bg-muted"
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-md flex items-center justify-center text-sm font-bold mr-4 ${
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {surah.number}
                </div>

                <div>
                  <h3
                    className={`text-sm font-semibold ${
                      isActive ? "text-foreground" : "text-muted-foreground"
                    }`}
                  >
                    {surah.englishName}
                  </h3>

                  <p className="text-[11px] text-muted-foreground">
                    {surah.englishNameTranslation}
                  </p>
                </div>
              </Link>
            );
          })
        )}
      </div>
    </section>
  );
}
