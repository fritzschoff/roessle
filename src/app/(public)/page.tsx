import Image from "next/image";

/**
 * Startseite. Der frühere „Über uns“-Text steht seit der Design-Übergabe hier —
 * die eigene Unterseite dafür gibt es nicht mehr.
 */
export default function HomePage() {
  return (
    <div className="relative min-h-full bg-white">
      {/* ===== Hintergrundfoto ===== */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Mobil/Tablet: Foto oben, Verlauf nach unten ins Weiße.
            Feste Höhe statt Prozent — sonst wächst das Foto mit dem Fließtext
            mit und die Überschrift läge nicht mehr im aufgehellten Bereich. */}
        <div className="lg:hidden absolute inset-x-0 top-0 h-[500px]">
          <Image
            src="/images/hero-roessle-mobile.jpg"
            alt=""
            fill
            priority
            sizes="(min-width: 1024px) 1px, 100vw"
            className="object-cover object-top"
            aria-hidden="true"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-white from-[30%] to-transparent to-[62%]" />
        </div>

        {/* Desktop: Foto ganzflächig und stark aufgehellt, Verlauf von links.
            fixed statt absolute, damit es nicht am Inhaltsbereich endet, sondern
            wie im Figma unter dem roten Keil und dem Spielbalken weiterläuft.
            Die seitlichen Insets halten es innerhalb der zentrierten Designbreite. */}
        <div
          className="hidden lg:block fixed inset-y-0 z-0"
          style={{ left: "var(--layout-gutter)", right: "var(--layout-gutter)" }}
        >
          <Image
            src="/images/hero-roessle-desktop.jpg"
            alt=""
            fill
            priority
            sizes="70vw"
            className="object-cover opacity-[0.31]"
            aria-hidden="true"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-white from-[1%] to-transparent to-[68%]" />
        </div>
      </div>

      {/* ===== Inhalt ===== */}
      <div className="relative z-10 px-6 sm:px-10 lg:px-36 pt-[360px] pb-10 lg:pt-[120px] lg:pb-8 text-center lg:text-left">
        <p className="font-lobster text-[18px] lg:text-2xl text-ckb-red [text-shadow:0_0_27px_white] lg:[text-shadow:none]">
          Fern der Heimat, nah im Herzen
        </p>

        <h1 className="mt-1 text-[34px] lg:text-5xl font-extrabold uppercase leading-[1.05] lg:leading-[1.2] tracking-tight text-ckb-dark lg:max-w-[561px]">
          Cannstatter Kurve <br className="hidden lg:inline" />
          Berlin
        </h1>

        <div className="mx-auto lg:mx-0 mt-6 lg:mt-12 max-w-[330px] lg:max-w-[400px] text-ckb-dark">
          <p className="text-[15px] lg:text-xs font-bold leading-4">
            Dein Treffpunkt für Alles rund um den VfB in der Hauptstadt.
          </p>

          <p className="mt-4 text-[13px] lg:text-xs leading-4 text-left">
            Mitten in Berlin-Neukölln befindet sich seit Anfang 2010 eine
            schwäbische Enklave: Unser Vereinsheim Rössle. Die weiß-roten
            Räumlichkeiten im Zeichen des Stuttgarter Wappentiers sind
            Anlaufstelle und Treffpunkt für alle VfB-Fans und -Sympathisanten in
            der Hauptstadt.
          </p>

          <p className="mt-4 text-[13px] lg:text-xs leading-4 text-left">
            Im Rössle gibt es alles, was das Fan-Herz begehrt: Alle VfB-Spiele
            live, Getränke, Kicker, gemütliche Sofas und eben eine tolle
            Atmosphäre. Neben dem VfB zeigen wir oft auch andere interessante
            Spiele aus der Liga, den internationalen Wettbewerben sowie EM und
            WM. Dazu veranstalten wir Kickerturniere, Pokerrunden oder
            gemeinsame Fernsehabende.
          </p>

          <p className="mt-4 text-[13px] lg:text-xs font-bold leading-4">
            Wir freuen uns auf deinen Besuch!
          </p>
        </div>
      </div>
    </div>
  );
}
