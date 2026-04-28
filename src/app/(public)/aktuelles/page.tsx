import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { db } from "@/lib/db";
import { blogPosts } from "@/lib/schema";
import { desc, eq } from "drizzle-orm";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Aktuelles",
};

export default async function AktuellesPage() {
  const posts = await db
    .select({
      id: blogPosts.id,
      title: blogPosts.title,
      slug: blogPosts.slug,
      excerpt: blogPosts.excerpt,
      imageUrl: blogPosts.imageUrl,
      publishedAt: blogPosts.publishedAt,
    })
    .from(blogPosts)
    .where(eq(blogPosts.status, "published"))
    .orderBy(desc(blogPosts.publishedAt));

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="font-lobster text-4xl text-ckb-red mb-8">Aktuelles</h1>

      {posts.length === 0 ? (
        <p className="text-gray-500">Noch keine Beiträge vorhanden.</p>
      ) : (
        <div className="space-y-8">
          {posts.map((post) => (
            <article
              key={post.id}
              className="border border-gray-200 rounded-lg overflow-hidden hover:border-ckb-red/30 transition-colors"
            >
              <Link href={`/aktuelles/${post.slug}`} className="block">
                {post.imageUrl && (
                  <div className="relative h-48 sm:h-64 bg-gray-100">
                    <Image
                      src={post.imageUrl}
                      alt={post.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                <div className="p-6">
                  <h2 className="text-xl font-semibold mb-2 text-ckb-dark">
                    {post.title}
                  </h2>
                  <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                    {post.publishedAt && (
                      <time>
                        {post.publishedAt.toLocaleDateString("de-DE", {
                          day: "2-digit",
                          month: "long",
                          year: "numeric",
                        })}
                      </time>
                    )}
                  </div>
                  {post.excerpt && (
                    <p className="text-gray-600">{post.excerpt}</p>
                  )}
                </div>
              </Link>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
