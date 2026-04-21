import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mitgliedschaft",
};

export default function MitgliedschaftPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="font-lobster text-4xl text-ckb-red mb-8">Mitgliedschaft</h1>
      <div className="prose prose-lg max-w-none">
        <p>
          Du hast den VfB Stuttgart im Herzen und möchtest Mitglied werden? Dann
          komm an einem Spieltag im Rössle vorbei und melde dich an der Theke.
          Unsere Gemeinschaft lebt vom persönlichen Austausch, weshalb wir ein
          persönliches Kennenlernen einem Onlineformular vorziehen. Bei dieser
          Gelegenheit können wir uns vorstellen und Dich willkommen heißen. Wir
          freuen uns auf Dich!
        </p>

        <div className="not-prose bg-amber-50 border border-amber-200 rounded-lg p-5 my-8">
          <p className="font-semibold text-amber-800">Tagesmitgliedschaft</p>
          <p className="text-sm text-amber-700 mt-1">
            Nur zu Besuch in Berlin oder willst erst mal reinschnuppern? Kein
            Problem — an Spieltagen bieten wir eine Tagesmitgliedschaft für 5 €
            an. So kannst Du das Rössle und die CKB unverbindlich kennenlernen.
          </p>
        </div>
      </div>
    </div>
  );
}
