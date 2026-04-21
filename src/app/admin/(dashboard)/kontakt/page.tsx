import { db } from "@/lib/db";
import { contactMessages } from "@/lib/schema";
import { desc } from "drizzle-orm";
import { toggleMessageRead, deleteMessage } from "@/lib/actions/contact-admin";
import { DeleteButton } from "@/components/delete-button";

export default async function AdminKontaktPage() {
  const messages = await db
    .select()
    .from(contactMessages)
    .orderBy(desc(contactMessages.createdAt));

  return (
    <div>
      <h1 className="text-3xl font-bold text-ckb-dark mb-8">Nachrichten</h1>

      {messages.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-8 text-center text-gray-500">
          Keine Nachrichten vorhanden.
        </div>
      ) : (
        <div className="space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`bg-white rounded-lg shadow p-6 ${
                !msg.isRead ? "border-l-4 border-ckb-red" : ""
              }`}
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="flex items-center gap-3">
                    <span className="font-semibold text-gray-900">
                      {msg.name}
                    </span>
                    {!msg.isRead && (
                      <span className="text-xs font-medium bg-ckb-red text-white px-2 py-0.5 rounded-full">
                        Neu
                      </span>
                    )}
                  </div>
                  <a
                    href={`mailto:${msg.email}`}
                    className="text-sm text-ckb-red hover:text-ckb-red-dark"
                  >
                    {msg.email}
                  </a>
                  <div className="text-xs text-gray-400 mt-1">
                    {msg.createdAt.toLocaleString("de-DE")}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <form
                    action={async () => {
                      "use server";
                      await toggleMessageRead(msg.id, !msg.isRead);
                    }}
                  >
                    <button
                      type="submit"
                      className="text-sm text-gray-600 hover:text-gray-800 font-medium px-3 py-1 rounded border border-gray-300 hover:bg-gray-50"
                    >
                      {msg.isRead ? "Als ungelesen" : "Als gelesen"}
                    </button>
                  </form>
                  <DeleteButton
                    action={async () => {
                      "use server";
                      await deleteMessage(msg.id);
                    }}
                    confirmMessage="Nachricht wirklich löschen?"
                  >
                    Löschen
                  </DeleteButton>
                </div>
              </div>
              <p className="text-gray-700 whitespace-pre-wrap">{msg.nachricht}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
