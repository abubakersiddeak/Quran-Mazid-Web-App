"use client";
import React, { useState } from "react";
import { useFont } from "@/context/FontContext";
import { ArabicFontType } from "@/types/context";
import { X, Settings, Type, ChevronRight } from "lucide-react";

export default function SettingsSidebar() {
  const {
    isSettingsOpen,
    setIsSettingsOpen,
    arabicSize,
    setArabicSize,
    translationSize,
    setTranslationSize,
    arabicFont,
    setArabicFont,
  } = useFont();

  const [fontOpen, setFontOpen] = useState(false);

  /**
   * Available Arabic font options with descriptions
   */
  const fontOptions: Array<{
    value: ArabicFontType;
    label: string;
    desc: string;
  }> = [
    { value: "KFGQ", label: "KFGQ (Meem)", desc: "Uthmanic Script Style" },
    {
      value: "Amiri",
      label: "Amiri (Classic)",
      desc: "Traditional Arabic Feel",
    },
    {
      value: "Scheherazade",
      label: "Scheherazade New",
      desc: "Modern Elegant Script",
    },
  ];

  if (!isSettingsOpen) return null;

  return (
    <>
      {/* overlay */}
      <div
        className="fixed inset-0 z-50 bg-black/40"
        onClick={() => setIsSettingsOpen(false)}
      />

      {/* sidebar */}
      <div className="fixed right-0 top-0 h-full w-85 bg-white dark:bg-zinc-950 border-l border-zinc-200 dark:border-zinc-800 z-50 shadow-2xl p-6 flex flex-col gap-6 animate-in slide-in-from-right">
        {/* Header */}
        <div className="flex items-center justify-between border-b pb-4 dark:border-zinc-800">
          <div className="flex items-center gap-2 font-bold text-lg dark:text-white">
            <Settings className="text-primary" size={20} />
            <span>Settings</span>
          </div>

          <button
            onClick={() => setIsSettingsOpen(false)}
            className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-900 rounded-full transition-colors cursor-pointer"
          >
            <X size={20} className="dark:text-zinc-400" />
          </button>
        </div>

        {/* Font Section */}
        <div className="flex flex-col gap-8">
          <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-widest">
            <Type size={16} />
            <span>Font Settings</span>
          </div>

          {/* Arabic Font Size */}
          <div className="space-y-4">
            <div className="flex justify-between text-sm font-medium dark:text-zinc-300">
              <label>Arabic Font Size</label>
              <span className="text-primary font-bold">{arabicSize}</span>
            </div>

            <input
              type="range"
              min="20"
              max="60"
              value={arabicSize}
              onChange={(e) => setArabicSize(Number(e.target.value))}
              className="w-full h-1.5 bg-zinc-200 dark:bg-zinc-800 rounded-full appearance-none accent-primary cursor-pointer"
            />
          </div>

          {/* Translation Font Size */}
          <div className="space-y-4">
            <div className="flex justify-between text-sm font-medium dark:text-zinc-300">
              <label>Translation Font Size</label>
              <span className="text-primary font-bold">{translationSize}</span>
            </div>

            <input
              type="range"
              min="12"
              max="35"
              value={translationSize}
              onChange={(e) => setTranslationSize(Number(e.target.value))}
              className="w-full h-1.5 bg-zinc-200 dark:bg-zinc-800 rounded-full appearance-none accent-primary cursor-pointer"
            />
          </div>

          {/* PREMIUM FONT SELECT */}
          <div className="space-y-3 relative">
            <label className="text-sm font-medium dark:text-zinc-300 ">
              Arabic Font Face
            </label>

            {/* trigger */}
            <button
              onClick={() => setFontOpen(!fontOpen)}
              className="
                w-full flex cursor-pointer items-center justify-between p-3 rounded-lg
                bg-zinc-100 dark:bg-zinc-900
                border border-zinc-200 dark:border-zinc-800
                text-sm transition hover:border-primary/40
              "
            >
              <div className="text-left cursor-pointer">
                <div className="font-medium text-sm">
                  {fontOptions.find((f) => f.value === arabicFont)?.label}
                </div>
                <div className="text-[10px] text-muted-foreground">
                  {fontOptions.find((f) => f.value === arabicFont)?.desc}
                </div>
              </div>

              <ChevronRight
                size={18}
                className={`transition ${fontOpen ? "rotate-90" : ""}`}
              />
            </button>

            {/* dropdown */}
            {fontOpen && (
              <div className="absolute z-50 w-full mt-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 shadow-xl overflow-hidden animate-in fade-in">
                {fontOptions.map((font) => (
                  <button
                    key={font.value}
                    onClick={() => {
                      setArabicFont(font.value);
                      setFontOpen(false);
                    }}
                    className={`
                      w-full text-left p-3 cursor-pointer hover:bg-zinc-100 dark:hover:bg-zinc-900 transition flex flex-col
                      ${arabicFont === font.value ? "bg-primary/10" : ""}
                    `}
                  >
                    <span className="font-medium text-sm">{font.label}</span>
                    <span className="text-[10px] text-muted-foreground">
                      {font.desc}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
