import "./globals.css";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Background from "@/components/Background";
import { LanguageProvider } from "@/lib/i18n";


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="relative min-h-screen flex flex-col text-slate-900">
        <LanguageProvider>
          <Background />

          <Navbar />

          <main className="w-full min-h-screen">
            {children}
          </main>

          <Footer/>
        </LanguageProvider>
      </body>
    </html>
  );
}
