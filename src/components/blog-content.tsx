import { sanitizeHtml } from "@/lib/sanitize";

interface BlogContentProps {
  html: string;
}

// Content is sanitized via DOMPurify in sanitizeHtml() before rendering
export function BlogContent({ html }: BlogContentProps) {
  const cleanHtml = sanitizeHtml(html);
  return (
    <div
      className="prose prose-lg max-w-none"
      dangerouslySetInnerHTML={{ __html: cleanHtml }}
    />
  );
}
