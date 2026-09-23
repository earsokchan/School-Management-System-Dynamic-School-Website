import { Kantumruy_Pro, Moul } from "next/font/google";

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

export const fontsVariables = `${kantumruyPro.variable} ${moul.variable}`;