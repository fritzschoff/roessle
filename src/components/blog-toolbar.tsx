"use client";

import { type Editor } from "@tiptap/react";
import { useRef } from "react";

export function BlogToolbar({ editor }: { editor: Editor | null }) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!editor) return null;

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file || !editor) return;

    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("/api/upload", { method: "POST", body: formData });
    const data = await res.json();

    if (data.url) {
      editor.chain().focus().setImage({ src: data.url }).run();
    }

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }

  function handleLink() {
    const url = window.prompt("URL eingeben:");
    if (url && editor) {
      editor.chain().focus().setLink({ href: url }).run();
    }
  }

  const btnClass = (active: boolean) =>
    `px-3 py-1.5 text-sm font-medium rounded transition-colors ${
      active ? "bg-ckb-red text-white" : "bg-gray-100 hover:bg-gray-200 text-gray-700"
    }`;

  return (
    <div className="flex flex-wrap gap-1 border border-gray-300 rounded-t-md p-2 bg-gray-50">
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={btnClass(editor.isActive("heading", { level: 2 }))}
      >
        H2
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        className={btnClass(editor.isActive("heading", { level: 3 }))}
      >
        H3
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={btnClass(editor.isActive("bold"))}
      >
        B
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={btnClass(editor.isActive("italic"))}
      >
        I
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={btnClass(editor.isActive("bulletList"))}
      >
        Liste
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={btnClass(editor.isActive("orderedList"))}
      >
        1.2.3.
      </button>
      <button
        type="button"
        onClick={handleLink}
        className={btnClass(editor.isActive("link"))}
      >
        Link
      </button>
      <button
        type="button"
        onClick={() => fileInputRef.current?.click()}
        className={btnClass(false)}
      >
        Bild
      </button>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleImageUpload}
      />
    </div>
  );
}
