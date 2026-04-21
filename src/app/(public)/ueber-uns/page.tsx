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
          Die <strong>Cannstatter Kurve Berlin (CKB&apos;08)</strong> ist der
          erste offizielle Fanclub des VfB Stuttgart in der Hauptstadt. Gegründet
          2008 vereinen wir VfB-Fans jeglichen Alters, Herkunft und
          Lebensmodells. Uns verbindet die Leidenschaft für den roten Brustring
          und den schwäbischen Charme. Wir positionieren uns gegen jegliche Art
          von Diskriminierung.
        </p>
        <p>
          Egal ob Bundesliga-Spiel, Pokal oder internationale Nächte — wir
          schauen gemeinsam im Rössle die Spiele unseres VfB. Gleichzeitig
          organisieren wir Fahrten zu Heim- und Auswärtsspielen und sind meist
          im Stadion vertreten.
        </p>
        <p>
          Wenn Du mehr erfahren möchtest, dann komm doch einfach mal bei uns im
          Rössle vorbei. Oder schreib&apos; uns eine{" "}
          <a href="mailto:kontakt@ckb08.de">Mail</a>.
        </p>
      </div>
    </div>
  );
}
