import { Dispatch, SetStateAction } from "react";

export interface ChildComponentProps {
  handleBurgarClick: () => void;

  onUserUpdate?: (name: string, id: number) => void; // অপশনাল করে দিন
  onCancel?: () => void;
}
export interface SurahListSidebarProps {
  openSurahList: boolean;
  activeSurah: number | null;
  setActiveSurah: Dispatch<SetStateAction<number | null>>;
}
export type MainProps = {
  activeSurah: number | null;
  setActiveSurah: number | null;
};
