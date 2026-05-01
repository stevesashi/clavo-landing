import type { Metadata } from "next";
import { Inter, Caveat, Instrument_Serif } from "next/font/google";
import "./globals.css";
import ConditionalNavbar from "@/components/layout/ConditionalNavbar";
import IntroWrapper from "@/components/IntroWrapper";
import SmoothScroll from "@/components/SmoothScroll";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument-serif",
  display: "swap",
});

// Caveat — the handwritten font used by CreativePricing and sketch UI elements
const caveat = Caveat({
  subsets: ["latin"],
  variable: "--font-handwritten",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Clavo AI — The Future of Behavioral Recruitment",
  description:
    "Clavo AI decodes how people think, collaborate, and lead — surfacing top talent before your competitors even see their résumé.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // `dark` class enables Tailwind dark: variants site-wide (class-based dark mode)
    <html lang="en" className={`${inter.variable} ${caveat.variable} ${instrumentSerif.variable} dark relative`}>
      <body>
          <SmoothScroll />
          <ConditionalNavbar />
          <IntroWrapper>{children}</IntroWrapper>
        </body>
    </html>
  );
}
