export default function HomePage() {
  return (
    <main className="min-h-screen bg-slate-50">
      {/* HERO */}
      <section className="w-full pt-32 pb-20 text-center bg-gradient-to-b from-white to-slate-100">
        <div className="w-full max-w-6xl mx-auto px-6">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600 mb-3">
            Servizio professionale
          </p>

          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-slate-900 mb-6">
            Aiuto <span className="text-blue-600">[il tuo cliente ideale]</span>  
            a ottenere <span className="underline decoration-blue-500">risultati concreti</span>.
          </h1>

          <p className="text-lg text-slate-600 max-w-2xl mx-auto mb-10">
            Un servizio pensato per chi vuole smettere di improvvisare e iniziare
            a lavorare con un metodo chiaro.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="px-10 py-4 rounded-xl bg-blue-600 text-white font-semibold text-lg shadow-md hover:bg-blue-700 transition"
            >
              Prenota una call →
            </a>

            <a
              href="/servizi"
              className="px-10 py-4 rounded-xl border border-slate-300 text-slate-700 text-sm hover:bg-white hover:shadow-sm transition"
            >
              Scopri come funziona
            </a>
          </div>
        </div>
      </section>


      {/* SEZIONE: PER CHI È */}
      <section className="max-w-5xl mx-auto px-6 py-12 grid md:grid-cols-3 gap-6">
        {[
          {
            title: "Per chi è",
            text: "Persone / aziende che hanno già provato da sole ma vogliono una guida più strutturata.",
          },
          {
            title: "Cosa ottieni",
            text: "Chiarezza, priorità, un piano concreto e supporto reale invece di teoria generica.",
          },
          {
            title: "Come funziona",
            text: "Ci sentiamo, analizziamo la tua situazione e definiamo insieme un percorso su misura.",
          },
        ].map((card) => (
          <div
            key={card.title}
            className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 text-left hover:shadow-lg hover:-translate-y-1 transition"
          >
            <h2 className="text-lg font-bold text-slate-900 mb-2">
              {card.title}
            </h2>
            <p className="text-sm text-slate-600">{card.text}</p>
          </div>
        ))}
      </section>

      {/* SEZIONE: PERCHÉ TE */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        <div className="bg-slate-900 text-slate-100 rounded-3xl p-8 md:p-10 flex flex-col md:flex-row gap-8 items-center">
          <div className="flex-1 space-y-4">
            <h2 className="text-2xl md:text-3xl font-bold">
              Perché scegliere proprio me?
            </h2>
            <p className="text-sm md:text-base text-slate-200">
              Qui puoi inserire 2–3 motivi forti: esperienza reale, casi studio,
              modo di lavorare concreto, niente fuffa. L’obiettivo è far capire
              che non stai vendendo solo “consulenza”, ma un percorso che porta
              da A a B.
            </p>
            <ul className="text-sm text-slate-200 space-y-1">
              <li>• [Punto forte 1]</li>
              <li>• [Punto forte 2]</li>
              <li>• [Punto forte 3]</li>
            </ul>
          </div>
          <div className="flex-1 text-sm text-slate-300 border border-slate-700 rounded-2xl p-5">
            <p className="mb-3 font-semibold text-slate-100">
              “Micro-testimone” / promessa chiara
            </p>
            <p>
              Qui puoi mettere una mini frase tipo: “Niente pacche sulle
              spalle: se non vediamo risultati chiari entro X settimane, ti
              dico onestamente che non ha senso continuare.”
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
