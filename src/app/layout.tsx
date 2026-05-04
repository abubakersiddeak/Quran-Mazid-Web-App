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
  title: "Quran Mazid Web App",
  description: "Build by Abubakar Siddik Zisan",
  icons: {
    icon: "/mainicon.png",
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
