import { Kantumruy_Pro, Moul, Noto_Sans_Khmer, Inter } from "next/font/google";

export const kantumruyPro = Kantumruy_Pro({
  subsets: ["khmer", "latin"],
  variable: "--font-khmer",
  display: "swap",
});

export const moul = Moul({
  subsets: ["khmer", "latin"],
  weight: ["400"],
  variable: "--font-moul",
  display: "swap",
});

export const notoSansKhmer = Noto_Sans_Khmer({
  subsets: ["khmer", "latin"],
  variable: "--font-noto-sans-khmer",
  display: "swap",
});

export const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const fontsVariables = `${kantumruyPro.variable} ${moul.variable} ${notoSansKhmer.variable} ${inter.variable}`;