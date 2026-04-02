import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Über uns",
};

export default function UeberUnsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="font-lobster text-4xl text-ckb-red mb-8">Über uns</h1>
      <div className="prose prose-lg max-w-none">
        <p>
          Die <strong>Cannstatter Kurve Berlin e.V.</strong> ist der offizielle
          VfB-Stuttgart-Fanclub in Berlin. Gegründet 2008, vereinen wir Schwaben,
          Wahlberliner und alle, die das Herz für den VfB schlagen lässt, in der
          Hauptstadt.
        </p>
        <p>
          Egal ob Bundesliga-Samstag, DFB-Pokal oder internationale Nächte — wir
          schauen gemeinsam im <strong>Rössle</strong> in Berlin-Neukölln die
          Spiele unseres VfB. Dabei geht es uns nicht nur um Fußball, sondern um
          Gemeinschaft, schwäbische Kultur und die Verbundenheit zur Heimat.
        </p>
        <p>
          Mit über 200 Mitgliedern sind wir einer der größten VfB-Fanclubs
          außerhalb Baden-Württembergs. Wir organisieren regelmäßig
          Auswärtsfahrten, Stammtische und Sonderveranstaltungen.
        </p>

        <div className="bg-ckb-gray rounded-lg p-6 my-8 not-prose">
          <div className="h-64 bg-gray-300 rounded flex items-center justify-center text-gray-500">
            Foto: Cannstatter Kurve Berlin
          </div>
        </div>

        <h2>Was uns ausmacht</h2>
        <ul>
          <li>Gemeinsames Schauen aller VfB-Spiele im Rössle</li>
          <li>Organisierte Auswärtsfahrten nach Stuttgart und ganz Deutschland</li>
          <li>Regelmäßige Stammtische und Vereinsabende</li>
          <li>Schwäbische Gemütlichkeit mitten in Berlin</li>
          <li>Aktive Fankultur und Engagement für den VfB</li>
        </ul>
      </div>
    </div>
  );
}
