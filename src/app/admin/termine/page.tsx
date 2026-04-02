import Link from "next/link";
import { db } from "@/lib/db";
import { termine } from "@/lib/schema";
import { asc } from "drizzle-orm";
import { deleteTermin } from "@/lib/actions/termine";
import { DeleteButton } from "@/components/delete-button";

export default async function AdminTerminePage() {
  const allTermine = await db
    .select()
    .from(termine)
    .orderBy(asc(termine.datum));

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-ckb-dark">Termine</h1>
        <Link
          href="/admin/termine/new"
          className="bg-ckb-red text-white px-4 py-2 rounded-md hover:bg-ckb-red-dark transition-colors font-medium"
        >
          + Neuer Termin
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="text-left px-6 py-3 text-sm font-medium text-gray-500">
                Datum
              </th>
              <th className="text-left px-6 py-3 text-sm font-medium text-gray-500">
                Gegner
              </th>
              <th className="text-left px-6 py-3 text-sm font-medium text-gray-500">
                Uhrzeit
              </th>
              <th className="text-left px-6 py-3 text-sm font-medium text-gray-500">
                Ort
              </th>
              <th className="text-right px-6 py-3 text-sm font-medium text-gray-500">
                Aktionen
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {allTermine.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                  Noch keine Termine vorhanden.
                </td>
              </tr>
            ) : (
              allTermine.map((termin) => (
                <tr key={termin.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {new Date(termin.datum).toLocaleDateString("de-DE")}
                  </td>
                  <td className="px-6 py-4 font-medium text-gray-900">
                    {termin.gegner}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {termin.uhrzeit}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {termin.ort}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-3">
                      <Link
                        href={`/admin/termine/${termin.id}/edit`}
                        className="text-sm text-ckb-red hover:text-ckb-red-dark font-medium"
                      >
                        Bearbeiten
                      </Link>
                      <DeleteButton
                        action={async () => {
                          "use server";
                          await deleteTermin(termin.id);
                        }}
                        confirmMessage="Termin wirklich löschen?"
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
