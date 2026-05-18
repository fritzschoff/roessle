import { createTermin } from "@/lib/actions/termine";
import { TerminForm } from "@/components/admin/termin-form";

export default function NewTerminPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-ckb-dark mb-8">Neuer Termin</h1>
      <div className="bg-white rounded-lg shadow p-6">
        <TerminForm action={createTermin} submitLabel="Erstellen" />
      </div>
    </div>
  );
}
