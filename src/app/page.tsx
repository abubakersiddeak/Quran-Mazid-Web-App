"use client";
import Header from "./components/share/Header";
import Footer from "./components/share/Footer";
import LeftSidebar from "./components/share/LeftSidebar";
import SurahListSidebar from "./components/share/SurahListSidebar";
import Main from "./components/Main";
import { useState } from "react";
export default function Home() {
  const [openSurahList, setOpenSurahList] = useState(false);
  const handleBurgarClick = () => {
    console.log("Burger Menu Clicked!");
    setOpenSurahList(!openSurahList);
  };
  return (
    <div className="flex h-screen text-foreground font-sans bg-background">
      <LeftSidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <Header handleBurgarClick={handleBurgarClick} />
        <div className="flex flex-1 overflow-hidden">
          <SurahListSidebar openSurahList={openSurahList} />
          <Main />
        </div>
        <Footer />
      </div>
    </div>
  );
}
