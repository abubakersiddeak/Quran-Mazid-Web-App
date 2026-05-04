import { AyahWithAudio } from "@/types/audio";

/**
 * Utility to filter ayahs based on a search query.
 * Searches in both Arabic text and English translation.
 */
export const filterAyahs = (ayahs: AyahWithAudio[], query: string): AyahWithAudio[] => {
  const trimmedQuery = query.trim().toLowerCase();
  if (!trimmedQuery) return ayahs;

  return ayahs.filter((ayah) => {
    const arabicMatch = ayah.arabic.includes(trimmedQuery);
    const translationMatch = ayah.translation.toLowerCase().includes(trimmedQuery);
    return arabicMatch || translationMatch;
  });
};

/**
 * Debounce utility to limit function execution rate.
 */
export function debounce<T extends (...args: any[]) => void>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}
