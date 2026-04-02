"use client";

import { useTransition } from "react";

export function DeleteButton({
  action,
  confirmMessage,
  children,
}: {
  action: () => Promise<void>;
  confirmMessage: string;
  children: React.ReactNode;
}) {
  const [isPending, startTransition] = useTransition();

  return (
    <button
      type="button"
      disabled={isPending}
      className="text-sm text-red-600 hover:text-red-800 font-medium disabled:opacity-50"
      onClick={() => {
        if (confirm(confirmMessage)) {
          startTransition(() => action());
        }
      }}
    >
      {isPending ? "..." : children}
    </button>
  );
}
