import { useAudio } from "@/context/AudioContext";
import { useFont } from "@/context/FontContext";
import { MainProps } from "@/types/Interface";
import { Bookmark, MoreHorizontal, Play } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState, useRef } from "react";

export default function Main({ activeSurah }: MainProps) {
  const [ayahs, setAyahs] = useState<any[]>([]);
  const [surahInfo, setSurahInfo] = useState<any>(null);
  const [audioAyahs, setAudioAyahs] = useState<any[]>([]);
  const { handlePlay, playingAyah } = useAudio();
  const { arabicSize, translationSize, arabicFont } = useFont();
  const ayahRefs = useRef<Record<number, HTMLDivElement | null>>({});
  // 1st API → TEXT + TRANSLATION
  useEffect(() => {
    if (!activeSurah) return;

    const fetchText = async () => {
      const res = await fetch(
        `https://api.alquran.cloud/v1/surah/${activeSurah}/editions/quran-simple,en.asad`,
      );
      const json = await res.json();

      const arabic = json.data[0];
      const english = json.data[1];

      const mergedText = arabic.ayahs.map((a: any, i: number) => ({
        number: a.number,
        numberInSurah: a.numberInSurah,
        arabic: a.text,
        translation: english.ayahs[i].text,
      }));

      setAyahs(mergedText);
      setSurahInfo(arabic);
    };

    fetchText();
  }, [activeSurah]);

  // 2nd API → AUDIO ONLY
  useEffect(() => {
    if (!activeSurah) return;

    const fetchAudio = async () => {
      const res = await fetch(
        `https://api.alquran.cloud/v1/surah/${activeSurah}/ar.alafasy`,
      );
      const json = await res.json();

      setAudioAyahs(json.data.ayahs);
    };

    fetchAudio();
  }, [activeSurah]);

  //  FINAL MERGE (text + audio)
  const finalAyahs = ayahs.map((a) => {
    const audioMatch = audioAyahs.find((audio) => audio.number === a.number);

    return {
      ...a,
      audio: audioMatch?.audio,
    };
  });
  useEffect(() => {
    if (!playingAyah?.number) return;

    const el = ayahRefs.current[playingAyah.number];

    if (el) {
      el.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [playingAyah]);
  const surahEnName = surahInfo?.englishName;
  const getFontFamily = (fontName: string) => {
    switch (fontName) {
      case "Amiri":
        return "'Amiri', serif";
      case "Scheherazade":
        return "'Scheherazade New', serif";
      case "KFGQ":
        return "'KFGQPC', serif";
      default:
        return "'KFGQPC', serif";
    }
  };
  return (
    <main className="flex-1 overflow-y-auto p-4 lg:p-0 lg:pt-4 custom-scrollbar bg-background">
      <div className=" mx-auto">
        {/* HEADER */}
        <div className="mb-10 px-4 lg:px-6 flex flex-col md:grid md:grid-cols-3 items-center text-center gap-4">
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
              Ayah - {finalAyahs.length}, {surahInfo?.revelationType}
            </p>
          </div>

          <div className="text-3xl md:text-4xl text-primary quran-text">
            {surahInfo?.name}
          </div>
        </div>

        {/* AYAH LIST */}
        {finalAyahs.map((ayah) => (
          <div
            key={ayah.number}
            ref={(el) => {
              ayahRefs.current[ayah.number] = el;
            }}
            className={`mb-8 px-4 lg:px-6 md:mb-12 border-b border-border pb-6 md:pb-10 transition ${
              playingAyah?.number === ayah.number ? "bg-height p-4" : ""
            }`}
          >
            <div className="flex flex-col md:flex-row gap-4 md:gap-6">
              {/* ACTIONS */}
              <div className="flex flex-row md:flex-col items-center justify-between md:justify-start gap-4 text-muted-foreground border-b md:border-none pb-2 md:pb-0">
                <span className="text-primary font-bold text-base md:text-lg">
                  {activeSurah}:{ayah.numberInSurah}
                </span>

                <div className="flex md:flex-col gap-4">
                  <Play
                    size={18}
                    onClick={() => handlePlay(ayah, surahEnName, finalAyahs)}
                    className={`cursor-pointer transition ${
                      playingAyah?.number === ayah.number
                        ? "text-green-500 scale-110"
                        : "hover:text-primary"
                    }`}
                  />
                  <Bookmark
                    size={18}
                    className="cursor-pointer hover:text-primary"
                  />
                  <MoreHorizontal
                    size={18}
                    className="cursor-pointer hover:text-primary"
                  />
                </div>
              </div>

              {/* CONTENT */}
              <div className="flex-1">
                <div
                  className="text-right text-2xl md:text-3xl leading-12 md:leading-16 mb-6 quran-text"
                  style={{
                    fontSize: `${arabicSize}px`,
                    fontFamily: getFontFamily(arabicFont),
                  }}
                  dir="rtl"
                >
                  {ayah.arabic}
                </div>

                <div
                  className="text-primary/70 text-[9px] md:text-[10px] uppercase mb-2 tracking-widest font-semibold"
                  style={{ fontSize: `${translationSize}px` }}
                >
                  Muhammad Asad (Translation)
                </div>

                <div
                  className="text-muted-foreground text-base md:text-lg leading-relaxed italic"
                  style={{ fontSize: `${translationSize}px` }}
                >
                  {ayah.translation}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
