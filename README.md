# Quran Mazid Web App

A modern, fast, and responsive Holy Quran web application built with Next.js 15, featuring Static Site Generation (SSG) for all 114 Surahs.

## Features

- **Full Quran Access**: Read all 114 Surahs with high-quality Arabic text and English translations (Muhammad Asad).
- **Static Site Generation (SSG)**: Every Surah page is pre-rendered at build time for near-instant loading and excellent SEO.
- **In-Surah Search**: A powerful, debounced search modal to find specific verses by Arabic text or English translation within the current Surah.
- **Sidebar Surah Navigation**: Quickly navigate between Surahs with a searchable sidebar.
- **Audio Player**: Listen to beautiful recitations by Sheikh Mishary Rashid Alafasy, with auto-scroll and verse-by-verse playback.
- **Customizable Experience**:
  - Dynamic font sizing for both Arabic and English text.
  - Multiple Arabic font choices (Amiri, Scheherazade, KFGQ).
  - Dark/Light/System theme support via Tailwind CSS and next-themes.
- **Responsive Design**: Fully optimized for mobile, tablet, and desktop views.

## Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Data Source**: [Al-Quran Cloud API](https://alquran.cloud/api)

## Architecture

- **Data Fetching**: Moved from client-side `useEffect` hooks to server-side async functions in `page.tsx` for improved performance.
- **Static Params**: Uses `generateStaticParams` to statically generate all 114 Surah routes at build time.
- **Merged Data Model**: Arabic text, English translations, and audio URLs are merged on the server to provide a single, clean data structure to client components.
- **Modular Components**: Clean separation between server components (data fetching) and client components (interactive UI).

## Getting Started

1. **Clone the repository**:

   ```bash
   git clone https://github.com/abubakersiddeak/Quran-Mazid-Web-App
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Run the development server**:

   ```bash
   npm run dev
   ```

4. **Build for production**:
   ```bash
   npm run build
   ```

## Features Under Development

The following features are currently being worked on and will trigger an alert:

- Juz and Page-based navigation.
- Bookmark system.
- "Read Quran" specific mode.
- Advanced settings and search filters.

## Contribution

Contributions are welcome! Feel free to open issues or submit pull requests.

---

Built with by Abubakar Siddik Zisan
