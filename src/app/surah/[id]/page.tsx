import { getAllSurahs, getSurahData } from "@/lib/quran";
import SurahLayout from "@/app/components/SurahLayout";

export async function generateStaticParams() {
  const surahs = await getAllSurahs();
  return surahs.map((surah) => ({
    id: surah.number.toString(),
  }));
}

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function SurahPage({ params }: PageProps) {
  const { id } = await params;
  const surahNumber = parseInt(id);
  
  const [allSurahs, surahData] = await Promise.all([
    getAllSurahs(),
    getSurahData(surahNumber),
  ]);

  return (
    <SurahLayout
      activeSurah={surahNumber}
      allSurahs={allSurahs}
      ayahs={surahData.ayahs}
      surahInfo={surahData.surahInfo}
    />
  );
}
