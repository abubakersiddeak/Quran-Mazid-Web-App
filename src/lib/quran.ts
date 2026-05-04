import { Surah } from "@/types/typeLib";
import { AyahWithAudio } from "@/types/audio";

async function fetchWithRetry(url: string, retries = 10, backoff = 1000): Promise<Response> {
  for (let i = 0; i < retries; i++) {
    try {
      const response = await fetch(url);
      if (response.ok) return response;
      
      if (response.status === 429) {
        // Rate limited, wait and retry with jitter
        const delay = backoff * Math.pow(2, i) + Math.random() * 1000;
        console.warn(`Rate limited for ${url}. Retrying in ${Math.round(delay)}ms (attempt ${i + 1}/${retries})...`);
        await new Promise((resolve) => setTimeout(resolve, delay));
        continue;
      }
      
      // For other errors, still retry but maybe with a different logic? 
      // For now, treat them similarly but log the status.
      const delay = backoff * Math.pow(2, i) + Math.random() * 1000;
      console.warn(`Fetch failed for ${url} with status ${response.status}. Retrying in ${Math.round(delay)}ms...`);
      await new Promise((resolve) => setTimeout(resolve, delay));
    } catch (error) {
      if (i === retries - 1) throw error;
      const delay = backoff * Math.pow(2, i) + Math.random() * 1000;
      console.warn(`Error fetching ${url}: ${error}. Retrying in ${Math.round(delay)}ms...`);
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }
  throw new Error(`Failed to fetch ${url} after ${retries} retries`);
}

export async function getAllSurahs(): Promise<Surah[]> {
  const response = await fetchWithRetry("https://api.alquran.cloud/v1/surah");
  const json = await response.json();
  return json.data;
}

export async function getSurahData(surahNumber: number) {
  try {
    const textRes = await fetchWithRetry(
      `https://api.alquran.cloud/v1/surah/${surahNumber}/editions/quran-simple,en.asad`,
    );
    const audioRes = await fetchWithRetry(
      `https://api.alquran.cloud/v1/surah/${surahNumber}/ar.alafasy`,
    );

    const textData = await textRes.json();
    const audioData = await audioRes.json();

    const arabicEdition = textData.data[0];
    const englishEdition = textData.data[1];

    const arabicAyahs = arabicEdition.ayahs || [];
    const englishAyahs = englishEdition.ayahs || [];

    const audioAyahs = audioData.data.ayahs;

    const audioMap = new Map(
      audioAyahs.map((a: any) => [a.numberInSurah, a.audio]),
    );

    const mergedAyahs: AyahWithAudio[] = arabicAyahs.map((a: any, i: number) => ({
      ...a,
      arabic: a.text,
      translation: englishAyahs[i]?.text || "",
      audio: audioMap.get(a.numberInSurah),
    }));

    const surahInfo = {
      number: arabicEdition.number,
      name: arabicEdition.name,
      englishName: arabicEdition.englishName,
      englishNameTranslation: arabicEdition.englishNameTranslation,
      numberOfAyahs: arabicEdition.numberOfAyahs,
      revelationType: arabicEdition.revelationType,
    };

    return { ayahs: mergedAyahs, surahInfo };
  } catch (error) {
    console.error(`Error fetching surah ${surahNumber}:`, error);
    throw error;
  }
}
