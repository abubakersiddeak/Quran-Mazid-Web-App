"use client";
import React, { useState, useEffect, useMemo } from "react";
import { Search, Hash, X } from "lucide-react";
import { Surah, Ayah } from "@/types/typeLib";

interface AyahSearchResult extends Ayah {
  surahNumber: number;
  translation: string;
}

interface GlobalSearchProps {
  allSurahs: Surah[];
  allAyahs: AyahSearchResult[];
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  onSelect: (type: "surah" | "ayah", data: Surah | AyahSearchResult) => void;
}

export default function GlobalSearch({
  allSurahs,
  allAyahs,
  isOpen,
  setIsOpen,
  onSelect,
}: GlobalSearchProps) {
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    if (query.trim().length < 2) return { surahs: [], ayahs: [] };
    const q = query.toLowerCase();

    const surahs = allSurahs
      .filter(
        (s) =>
          s.englishName.toLowerCase().includes(q) || s.number.toString() === q,
      )
      .slice(0, 5);

    const ayahs = allAyahs
      .filter(
        (a) =>
          a.text.includes(q) ||
          a.translation.toLowerCase().includes(q) ||
          `${a.surahNumber}:${a.numberInSurah}`.startsWith(q),
      )
      .slice(0, 10);

    return { surahs, ayahs };
  }, [query, allSurahs, allAyahs]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setIsOpen(!isOpen);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, setIsOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[10vh] px-4">
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200"
        onClick={() => setIsOpen(false)}
      />

      <div className="relative w-full max-w-2xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 shadow-2xl rounded-3xl overflow-hidden animate-in zoom-in-95 duration-200">
        <div className="flex items-center p-5 gap-3 border-b dark:border-zinc-800">
          <Search className="text-primary" size={22} />
          <input
            autoFocus
            className="flex-1 bg-transparent outline-none text-lg placeholder:text-zinc-400"
            placeholder="Surah, Ayah or translation"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button
            onClick={() => setIsOpen(false)}
            className="p-1 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg"
          >
            <X size={20} className="text-zinc-400" />
          </button>
        </div>

        <div className="max-h-[65vh] overflow-y-auto custom-scrollbar p-3">
          {results.surahs.length === 0 &&
          results.ayahs.length === 0 &&
          query.length > 1 ? (
            <div className="py-12 text-center text-zinc-500">
              No results found for &ldquo;{query}&rdquo;.
            </div>
          ) : (
            <div className="space-y-6">
              {results.surahs.length > 0 && (
                <div>
                  <h3 className="px-3 mb-2 text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
                    Surahs
                  </h3>
                  {results.surahs.map((s) => (
                    <button
                      key={s.number}
                      onClick={() => onSelect("surah", s)}
                      className="w-full flex items-center justify-between p-3 rounded-2xl hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-all group"
                    >
                      <div className="flex items-center gap-4">
                        <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary font-bold">
                          {s.number}
                        </div>
                        <div className="text-left">
                          <p className="font-bold text-sm">{s.englishName}</p>
                          <p className="text-xs text-zinc-500">
                            {s.englishNameTranslation}
                          </p>
                        </div>
                      </div>
                      <span className="quran-text text-xl opacity-30 group-hover:opacity-100">
                        {s.name}
                      </span>
                    </button>
                  ))}
                </div>
              )}

              {results.ayahs.length > 0 && (
                <div>
                  <h3 className="px-3 mb-2 text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
                    Ayahs
                  </h3>
                  {results.ayahs.map((a, idx) => (
                    <button
                      key={idx}
                      onClick={() => onSelect("ayah", a)}
                      className="w-full text-left p-4 rounded-2xl hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-all border border-transparent hover:border-primary/10 mb-2 group"
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <Hash size={14} className="text-primary" />
                        <span className="text-[10px] font-bold text-zinc-400">
                          SURAH {a.surahNumber} : AYAH {a.numberInSurah}
                        </span>
                      </div>
                      <p className="quran-text text-right text-base mb-2 leading-relaxed">
                        {a.text}
                      </p>
                      <p className="text-xs text-zinc-500 italic line-clamp-2">
                        {a.translation}
                      </p>
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        <div className="p-3 bg-zinc-50 dark:bg-zinc-900/50 border-t dark:border-zinc-800 text-[10px] text-zinc-400 flex justify-between px-6 font-medium">
          <span>SELECT: ENTER</span>
          <span>NAVIGATE: UP/DOWN</span>
          <span>CLOSE: ESC</span>
        </div>
      </div>
    </div>
  );
}
