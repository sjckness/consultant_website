"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

// "Coming soon" gate shown instead of the site. Set GATE_ENABLED to false (and
// rebuild) to show the full site to everyone again.
//
// This is NOT real protection: the credentials ship in the public JavaScript and
// every page can still be fetched by URL. It only keeps casual visitors out.
// For real protection use Plesk > Password-Protected Directories.
const GATE_ENABLED = true;
const ADMIN_USER = "gustavo";
const ADMIN_PASS = "aKLsYSZB";
const STORAGE_KEY = "sic-admin-unlocked-v2"; // bump to log everyone out

export default function ComingSoonGate({
  children,
}: {
  children: React.ReactNode;
}) {
  const [unlocked, setUnlocked] = useState(!GATE_ENABLED);
  const [loginOpen, setLoginOpen] = useState(false);
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState(false);

  useEffect(() => {
    try {
      if (window.localStorage.getItem(STORAGE_KEY) === "1") setUnlocked(true);
    } catch {
      // storage unavailable: the visitor simply stays on the gate
    }
  }, []);

  if (unlocked) return <>{children}</>;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (user.trim().toLowerCase() === ADMIN_USER && pass === ADMIN_PASS) {
      try {
        window.localStorage.setItem(STORAGE_KEY, "1");
      } catch {
        // ignore: the site still opens for this visit
      }
      setUnlocked(true);
    } else {
      setError(true);
    }
  }

  const inputStyle: React.CSSProperties = {
    background: "var(--bg-deep)",
    border: "1px solid var(--rule-strong)",
    color: "var(--ink)",
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center px-6 text-center"
      style={{ background: "var(--bg)" }}
    >
      <Image
        src="/logo.svg"
        alt="Steffens Infraport Consulting"
        width={590}
        height={140}
        priority
        unoptimized
        className="h-[64px] w-auto md:h-[84px]"
      />
      <h1
        className="display-serif mt-14"
        style={{ color: "var(--ink)", fontSize: "clamp(2.4rem, 6vw, 4.5rem)" }}
      >
        Bald verfügbar
      </h1>
      <p className="lead-xl mt-6" style={{ maxWidth: "36ch" }}>
        Unsere neue Website ist in Vorbereitung.
      </p>

      {loginOpen ? (
        <form
          onSubmit={handleSubmit}
          className="fixed right-6 bottom-20 w-[min(92vw,320px)] rounded-2xl p-6 text-left"
          style={{
            background: "var(--bg-elevated)",
            border: "1px solid var(--rule-strong)",
            boxShadow: "0 30px 80px rgba(0,0,0,0.4)",
          }}
        >
          <input
            type="text"
            name="admin-user"
            placeholder="Benutzername"
            autoComplete="off"
            autoCapitalize="none"
            autoCorrect="off"
            spellCheck={false}
            autoFocus
            className="w-full rounded-lg px-4 py-3 text-[15px] focus:outline-none"
            style={inputStyle}
            value={user}
            onChange={(e) => {
              setUser(e.target.value);
              setError(false);
            }}
          />
          <input
            type="password"
            name="admin-pass"
            placeholder="Passwort"
            autoComplete="off"
            className="mt-3 w-full rounded-lg px-4 py-3 text-[15px] focus:outline-none"
            style={inputStyle}
            value={pass}
            onChange={(e) => {
              setPass(e.target.value);
              setError(false);
            }}
          />
          {error ? (
            <p
              role="alert"
              className="mt-3 text-sm"
              style={{ color: "var(--accent-strong)" }}
            >
              Zugangsdaten nicht korrekt.
            </p>
          ) : null}
          <button
            type="submit"
            className="btn-primary mt-5 w-full justify-center"
            style={{ padding: "0.8rem 1.4rem", fontSize: "0.95rem" }}
          >
            Anmelden
          </button>
        </form>
      ) : null}

      <button
        type="button"
        onClick={() => {
          setLoginOpen((open) => !open);
          setError(false);
        }}
        className="fixed right-6 bottom-6 rounded-full px-4 py-2 text-[13px] font-medium"
        style={{
          color: "var(--ink-muted)",
          border: "1px solid var(--rule-strong)",
        }}
      >
        Admin
      </button>
    </div>
  );
}
