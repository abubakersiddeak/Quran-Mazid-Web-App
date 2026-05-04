import { AyahWithAudio } from "./audio";
import { Surah, Ayah } from "./typeLib";

export type MainProps = {
  activeSurah: number | null;
  ayahs: AyahWithAudio[];
  surahInfo: {
    number: number;
    name: string;
    englishName: string;
    englishNameTranslation: string;
    numberOfAyahs: number;
    revelationType: string;
  } | null;
};

export interface HeaderProps {
  handleBurgarClick: () => void;
  handleSearchClick: () => void;
}

export interface SurahListSidebarProps {
  openSurahList: boolean;
  activeSurah: number | null;
  allSurahs: Surah[];
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
