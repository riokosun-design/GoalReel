import type { Metadata } from "next";
import { Bebas_Neue, Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import AdStickyBottom from "@/components/ads/AdStickyBottom";

const bebasNeue = Bebas_Neue({
  variable: "--font-bebas-neue",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "GoalReel — Football Highlights & Goals",
  description:
    "Watch the latest football highlights, goals, and match replays from Premier League, La Liga, Serie A, Bundesliga, Champions League and more.",
  keywords: [
    "football highlights",
    "soccer goals",
    "Premier League",
    "La Liga",
    "Champions League",
    "match replays",
    "GoalReel",
  ],
  authors: [{ name: "GoalReel" }],
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "GoalReel — Football Highlights & Goals",
    description: "Watch the latest football highlights and goals from around the world.",
    siteName: "GoalReel",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "GoalReel — Football Highlights & Goals",
    description: "Watch the latest football highlights and goals from around the world.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        className={`${bebasNeue.variable} ${inter.variable} antialiased bg-pitch text-text-primary min-h-screen flex flex-col`}
      >
        <Navbar />
        <main className="flex-1 pb-16 md:pb-0">{children}</main>
        <Footer />
        <AdStickyBottom />
        <Toaster />
      </body>
    </html>
  );
}
