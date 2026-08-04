"use client";

import { useMemo, useState } from "react";
import AddClientModal from "./AddClientModal";
import ClientRow from "./ClientRow";
import { type ClientRowData, inputStyle, type MessageRow } from "./types";

const thStyle =
  "px-5 py-4 text-[11px] font-semibold uppercase tracking-[0.18em]";

export default function AdminDashboard({
  messages,
  clients,
  logout,
}: {
  messages: MessageRow[];
  clients: ClientRowData[];
  logout: () => void;
}) {
  const [tab, setTab] = useState<"messages" | "clients">("messages");
  const [addFor, setAddFor] = useState<MessageRow | null>(null);
  const [search, setSearch] = useState("");

  const filteredClients = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return clients;
    return clients.filter(
      (c) =>
        c.name.toLowerCase().includes(q) || c.email.toLowerCase().includes(q),
    );
  }, [clients, search]);

  return (
    <section className="page-container py-24">
      <div className="flex items-end justify-between gap-6">
        <div>
          <span className="kicker">Admin</span>
          <h1
            className="mt-4 display-serif"
            style={{ fontSize: "clamp(2rem, 3vw, 2.8rem)" }}
          >
            Dashboard
          </h1>
        </div>
        <form action={logout}>
          <button type="submit" className="btn-secondary">
            Sign out
          </button>
        </form>
      </div>

      <div className="mt-8 flex gap-2">
        {(
          [
            ["messages", `Messages (${messages.length})`],
            ["clients", `Clients (${clients.length})`],
          ] as const
        ).map(([key, label]) => (
          <button
            key={key}
            type="button"
            onClick={() => setTab(key)}
            className="rounded-full px-5 py-2 text-sm font-medium transition-colors"
            style={{
              background: tab === key ? "var(--accent-soft)" : "transparent",
              color: tab === key ? "var(--accent-strong)" : "var(--ink-muted)",
              border: `1px solid ${tab === key ? "var(--accent)" : "var(--rule)"}`,
            }}
          >
            {label}
          </button>
        ))}
      </div>

      {tab === "messages" ? (
        <div
          className="mt-8 overflow-x-auto rounded-2xl"
          style={{ border: "1px solid var(--rule)" }}
        >
          <table className="w-full border-collapse text-left text-sm">
            <thead>
              <tr style={{ background: "var(--bg-deep)" }}>
                {["Name", "Email", "Message", "Date", ""].map((h, i) => (
                  <th
                    key={h || `col-${i}`}
                    className={thStyle}
                    style={{ color: "var(--ink-muted)" }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {messages.length === 0 ? (
                <tr>
                  <td
                    colSpan={5}
                    className="px-5 py-10 text-center"
                    style={{ color: "var(--ink-muted)" }}
                  >
                    No submissions yet.
                  </td>
                </tr>
              ) : (
                messages.map((m) => (
                  <tr key={m.id} style={{ borderTop: "1px solid var(--rule)" }}>
                    <td
                      className="px-5 py-4 align-top font-medium"
                      style={{ color: "var(--ink)" }}
                    >
                      {m.name}
                    </td>
                    <td className="px-5 py-4 align-top">
                      <a
                        href={`mailto:${m.email}`}
                        style={{ color: "var(--accent-strong)" }}
                      >
                        {m.email}
                      </a>
                    </td>
                    <td
                      className="max-w-md px-5 py-4 align-top whitespace-pre-wrap"
                      style={{ color: "var(--ink-soft)" }}
                    >
                      {m.message}
                    </td>
                    <td
                      className="px-5 py-4 align-top whitespace-nowrap tabular"
                      style={{ color: "var(--ink-muted)" }}
                    >
                      {m.createdAt}
                    </td>
                    <td className="px-5 py-4 align-top whitespace-nowrap">
                      <button
                        type="button"
                        onClick={() => setAddFor(m)}
                        className="text-sm"
                        style={{ color: "var(--accent)" }}
                      >
                        Add to clients
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="mt-8">
          <input
            type="search"
            placeholder="Search by name or email…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="mb-5 w-full max-w-sm rounded-lg px-4 py-2.5 text-[15px] placeholder:text-[var(--ink-faint)] focus:outline-none focus:border-[var(--accent)]"
            style={inputStyle}
          />
          <div
            className="overflow-x-auto rounded-2xl"
            style={{ border: "1px solid var(--rule)" }}
          >
            <table className="w-full border-collapse text-left text-sm">
              <thead>
                <tr style={{ background: "var(--bg-deep)" }}>
                  {["Name", "Email", "Company", "Status", "Created", ""].map(
                    (h, i) => (
                      <th
                        key={h || `col-${i}`}
                        className={thStyle}
                        style={{ color: "var(--ink-muted)" }}
                      >
                        {h}
                      </th>
                    ),
                  )}
                </tr>
              </thead>
              <tbody>
                {filteredClients.length === 0 ? (
                  <tr>
                    <td
                      colSpan={6}
                      className="px-5 py-10 text-center"
                      style={{ color: "var(--ink-muted)" }}
                    >
                      {clients.length === 0
                        ? "No clients yet."
                        : "No clients match your search."}
                    </td>
                  </tr>
                ) : (
                  filteredClients.map((c) => (
                    <ClientRow key={c.id} client={c} />
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {addFor ? (
        <AddClientModal message={addFor} onClose={() => setAddFor(null)} />
      ) : null}
    </section>
  );
}
