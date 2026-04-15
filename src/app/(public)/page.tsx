import Image from "next/image";
import Link from "next/link";
import { db } from "@/lib/db";
import { blogPosts, termine } from "@/lib/schema";
import { desc, eq, gte } from "drizzle-orm";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [latestPost] = await db
    .select()
    .from(blogPosts)
    .where(eq(blogPosts.status, "published"))
    .orderBy(desc(blogPosts.publishedAt))
    .limit(1);

  const today = new Date().toISOString().split("T")[0];
  const upcomingTermine = await db
    .select()
    .from(termine)
    .where(gte(termine.datum, today))
    .orderBy(termine.datum)
    .limit(3);

  return (
    <div className="bg-white relative overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[calc(100vh-105px)] flex flex-col">
        <div className="flex-1 px-6 sm:px-10 lg:px-16 pt-16 sm:pt-24 pb-12 relative z-10">
          {/* Mobile title */}
          <div className="sm:hidden mb-6">
            <p className="font-lobster text-xs text-black">Offizielle Website der</p>
            <p className="font-lobster text-2xl text-black">Cannstatter Kurve</p>
            <p className="font-lobster text-2xl text-black">Berlin 08</p>
          </div>

          {/* Tagline */}
          <p className="font-lobster text-lg sm:text-2xl text-ckb-red mb-2">
            Fern der Heimat, nah im Herzen
          </p>

          {/* Hero heading */}
          <h1 className="text-3xl sm:text-5xl font-extrabold uppercase leading-tight tracking-tight text-black max-w-lg">
            Die mit Abstand lauteste Kurve in Berlin
          </h1>

          {/* Description */}
          <p className="text-xs sm:text-sm text-black mt-6 max-w-md leading-relaxed">
            Dein Treffpunkt für Alles rund um den VfB in der Hauptstadt.
            <br />
            Wir freuen uns auf deinen Besuch!
          </p>

          {/* CTA Buttons */}
          <div className="flex gap-4 mt-8">
            <Link
              href="/ueber-uns"
              className="bg-ckb-red text-white text-xs px-8 py-2.5 hover:bg-ckb-red-dark transition-colors"
            >
              Jetzt entdecken
            </Link>
            <Link
              href="/mitgliedschaft"
              className="border-2 border-black text-black text-xs px-8 py-2.5 hover:bg-black hover:text-white transition-colors"
            >
              Mitgliedschaft
            </Link>
          </div>
        </div>

        {/* Large CKB Wappen - right side, overflowing */}
        <div className="absolute right-[-80px] top-[-60px] w-[500px] h-[700px] hidden md:block pointer-events-none select-none">
          <Image
            src="/images/ckb-wappen.svg"
            alt=""
            fill
            className="object-contain opacity-90"
            aria-hidden="true"
          />
        </div>
        {/* Mobile wappen - smaller, top right */}
        <div className="absolute right-[-20px] top-[-10px] w-[140px] h-[140px] md:hidden pointer-events-none select-none">
          <Image
            src="/images/ckb-wappen.svg"
            alt=""
            fill
            className="object-contain opacity-80"
            aria-hidden="true"
          />
        </div>

        {/* Blog preview */}
        <div className="px-6 sm:px-10 lg:px-16 pb-8 relative z-10">
          <div className="border-t border-gray-200 pt-6 max-w-2xl">
            <p className="text-xs text-ckb-red mb-2">Blog Aktuell</p>
            {latestPost ? (
              <>
                <Link
                  href={`/aktuelles/${latestPost.slug}`}
                  className="text-sm font-bold text-black underline hover:text-ckb-red transition-colors"
                >
                  {latestPost.title}
                </Link>
                {latestPost.excerpt && (
                  <p className="text-xs text-black mt-1 leading-relaxed">
                    {latestPost.excerpt.length > 200
                      ? latestPost.excerpt.slice(0, 200) + "..."
                      : latestPost.excerpt}
                  </p>
                )}
                <p className="text-xs italic text-black mt-2">
                  <Link href={`/aktuelles/${latestPost.slug}`} className="hover:text-ckb-red transition-colors">
                    Mehr lesen...
                  </Link>
                </p>
                {latestPost.publishedAt && (
                  <p className="text-[10px] text-black mt-2">
                    {latestPost.publishedAt.toLocaleDateString("de-DE", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </p>
                )}
              </>
            ) : (
              <p className="text-xs text-gray-500">Noch keine Beiträge.</p>
            )}
          </div>
        </div>

        {/* Match ticker */}
        <div className="bg-black/[0.02] px-6 sm:px-10 lg:px-16 py-4 relative z-10">
          <p className="text-xs text-ckb-red mb-2">
            Die nächsten Spiele im Rössle:
          </p>
          {upcomingTermine.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {upcomingTermine.map((t) => (
                <div key={t.id}>
                  <p className="text-xs font-bold text-black">
                    <Link href="/termine" className="underline hover:text-ckb-red transition-colors">
                      {t.gegner}
                    </Link>
                  </p>
                  <p className="text-xs text-black">
                    {new Date(t.datum).toLocaleDateString("de-DE", {
                      weekday: "long",
                      day: "2-digit",
                      month: "2-digit",
                      year: "2-digit",
                    })}
                    , {t.uhrzeit} Uhr
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-xs text-gray-500">Keine kommenden Termine.</p>
          )}
        </div>
      </section>
    </div>
  );
}
