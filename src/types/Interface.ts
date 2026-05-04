import { AyahWithAudio } from "./audio";
import { Surah, Ayah } from "./typeLib";
export type MainProps = {
  activeSurah: number | null;
};
export interface HeaderProps {
  handleBurgarClick: () => void;
}
export interface SurahListSidebarProps {
  openSurahList: boolean;
  activeSurah: number | null;
  setActiveSurah: (surah: number) => void;
}
export interface ChildComponentProps {
  handleBurgarClick: () => void;
  /**
   * Triggered when user selects a Surah or Ayah from search
   * @param type - "surah" or "ayah" indicating what was selected
   * @param data - Surah or Ayah object with selected data
   */
  handleSearchSelect: (type: "surah" | "ayah", data: Surah | Ayah) => void;
  onUserUpdate?: (name: string, id: number) => void;
  onCancel?: () => void;
}
export interface PageProps {
  activeSurah: number | null;
  setActiveSurah: (surah: number | null) => void;
  openSurahList: boolean;
  setOpenSurahList: (open: boolean) => void;
}
export interface UseQuranDataReturn {
  ayahs: AyahWithAudio[];
  surahInfo: {
    number: number;
    name: string;
    englishName: string;
    englishNameTranslation: string;
    numberOfAyahs: number;
    revelationType: string;
  } | null;
  loading: boolean;
  error: string | null;
}
