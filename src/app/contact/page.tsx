"use client";

import { useState } from "react";
import {
  Mail,
  Clock,
  CheckCircle2,
  Linkedin,
  Phone,
  Calendar,
} from "lucide-react";
import Reveal from "@/components/Reveal";
import { useLanguage } from "@/lib/i18n";

// Set to true once a real Formspree ID is set in handleSubmit below.
const FORM_ENABLED = false;

const copy = {
  en: {
    badge: "Contact",
    title: "Let's talk about your portfolio.",
    subtitle:
      "Share your context, timeline and any constraints. You'll get a quick read on how I can help — and the first decisions to take.",
    responseTitle: "Response time",
    responseValue: "Within 24 hours (Mon–Fri)",
    bestTitle: "Best way",
    bestValue: "Email with a short context",
    callTitle: "Book a call",
    callValue: "30 min, video or phone",
    placeholders: {
      name: "Your name",
      email: "Work email",
      message: "Tell me about the project, goals, scope and timeline",
    },
    formTitle: "Send a message",
    formSub: "Reach me directly — I read every message.",
    formUnavailable:
      "The contact form will be available soon. For now, please reach me by email.",
    submit: "Send message",
    submitting: "Sending…",
    success: "Message sent — I'll reply as soon as possible.",
    privacy:
      "No spam. Your details are used only to reply to this request.",
    linkedin: "LinkedIn",
    phoneLabel: "Phone",
    emailLabel: "Email",
    directTitle: "Direct channels",
  },
  de: {
    badge: "Kontakt",
    title: "Sprechen wir über Ihr Portfolio.",
    subtitle:
      "Teilen Sie mir Kontext, Zeitachse und allfällige Constraints mit. Sie erhalten eine kurze Einschätzung – und die ersten zu treffenden Entscheidungen.",
    responseTitle: "Antwortzeit",
    responseValue: "Innerhalb 24 Stunden (Mo–Fr)",
    bestTitle: "Bevorzugter Weg",
    bestValue: "E-Mail mit kurzem Kontext",
    callTitle: "Termin buchen",
    callValue: "30 Min., Video oder Telefon",
    placeholders: {
      name: "Ihr Name",
      email: "Geschäftliche E-Mail",
      message: "Beschreiben Sie Projekt, Ziele, Umfang und Zeitachse",
    },
    formTitle: "Nachricht senden",
    formSub: "Direkt an mich – ich lese jede Anfrage.",
    formUnavailable:
      "Das Kontaktformular folgt in Kürze. Bitte schreiben Sie mir vorerst per E-Mail.",
    submit: "Nachricht senden",
    submitting: "Wird gesendet…",
    success: "Nachricht gesendet – ich melde mich so rasch wie möglich.",
    privacy:
      "Kein Spam. Ihre Angaben werden ausschliesslich für die Beantwortung dieser Anfrage verwendet.",
    linkedin: "LinkedIn",
    phoneLabel: "Telefon",
    emailLabel: "E-Mail",
    directTitle: "Direkter Draht",
  },
};

const CONTACT_EMAIL = "kontakt@steffensinfraport.ch";
const CONTACT_PHONE = "+41 00 000 00 00";
const LINKEDIN_URL = "https://www.linkedin.com/in/gustavo-steffens-47059324";

export default function ContactPage() {
  const { lang } = useLanguage();
  const t = copy[lang] ?? copy.de;
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setFeedback("");

    const res = await fetch("https://formspree.io/f/abcdwxyz", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();
    setLoading(false);

    if (!res.ok) {
      const msg = data?.errors?.[0]?.message ?? "Error while sending.";
      setFeedback(msg);
    } else {
      setFeedback(t.success);
      setForm({ name: "", email: "", message: "" });
    }
  }

  const inputStyle: React.CSSProperties = {
    background: "var(--bg-deep)",
    border: "1px solid var(--rule)",
    color: "var(--ink)",
  };

  return (
    <>
      {/* HERO */}
      <section className="cinematic-glow relative overflow-hidden pt-20 pb-12 md:pt-28 md:pb-16">
        <div className="page-container relative z-10">
          <Reveal>
            <span className="kicker">{t.badge}</span>
          </Reveal>
          <Reveal delay={80}>
            <h1
              className="mt-6 display-serif"
              style={{
                color: "var(--ink)",
                fontSize: "clamp(2.15rem, 4.15vw, 4.15rem)",
                maxWidth: "22ch",
              }}
            >
              {t.title}
            </h1>
          </Reveal>
          <Reveal delay={140}>
            <p className="mt-10 lead-xl" style={{ maxWidth: "70ch" }}>
              {t.subtitle}
            </p>
          </Reveal>
        </div>
      </section>

      {/* CONTENT */}
      <section className="page-container pb-32">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          {/* LEFT — facts + channels */}
          <div className="space-y-10 lg:col-span-5">
            <Reveal>
              <div
                className="grid gap-px overflow-hidden rounded-2xl"
                style={{ background: "var(--rule)", border: "1px solid var(--rule)" }}
              >
                {[
                  { icon: Clock, title: t.responseTitle, value: t.responseValue },
                  { icon: CheckCircle2, title: t.bestTitle, value: t.bestValue },
                  { icon: Calendar, title: t.callTitle, value: t.callValue },
                ].map(({ icon: Icon, title, value }) => (
                  <div
                    key={title}
                    className="flex items-center gap-5 p-7"
                    style={{ background: "var(--bg-elevated)" }}
                  >
                    <div
                      className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-lg"
                      style={{
                        background: "var(--accent-soft)",
                        color: "var(--accent-strong)",
                      }}
                    >
                      <Icon size={20} />
                    </div>
                    <div>
                      <p
                        className="text-[11px] uppercase tracking-[0.22em]"
                        style={{ color: "var(--ink-muted)" }}
                      >
                        {title}
                      </p>
                      <p
                        className="mt-1.5 text-[15.5px] font-medium"
                        style={{ color: "var(--ink)" }}
                      >
                        {value}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal delay={80}>
              <div>
                <p className="kicker">{t.directTitle}</p>
                <ul className="mt-7 space-y-4">
                  <li>
                    <a
                      href={`mailto:${CONTACT_EMAIL}`}
                      className="inline-flex items-center gap-3 text-[16px]"
                      style={{ color: "var(--ink-soft)" }}
                    >
                      <Mail size={17} style={{ color: "var(--accent)" }} />
                      {CONTACT_EMAIL}
                    </a>
                  </li>
                  <li>
                    <a
                      href={`tel:${CONTACT_PHONE.replace(/\s/g, "")}`}
                      className="inline-flex items-center gap-3 text-[16px]"
                      style={{ color: "var(--ink-soft)" }}
                    >
                      <Phone size={17} style={{ color: "var(--accent)" }} />
                      {CONTACT_PHONE}
                    </a>
                  </li>
                  <li>
                    <a
                      href={LINKEDIN_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-3 text-[16px]"
                      style={{ color: "var(--ink-soft)" }}
                    >
                      <Linkedin size={17} style={{ color: "var(--accent)" }} />
                      {t.linkedin}
                    </a>
                  </li>
                </ul>
              </div>
            </Reveal>
          </div>

          {/* RIGHT — form */}
          <Reveal delay={120} className="lg:col-span-7">
            {FORM_ENABLED ? (
            <form
              onSubmit={handleSubmit}
              className="rounded-3xl p-10 md:p-12"
              style={{
                border: "1px solid var(--rule-strong)",
                background: "var(--bg-elevated)",
                boxShadow: "0 30px 80px rgba(0,0,0,0.4)",
              }}
            >
              <span className="kicker">{t.formTitle}</span>
              <p
                className="mt-5"
                style={{
                  color: "var(--ink-muted)",
                  fontSize: "15px",
                  lineHeight: 1.65,
                }}
              >
                {t.formSub}
              </p>

              <div className="mt-10 grid gap-5 sm:grid-cols-2">
                <input
                  type="text"
                  placeholder={t.placeholders.name}
                  className="w-full rounded-lg px-5 py-4 text-[15px] placeholder:text-[var(--ink-faint)] focus:outline-none focus:border-[var(--accent)]"
                  style={inputStyle}
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  required
                />
                <input
                  type="email"
                  placeholder={t.placeholders.email}
                  className="w-full rounded-lg px-5 py-4 text-[15px] placeholder:text-[var(--ink-faint)] focus:outline-none focus:border-[var(--accent)]"
                  style={inputStyle}
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  required
                />
              </div>
              <textarea
                placeholder={t.placeholders.message}
                className="mt-5 min-h-[220px] w-full rounded-lg px-5 py-4 text-[15px] placeholder:text-[var(--ink-faint)] focus:outline-none focus:border-[var(--accent)]"
                style={inputStyle}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                required
              />

              {feedback ? (
                <p
                  className="mt-5 text-sm"
                  style={{ color: "var(--accent-strong)" }}
                >
                  {feedback}
                </p>
              ) : null}

              <div className="mt-10 flex flex-wrap items-center gap-5">
                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary disabled:opacity-60"
                >
                  {loading ? t.submitting : t.submit}{" "}
                  <span aria-hidden>→</span>
                </button>
                <p
                  className="text-[13px]"
                  style={{ color: "var(--ink-muted)", maxWidth: "44ch" }}
                >
                  {t.privacy}
                </p>
              </div>
            </form>
            ) : (
              <div
                className="rounded-3xl p-10 md:p-12"
                style={{
                  border: "1px solid var(--rule-strong)",
                  background: "var(--bg-elevated)",
                  boxShadow: "0 30px 80px rgba(0,0,0,0.4)",
                }}
              >
                <span className="kicker">{t.formTitle}</span>
                <p
                  className="mt-5"
                  style={{
                    color: "var(--ink-muted)",
                    fontSize: "15px",
                    lineHeight: 1.65,
                  }}
                >
                  {t.formUnavailable}
                </p>
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="btn-primary mt-10 inline-flex"
                >
                  {CONTACT_EMAIL} <span aria-hidden>→</span>
                </a>
              </div>
            )}
          </Reveal>
        </div>
      </section>
    </>
  );
}
