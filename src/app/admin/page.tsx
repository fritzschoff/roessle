import Link from "next/link";
import { db } from "@/lib/db";
import { blogPosts, contactMessages, termine, users } from "@/lib/schema";
import { count, eq, desc, gte, asc } from "drizzle-orm";

export default async function AdminDashboard() {
  const [unreadResult] = await db
    .select({ value: count() })
    .from(contactMessages)
    .where(eq(contactMessages.isRead, false));

  const [postsResult] = await db
    .select({ value: count() })
    .from(blogPosts);

  const today = new Date().toISOString().split("T")[0];
  const [nextTermin] = await db
    .select()
    .from(termine)
    .where(gte(termine.datum, today))
    .orderBy(asc(termine.datum))
    .limit(1);

  const recentPosts = await db
    .select({
      id: blogPosts.id,
      title: blogPosts.title,
      status: blogPosts.status,
      createdAt: blogPosts.createdAt,
      authorName: users.name,
    })
    .from(blogPosts)
    .leftJoin(users, eq(blogPosts.authorId, users.id))
    .orderBy(desc(blogPosts.createdAt))
    .limit(5);

  return (
    <div>
      <h1 className="text-3xl font-bold text-ckb-dark mb-8">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Link
          href="/admin/kontakt"
          className="bg-white rounded-lg shadow p-6 hover:shadow-md transition-shadow"
        >
          <div className="text-sm font-medium text-gray-500">
            Ungelesene Nachrichten
          </div>
          <div className="text-3xl font-bold text-ckb-red mt-2">
            {unreadResult.value}
          </div>
        </Link>

        <Link
          href="/admin/blog"
          className="bg-white rounded-lg shadow p-6 hover:shadow-md transition-shadow"
        >
          <div className="text-sm font-medium text-gray-500">Blog-Posts</div>
          <div className="text-3xl font-bold text-ckb-dark mt-2">
            {postsResult.value}
          </div>
        </Link>

        <Link
          href="/admin/termine"
          className="bg-white rounded-lg shadow p-6 hover:shadow-md transition-shadow"
        >
          <div className="text-sm font-medium text-gray-500">
            Nächster Termin
          </div>
          <div className="text-lg font-bold text-ckb-dark mt-2">
            {nextTermin
              ? `${nextTermin.gegner} (${new Date(nextTermin.datum).toLocaleDateString("de-DE")})`
              : "Kein Termin"}
          </div>
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-ckb-dark">
            Letzte Blog-Posts
          </h2>
          <Link
            href="/admin/blog/new"
            className="text-sm text-ckb-red hover:text-ckb-red-dark font-medium"
          >
            + Neuer Post
          </Link>
        </div>
        <div className="divide-y divide-gray-200">
          {recentPosts.length === 0 ? (
            <div className="px-6 py-4 text-gray-500 text-sm">
              Noch keine Blog-Posts vorhanden.
            </div>
          ) : (
            recentPosts.map((post) => (
              <div
                key={post.id}
                className="px-6 py-4 flex items-center justify-between"
              >
                <div>
                  <div className="font-medium text-gray-900">{post.title}</div>
                  <div className="text-sm text-gray-500">
                    {post.authorName} &middot;{" "}
                    {post.createdAt.toLocaleDateString("de-DE")}
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span
                    className={`text-xs font-medium px-2 py-1 rounded-full ${
                      post.status === "published"
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {post.status === "published"
                      ? "Veröffentlicht"
                      : "Entwurf"}
                  </span>
                  <Link
                    href={`/admin/blog/${post.id}/edit`}
                    className="text-sm text-ckb-red hover:text-ckb-red-dark"
                  >
                    Bearbeiten
                  </Link>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
