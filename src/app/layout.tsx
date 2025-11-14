import "./globals.css";
import Link from "next/link";
import Footer from "@/components/Footer";


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="it">
      <body className="min-h-screen flex flex-col bg-white text-slate-900">
        <header className="w-full bg-white/90 backdrop-blur supports-[backdrop-filter]:bg-white/80 shadow-sm">
          <nav className="flex items-center justify-between px-4 py-3 text-slate-900">
            <Link href="/" className="font-bold text-xl text-slate-950">
              Il Mio Servizio
            </Link>
            <div className="flex gap-4 text-sm">
              <Link href="/chi-sono" className="text-slate-900 hover:text-blue-700">
                Chi sono
              </Link>
              <Link href="/servizi" className="text-slate-900 hover:text-blue-700">
                Servizi
              </Link>
              <Link href="/esperienze" className="text-slate-900 hover:text-blue-700">
                Esperienze
              </Link>
              <Link href="/destinatari" className="text-slate-900 hover:text-blue-700">
                Per chi
              </Link>
              <Link href="/blog" className="text-slate-900 hover:text-blue-700">
                Blog
              </Link>
              <Link href="/contact" className="text-slate-900 hover:text-blue-700">
                Contatti
              </Link>
            </div>
          </nav>
        </header>

        <main className="w-full min-h-screen">
          {children}
        </main>

        <Footer/>

      </body>
    </html>
  );
}
