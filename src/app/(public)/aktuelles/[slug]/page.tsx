import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { db } from "@/lib/db";
import { blogPosts } from "@/lib/schema";
import { eq } from "drizzle-orm";
import { BlogContent } from "@/components/blog-content";

export const dynamic = "force-dynamic";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;

  const [post] = await db
    .select({ title: blogPosts.title, excerpt: blogPosts.excerpt })
    .from(blogPosts)
    .where(eq(blogPosts.slug, slug))
    .limit(1);

  if (!post) {
    return { title: "Beitrag nicht gefunden" };
  }

  return {
    title: post.title,
    description: post.excerpt || undefined,
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;

  const [result] = await db
    .select({
      id: blogPosts.id,
      title: blogPosts.title,
      content: blogPosts.content,
      imageUrl: blogPosts.imageUrl,
      publishedAt: blogPosts.publishedAt,
      status: blogPosts.status,
    })
    .from(blogPosts)
    .where(eq(blogPosts.slug, slug))
    .limit(1);

  if (!result || result.status !== "published") {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <Link
        href="/aktuelles"
        className="text-sm text-ckb-red hover:underline mb-6 inline-block"
      >
        &larr; Zurück zu Aktuelles
      </Link>

      {result.imageUrl && (
        <div className="relative h-64 sm:h-96 rounded-lg overflow-hidden mb-8">
          <Image
            src={result.imageUrl}
            alt={result.title}
            fill
            className="object-cover"
            priority
          />
        </div>
      )}

      <h1 className="text-3xl sm:text-4xl font-bold mb-4">{result.title}</h1>

      <div className="flex items-center gap-2 text-sm text-gray-500 mb-8">
        {result.publishedAt && (
          <time>
            {result.publishedAt.toLocaleDateString("de-DE", {
              day: "2-digit",
              month: "long",
              year: "numeric",
            })}
          </time>
        )}
      </div>

      <BlogContent html={result.content} />
    </div>
  );
}
