"use client";
import React, { useState, useEffect, useMemo, useRef } from "react";
import { Search, X, Hash } from "lucide-react";
import { AyahWithAudio } from "@/types/audio";
import { HighlightedText } from "./HighlightedText";
import { filterAyahs, debounce } from "@/lib/search";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  ayahs: AyahWithAudio[];
  activeSurah: number;
}

export default function SearchModal({
  isOpen,
  onClose,
  ayahs,
  activeSurah,
}: SearchModalProps) {
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  // Debounce logic
  const updateDebouncedQuery = useMemo(
    () => debounce((q: string) => setDebouncedQuery(q), 300),
    []
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    updateDebouncedQuery(e.target.value);
  };

  // Filter ayahs
  const filteredAyahs = useMemo(() => {
    if (!debouncedQuery.trim()) return [];
    return filterAyahs(ayahs, debouncedQuery);
  }, [ayahs, debouncedQuery]);

  // Focus input on open
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Keyboard support (ESC)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[10vh] px-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className="relative w-full max-w-2xl bg-background border border-border shadow-2xl rounded-2xl overflow-hidden animate-in zoom-in-95 duration-200">
        {/* Search Input */}
        <div className="flex items-center p-4 gap-3 border-b border-border">
          <Search className="text-primary" size={20} />
          <input
            ref={inputRef}
            type="text"
            className="flex-1 bg-transparent outline-none text-base placeholder:text-muted-foreground"
            placeholder="Search Ayahs (Arabic or English)..."
            value={query}
            onChange={handleInputChange}
          />
          <button
            onClick={onClose}
            className="p-1 hover:bg-accent rounded-md transition-colors"
          >
            <X size={20} className="text-muted-foreground" />
          </button>
        </div>

        {/* Results Area */}
        <div className="max-h-[60vh] overflow-y-auto custom-scrollbar p-2">
          {!debouncedQuery.trim() ? (
            <div className="py-12 text-center text-muted-foreground">
              <Search className="mx-auto mb-3 opacity-20" size={40} />
              <p className="text-sm">Type to search for verses in this Surah</p>
            </div>
          ) : filteredAyahs.length === 0 ? (
            <div className="py-12 text-center text-muted-foreground">
              <p className="text-sm">No results found for &quot;{debouncedQuery}&quot;</p>
            </div>
          ) : (
            <div className="space-y-1">
              <p className="px-3 py-1 text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                Found {filteredAyahs.length} results
              </p>
              {filteredAyahs.map((ayah) => (
                <div
                  key={ayah.number}
                  className="w-full text-left p-4 rounded-xl hover:bg-accent transition-all border border-transparent hover:border-border group cursor-pointer"
                  onClick={onClose} // Typically you'd navigate here
                >
                  <div className="flex items-center gap-2 mb-2">
                    <Hash size={14} className="text-primary" />
                    <span className="text-[10px] font-bold text-muted-foreground">
                      AYAH {activeSurah} : {ayah.numberInSurah}
                    </span>
                  </div>
                  <div className="quran-text text-right text-lg mb-2 leading-relaxed">
                    <HighlightedText text={ayah.arabic} query={debouncedQuery} />
                  </div>
                  <p className="text-xs text-muted-foreground italic line-clamp-2">
                    <HighlightedText text={ayah.translation} query={debouncedQuery} />
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer info */}
        <div className="p-3 bg-accent/30 border-t border-border text-[10px] text-muted-foreground flex justify-between px-6 font-medium">
          <span>CLOSE: ESC</span>
          <span>SEARCH IN CURRENT SURAH</span>
        </div>
      </div>
    </div>
  );
}
