import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

const COOKIE = "admin_session";

async function login(formData: FormData) {
  "use server";
  const password = String(formData.get("password") ?? "");
  if (password && password === process.env.ADMIN_PASSWORD) {
    const store = await cookies();
    store.set(COOKIE, password, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/admin",
      maxAge: 60 * 60 * 8,
    });
    redirect("/admin");
  }
  redirect("/admin?error=1");
}

async function logout() {
  "use server";
  const store = await cookies();
  store.delete(COOKIE);
  redirect("/admin");
}

function formatDate(date: Date) {
  return new Intl.DateTimeFormat("de-CH", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
}

export default async function AdminPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;
  const store = await cookies();
  const authed = store.get(COOKIE)?.value === process.env.ADMIN_PASSWORD;

  const inputStyle: React.CSSProperties = {
    background: "var(--bg-deep)",
    border: "1px solid var(--rule)",
    color: "var(--ink)",
  };

  if (!authed) {
    return (
      <section className="page-container flex min-h-[70vh] items-center justify-center py-24">
        <form
          action={login}
          className="w-full max-w-sm rounded-2xl p-10"
          style={{
            border: "1px solid var(--rule-strong)",
            background: "var(--bg-elevated)",
          }}
        >
          <h1 className="display-serif" style={{ fontSize: "1.6rem" }}>
            Admin
          </h1>
          <p className="mt-2 text-sm" style={{ color: "var(--ink-muted)" }}>
            Enter the password to view submissions.
          </p>
          <input
            type="password"
            name="password"
            placeholder="Password"
            required
            className="mt-6 w-full rounded-lg px-4 py-3 text-[15px] placeholder:text-[var(--ink-faint)] focus:outline-none focus:border-[var(--accent)]"
            style={inputStyle}
          />
          {error ? (
            <p className="mt-3 text-sm" style={{ color: "#e88" }}>
              Incorrect password.
            </p>
          ) : null}
          <button
            type="submit"
            className="btn-primary mt-6 w-full justify-center"
          >
            Sign in
          </button>
        </form>
      </section>
    );
  }

  const submissions = await prisma.contactRequest.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <section className="page-container py-24">
      <div className="flex items-end justify-between gap-6">
        <div>
          <span className="kicker">Admin</span>
          <h1
            className="mt-4 display-serif"
            style={{ fontSize: "clamp(2rem, 3vw, 2.8rem)" }}
          >
            Contact submissions
          </h1>
          <p className="mt-2 text-sm" style={{ color: "var(--ink-muted)" }}>
            {submissions.length}{" "}
            {submissions.length === 1 ? "submission" : "submissions"}
          </p>
        </div>
        <form action={logout}>
          <button type="submit" className="btn-secondary">
            Sign out
          </button>
        </form>
      </div>

      <div
        className="mt-10 overflow-x-auto rounded-2xl"
        style={{ border: "1px solid var(--rule)" }}
      >
        <table className="w-full border-collapse text-left text-sm">
          <thead>
            <tr style={{ background: "var(--bg-deep)" }}>
              {["Name", "Email", "Message", "Date"].map((h) => (
                <th
                  key={h}
                  className="px-5 py-4 text-[11px] font-semibold uppercase tracking-[0.18em]"
                  style={{ color: "var(--ink-muted)" }}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {submissions.length === 0 ? (
              <tr>
                <td
                  colSpan={4}
                  className="px-5 py-10 text-center"
                  style={{ color: "var(--ink-muted)" }}
                >
                  No submissions yet.
                </td>
              </tr>
            ) : (
              submissions.map((s) => (
                <tr key={s.id} style={{ borderTop: "1px solid var(--rule)" }}>
                  <td
                    className="px-5 py-4 align-top font-medium"
                    style={{ color: "var(--ink)" }}
                  >
                    {s.name}
                  </td>
                  <td className="px-5 py-4 align-top">
                    <a
                      href={`mailto:${s.email}`}
                      style={{ color: "var(--accent-strong)" }}
                    >
                      {s.email}
                    </a>
                  </td>
                  <td
                    className="max-w-md px-5 py-4 align-top whitespace-pre-wrap"
                    style={{ color: "var(--ink-soft)" }}
                  >
                    {s.message}
                  </td>
                  <td
                    className="px-5 py-4 align-top whitespace-nowrap tabular"
                    style={{ color: "var(--ink-muted)" }}
                  >
                    {formatDate(s.createdAt)}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}
