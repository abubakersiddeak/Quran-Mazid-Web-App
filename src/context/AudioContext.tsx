"use client";
import React, {
  createContext,
  useContext,
  useState,
  useRef,
  useEffect,
  useCallback,
} from "react";

const AudioContext = createContext<any>(null);

export const AudioProvider = ({ children }: any) => {
  const [playingAyah, setPlayingAyah] = useState<any>(null);
  const [ayahList, setAyahList] = useState<any[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const handleTimeUpdate = useCallback(() => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
      setDuration(audioRef.current.duration || 0);
    }
  }, []);

  const handlePlay = useCallback(
    (ayah: any, surahEnName: any, list: any[]) => {
      if (!ayah?.audio) return;

      // ১. লিস্ট আপডেট করুন
      if (list && list.length > 0) setAyahList(list);

      // ২. যদি একই আয়াত হয় তবে প্লে/পজ করুন
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

      // ৩. আগের অডিও পরিষ্কার করুন
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.removeEventListener("timeupdate", handleTimeUpdate);
        audioRef.current.src = ""; // মেমোরি ক্লিয়ার করার জন্য
      }

      // ৪. নতুন অডিও সেটআপ
      const audio = new Audio(ayah.audio);
      audioRef.current = audio;
      audio.addEventListener("timeupdate", handleTimeUpdate);
      audio.addEventListener("loadedmetadata", handleTimeUpdate);

      // ৫. অবজেক্ট মিউটেট না করে নতুন একটি অবজেক্ট তৈরি করুন (খুবই গুরুত্বপূর্ণ)
      const ayahWithSurahInfo = {
        ...ayah,
        enName: surahEnName || playingAyah?.enName,
      };

      setPlayingAyah(ayahWithSurahInfo);
      setIsPlaying(true);
      audio.play().catch((err) => console.error("Audio play error:", err));
    },
    [playingAyah, isPlaying, handleTimeUpdate],
  );

  const handleNext = useCallback(() => {
    const currentIndex = ayahList.findIndex(
      (a) => a.number === playingAyah?.number,
    );
    const next = ayahList[currentIndex + 1];
    if (next) {
      // ৩টি আর্গুমেন্টই পাস করা হচ্ছে: (আয়াত, সুরার নাম, আয়াতের লিস্ট)
      handlePlay(next, playingAyah?.enName, ayahList);
    } else {
      setIsPlaying(false);
    }
  }, [ayahList, playingAyah, handlePlay]);

  const handlePrev = useCallback(() => {
    const currentIndex = ayahList.findIndex(
      (a) => a.number === playingAyah?.number,
    );
    const prev = ayahList[currentIndex - 1];
    if (prev) {
      // ৩টি আর্গুমেন্টই পাস করা হচ্ছে: (আয়াত, সুরার নাম, আয়াতের লিস্ট)
      handlePlay(prev, playingAyah?.enName, ayahList);
    }
  }, [ayahList, playingAyah, handlePlay]);

  const togglePlayPause = useCallback(() => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  }, [isPlaying]);

  const stopAudio = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    setPlayingAyah(null);
    setIsPlaying(false);
    setCurrentTime(0);
  }, []);

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

export const useAudio = () => useContext(AudioContext);
