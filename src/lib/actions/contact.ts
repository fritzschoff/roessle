"use server";

import { db } from "@/lib/db";
import { contactMessages } from "@/lib/schema";
import { ulid } from "ulid";

export async function submitContact(formData: FormData) {
  const name = formData.get("name");
  const email = formData.get("email");
  const nachricht = formData.get("nachricht");

  if (!name || typeof name !== "string" || name.trim().length === 0) {
    return { error: "Bitte gib deinen Namen an." };
  }

  if (!email || typeof email !== "string" || email.trim().length === 0) {
    return { error: "Bitte gib deine E-Mail-Adresse an." };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email.trim())) {
    return { error: "Bitte gib eine gültige E-Mail-Adresse an." };
  }

  if (
    !nachricht ||
    typeof nachricht !== "string" ||
    nachricht.trim().length === 0
  ) {
    return { error: "Bitte schreib uns eine Nachricht." };
  }

  try {
    await db.insert(contactMessages).values({
      id: ulid(),
      name: name.trim(),
      email: email.trim(),
      nachricht: nachricht.trim(),
    });

    return { success: true };
  } catch {
    return { error: "Es ist ein Fehler aufgetreten. Bitte versuche es später erneut." };
  }
}
