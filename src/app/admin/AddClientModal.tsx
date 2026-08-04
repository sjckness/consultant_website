"use client";

import { useActionState, useEffect } from "react";
import { addClient, emptyState } from "./actions";
import { CLIENT_STATUSES, inputStyle, type MessageRow } from "./types";

export default function AddClientModal({
  message,
  onClose,
}: {
  message: MessageRow;
  onClose: () => void;
}) {
  const [state, formAction, pending] = useActionState(addClient, emptyState);

  useEffect(() => {
    if (state.ok) onClose();
  }, [state.ok, onClose]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
      <button
        type="button"
        aria-label="Close"
        onClick={onClose}
        className="absolute inset-0 h-full w-full cursor-default"
        style={{ background: "rgba(0,0,0,0.6)" }}
      />
      <form
        action={formAction}
        className="relative w-full max-w-md rounded-2xl p-8"
        style={{
          border: "1px solid var(--rule-strong)",
          background: "var(--bg-elevated)",
          boxShadow: "0 30px 80px rgba(0,0,0,0.5)",
        }}
      >
        <h2 className="display-serif" style={{ fontSize: "1.4rem" }}>
          Add to clients
        </h2>
        <p className="mt-2 text-sm" style={{ color: "var(--ink-muted)" }}>
          Pre-filled from the submission. Adjust before saving.
        </p>

        <input type="hidden" name="sourceMessageId" value={message.id} />

        <div className="mt-6 grid gap-4">
          <label className="grid gap-1.5 text-sm">
            <span style={{ color: "var(--ink-muted)" }}>Name</span>
            <input
              name="name"
              defaultValue={message.name}
              required
              className="w-full rounded-lg px-4 py-2.5 text-[15px] focus:outline-none focus:border-[var(--accent)]"
              style={inputStyle}
            />
          </label>
          <label className="grid gap-1.5 text-sm">
            <span style={{ color: "var(--ink-muted)" }}>Email</span>
            <input
              name="email"
              type="email"
              defaultValue={message.email}
              required
              className="w-full rounded-lg px-4 py-2.5 text-[15px] focus:outline-none focus:border-[var(--accent)]"
              style={inputStyle}
            />
          </label>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="grid gap-1.5 text-sm">
              <span style={{ color: "var(--ink-muted)" }}>Phone</span>
              <input
                name="phone"
                className="w-full rounded-lg px-4 py-2.5 text-[15px] focus:outline-none focus:border-[var(--accent)]"
                style={inputStyle}
              />
            </label>
            <label className="grid gap-1.5 text-sm">
              <span style={{ color: "var(--ink-muted)" }}>Company</span>
              <input
                name="company"
                className="w-full rounded-lg px-4 py-2.5 text-[15px] focus:outline-none focus:border-[var(--accent)]"
                style={inputStyle}
              />
            </label>
          </div>
          <label className="grid gap-1.5 text-sm">
            <span style={{ color: "var(--ink-muted)" }}>Status</span>
            <select
              name="status"
              defaultValue="lead"
              className="w-full rounded-lg px-4 py-2.5 text-[15px] focus:outline-none focus:border-[var(--accent)]"
              style={inputStyle}
            >
              {CLIENT_STATUSES.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </label>
          <label className="grid gap-1.5 text-sm">
            <span style={{ color: "var(--ink-muted)" }}>Notes</span>
            <textarea
              name="notes"
              rows={3}
              className="w-full rounded-lg px-4 py-2.5 text-[15px] focus:outline-none focus:border-[var(--accent)]"
              style={inputStyle}
            />
          </label>
        </div>

        {state.error ? (
          <p className="mt-4 text-sm" style={{ color: "#e88" }}>
            {state.error}
          </p>
        ) : null}

        <div className="mt-7 flex items-center gap-3">
          <button
            type="submit"
            disabled={pending}
            className="btn-primary justify-center disabled:opacity-60"
          >
            {pending ? "Saving…" : "Save client"}
          </button>
          <button type="button" onClick={onClose} className="btn-secondary">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
