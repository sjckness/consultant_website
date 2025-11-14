"use client";

import { useState } from "react";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setFeedback("");

    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();
    setLoading(false);

    if (!res.ok) {
      setFeedback(data.error || "Errore durante l'invio.");
    } else {
      setFeedback("Messaggio inviato, ti risponderò il prima possibile!");
      setForm({ name: "", email: "", message: "" });
    }
  }

  return (
    <section className="max-w-lg mx-auto space-y-4">
      <h1 className="text-3xl font-bold mb-2">Contatti</h1>
      <p className="text-slate-900 leading-relaxed">
        Compila il form qui sotto per mandarmi un messaggio.
      </p>

      <form
        onSubmit={handleSubmit}
        className="space-y-3 bg-white p-4 rounded-xl shadow-sm border border-slate-200"
      >
        <input
          type="text"
          placeholder="Nome"
          className="w-full border border-slate-200 rounded-lg p-2 text-sm bg-slate-50 text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:outline-none"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />
        <input
          type="email"
          placeholder="Email"
          className="w-full border border-slate-200 rounded-lg p-2 text-sm bg-slate-50 text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:outline-none"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
        />
        <textarea
          placeholder="Il tuo messaggio"
          className="w-full border border-slate-200 rounded-lg p-2 text-sm min-h-[120px] bg-slate-50 text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:outline-none"
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          required
        />

        {feedback && (
          <p className="text-sm text-center text-blue-700">{feedback}</p>
        )}

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 rounded-lg text-white text-sm font-semibold ${
            loading ? "bg-blue-300" : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {loading ? "Invio in corso..." : "Invia"}
        </button>
      </form>
    </section>
  );
}
