/**
 * Type definitions for Al-Quran Cloud API responses
 * Reference: https://alquran.cloud/api
 */

/**
 * Represents a single Ayah (verse) from the API
 */
export interface ApiAyah {
  number: number;
  text: string;
  numberInSurah: number;
  juz: number;
  manzil: number;
  page: number;
  ruku: number;
  hizbQuarter: number;
  sajda: boolean;
}

/**
 * Represents edition metadata (translation/recitation type)
 */
export interface ApiEdition {
  identifier: string;
  language: string;
  englishName: string;
  englishNameTranslation: string;
  format: "text" | "audio";
  type: string;
  direction: string;
}

/**
 * Represents a single Surah (chapter) with its Ayahs
 */
export interface ApiSurah {
  number: number;
  name: string;
  englishName: string;
  englishNameTranslation: string;
  numberOfAyahs: number;
  revelationType: "Meccan" | "Medinan";
  ayahs: ApiAyah[];
}

/**
 * API response structure for surah endpoint
 */
export interface SurahResponse {
  code: number;
  status: string;
  data: ApiSurah | ApiSurah[];
  edition?: ApiEdition;
}

/**
 * Represents a complete Surah with text edition
 */
export interface SurahWithText extends ApiSurah {
  ayahs: ApiAyah[];
}

/**
 * Represents a Surah with audio edition
 */
export interface SurahWithAudio extends ApiSurah {
  ayahs: (ApiAyah & { audio?: string })[];
}

/**
 * Error response from API
 */
export interface ApiErrorResponse {
  code: number;
  status: string;
  data?: null;
}
