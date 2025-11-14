import Link from "next/link";
import { Instagram, Linkedin, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full bg-slate-900 text-slate-300 mt-20">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-10">

        {/* BRAND */}
        <div className="space-y-3">
          <h2 className="text-xl font-bold text-white">Il Mio Servizio</h2>
          <p className="text-sm text-slate-400 leading-relaxed">
            Aiuto persone e aziende a ottenere risultati concreti attraverso
            un metodo chiaro, professionale e orientato all’impatto.
          </p>
        </div>

        {/* LINK UTILI */}
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-400 mb-3">
            Naviga
          </h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="/chi-sono" className="hover:text-white">Chi sono</Link></li>
            <li><Link href="/servizi" className="hover:text-white">Servizi</Link></li>
            <li><Link href="/esperienze" className="hover:text-white">Esperienze</Link></li>
            <li><Link href="/destinatari" className="hover:text-white">Per chi</Link></li>
            <li><Link href="/blog" className="hover:text-white">Blog</Link></li>
            <li><Link href="/contact" className="hover:text-white">Contatti</Link></li>
          </ul>
        </div>

        {/* CONTATTI */}
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-400 mb-3">
            Contatti
          </h3>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center gap-2">
              <Mail size={16} /> tuoindirizzo@email.com
            </li>
            <li>Disponibile da Lun–Ven</li>
            <li>Risposta entro 24h</li>
          </ul>
        </div>

        {/* SOCIAL */}
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-400 mb-3">
            Social
          </h3>
          <div className="flex gap-4">
            <Link href="#" className="hover:text-white">
              <Instagram size={22} />
            </Link>
            <Link href="#" className="hover:text-white">
              <Linkedin size={22} />
            </Link>
          </div>
        </div>

      </div>

      {/* COPYRIGHT */}
      <div className="border-t border-slate-700 py-4 text-center text-xs text-slate-500">
        © {new Date().getFullYear()} Il Mio Servizio — Tutti i diritti riservati
      </div>
    </footer>
  );
}
