"use client";

export default function AreaRiservataPage() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-16">
      <div className="rounded-3xl border border-slate-200 bg-white/90 p-10 shadow-lg">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-600">
          Area riservata
        </p>
        <h1 className="mt-3 text-3xl font-bold text-slate-900">
          Accesso privato
        </h1>
        <p className="mt-2 text-slate-700">
          Questa sezione è riservata ai clienti. Inserisci le tue credenziali
          per continuare.
        </p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <input
            type="email"
            placeholder="Email"
            className="w-full rounded-lg border border-slate-200 bg-white px-3 py-3 text-sm text-slate-900 placeholder:text-slate-400 shadow-[0_1px_2px_rgba(0,0,0,0.04)] focus:border-blue-500 focus:outline-none"
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full rounded-lg border border-slate-200 bg-white px-3 py-3 text-sm text-slate-900 placeholder:text-slate-400 shadow-[0_1px_2px_rgba(0,0,0,0.04)] focus:border-blue-500 focus:outline-none"
          />
        </div>
        <button
          className="mt-6 inline-flex items-center justify-center rounded-full bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
          type="button"
        >
          Accedi
        </button>
        <p className="mt-3 text-xs text-slate-500">
          Se hai problemi di accesso, contatta il tuo referente.
        </p>
      </div>
    </main>
  );
}
