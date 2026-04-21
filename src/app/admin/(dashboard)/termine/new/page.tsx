import { createTermin } from "@/lib/actions/termine";

export default function NewTerminPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-ckb-dark mb-8">Neuer Termin</h1>
      <div className="bg-white rounded-lg shadow p-6">
        <form action={createTermin} className="space-y-6">
          <div>
            <label htmlFor="gegner" className="block text-sm font-medium text-gray-700 mb-1">
              Gegner *
            </label>
            <input
              id="gegner"
              name="gegner"
              type="text"
              required
              className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-ckb-red focus:ring-ckb-red"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="datum" className="block text-sm font-medium text-gray-700 mb-1">
                Datum *
              </label>
              <input
                id="datum"
                name="datum"
                type="date"
                required
                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-ckb-red focus:ring-ckb-red"
              />
            </div>
            <div>
              <label htmlFor="uhrzeit" className="block text-sm font-medium text-gray-700 mb-1">
                Anstoß *
              </label>
              <input
                id="uhrzeit"
                name="uhrzeit"
                type="time"
                required
                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-ckb-red focus:ring-ckb-red"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="ort" className="block text-sm font-medium text-gray-700 mb-1">
                Ort
              </label>
              <input
                id="ort"
                name="ort"
                type="text"
                defaultValue="Das Rössle"
                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-ckb-red focus:ring-ckb-red"
              />
            </div>
            <div>
              <label htmlFor="oeffnungszeit" className="block text-sm font-medium text-gray-700 mb-1">
                Rössle öffnet
              </label>
              <input
                id="oeffnungszeit"
                name="oeffnungszeit"
                type="time"
                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-ckb-red focus:ring-ckb-red"
              />
            </div>
          </div>

          <div>
            <label htmlFor="beschreibung" className="block text-sm font-medium text-gray-700 mb-1">
              Beschreibung
            </label>
            <textarea
              id="beschreibung"
              name="beschreibung"
              rows={3}
              className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-ckb-red focus:ring-ckb-red"
            />
          </div>

          <div className="flex gap-4">
            <button
              type="submit"
              className="bg-ckb-red text-white px-6 py-2 rounded-md hover:bg-ckb-red-dark transition-colors font-medium"
            >
              Erstellen
            </button>
            <a
              href="/admin/termine"
              className="px-6 py-2 rounded-md border border-gray-300 hover:bg-gray-50 transition-colors text-gray-700"
            >
              Abbrechen
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}
