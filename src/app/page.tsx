import Header from "./components/share/Header";
import Footer from "./components/share/Footer";
import LeftSidebar from "./components/share/LeftSidebar";
import SurahListSidebar from "./components/share/SurahListSidebar";
import Main from "./components/Main";
export default function Home() {
  return (
    <div className="flex h-screen bg-[#0b0b0b] text-gray-300 font-sans">
      <LeftSidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <Header />
        <div className="flex flex-1 overflow-hidden">
          <SurahListSidebar />
          <Main />
        </div>
        <Footer />
      </div>
    </div>
  );
}
