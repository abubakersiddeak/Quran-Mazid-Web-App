/**
 * Font context state and actions
 */
export interface FontContextValue {
  arabicSize: number;
  setArabicSize: (size: number) => void;
  translationSize: number;
  setTranslationSize: (size: number) => void;
  arabicFont: "Amiri" | "Scheherazade" | "KFGQ";
  setArabicFont: (font: "Amiri" | "Scheherazade" | "KFGQ") => void;
  isSettingsOpen: boolean;
  setIsSettingsOpen: (open: boolean) => void;
}

/**
 * Font provider props
 */
export interface FontProviderProps {
  children: React.ReactNode;
}

/**
 * Valid Arabic font types
 */
export type ArabicFontType = "Amiri" | "Scheherazade" | "KFGQ";

/**
 * Font size constraints
 */
export const FONT_SIZE_CONSTRAINTS = {
  arabic: { min: 16, max: 60, default: 28 },
  translation: { min: 12, max: 35, default: 18 },
} as const;
