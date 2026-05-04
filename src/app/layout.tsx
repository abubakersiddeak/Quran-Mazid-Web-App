import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./components/theme-provider";
import { AudioProvider } from "@/context/AudioContext";
import { FontProvider } from "@/context/FontContext";
import SettingsSidebar from "./components/SettingsSidebar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Quran Mazid Web App | Read & Listen to Al-Quran",
  description:
    "A modern, fast, and responsive Al-Quran web application built by Abubakar Siddik Zisan. Read, listen, and translate the Holy Quran.",
  keywords: [
    "Quran",
    "Al-Quran",
    "Quran Mazid",
    "Islamic App",
    "Quran Audio",
    "Quran Translation",
  ],
  authors: [
    { name: "Abubakar Siddik Zisan", url: "https://devzisan.vercel.app/" },
  ],
  creator: "Abubakar Siddik Zisan",
  publisher: "Abubakar Siddik Zisan",

  openGraph: {
    title: "Quran Mazid Web App",
    description:
      "Experience the Holy Quran with translations and beautiful audio recitations.",
    url: "https://quran-mazid-web-app.vercel.app/",
    siteName: "Quran Mazid",
    images: [
      {
        url: "/mainicon.png",
        width: 1200,
        height: 630,
        alt: "Quran Mazid Web App Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Quran Mazid Web App",
    description: "Read and listen to the Holy Quran on any device.",
    images: ["/mainicon.png"],
  },

  icons: {
    icon: "/mainicon.png",
    shortcut: "/mainicon.png",
    apple: "/mainicon.png",
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning={true}
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AudioProvider>
            <FontProvider>
              {children}
              <SettingsSidebar />
            </FontProvider>
          </AudioProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
