"use client";
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { FontContextValue, ArabicFontType } from "@/types/context";

const FontContext = createContext<FontContextValue | null>(null);

interface FontProviderProps {
  children: ReactNode;
}

/**
 * Provider for font settings state
 * Persists settings to localStorage and loads them on mount
 */
export const FontProvider = ({ children }: FontProviderProps) => {
  /**
   * Arabic text font size (16-60px)
   * Default: 28px
   */
  const [arabicSize, setArabicSize] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("arabicSize");
      return saved ? Number(saved) : 28;
    }
    return 28;
  });

  /**
   * Translation text font size (12-35px)
   * Default: 18px
   */
  const [translationSize, setTranslationSize] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("translationSize");
      return saved ? Number(saved) : 18;
    }
    return 18;
  });

  /**
   * Arabic font family selection
   * Options: Amiri, Scheherazade, KFGQ
   * Default: KFGQ
   */
  const [arabicFont, setArabicFont] = useState<ArabicFontType>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("arabicFont");
      return (saved as ArabicFontType) || "KFGQ";
    }
    return "KFGQ";
  });

  /**
   * Controls visibility of settings sidebar
   */
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  /**
   * Persist font settings to localStorage whenever they change
   */
  useEffect(() => {
    localStorage.setItem("arabicSize", arabicSize.toString());
    localStorage.setItem("translationSize", translationSize.toString());
    localStorage.setItem("arabicFont", arabicFont);
  }, [arabicSize, translationSize, arabicFont]);

  const value: FontContextValue = {
    arabicSize,
    setArabicSize,
    translationSize,
    setTranslationSize,
    arabicFont,
    setArabicFont,
    isSettingsOpen,
    setIsSettingsOpen,
  };

  return <FontContext.Provider value={value}>{children}</FontContext.Provider>;
};

/**
 * Hook to access font context
 * Must be used within FontProvider
 */
export const useFont = (): FontContextValue => {
  const context = useContext(FontContext);
  if (!context) {
    throw new Error("useFont must be used within FontProvider");
  }
  return context;
};
