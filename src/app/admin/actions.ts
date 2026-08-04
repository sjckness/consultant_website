"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";

const COOKIE = "admin_session";

async function requireAdmin() {
  const store = await cookies();
  if (store.get(COOKIE)?.value !== process.env.ADMIN_PASSWORD) {
    throw new Error("Unauthorized");
  }
}

export type ActionState = { ok: boolean; error?: string; message?: string };

export const emptyState: ActionState = { ok: false };

export async function addClient(
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  await requireAdmin();

  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "")
    .trim()
    .toLowerCase();
  const phone = String(formData.get("phone") ?? "").trim();
  const company = String(formData.get("company") ?? "").trim();
  const notes = String(formData.get("notes") ?? "").trim();
  const status = String(formData.get("status") ?? "lead").trim() || "lead";
  const sourceMessageId = String(formData.get("sourceMessageId") ?? "").trim();

  if (!name || !email) {
    return { ok: false, error: "Name and email are required." };
  }

  const existing = await prisma.client.findFirst({ where: { email } });
  if (existing) {
    return {
      ok: false,
      error: `A client with ${email} already exists.`,
    };
  }

  await prisma.client.create({
    data: {
      name,
      email,
      phone: phone || null,
      company: company || null,
      notes: notes || null,
      status,
      sourceMessageId: sourceMessageId || null,
    },
  });

  revalidatePath("/admin");
  return { ok: true, message: "Client added." };
}

export async function updateClient(
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  await requireAdmin();

  const id = String(formData.get("id") ?? "");
  if (!id) return { ok: false, error: "Missing client id." };

  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "")
    .trim()
    .toLowerCase();
  const phone = String(formData.get("phone") ?? "").trim();
  const company = String(formData.get("company") ?? "").trim();
  const notes = String(formData.get("notes") ?? "").trim();
  const status = String(formData.get("status") ?? "").trim() || "lead";

  if (!name || !email) {
    return { ok: false, error: "Name and email are required." };
  }

  await prisma.client.update({
    where: { id },
    data: {
      name,
      email,
      phone: phone || null,
      company: company || null,
      notes: notes || null,
      status,
    },
  });

  revalidatePath("/admin");
  return { ok: true, message: "Saved." };
}

export async function deleteClient(
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  await requireAdmin();

  const id = String(formData.get("id") ?? "");
  if (!id) return { ok: false, error: "Missing client id." };

  await prisma.client.delete({ where: { id } });

  revalidatePath("/admin");
  return { ok: true, message: "Deleted." };
}
