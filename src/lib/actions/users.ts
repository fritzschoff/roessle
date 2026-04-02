"use server";

import { db } from "@/lib/db";
import { users } from "@/lib/schema";
import { auth } from "@/lib/auth";
import { eq } from "drizzle-orm";
import { hash } from "bcryptjs";
import { ulid } from "ulid";

export async function createUser(formData: FormData) {
  const session = await auth();
  if (!session?.user?.id) return { error: "Nicht autorisiert" };

  const email = (formData.get("email") as string)?.trim();
  const name = (formData.get("name") as string)?.trim();
  const password = formData.get("password") as string;

  if (!email || !name || !password) {
    return { error: "Alle Felder sind erforderlich." };
  }

  if (password.length < 8) {
    return { error: "Passwort muss mindestens 8 Zeichen lang sein." };
  }

  const [existing] = await db
    .select()
    .from(users)
    .where(eq(users.email, email))
    .limit(1);

  if (existing) {
    return { error: "Ein Benutzer mit dieser E-Mail existiert bereits." };
  }

  const passwordHash = await hash(password, 12);

  await db.insert(users).values({
    id: ulid(),
    email,
    name,
    passwordHash,
  });

  return { success: true };
}

export async function deleteUser(id: string) {
  const session = await auth();
  if (!session?.user?.id) return { error: "Nicht autorisiert" };

  if (session.user.id === id) {
    return { error: "Du kannst dich nicht selbst löschen." };
  }

  await db.delete(users).where(eq(users.id, id));

  return { success: true };
}

export async function resetPassword(id: string, formData: FormData) {
  const session = await auth();
  if (!session?.user?.id) return { error: "Nicht autorisiert" };

  const password = formData.get("password") as string;

  if (!password || password.length < 8) {
    return { error: "Passwort muss mindestens 8 Zeichen lang sein." };
  }

  const passwordHash = await hash(password, 12);

  await db
    .update(users)
    .set({ passwordHash })
    .where(eq(users.id, id));

  return { success: true };
}
