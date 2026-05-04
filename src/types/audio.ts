import { ApiAyah } from "./api";

/**
 * Represents a single Ayah with both text and audio information
 */
export interface AyahWithAudio extends ApiAyah {
  arabic: string;
  translation: string;
  audio?: string;
  enName?: string; // Surah English name
}

/**
 * Represents the current playing state
 */
export interface PlayingAyahState extends AyahWithAudio {
  enName: string;
}

/**
 * Audio context state
 */
export interface AudioContextState {
  playingAyah: PlayingAyahState | null;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  ayahList: AyahWithAudio[];
}

/**
 * Audio context methods
 */
export interface AudioContextActions {
  handlePlay: (
    ayah: AyahWithAudio,
    surahEnName: string,
    list: AyahWithAudio[],
  ) => void;
  togglePlayPause: () => void;
  handleNext: () => void;
  handlePrev: () => void;
  stopAudio: () => void;
  seek: (time: number) => void;
}

/**
 * Complete audio context value
 */
export interface AudioContextValue
  extends AudioContextState, AudioContextActions {}
