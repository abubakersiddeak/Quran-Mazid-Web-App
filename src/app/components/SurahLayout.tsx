"use client";
import Header from "./share/Header";
import Footer from "./share/Footer";
import LeftSidebar from "./share/LeftSidebar";
import SurahListSidebar from "./share/SurahListSidebar";
import Main from "./Main";
import SearchModal from "./SearchModal";
import { useState } from "react";
import { Surah } from "@/types/typeLib";
import { AyahWithAudio } from "@/types/audio";

interface SurahLayoutProps {
  activeSurah: number;
  allSurahs: Surah[];
  ayahs: AyahWithAudio[];
  surahInfo: {
    number: number;
    name: string;
    englishName: string;
    englishNameTranslation: string;
    numberOfAyahs: number;
    revelationType: string;
  } | null;
}

export default function SurahLayout({
  activeSurah,
  allSurahs,
  ayahs,
  surahInfo,
}: SurahLayoutProps) {
  const [openSurahList, setOpenSurahList] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const handleBurgarClick = () => {
    setOpenSurahList(!openSurahList);
  };

  const handleSearchClick = () => {
    setIsSearchOpen(true);
  };

  return (
    <div className="flex h-screen text-foreground font-sans bg-background">
      <LeftSidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <Header 
          handleBurgarClick={handleBurgarClick} 
          handleSearchClick={handleSearchClick}
        />
        <div className="flex flex-1 overflow-hidden">
          <SurahListSidebar
            openSurahList={openSurahList}
            activeSurah={activeSurah}
            allSurahs={allSurahs}
          />
          <Main 
            activeSurah={activeSurah} 
            ayahs={ayahs} 
            surahInfo={surahInfo} 
          />
        </div>
        <Footer />
      </div>

      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        ayahs={ayahs}
        activeSurah={activeSurah}
      />
    </div>
  );
}
