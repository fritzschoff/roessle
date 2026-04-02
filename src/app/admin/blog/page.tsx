import Link from "next/link";
import { db } from "@/lib/db";
import { blogPosts, users } from "@/lib/schema";
import { eq, desc } from "drizzle-orm";
import { deleteBlogPost } from "@/lib/actions/blog";
import { DeleteButton } from "@/components/delete-button";

export default async function AdminBlogPage() {
  const posts = await db
    .select({
      id: blogPosts.id,
      title: blogPosts.title,
      status: blogPosts.status,
      createdAt: blogPosts.createdAt,
      authorName: users.name,
    })
    .from(blogPosts)
    .leftJoin(users, eq(blogPosts.authorId, users.id))
    .orderBy(desc(blogPosts.createdAt));

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-ckb-dark">Blog-Posts</h1>
        <Link
          href="/admin/blog/new"
          className="bg-ckb-red text-white px-4 py-2 rounded-md hover:bg-ckb-red-dark transition-colors font-medium"
        >
          + Neuer Post
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="text-left px-6 py-3 text-sm font-medium text-gray-500">
                Titel
              </th>
              <th className="text-left px-6 py-3 text-sm font-medium text-gray-500">
                Status
              </th>
              <th className="text-left px-6 py-3 text-sm font-medium text-gray-500">
                Autor
              </th>
              <th className="text-left px-6 py-3 text-sm font-medium text-gray-500">
                Datum
              </th>
              <th className="text-right px-6 py-3 text-sm font-medium text-gray-500">
                Aktionen
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {posts.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                  Noch keine Blog-Posts vorhanden.
                </td>
              </tr>
            ) : (
              posts.map((post) => (
                <tr key={post.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium text-gray-900">
                    {post.title}
                  </td>
                  <td className="px-6 py-4">
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
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {post.authorName}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {post.createdAt.toLocaleDateString("de-DE")}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-3">
                      <Link
                        href={`/admin/blog/${post.id}/edit`}
                        className="text-sm text-ckb-red hover:text-ckb-red-dark font-medium"
                      >
                        Bearbeiten
                      </Link>
                      <DeleteButton
                        action={async () => {
                          "use server";
                          await deleteBlogPost(post.id);
                        }}
                        confirmMessage="Blog-Post wirklich löschen?"
                      >
                        Löschen
                      </DeleteButton>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
