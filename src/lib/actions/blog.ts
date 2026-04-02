"use server";

import { db } from "@/lib/db";
import { blogPosts } from "@/lib/schema";
import { auth } from "@/lib/auth";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { ulid } from "ulid";

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/ä/g, "ae")
    .replace(/ö/g, "oe")
    .replace(/ü/g, "ue")
    .replace(/ß/g, "ss")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export async function createBlogPost(formData: FormData) {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Nicht autorisiert");

  const title = formData.get("title") as string;
  const excerpt = formData.get("excerpt") as string;
  const content = formData.get("content") as string;
  const imageUrl = (formData.get("imageUrl") as string) || null;
  const status = (formData.get("status") as "draft" | "published") || "draft";

  const suffix = ulid().slice(0, 6).toLowerCase();
  const slug = `${slugify(title)}-${suffix}`;

  await db.insert(blogPosts).values({
    id: ulid(),
    authorId: session.user.id,
    title,
    slug,
    content,
    excerpt,
    imageUrl,
    status,
    publishedAt: status === "published" ? new Date() : null,
  });

  revalidatePath("/aktuelles");
  revalidatePath("/");
  redirect("/admin/blog");
}

export async function updateBlogPost(id: string, formData: FormData) {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Nicht autorisiert");

  const title = formData.get("title") as string;
  const excerpt = formData.get("excerpt") as string;
  const content = formData.get("content") as string;
  const imageUrl = (formData.get("imageUrl") as string) || null;
  const status = (formData.get("status") as "draft" | "published") || "draft";

  const [existing] = await db
    .select()
    .from(blogPosts)
    .where(eq(blogPosts.id, id))
    .limit(1);

  if (!existing) throw new Error("Post nicht gefunden");

  let publishedAt = existing.publishedAt;
  if (status === "published" && !existing.publishedAt) {
    publishedAt = new Date();
  }

  await db
    .update(blogPosts)
    .set({
      title,
      excerpt,
      content,
      imageUrl,
      status,
      publishedAt,
      updatedAt: new Date(),
    })
    .where(eq(blogPosts.id, id));

  revalidatePath("/aktuelles");
  revalidatePath("/");
  redirect("/admin/blog");
}

export async function deleteBlogPost(id: string) {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Nicht autorisiert");

  await db.delete(blogPosts).where(eq(blogPosts.id, id));

  revalidatePath("/aktuelles");
  revalidatePath("/");
  redirect("/admin/blog");
}
