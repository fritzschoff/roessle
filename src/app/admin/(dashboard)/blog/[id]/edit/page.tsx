import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { blogPosts } from "@/lib/schema";
import { eq } from "drizzle-orm";
import { BlogEditor } from "@/components/blog-editor";
import { updateBlogPost } from "@/lib/actions/blog";

export default async function EditBlogPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const [post] = await db
    .select()
    .from(blogPosts)
    .where(eq(blogPosts.id, id))
    .limit(1);

  if (!post) notFound();

  const updateAction = updateBlogPost.bind(null, id);

  return (
    <div>
      <h1 className="text-3xl font-bold text-ckb-dark mb-8">
        Post bearbeiten
      </h1>
      <div className="bg-white rounded-lg shadow p-6">
        <BlogEditor post={post} action={updateAction} />
      </div>
    </div>
  );
}
