"use client";
import React, { createContext, useContext, useState, useEffect } from "react";

const FontContext = createContext<any>(null);

export const FontProvider = ({ children }: { children: React.ReactNode }) => {
  const [arabicSize, setArabicSize] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("arabicSize");
      return saved ? Number(saved) : 28;
    }
    return 28;
  });

  const [translationSize, setTranslationSize] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("translationSize");
      return saved ? Number(saved) : 18;
    }
    return 18;
  });

  const [arabicFont, setArabicFont] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("arabicFont");
      return saved ? saved : "KFGQ";
    }
    return "KFGQ";
  });

  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem("arabicSize", arabicSize.toString());
    localStorage.setItem("translationSize", translationSize.toString());
    localStorage.setItem("arabicFont", arabicFont);
  }, [arabicSize, translationSize, arabicFont]);

  return (
    <FontContext.Provider
      value={{
        arabicSize,
        setArabicSize,
        translationSize,
        setTranslationSize,
        arabicFont,
        setArabicFont,
        isSettingsOpen,
        setIsSettingsOpen,
      }}
    >
      {children}
    </FontContext.Provider>
  );
};

export const useFont = () => useContext(FontContext);
