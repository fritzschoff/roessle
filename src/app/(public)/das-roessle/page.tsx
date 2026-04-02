import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Das Rössle",
};

export default function DasRoesslePage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="font-lobster text-4xl text-ckb-red mb-8">Das Rössle</h1>
      <div className="prose prose-lg max-w-none">
        <p>
          Das <strong>Rössle</strong> ist unser Vereinsheim und die Heimat der
          Cannstatter Kurve Berlin in Berlin-Neukölln. Hier schauen wir gemeinsam
          alle Spiele des VfB Stuttgart und feiern unsere schwäbische Kultur
          fernab der Heimat.
        </p>

        <h2>Was euch erwartet</h2>
        <ul>
          <li>Live-Übertragung aller VfB-Spiele auf Großleinwand</li>
          <li>Schwäbische Spezialitäten und Getränke</li>
          <li>Gemütliche Atmosphäre unter Gleichgesinnten</li>
          <li>VfB-Devotionalien und Vereinsdekoration</li>
          <li>Platz für bis zu 80 Fans</li>
        </ul>

        <div className="not-prose grid gap-4 my-8">
          <div className="bg-ckb-red/10 border border-ckb-red/20 rounded-lg p-5">
            <p className="font-semibold text-ckb-red">Ehrenamtlich betrieben</p>
            <p className="text-sm text-ckb-dark mt-1">
              Das Rössle wird vollständig ehrenamtlich von unseren Mitgliedern
              betrieben. Alle Einnahmen fließen direkt in den Verein.
            </p>
          </div>
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-5">
            <p className="font-semibold text-amber-800">Tagesmitgliedschaft: 5 €</p>
            <p className="text-sm text-amber-700 mt-1">
              Gäste, die nicht Mitglied sind, können gegen eine
              Tagesmitgliedschaft von 5 € an Spieltagen im Rössle mitfiebern.
            </p>
          </div>
        </div>

        <div className="bg-ckb-gray rounded-lg p-6 my-8 not-prose">
          <div className="h-64 bg-gray-300 rounded flex items-center justify-center text-gray-500">
            Foto: Das Rössle
          </div>
        </div>

        <h2>Anfahrt</h2>
        <p>
          <strong>Braunschweiger Straße 51, 12055 Berlin-Neukölln</strong>
        </p>
        <p>
          <strong>ÖPNV:</strong> S-Bahn Sonnenallee (Ring), Bus M41 bis
          Braunschweiger Straße.
        </p>

        <div className="not-prose my-8 rounded-lg overflow-hidden">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2430.0!2d13.4544!3d52.4735!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sBraunschweiger+Stra%C3%9Fe+51%2C+Berlin!5e0!3m2!1sde!2sde!4v1"
            width="100%"
            height="350"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Standort Das Rössle"
          />
        </div>
      </div>
    </div>
  );
}
