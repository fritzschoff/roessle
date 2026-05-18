import type { Metadata } from "next";

export const metadata: Metadata = { title: "Kontakt" };

export default function KontaktPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="font-lobster text-4xl text-ckb-red mb-8">Kontakt</h1>

      <div className="grid md:grid-cols-2 gap-12">
        <div>
          <p className="text-gray-700 mb-6">
            Du hast Fragen oder möchtest aus einem anderen Grund Kontakt zu uns
            aufnehmen? Schreib uns direkt eine E-Mail.
          </p>

          <a
            href="mailto:kontakt@ckb08.de"
            className="inline-block bg-ckb-red text-white px-8 py-3 rounded-lg font-medium hover:bg-ckb-red-dark transition-colors text-sm"
          >
            E-Mail schreiben →
          </a>
        </div>

        <div className="space-y-6">
          <div>
            <h2 className="font-semibold text-lg mb-2">E-Mail</h2>
            <a href="mailto:kontakt@ckb08.de" className="text-ckb-red hover:underline">
              kontakt@ckb08.de
            </a>
          </div>

          <div>
            <h2 className="font-semibold text-lg mb-2">Adresse</h2>
            <p className="text-gray-600">
              Cannstatter Kurve Berlin e.V.
              <br />
              Braunschweiger Straße 51
              <br />
              12055 Berlin-Neukölln
            </p>
          </div>

          <div>
            <h2 className="font-semibold text-lg mb-2">ÖPNV</h2>
            <p className="text-gray-600">
              S- und U-Bahn Neukölln
              <br />
              Bus 171 bis Zeitzer Straße
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
