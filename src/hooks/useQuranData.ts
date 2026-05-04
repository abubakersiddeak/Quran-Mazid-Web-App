import { useState, useEffect } from "react";
import { AyahWithAudio } from "@/types/audio";
import { UseQuranDataReturn } from "@/types/Interface";

export const useQuranData = (
  surahNumber: number | null,
): UseQuranDataReturn => {
  const [ayahs, setAyahs] = useState<AyahWithAudio[]>([]);
  const [surahInfo, setSurahInfo] =
    useState<UseQuranDataReturn["surahInfo"]>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!surahNumber) return;

    const controller = new AbortController();

    const fetchQuranData = async () => {
      setLoading(true);
      setError(null);

      try {
        const [textRes, audioRes] = await Promise.all([
          fetch(
            `https://api.alquran.cloud/v1/surah/${surahNumber}/editions/quran-simple,en.asad`,
            { signal: controller.signal },
          ),
          fetch(
            `https://api.alquran.cloud/v1/surah/${surahNumber}/ar.alafasy`,
            { signal: controller.signal },
          ),
        ]);

        if (!textRes.ok) throw new Error("Text API failed");
        if (!audioRes.ok) throw new Error("Audio API failed");

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

        const mergedAyahs = arabicAyahs.map((a: any, i: number) => ({
          ...a,
          arabic: a.text,
          translation: englishAyahs[i]?.text || "",
          audio: audioMap.get(a.numberInSurah),
        }));

        setAyahs(mergedAyahs);
        setSurahInfo({
          number: arabicEdition.number,
          name: arabicEdition.name,
          englishName: arabicEdition.englishName,
          englishNameTranslation: arabicEdition.englishNameTranslation,
          numberOfAyahs: arabicEdition.numberOfAyahs,
          revelationType: arabicEdition.revelationType,
        });
      } catch (err: any) {
        if (err.name === "AbortError") return;

        setError(err.message);
        setAyahs([]);
        setSurahInfo(null);
      } finally {
        setLoading(false);
      }
    };

    fetchQuranData();

    return () => controller.abort();
  }, [surahNumber]);

  return { ayahs, surahInfo, loading, error };
};
