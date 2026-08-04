"use client";

import { useActionState, useEffect, useState } from "react";
import { deleteClient, emptyState, updateClient } from "./actions";
import { CLIENT_STATUSES, type ClientRowData, inputStyle } from "./types";

const statusColors: Record<string, string> = {
  lead: "var(--ink-muted)",
  contacted: "var(--accent)",
  active: "var(--accent-strong)",
  won: "#6fcf97",
  lost: "#e88",
  archived: "var(--ink-faint)",
};

export default function ClientRow({ client }: { client: ClientRowData }) {
  const [editing, setEditing] = useState(false);
  const [notesOpen, setNotesOpen] = useState(false);
  const [confirming, setConfirming] = useState(false);
  const [state, formAction, pending] = useActionState(updateClient, emptyState);
  const [delState, deleteAction, deleting] = useActionState(
    deleteClient,
    emptyState,
  );

  useEffect(() => {
    if (state.ok) setEditing(false);
  }, [state.ok]);

  const tdStyle = "px-5 py-4 align-top";

  if (editing) {
    return (
      <tr style={{ borderTop: "1px solid var(--rule)" }}>
        <td colSpan={6} className="px-5 py-5">
          <form action={formAction} className="grid gap-4">
            <input type="hidden" name="id" value={client.id} />
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="grid gap-1.5 text-sm">
                <span style={{ color: "var(--ink-muted)" }}>Name</span>
                <input
                  name="name"
                  defaultValue={client.name}
                  required
                  className="rounded-lg px-4 py-2.5 text-[15px] focus:outline-none focus:border-[var(--accent)]"
                  style={inputStyle}
                />
              </label>
              <label className="grid gap-1.5 text-sm">
                <span style={{ color: "var(--ink-muted)" }}>Email</span>
                <input
                  name="email"
                  type="email"
                  defaultValue={client.email}
                  required
                  className="rounded-lg px-4 py-2.5 text-[15px] focus:outline-none focus:border-[var(--accent)]"
                  style={inputStyle}
                />
              </label>
              <label className="grid gap-1.5 text-sm">
                <span style={{ color: "var(--ink-muted)" }}>Phone</span>
                <input
                  name="phone"
                  defaultValue={client.phone}
                  className="rounded-lg px-4 py-2.5 text-[15px] focus:outline-none focus:border-[var(--accent)]"
                  style={inputStyle}
                />
              </label>
              <label className="grid gap-1.5 text-sm">
                <span style={{ color: "var(--ink-muted)" }}>Company</span>
                <input
                  name="company"
                  defaultValue={client.company}
                  className="rounded-lg px-4 py-2.5 text-[15px] focus:outline-none focus:border-[var(--accent)]"
                  style={inputStyle}
                />
              </label>
            </div>
            <label className="grid gap-1.5 text-sm sm:max-w-[220px]">
              <span style={{ color: "var(--ink-muted)" }}>Status</span>
              <select
                name="status"
                defaultValue={client.status}
                className="rounded-lg px-4 py-2.5 text-[15px] focus:outline-none focus:border-[var(--accent)]"
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
                defaultValue={client.notes}
                className="rounded-lg px-4 py-2.5 text-[15px] focus:outline-none focus:border-[var(--accent)]"
                style={inputStyle}
              />
            </label>
            {state.error ? (
              <p className="text-sm" style={{ color: "#e88" }}>
                {state.error}
              </p>
            ) : null}
            <div className="flex items-center gap-3">
              <button
                type="submit"
                disabled={pending}
                className="btn-primary justify-center disabled:opacity-60"
              >
                {pending ? "Saving…" : "Save"}
              </button>
              <button
                type="button"
                onClick={() => setEditing(false)}
                className="btn-secondary"
              >
                Cancel
              </button>
            </div>
          </form>
        </td>
      </tr>
    );
  }

  return (
    <tr style={{ borderTop: "1px solid var(--rule)" }}>
      <td className={`${tdStyle} font-medium`} style={{ color: "var(--ink)" }}>
        {client.name}
      </td>
      <td className={tdStyle}>
        <a
          href={`mailto:${client.email}`}
          style={{ color: "var(--accent-strong)" }}
        >
          {client.email}
        </a>
      </td>
      <td className={tdStyle} style={{ color: "var(--ink-soft)" }}>
        {client.company || "—"}
      </td>
      <td className={tdStyle}>
        <span
          className="text-[11px] font-semibold uppercase tracking-[0.12em]"
          style={{ color: statusColors[client.status] ?? "var(--ink-muted)" }}
        >
          {client.status}
        </span>
      </td>
      <td
        className={`${tdStyle} whitespace-nowrap tabular`}
        style={{ color: "var(--ink-muted)" }}
      >
        {client.createdAt}
      </td>
      <td className={`${tdStyle} whitespace-nowrap`}>
        <div className="flex items-center gap-3">
          {client.notes ? (
            <button
              type="button"
              onClick={() => setNotesOpen((o) => !o)}
              className="text-sm"
              style={{ color: "var(--accent)" }}
            >
              {notesOpen ? "Hide notes" : "Notes"}
            </button>
          ) : null}
          <button
            type="button"
            onClick={() => setEditing(true)}
            className="text-sm"
            style={{ color: "var(--ink-soft)" }}
          >
            Edit
          </button>
          {confirming ? (
            <form action={deleteAction} className="flex items-center gap-2">
              <input type="hidden" name="id" value={client.id} />
              <button
                type="submit"
                disabled={deleting}
                className="text-sm disabled:opacity-60"
                style={{ color: "#e88" }}
              >
                {deleting ? "Deleting…" : "Confirm"}
              </button>
              <button
                type="button"
                onClick={() => setConfirming(false)}
                className="text-sm"
                style={{ color: "var(--ink-muted)" }}
              >
                Cancel
              </button>
            </form>
          ) : (
            <button
              type="button"
              onClick={() => setConfirming(true)}
              className="text-sm"
              style={{ color: "#e88" }}
            >
              Delete
            </button>
          )}
        </div>
        {delState.error ? (
          <p className="mt-3 text-sm" style={{ color: "#e88" }}>
            {delState.error}
          </p>
        ) : null}
        {notesOpen && client.notes ? (
          <p
            className="mt-3 max-w-md whitespace-pre-wrap text-sm"
            style={{ color: "var(--ink-soft)" }}
          >
            {client.notes}
          </p>
        ) : null}
      </td>
    </tr>
  );
}
