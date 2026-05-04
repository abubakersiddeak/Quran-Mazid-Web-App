"use client";
import {
  MoreHorizontal,
  PlayIcon,
  PauseIcon,
  SkipBack,
  SkipForward,
  X,
} from "lucide-react";
import React from "react";
import { useAudio } from "@/context/AudioContext"; // আপনার প্রজেক্টের সঠিক পাথ দিন

export default function Footer() {
  const {
    playingAyah,
    isPlaying,
    togglePlayPause,
    handleNext,
    handlePrev,
    stopAudio,
    currentTime,
    duration,
    seek,
  } = useAudio();
  if (!playingAyah) return null;
  const formatTime = (time: number) => {
    if (isNaN(time)) return "0:00";
    const mins = Math.floor(time / 60);
    const secs = Math.floor(time % 60);
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };
  console.log(playingAyah);
  return (
    <footer className="fixed bottom-0 left-0 right-0 h-20 border-t border-border px-6 flex items-center justify-between bg-background z-50">
      {/* left side info */}
      <div className="hidden sm:block w-1/3">
        <h4 className="text-sm font-bold text-foreground">
          {playingAyah.enName}
        </h4>
        <p className="text-[11px] text-muted-foreground">
          Ayah : {playingAyah.numberInSurah}
        </p>
      </div>

      {/*control Buttons */}
      <div className="flex flex-col items-center gap-1 flex-1 max-w-md mx-auto">
        <div className="flex items-center gap-8">
          <button className="text-muted-foreground hover:text-foreground cursor-pointer">
            <MoreHorizontal size={18} />
          </button>

          <div className="flex items-center justify-center gap-3">
            {/* Previous Button */}
            <button
              onClick={handlePrev}
              className="text-muted-foreground hover:text-primary p-2 cursor-pointer transition"
            >
              <SkipBack size={20} fill="currentColor" />
            </button>

            {/* Play/Pause Button */}
            <button
              onClick={togglePlayPause}
              className="text-primary-foreground bg-primary rounded-full p-2 cursor-pointer hover:scale-110 transition active:scale-95"
            >
              {isPlaying ? (
                <PauseIcon size={20} fill="currentColor" />
              ) : (
                <PlayIcon size={20} fill="currentColor" />
              )}
            </button>

            {/* Next Button */}
            <button
              onClick={handleNext}
              className="text-muted-foreground hover:text-primary p-2 cursor-pointer transition"
            >
              <SkipForward size={20} fill="currentColor" />
            </button>
          </div>

          <button
            onClick={stopAudio}
            className="text-muted-foreground hover:text-foreground cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        {/* audio Progress */}
        <div className="w-full max-w-2xl mx-auto flex items-center gap-3 mt-2">
          <span className="text-[10px] text-muted-foreground min-w-7.5">
            {formatTime(currentTime)}
          </span>

          <input
            type="range"
            min="0"
            max={duration || 0}
            value={currentTime}
            onChange={(e) => seek(Number(e.target.value))}
            className="
      w-full h-1.5 rounded-full appearance-none cursor-pointer
      bg-muted transition-all
      accent-primary
    "
            style={{
              background: `linear-gradient(to right, oklch(0.628 0.169 142.5) ${
                (currentTime / (duration || 1)) * 100
              }%, oklch(0.922 0 0) ${(currentTime / (duration || 1)) * 100}%)`,
            }}
          />

          <span className="text-[10px] text-muted-foreground min-w-7.5">
            {formatTime(duration)}
          </span>
        </div>
      </div>

      <div className="hidden sm:block w-1/3"></div>
    </footer>
  );
}
