import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { termine } from "@/lib/schema";
import { eq } from "drizzle-orm";
import { updateTermin } from "@/lib/actions/termine";
import { TerminForm } from "@/components/admin/termin-form";

export default async function EditTerminPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const [termin] = await db
    .select()
    .from(termine)
    .where(eq(termine.id, id))
    .limit(1);

  if (!termin) notFound();

  const updateAction = updateTermin.bind(null, id);

  return (
    <div>
      <h1 className="text-3xl font-bold text-ckb-dark mb-8">
        Termin bearbeiten
      </h1>
      <div className="bg-white rounded-lg shadow p-6">
        <TerminForm
          action={updateAction}
          defaults={{
            gegner: termin.gegner,
            gegnerLogo: termin.gegnerLogo,
            wettbewerb: termin.wettbewerb,
            wettbewerbLogo: termin.wettbewerbLogo,
            datum: termin.datum,
            uhrzeit: termin.uhrzeit,
            ort: termin.ort,
            oeffnungszeit: termin.oeffnungszeit,
            beschreibung: termin.beschreibung,
          }}
          submitLabel="Speichern"
        />
      </div>
    </div>
  );
}
