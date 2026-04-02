"use server";

import { db } from "@/lib/db";
import { termine } from "@/lib/schema";
import { auth } from "@/lib/auth";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { ulid } from "ulid";

export async function createTermin(formData: FormData) {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Nicht autorisiert");

  const gegner = formData.get("gegner") as string;
  const datum = formData.get("datum") as string;
  const uhrzeit = formData.get("uhrzeit") as string;
  const ort = (formData.get("ort") as string) || "Das Rössle";
  const oeffnungszeit = (formData.get("oeffnungszeit") as string) || null;
  const beschreibung = (formData.get("beschreibung") as string) || null;

  await db.insert(termine).values({
    id: ulid(),
    gegner,
    datum,
    uhrzeit,
    ort,
    oeffnungszeit,
    beschreibung,
  });

  revalidatePath("/termine");
  revalidatePath("/");
  redirect("/admin/termine");
}

export async function updateTermin(id: string, formData: FormData) {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Nicht autorisiert");

  const gegner = formData.get("gegner") as string;
  const datum = formData.get("datum") as string;
  const uhrzeit = formData.get("uhrzeit") as string;
  const ort = (formData.get("ort") as string) || "Das Rössle";
  const oeffnungszeit = (formData.get("oeffnungszeit") as string) || null;
  const beschreibung = (formData.get("beschreibung") as string) || null;

  await db
    .update(termine)
    .set({ gegner, datum, uhrzeit, ort, oeffnungszeit, beschreibung })
    .where(eq(termine.id, id));

  revalidatePath("/termine");
  revalidatePath("/");
  redirect("/admin/termine");
}

export async function deleteTermin(id: string) {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Nicht autorisiert");

  await db.delete(termine).where(eq(termine.id, id));

  revalidatePath("/termine");
  revalidatePath("/");
  redirect("/admin/termine");
}
