import { MainProps } from "@/types/Interface";
import { Ayah } from "@/types/typeLib";
import { Bookmark, MoreHorizontal, Play } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";

export default function Main({ activeSurah }: MainProps) {
  const [ayahs, setAyahs] = useState<Ayah[]>([]);
  const [surahInfo, setSurahInfo] = useState<any>(null);
  const [audio, setAudio] = useState<any>(null);

  useEffect(() => {
    if (!activeSurah) return;

    const fetchAyah = async () => {
      // আরবী এবং ইংরেজি অনুবাদ একসাথে পাওয়ার জন্য editions ব্যবহার করা ভালো
      const res = await fetch(
        `https://api.alquran.cloud/v1/surah/${activeSurah}/editions/quran-simple,en.asad`,
      );

      const json = await res.json();
      // json.data[0] হলো আরবী এবং [1] হলো ইংরেজি
      setAyahs(json.data[0].ayahs);
      setSurahInfo(json.data[0]);
    };

    fetchAyah();
  }, [activeSurah]);
  useEffect(() => {
    if (!activeSurah) return;

    const fetchAyah = async () => {
      const res = await fetch(
        `https://api.alquran.cloud/v1/surah/${activeSurah}/editions/ar.alafasy,en.asad`,
      );

      const json = await res.json();

      setAudio(json.data);
    };

    fetchAyah();
  }, [activeSurah]);
  console.log(audio, "audio");
  return (
    <main className="flex-1 overflow-y-auto p-4 lg:p-10 custom-scrollbar bg-background">
      <div className="max-w-4xl mx-auto">
        {/* HEADER - Mobile Friendly */}
        <div className="mb-10 flex flex-col md:grid md:grid-cols-3 items-center text-center gap-4 relative">
          <Image
            src="/mosque_89014.png"
            alt="madina"
            height={80}
            width={80}
            className="md:h-30 md:w-37.5"
          />

          <div>
            <h2 className="text-2xl md:text-3xl font-bold">
              Surah {surahInfo?.englishName || "Select Surah"}
            </h2>
            <p className="text-muted-foreground text-sm">
              Ayah - {ayahs.length}, {surahInfo?.revelationType}
            </p>
          </div>

          <div className="text-3xl md:text-4xl text-primary quran-text">
            {surahInfo?.name}
          </div>
        </div>

        {/* AYAH LIST */}
        {ayahs.map((ayah) => (
          <div
            key={ayah.number}
            className="mb-8 md:mb-12 border-b border-border pb-6 md:pb-10"
          >
            {/* Mobile: Column, Desktop: Row */}
            <div className="flex flex-col md:flex-row gap-4 md:gap-6">
              {/* ACTION ICONS - Fixed for Mobile */}
              <div className="flex flex-row md:flex-col items-center justify-between md:justify-start gap-4 text-muted-foreground pt-0 md:pt-2 border-b md:border-none pb-2 md:pb-0">
                <span className="text-primary font-bold text-base md:text-lg">
                  {activeSurah}:{ayah.numberInSurah}
                </span>

                <div className="flex md:flex-col gap-4">
                  <Play
                    size={18}
                    className="cursor-pointer hover:text-primary transition-colors"
                  />
                  <Bookmark
                    size={18}
                    className="cursor-pointer hover:text-primary transition-colors"
                  />
                  <MoreHorizontal
                    size={18}
                    className="cursor-pointer hover:text-primary transition-colors"
                  />
                </div>
              </div>

              {/* CONTENT */}
              <div className="flex-1">
                {/* ARABIC - Larger on Mobile */}
                <div
                  className="text-right text-2xl md:text-3xl leading-[3rem] md:leading-[4rem] mb-6 quran-text"
                  dir="rtl"
                >
                  {ayah.text}
                </div>

                {/* LABEL */}
                <div className="text-primary/70 text-[9px] md:text-[10px] uppercase mb-2 tracking-widest font-semibold">
                  Muhammad Asad (Translation)
                </div>

                {/* TRANSLATION */}
                <div className="text-muted-foreground text-base md:text-lg leading-relaxed italic">
                  {/* আপনি যদি অনুবাদ ডাটা লোড করেন তবে সেটি এখানে বসবে */}
                  The translation text will appear here.
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
