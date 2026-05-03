import React from "react";

export default function SurahListSidebar() {
  return (
    <section className="w-80 border-r border-gray-800 flex flex-col bg-[#0f0f0f] hidden lg:flex">
      <div className="p-4 flex gap-2">
        <button className="flex-1 bg-[#1a1a1a] py-2 rounded text-sm font-medium border border-gray-700">
          Surah
        </button>
        <button className="flex-1 py-2 rounded text-sm font-medium text-gray-500">
          Juz
        </button>
        <button className="flex-1 py-2 rounded text-sm font-medium text-gray-500">
          Page
        </button>
      </div>
      <div className="flex-1 overflow-y-auto custom-scrollbar px-4 pb-4 flex flex-col gap-2">
        {[
          { id: 1, name: "Al Fatihah", sub: "The Opener" },
          { id: 2, name: "Al Baqarah", sub: "The Cow", active: true },
          { id: 3, name: "Al Imran", sub: "Family of Imran" },
          { id: 4, name: "An Nisa", sub: "The Women" },
        ].map((item) => (
          <div
            key={item.id}
            className={`flex items-center p-3 rounded-lg cursor-pointer transition-colors ${item.active ? "bg-green-600/10 border border-green-600/30" : "hover:bg-[#1a1a1a]"}`}
          >
            <div
              className={`w-10 h-10 rounded-md flex items-center justify-center text-sm font-bold mr-4 ${item.active ? "bg-green-600 text-white" : "bg-gray-800 text-gray-400"}`}
            >
              {item.id}
            </div>
            <div>
              <h3
                className={`text-sm font-semibold ${item.active ? "text-white" : "text-gray-300"}`}
              >
                {item.name}
              </h3>
              <p className="text-[11px] text-gray-500">{item.sub}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
