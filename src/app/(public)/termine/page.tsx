import type { Metadata } from "next";
import Image from "next/image";
import { db } from "@/lib/db";
import { termine } from "@/lib/schema";
import { asc } from "drizzle-orm";
import { VFB } from "@/lib/teams";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Termine",
};

function TeamBadge({
  src,
  alt,
}: {
  src: string | null | undefined;
  alt: string;
}) {
  if (!src) return null;
  return (
    <div className="relative w-10 h-10 shrink-0">
      <Image src={src} alt={alt} fill className="object-contain" />
    </div>
  );
}

export default async function TerminePage() {
  const allTermine = await db
    .select()
    .from(termine)
    .orderBy(asc(termine.datum));

  const today = new Date().toISOString().split("T")[0];
  const upcoming = allTermine.filter((t) => t.datum >= today);
  const past = allTermine.filter((t) => t.datum < today).reverse();

  function formatDate(datum: string) {
    return new Date(datum + "T12:00:00").toLocaleDateString("de-DE", {
      weekday: "long",
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="font-lobster text-4xl text-ckb-red mb-8">Termine</h1>

      <p className="text-lg text-ckb-dark mb-8">
        Komm vorbei und lass uns die Spiele des VfB gemeinsam erleben. Die
        nächsten Gelegenheiten dafür:
      </p>

      {upcoming.length > 0 && (
        <section className="mb-12">
          <h2 className="text-xl font-semibold mb-4">Kommende Termine</h2>
          <div className="space-y-3">
            {upcoming.map((t, index) => (
              <div
                key={t.id}
                className={`rounded-lg p-4 ${
                  index === 0
                    ? "bg-ckb-red text-white"
                    : "bg-ckb-gray text-ckb-dark"
                }`}
              >
                <div className="flex items-center gap-3">
                  <TeamBadge src={VFB.logo} alt="VfB Stuttgart" />
                  {t.wettbewerbLogo && (
                    <TeamBadge src={t.wettbewerbLogo} alt={t.wettbewerb ?? ""} />
                  )}
                  <TeamBadge
                    src={t.gegnerLogo ?? "/images/teams/placeholder.svg"}
                    alt={t.gegner}
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-base leading-tight truncate">
                      VfB Stuttgart vs. {t.gegner}
                    </p>
                    <p
                      className={`text-sm ${
                        index === 0 ? "text-white/80" : "text-gray-500"
                      }`}
                    >
                      {formatDate(t.datum)}
                    </p>
                  </div>
                  <div className="text-sm text-right shrink-0">
                    <p>
                      <strong>Anstoß:</strong> {t.uhrzeit} Uhr
                    </p>
                    {t.oeffnungszeit && (
                      <p
                        className={
                          index === 0 ? "text-white/80" : "text-gray-500"
                        }
                      >
                        Öffnung: {t.oeffnungszeit} Uhr
                      </p>
                    )}
                  </div>
                </div>
                {t.beschreibung && (
                  <p
                    className={`text-xs mt-2 ${
                      index === 0 ? "text-white/70" : "text-gray-500"
                    }`}
                  >
                    {t.beschreibung}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {upcoming.length === 0 && (
        <p className="text-gray-500 mb-12">
          Aktuell sind keine kommenden Termine eingetragen.
        </p>
      )}

      {past.length > 0 && (
        <section>
          <h2 className="text-xl font-semibold mb-4 text-gray-400">
            Vergangene Termine
          </h2>
          <div className="space-y-3 opacity-50">
            {past.map((t) => (
              <div key={t.id} className="rounded-lg p-4 bg-ckb-gray">
                <div className="flex items-center gap-3">
                  <TeamBadge src={VFB.logo} alt="VfB Stuttgart" />
                  <TeamBadge
                    src={t.gegnerLogo ?? "/images/teams/placeholder.svg"}
                    alt={t.gegner}
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold truncate">
                      VfB Stuttgart vs. {t.gegner}
                    </p>
                    <p className="text-sm text-gray-500">{formatDate(t.datum)}</p>
                  </div>
                  <p className="text-sm text-gray-500 shrink-0">{t.uhrzeit} Uhr</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
