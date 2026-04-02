"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import { useState, useRef } from "react";
import { BlogToolbar } from "./blog-toolbar";
import { sanitizeHtml } from "@/lib/sanitize";
import type { BlogPost } from "@/lib/schema";

export function BlogEditor({
  post,
  action,
}: {
  post?: BlogPost | null;
  action: (formData: FormData) => Promise<void>;
}) {
  const [preview, setPreview] = useState(false);
  const [imageUrl, setImageUrl] = useState(post?.imageUrl ?? "");
  const [uploading, setUploading] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Image.configure({ inline: false }),
      Link.configure({ openOnClick: false }),
    ],
    content: post?.content ?? "",
    immediatelyRender: false,
  });

  async function handleCoverUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    const res = await fetch("/api/upload", { method: "POST", body: formData });
    const data = await res.json();
    if (data.url) {
      setImageUrl(data.url);
    }
    setUploading(false);
  }

  async function handleSubmit(formData: FormData) {
    if (editor) {
      formData.set("content", editor.getHTML());
    }
    formData.set("imageUrl", imageUrl);
    await action(formData);
  }

  // Content is sanitized with DOMPurify via sanitizeHtml before rendering
  const sanitizedPreviewHtml = sanitizeHtml(editor?.getHTML() ?? "");

  return (
    <form ref={formRef} action={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
          Titel
        </label>
        <input
          id="title"
          name="title"
          type="text"
          required
          defaultValue={post?.title ?? ""}
          className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-ckb-red focus:ring-ckb-red"
        />
      </div>

      <div>
        <label htmlFor="excerpt" className="block text-sm font-medium text-gray-700 mb-1">
          Kurztext
        </label>
        <textarea
          id="excerpt"
          name="excerpt"
          rows={2}
          defaultValue={post?.excerpt ?? ""}
          className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-ckb-red focus:ring-ckb-red"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Titelbild
        </label>
        <div className="flex items-center gap-4">
          <input
            type="file"
            accept="image/*"
            onChange={handleCoverUpload}
            className="text-sm"
          />
          {uploading && <span className="text-sm text-gray-500">Wird hochgeladen...</span>}
        </div>
        {imageUrl && (
          <img
            src={imageUrl}
            alt="Cover Vorschau"
            className="mt-2 max-h-48 rounded-md object-cover"
          />
        )}
      </div>

      <div>
        <div className="flex items-center justify-between mb-1">
          <label className="block text-sm font-medium text-gray-700">Inhalt</label>
          <button
            type="button"
            onClick={() => setPreview(!preview)}
            className="text-sm text-ckb-red hover:text-ckb-red-dark"
          >
            {preview ? "Editor" : "Vorschau"}
          </button>
        </div>
        {preview ? (
          <div
            className="prose max-w-none border border-gray-300 rounded-md p-4 min-h-[200px] bg-white"
            dangerouslySetInnerHTML={{ __html: sanitizedPreviewHtml }}
          />
        ) : (
          <div>
            <BlogToolbar editor={editor} />
            <EditorContent
              editor={editor}
              className="border border-t-0 border-gray-300 rounded-b-md p-4 min-h-[200px] bg-white prose max-w-none focus-within:ring-1 focus-within:ring-ckb-red"
            />
          </div>
        )}
      </div>

      <div>
        <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
          Status
        </label>
        <select
          id="status"
          name="status"
          defaultValue={post?.status ?? "draft"}
          className="rounded-md border border-gray-300 px-3 py-2 focus:border-ckb-red focus:ring-ckb-red"
        >
          <option value="draft">Entwurf</option>
          <option value="published">Veröffentlicht</option>
        </select>
      </div>

      <div className="flex gap-4">
        <button
          type="submit"
          className="bg-ckb-red text-white px-6 py-2 rounded-md hover:bg-ckb-red-dark transition-colors font-medium"
        >
          {post ? "Speichern" : "Erstellen"}
        </button>
        <a
          href="/admin/blog"
          className="px-6 py-2 rounded-md border border-gray-300 hover:bg-gray-50 transition-colors text-gray-700"
        >
          Abbrechen
        </a>
      </div>
    </form>
  );
}
