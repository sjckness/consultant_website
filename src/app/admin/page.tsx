import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import AdminDashboard from "./AdminDashboard";
import { inputStyle } from "./types";

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

  const [submissions, clients] = await Promise.all([
    prisma.contactRequest.findMany({ orderBy: { createdAt: "desc" } }),
    prisma.client.findMany({ orderBy: { updatedAt: "desc" } }),
  ]);

  return (
    <AdminDashboard
      logout={logout}
      messages={submissions.map((s) => ({
        id: s.id,
        name: s.name,
        email: s.email,
        message: s.message,
        createdAt: formatDate(s.createdAt),
      }))}
      clients={clients.map((c) => ({
        id: c.id,
        name: c.name,
        email: c.email,
        phone: c.phone ?? "",
        company: c.company ?? "",
        notes: c.notes ?? "",
        status: c.status,
        createdAt: formatDate(c.createdAt),
        updatedAt: formatDate(c.updatedAt),
      }))}
    />
  );
}
