"use client";

import { useState } from "react";
import { Mail, Clock, CheckCircle2 } from "lucide-react";

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
      setFeedback(data.error || "Error while sending.");
    } else {
      setFeedback("Message sent, I'll reply as soon as possible!");
      setForm({ name: "", email: "", message: "" });
    }
  }

  return (
    <main className="mx-auto max-w-6xl px-4 py-12">
      <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-gradient-to-br from-blue-50 via-white to-slate-100 shadow-sm">
        <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-blue-100 blur-3xl opacity-60" />
        <div className="absolute -left-20 bottom-0 h-48 w-48 rounded-full bg-indigo-100 blur-3xl opacity-60" />

        <div className="relative grid gap-10 lg:grid-cols-2 p-8 lg:p-12">
          {/* Intro */}
          <div className="space-y-5">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/80 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-neutral-600 border border-neutral-200">
              Contact
            </div>
            <h1 className="text-4xl font-semibold tracking-tight text-neutral-900">
              Let’s talk about your next move
            </h1>
            <p className="max-w-xl text-lg leading-7 text-neutral-600">
              Share your goal, timeline, and any constraints. I’ll reply with a quick read on how we can create momentum together.
            </p>

            <div className="grid gap-3 sm:grid-cols-2">
              <div className="flex items-center gap-3 rounded-2xl border border-neutral-200 bg-white/80 p-3 shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600/10 text-blue-700">
                  <Clock size={18} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-neutral-900">Response time</p>
                  <p className="text-sm text-neutral-600">Within 24 hours (Mon–Fri)</p>
                </div>
              </div>
              <div className="flex items-center gap-3 rounded-2xl border border-neutral-200 bg-white/80 p-3 shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-600/10 text-emerald-700">
                  <CheckCircle2 size={18} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-neutral-900">Best way</p>
                  <p className="text-sm text-neutral-600">Email with quick context</p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 text-sm text-neutral-700">
              <Mail size={16} />
              <span>hello@websitename.com</span>
            </div>
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="space-y-4 rounded-2xl border border-neutral-200 bg-white/80 p-6 shadow-lg backdrop-blur"
          >
            <div className="grid gap-3 sm:grid-cols-2">
              <input
                type="text"
                placeholder="Your name"
                className="w-full rounded-lg border border-neutral-200 bg-white px-3 py-3 text-sm text-neutral-900 placeholder:text-neutral-400 shadow-[0_1px_2px_rgba(0,0,0,0.04)] focus:border-blue-500 focus:outline-none"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
              />
              <input
                type="email"
                placeholder="Work email"
                className="w-full rounded-lg border border-neutral-200 bg-white px-3 py-3 text-sm text-neutral-900 placeholder:text-neutral-400 shadow-[0_1px_2px_rgba(0,0,0,0.04)] focus:border-blue-500 focus:outline-none"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                required
              />
            </div>
            <textarea
              placeholder="Tell me about your project, goals, and timeline"
              className="w-full rounded-lg border border-neutral-200 bg-white px-3 py-3 text-sm text-neutral-900 placeholder:text-neutral-400 shadow-[0_1px_2px_rgba(0,0,0,0.04)] focus:border-blue-500 focus:outline-none min-h-[140px]"
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
              className={`w-full rounded-full px-4 py-3 text-sm font-semibold text-white transition ${
                loading ? "bg-blue-300" : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {loading ? "Sending..." : "Send message"}
            </button>
            <p className="text-xs text-neutral-500 text-center">
              No spam. I only use your details to reply to this inquiry.
            </p>
          </form>
        </div>
      </div>
    </main>
  );
}
