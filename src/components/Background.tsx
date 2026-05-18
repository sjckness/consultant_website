"use client";

export default function Background() {
  return (
    <div
      aria-hidden
      className="fixed inset-0 -z-10 overflow-hidden"
      style={{ background: "var(--bg)" }}
    >
      {/* Neutral graphite ambience — barely-blue glow */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(70% 60% at 15% 8%, rgba(123,168,217,0.06), transparent 65%), radial-gradient(50% 50% at 88% 0%, rgba(255,255,255,0.025), transparent 70%)",
        }}
      />
      {/* Faint film grain */}
      <div
        className="absolute inset-0 opacity-[0.035] mix-blend-overlay"
        style={{
          backgroundImage:
            "radial-gradient(rgba(255,255,255,0.55) 1px, transparent 1px)",
          backgroundSize: "3px 3px",
        }}
      />
    </div>
  );
}
