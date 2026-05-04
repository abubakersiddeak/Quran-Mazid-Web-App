import { useMemo } from "react";
import { ArabicFontType } from "@/types/context";

/**
 * Hook that returns the CSS font-family string for the given Arabic font name
 * Memoized to prevent recreation on every render
 */
export const useFontFamily = (fontName: ArabicFontType): string => {
  return useMemo(() => {
    const fontMap: Record<ArabicFontType, string> = {
      Amiri: "'Amiri', serif",
      Scheherazade: "'Scheherazade New', serif",
      KFGQ: "'KFGQPC', serif",
    };

    return fontMap[fontName] || fontMap.KFGQ;
  }, [fontName]);
};
