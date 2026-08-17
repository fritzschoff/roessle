import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Das Rössle",
};

/**
 * Fotos, die ursprünglich für „Über uns“ vorgesehen waren. Sobald der finale
 * Satz aus dem Figma kommt, hier einfach die Liste erweitern.
 */
const FOTOS = [
  {
    src: "/images/hero-roessle-mobile.jpg",
    alt: "Vereinsheim Rössle: Wandbild mit den Wappen der Cannstatter Kurve Berlin und des VfB Stuttgart",
  },
  {
    src: "/images/hero-roessle-desktop.jpg",
    alt: "Rote Stadionsitze im Rössle mit der Vereinsnummer 08",
  },
];

export default function DasRoesslePage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="font-lobster text-4xl text-ckb-red mb-8">Das Rössle</h1>

      <div className="not-prose mb-10 grid grid-cols-2 gap-3 sm:grid-cols-3">
        {FOTOS.map((foto) => (
          <div
            key={foto.src}
            className="relative aspect-[3/4] overflow-hidden rounded-lg bg-ckb-gray"
          >
            <Image
              src={foto.src}
              alt={foto.alt}
              fill
              sizes="(min-width: 640px) 33vw, 50vw"
              className="object-cover"
            />
          </div>
        ))}
      </div>

      <div className="prose prose-lg max-w-none">
        <p>
          Unser Vereinsheim „Rössle“ ist die Heimat der Cannstatter Kurve Berlin
          und zugleich Treffpunkt für alle VfB-Fans in der Hauptstadt. Mit Liebe
          zum Detail haben wir uns ein zweites Wohnzimmer geschaffen, das groß
          genug ist, um gemeinsam alle Spiele des VfB Stuttgart zu schauen und zu
          feiern.
        </p>
        <p>
          Ehrenamtlich und nicht kommerziell, alle Einnahmen dienen dem Erhalt
          des Rössles.
        </p>
        <p>
          Das Rössle ist ein Vereinsheim und keine öffentliche Kneipe. Wer kein
          Mitglied der CKB ist, kann gegen 5 € an der Theke eine
          Tagesmitgliedschaft erwerben. Damit unterstützt ihr das Projekt.
        </p>

        <h2>Anfahrt</h2>
        <p>
          Parkplätze sind ein seltenes Gut, daher empfehlen wir eine Anfahrt mit
          den öffentlichen Verkehrsmitteln.
        </p>
        <p>
          <strong>Braunschweiger Straße 51</strong>
          <br />
          <strong>12055 Berlin-Neukölln</strong>
        </p>
        <p>
          <strong>ÖPNV:</strong> S- und U-Bahn Neukölln, Bus 171 bis Zeitzer
          Straße
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
