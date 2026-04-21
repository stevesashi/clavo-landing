import type { Metadata } from "next";
import { Inter, Caveat } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
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
    <html lang="en" className={`${inter.variable} ${caveat.variable} dark relative`}>
      <body>
          <Navbar />
          {children}
        </body>
    </html>
  );
}
