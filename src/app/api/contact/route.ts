import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { makeTransport } from "@/lib/mailer";

const ContactSchema = z.object({
  name: z.string().min(2).max(80),
  email: z.string().email().max(120),
  message: z.string().min(10).max(5000),
  // honeypot anti-bot (deve essere vuoto)
  website: z.string().max(0).optional().or(z.literal("")),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = ContactSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { ok: false, error: "Dati non validi." },
        { status: 400 }
      );
    }

    // Anti-bot: honeypot compilato => scarta
    if (parsed.data.website && parsed.data.website.length > 0) {
      return NextResponse.json({ ok: true }); // rispondi "ok" per non far capire ai bot
    }

    const name = parsed.data.name.trim();
    const email = parsed.data.email.trim().toLowerCase();
    const message = parsed.data.message.trim();

    // Info utili
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? null;
    const userAgent = req.headers.get("user-agent") ?? null;

    // 1) Salva su DB
    const saved = await prisma.contactRequest.create({
      data: { name, email, message, ip, userAgent },
    });

    // 2) Invia email
    const transport = makeTransport();
    const to = process.env.CONTACT_TO_EMAIL!;
    const from = process.env.CONTACT_FROM_EMAIL || process.env.SMTP_USER!;

    await transport.sendMail({
      from,
      to,
      replyTo: email,
      subject: `Nuova richiesta dal sito: ${name}`,
      text:
        `Hai ricevuto una nuova richiesta.\n\n` +
        `Nome: ${name}\n` +
        `Email: ${email}\n` +
        `IP: ${ip ?? "-"}\n` +
        `User-Agent: ${userAgent ?? "-"}\n\n` +
        `Messaggio:\n${message}\n\n` +
        `ID richiesta: ${saved.id}\n`,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { ok: false, error: "Errore server." },
      { status: 500 }
    );
  }
}
