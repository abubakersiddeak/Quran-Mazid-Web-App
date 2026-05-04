"use client";
import { useAudio } from "@/context/AudioContext";
import { useFont } from "@/context/FontContext";
import { MainProps } from "@/types/Interface";
import { useFontFamily } from "@/hooks/useFontFamily";
import { AyahWithAudio } from "@/types/audio";
import { Bookmark, MoreHorizontal, Play } from "lucide-react";
import Image from "next/image";
import React, { useMemo, useRef, useEffect } from "react";

/**
 * Main component displays Quranic text with translations and audio
 * Fetches data from Al-Quran Cloud API and displays ayahs (verses)
 * Allows users to play audio, bookmark, and customize font sizes
 */
export default function Main({ activeSurah, ayahs, surahInfo }: MainProps) {
  const { handlePlay, playingAyah } = useAudio();
  const { arabicSize, translationSize, arabicFont } = useFont();
  const fontFamilyStyle = useFontFamily(arabicFont);
  const ayahRefs = useRef<Record<number, HTMLDivElement | null>>({});

  /**
   * Auto-scroll to currently playing ayah
   */
  useEffect(() => {
    if (!playingAyah?.number) return;

    const el = ayahRefs.current[playingAyah.number];
    if (el) {
      el.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [playingAyah?.number]);

  /**
   * Memoize the final ayahs to avoid recalculation on every render
   * Only recalculates if ayahs change
   */
  const finalAyahs = useMemo(() => ayahs, [ayahs]);

  // Show placeholder when no surah is selected
  if (!activeSurah) {
    return (
      <main className="flex-1 flex items-center justify-center bg-background">
        <div className="text-center space-y-3 px-4">
          <h2 className="text-xl md:text-2xl font-bold text-foreground">
            No Surah Selected
          </h2>
          <p className="text-sm text-muted-foreground">
            Please select a Surah from the list to start reading
          </p>
          <div className="text-4xl">📖</div>
        </div>
      </main>
    );
  }

  // Show empty state if no ayahs loaded
  if (finalAyahs.length === 0) {
    return (
      <main className="flex-1 flex items-center justify-center bg-background">
        <div className="text-center space-y-3 px-4">
          <h2 className="text-xl md:text-2xl font-bold text-foreground">
            No Ayahs Found
          </h2>
          <p className="text-sm text-muted-foreground">
            Unable to load verses for this Surah
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="flex-1 overflow-y-auto p-4 lg:p-0 lg:pt-4 custom-scrollbar bg-background">
      <div className="mx-auto">
        {/* SURAH HEADER */}
        <div className="mb-10 px-4 lg:px-6 flex flex-col md:grid md:grid-cols-3 items-center text-center gap-4">
          <Image
            src="/mosque_89014.png"
            alt="madina"
            height={80}
            width={80}
            className="md:h-30 md:w-35"
          />

          <div>
            <h2 className="text-2xl md:text-3xl font-bold">
              Surah {surahInfo?.englishName || "Select"}
            </h2>
            <p className="text-muted-foreground text-sm">
              Ayah - {ayahs.length}, {surahInfo?.revelationType}
            </p>
          </div>

          <div className="text-3xl md:text-4xl text-primary quran-text">
            {surahInfo?.name}
          </div>
        </div>

        {/* AYAHS LIST */}
        <div className="space-y-0">
          {finalAyahs.map((ayah: AyahWithAudio) => (
            <AyahItem
              key={ayah.number}
              ayah={ayah}
              activeSurah={activeSurah}
              isPlaying={playingAyah?.number === ayah.number}
              onPlay={() =>
                handlePlay(ayah, surahInfo?.englishName || "", finalAyahs)
              }
              arabicSize={arabicSize}
              arabicFontFamily={fontFamilyStyle}
              translationSize={translationSize}
              ref={(el) => {
                ayahRefs.current[ayah.number] = el;
              }}
            />
          ))}
        </div>
      </div>
    </main>
  );
}

/**
 * AyahItem component - displays a single verse with actions
 */
interface AyahItemProps {
  ayah: AyahWithAudio;
  activeSurah: number;
  isPlaying: boolean;
  onPlay: () => void;
  arabicSize: number;
  arabicFontFamily: string;
  translationSize: number;
}

const AyahItem = React.forwardRef<HTMLDivElement, AyahItemProps>(
  (
    {
      ayah,
      activeSurah,
      isPlaying,
      onPlay,
      arabicSize,
      arabicFontFamily,
      translationSize,
    },
    ref,
  ) => {
    const handleNotDeveloped = () => {
      alert("This feature is not developed yet");
    };

    return (
      <div
        ref={ref}
        className={`mb-8 px-4 lg:px-6 md:mb-12 border-b border-border pb-6 md:pb-10 transition ${
          isPlaying ? "bg-height p-4" : ""
        }`}
      >
        <div className="flex flex-col md:flex-row gap-4 md:gap-6">
          {/* AYAH ACTIONS */}
          <div className="flex flex-row md:flex-col items-center justify-between md:justify-start gap-4 text-muted-foreground border-b md:border-none pb-2 md:pb-0">
            <span className="text-primary font-bold text-base md:text-lg">
              {activeSurah}:{ayah.numberInSurah}
            </span>

            <div className="flex md:flex-col gap-4">
              <Play
                size={18}
                onClick={onPlay}
                className={`cursor-pointer transition ${
                  isPlaying ? "text-green-500 scale-110" : "hover:text-primary"
                }`}
              />
              <Bookmark
                size={18}
                onClick={handleNotDeveloped}
                className="cursor-pointer hover:text-primary"
              />
              <MoreHorizontal
                size={18}
                onClick={handleNotDeveloped}
                className="cursor-pointer hover:text-primary"
              />
            </div>
          </div>

          {/* AYAH CONTENT */}
          <div className="flex-1">
            {/* ARABIC TEXT */}
            <div
              className="text-right text-2xl md:text-3xl leading-12 md:leading-16 mb-6 quran-text"
              style={{
                fontSize: `${arabicSize}px`,
                fontFamily: arabicFontFamily,
              }}
              dir="rtl"
            >
              {ayah.arabic}
            </div>

            {/* TRANSLATION LABEL */}
            <div
              className="text-primary/70 text-[9px] md:text-[10px] uppercase mb-2 tracking-widest font-semibold"
              style={{ fontSize: `${translationSize}px` }}
            >
              Muhammad Asad (Translation)
            </div>

            {/* ENGLISH TRANSLATION */}
            <div
              className="text-muted-foreground text-base md:text-lg leading-relaxed italic"
              style={{ fontSize: `${translationSize}px` }}
            >
              {ayah.translation}
            </div>
          </div>
        </div>
      </div>
    );
  },
);

AyahItem.displayName = "AyahItem";
