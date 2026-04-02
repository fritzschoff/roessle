import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Mitgliedschaft",
};

export default function MitgliedschaftPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="font-lobster text-4xl text-ckb-red mb-8">Mitgliedschaft</h1>
      <div className="prose prose-lg max-w-none">
        <p>
          Werde Teil der <strong>Cannstatter Kurve Berlin e.V.</strong> und
          erlebe den VfB Stuttgart gemeinsam mit Gleichgesinnten in Berlin!
        </p>

        <h2>Warum Mitglied werden?</h2>
        <ul>
          <li>Zugang zum Rössle an allen Spieltagen</li>
          <li>Vergünstigte Teilnahme an Auswärtsfahrten</li>
          <li>Mitbestimmung bei Vereinsentscheidungen</li>
          <li>Teil einer starken VfB-Gemeinschaft in Berlin</li>
          <li>Regelmäßige Vereinsevents und Stammtische</li>
        </ul>

        <h2>Wie werde ich Mitglied?</h2>
        <p>
          Du möchtest Mitglied werden? Dann schreib uns einfach über unser{" "}
          <Link href="/kontakt">Kontaktformular</Link> oder komm an einem
          Spieltag im Rössle vorbei. Wir freuen uns auf dich!
        </p>

        <div className="not-prose bg-amber-50 border border-amber-200 rounded-lg p-5 my-8">
          <p className="font-semibold text-amber-800">Tagesmitgliedschaft</p>
          <p className="text-sm text-amber-700 mt-1">
            Du bist nur zu Besuch in Berlin oder willst erst mal reinschnuppern?
            Kein Problem — an Spieltagen bieten wir eine Tagesmitgliedschaft für
            5 € an. So kannst du das Rössle und unsere Gemeinschaft unverbindlich
            kennenlernen.
          </p>
        </div>

        <h2>Mitgliedsbeitrag</h2>
        <p>
          Der jährliche Mitgliedsbeitrag beträgt <strong>30 €</strong>. Der
          Beitrag wird für den Betrieb des Rössle, Vereinsaktivitäten und die
          Organisation von Auswärtsfahrten verwendet.
        </p>
      </div>
    </div>
  );
}
