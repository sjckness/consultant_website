import "./globals.css";
import { Geist, IBM_Plex_Sans, JetBrains_Mono } from "next/font/google";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Background from "@/components/Background";
import { LanguageProvider } from "@/lib/i18n";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const display = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geist.variable} ${display.variable} ${mono.variable}`}
    >
      <body className="relative min-h-screen flex flex-col antialiased">
        <LanguageProvider>
          <Background />

          <Navbar />

          <main className="relative z-10 w-full min-h-screen">{children}</main>

          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
