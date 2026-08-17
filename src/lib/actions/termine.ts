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
  const wettbewerb = (formData.get("wettbewerb") as string) || null;
  const heim = formData.get("heim") !== "auswaerts";
  const datum = formData.get("datum") as string;
  // Leer erlaubt: Anstoßzeit steht bei späteren Spieltagen oft noch nicht fest.
  const uhrzeit = ((formData.get("uhrzeit") as string) || "").trim();
  const ort = (formData.get("ort") as string) || "Das Rössle";
  const oeffnungszeit = (formData.get("oeffnungszeit") as string) || null;
  const beschreibung = (formData.get("beschreibung") as string) || null;

  await db.insert(termine).values({
    id: ulid(),
    gegner,
    wettbewerb,
    heim,
    datum,
    uhrzeit,
    ort,
    oeffnungszeit,
    beschreibung,
  });

  // Der Spielbalken steckt im Layout und steht damit auf jeder Seite — deshalb
  // die ganze Layout-Ebene erneuern, nicht nur Startseite und Termine.
  revalidatePath("/", "layout");
  redirect("/admin/termine");
}

export async function updateTermin(id: string, formData: FormData) {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Nicht autorisiert");

  const gegner = formData.get("gegner") as string;
  const wettbewerb = (formData.get("wettbewerb") as string) || null;
  const heim = formData.get("heim") !== "auswaerts";
  const datum = formData.get("datum") as string;
  // Leer erlaubt: Anstoßzeit steht bei späteren Spieltagen oft noch nicht fest.
  const uhrzeit = ((formData.get("uhrzeit") as string) || "").trim();
  const ort = (formData.get("ort") as string) || "Das Rössle";
  const oeffnungszeit = (formData.get("oeffnungszeit") as string) || null;
  const beschreibung = (formData.get("beschreibung") as string) || null;

  await db
    .update(termine)
    .set({ gegner, wettbewerb, heim, datum, uhrzeit, ort, oeffnungszeit, beschreibung })
    .where(eq(termine.id, id));

  // Der Spielbalken steckt im Layout und steht damit auf jeder Seite — deshalb
  // die ganze Layout-Ebene erneuern, nicht nur Startseite und Termine.
  revalidatePath("/", "layout");
  redirect("/admin/termine");
}

export async function deleteTermin(id: string) {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Nicht autorisiert");

  await db.delete(termine).where(eq(termine.id, id));

  // Der Spielbalken steckt im Layout und steht damit auf jeder Seite — deshalb
  // die ganze Layout-Ebene erneuern, nicht nur Startseite und Termine.
  revalidatePath("/", "layout");
  redirect("/admin/termine");
}
