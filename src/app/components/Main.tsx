import { Bookmark, MoreHorizontal, Play } from "lucide-react";
import React from "react";

export default function Main() {
  return (
    <main className="flex-1 overflow-y-auto bg-[#0b0b0b] p-6 lg:p-10 custom-scrollbar">
      <div className="max-w-4xl mx-auto">
        {/* Surah Header Card */}
        <div className="bg-[#1a1a1a] rounded-xl p-8 mb-10 flex flex-col items-center text-center border border-gray-800 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-green-600"></div>
          <h2 className="text-3xl font-bold text-white mb-2">
            Surah Al Baqarah
          </h2>
          <p className="text-gray-400 text-sm mb-6">Ayah-286, Madinah</p>
          <div className="text-4xl text-green-500 mb-2">﷽</div>
        </div>

        {/* Ayah Row */}
        {[1, 2].map((ayah) => (
          <div key={ayah} className="mb-12 border-b border-gray-800 pb-10">
            <div className="flex gap-6">
              <div className="flex flex-col items-center gap-4 text-gray-500 pt-2">
                <span className="text-green-500 font-bold text-lg">
                  2:{ayah}
                </span>
                <Play size={18} className="cursor-pointer hover:text-white" />
                <Bookmark
                  size={18}
                  className="cursor-pointer hover:text-white"
                />
                <MoreHorizontal
                  size={18}
                  className="cursor-pointer hover:text-white"
                />
              </div>
              <div className="flex-1">
                <div className="text-right text-3xl leading-[3.5rem] mb-6 text-white font-arabic rtl">
                  {ayah === 1
                    ? "الٓمٓ"
                    : "ذَٰلِكَ ٱلْكِتَٰبُ لَا رَيْبَ ۛ فِيهِ ۛ هُدًى لِّلْمُتَّقِينَ"}
                </div>
                <div className="text-gray-500 text-[10px] uppercase mb-2 tracking-widest">
                  Saheeh International
                </div>
                <div className="text-gray-300 text-lg leading-relaxed">
                  {ayah === 1
                    ? "Alif, Lam, Meem."
                    : "This is the Book about which there is no doubt, a guidance for those conscious of Allah -"}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
