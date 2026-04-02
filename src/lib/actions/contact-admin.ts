"use server";

import { db } from "@/lib/db";
import { contactMessages } from "@/lib/schema";
import { auth } from "@/lib/auth";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function toggleMessageRead(id: string, isRead: boolean) {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Nicht autorisiert");

  await db
    .update(contactMessages)
    .set({ isRead })
    .where(eq(contactMessages.id, id));

  revalidatePath("/admin/kontakt");
  revalidatePath("/admin");
}

export async function deleteMessage(id: string) {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Nicht autorisiert");

  await db.delete(contactMessages).where(eq(contactMessages.id, id));

  revalidatePath("/admin/kontakt");
  revalidatePath("/admin");
}
