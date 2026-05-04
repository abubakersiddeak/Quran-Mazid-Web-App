"use client";
import React, {
  createContext,
  useContext,
  useState,
  useRef,
  useEffect,
  useCallback,
  ReactNode,
} from "react";
import { AudioContextValue, AyahWithAudio } from "@/types/audio";

const AudioContext = createContext<AudioContextValue | null>(null);

interface AudioProviderProps {
  children: ReactNode;
}

export const AudioProvider = ({ children }: AudioProviderProps) => {
  const [playingAyah, setPlayingAyah] =
    useState<AudioContextValue["playingAyah"]>(null);
  const [ayahList, setAyahList] = useState<AyahWithAudio[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  /**
   * Updates current time and duration from audio element
   */
  const handleTimeUpdate = useCallback(() => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
      setDuration(audioRef.current.duration || 0);
    }
  }, []);

  /**
   * Plays or pauses audio for a given ayah
   * If already playing the same ayah, toggles play/pause
   * Otherwise loads and plays the new ayah
   */
  const handlePlay = useCallback(
    (ayah: AyahWithAudio, surahEnName: string, list: AyahWithAudio[]) => {
      if (!ayah?.audio) return;

      if (list && list.length > 0) setAyahList(list);

      if (playingAyah?.number === ayah.number && audioRef.current) {
        if (isPlaying) {
          audioRef.current.pause();
          setIsPlaying(false);
        } else {
          audioRef.current.play();
          setIsPlaying(true);
        }
        return;
      }

      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.removeEventListener("timeupdate", handleTimeUpdate);
        audioRef.current.src = "";
      }

      const audio = new Audio(ayah.audio);
      audioRef.current = audio;
      audio.addEventListener("timeupdate", handleTimeUpdate);
      audio.addEventListener("loadedmetadata", handleTimeUpdate);

      const ayahWithSurahInfo = {
        ...ayah,
        enName: surahEnName || playingAyah?.enName || "",
      };

      setPlayingAyah(ayahWithSurahInfo);
      setIsPlaying(true);
      audio.play().catch((err) => console.error("Audio play error:", err));
    },
    [playingAyah, isPlaying, handleTimeUpdate],
  );

  /**
   * Plays the next ayah in the list
   */
  const handleNext = useCallback(() => {
    const currentIndex = ayahList.findIndex(
      (a) => a.number === playingAyah?.number,
    );
    const next = ayahList[currentIndex + 1];
    if (next && playingAyah) {
      handlePlay(next, playingAyah.enName, ayahList);
    } else {
      setIsPlaying(false);
    }
  }, [ayahList, playingAyah, handlePlay]);

  /**
   * Plays the previous ayah in the list
   */
  const handlePrev = useCallback(() => {
    const currentIndex = ayahList.findIndex(
      (a) => a.number === playingAyah?.number,
    );
    const prev = ayahList[currentIndex - 1];
    if (prev && playingAyah) {
      handlePlay(prev, playingAyah.enName, ayahList);
    }
  }, [ayahList, playingAyah, handlePlay]);

  /**
   * Toggles play/pause for the current audio
   */
  const togglePlayPause = useCallback(() => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  }, [isPlaying]);

  /**
   * Stops audio and resets all playback state
   */
  const stopAudio = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    setPlayingAyah(null);
    setIsPlaying(false);
    setCurrentTime(0);
  }, []);

  /**
   * Seeks to a specific time in the current audio
   */
  const seek = useCallback((time: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setCurrentTime(time);
    }
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onEnd = () => handleNext();
    audio.addEventListener("ended", onEnd);
    return () => {
      audio.removeEventListener("ended", onEnd);
    };
  }, [handleNext]);

  return (
    <AudioContext.Provider
      value={{
        handlePlay,
        playingAyah,
        isPlaying,
        togglePlayPause,
        handleNext,
        handlePrev,
        ayahList,
        stopAudio,
        currentTime,
        duration,
        seek,
      }}
    >
      {children}
    </AudioContext.Provider>
  );
};

export const useAudio = (): AudioContextValue => {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error("useAudio must be used within AudioProvider");
  }
  return context;
};
