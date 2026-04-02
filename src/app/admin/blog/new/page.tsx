import { BlogEditor } from "@/components/blog-editor";
import { createBlogPost } from "@/lib/actions/blog";

export default function NewBlogPostPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-ckb-dark mb-8">Neuer Blog-Post</h1>
      <div className="bg-white rounded-lg shadow p-6">
        <BlogEditor action={createBlogPost} />
      </div>
    </div>
  );
}
