"use client";
import { SurahListSidebarProps } from "@/types/Interface";
import { Surah } from "@/types/typeLib";
import clsx from "clsx";
import React, { useEffect, useState } from "react";

export default function SurahListSidebar({
  openSurahList,
  activeSurah,
  setActiveSurah,
}: SurahListSidebarProps) {
  const [allSurahData, setAllSurahData] = useState<Surah[]>([]);

  useEffect(() => {
    const fetchAllSurah = async () => {
      const response = await fetch(`https://api.alquran.cloud/v1/surah`);
      const json = await response.json();

      setAllSurahData(json.data);
    };
    fetchAllSurah();
  }, []);
  console.log(allSurahData);
  return (
    <section
      className={clsx(
        "w-full lg:w-80 border-r  border-border flex flex-col md:hidden lg:flex bg-background",
        openSurahList ? " " : " hidden",
      )}
    >
      <div className="p-4 flex gap-2">
        <button className="flex-1 bg-primary py-2 rounded text-sm font-medium text-primary-foreground border border-border">
          Surah
        </button>
        <button className="flex-1 py-2 rounded text-sm font-medium text-muted-foreground">
          Juz
        </button>
        <button className="flex-1 py-2 rounded text-sm font-medium text-muted-foreground">
          Page
        </button>
      </div>
      <div className="flex-1 overflow-y-auto custom-scrollbar px-4 pb-4 flex flex-col gap-2">
        {allSurahData.map((surah) => {
          const isActive = activeSurah === surah.number;

          return (
            <div
              key={surah.number}
              onClick={() => {
                setActiveSurah(surah.number);
              }}
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
            </div>
          );
        })}
      </div>
    </section>
  );
}
