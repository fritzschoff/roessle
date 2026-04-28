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
  const [nextTermin] = await db
    .select()
    .from(termine)
    .where(gte(termine.datum, today))
    .orderBy(termine.datum)
    .limit(1);

  return (
    <>
      {/* ===== PAGE CONTENT ===== */}
      <div className="bg-white relative">
        <section className="min-h-[calc(100vh-105px-81px)] flex flex-col">
          {/* Hero */}
          <div className="flex-1 px-6 sm:px-10 lg:px-32 pt-16 sm:pt-20 pb-8">
            <p className="font-lobster text-lg sm:text-2xl text-ckb-red mb-1">
              Fern der Heimat, nah im Herzen
            </p>

            <h1 className="text-[34px] sm:text-5xl font-extrabold uppercase leading-[1.05] tracking-tight text-black max-w-[90%] lg:max-w-lg">
              Cannstatter Kurve Berlin
            </h1>

            <p className="text-xs text-black mt-6 max-w-md leading-relaxed">
              Dein Treffpunkt für Alles rund um den VfB in der Hauptstadt.
              <br />
              Wir freuen uns auf deinen Besuch!
            </p>
          </div>

          {/* Blog + matches section */}
          <div className="bg-black/[0.02]">
            <div className="px-6 sm:px-10 lg:px-32 pt-8 pb-6">
              <p className="text-xs text-ckb-red mb-2">Aktuelles</p>
              {latestPost ? (
                <div className="max-w-xl">
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
                    <Link
                      href={`/aktuelles/${latestPost.slug}`}
                      className="hover:text-ckb-red transition-colors"
                    >
                      Mehr lesen...
                    </Link>
                  </p>
                </div>
              ) : (
                <p className="text-xs text-gray-500">Noch keine Beiträge.</p>
              )}
            </div>

            <div className="px-6 sm:px-10 lg:px-32">
              <div className="border-t border-gray-300 max-w-3xl" />
            </div>

            <div className="px-6 sm:px-10 lg:px-32 pt-4 pb-6">
              <p className="text-xs text-ckb-red mb-2">
                Das nächste Spiel im Rössle:
              </p>
              {nextTermin ? (
                <div className="max-w-xl">
                  <p className="text-xs font-bold text-black">
                    <Link
                      href="/termine"
                      className="underline hover:text-ckb-red transition-colors"
                    >
                      {nextTermin.gegner}
                    </Link>
                  </p>
                  <p className="text-xs text-black">
                    {new Date(nextTermin.datum).toLocaleDateString("de-DE", {
                      weekday: "long",
                      day: "2-digit",
                      month: "2-digit",
                      year: "2-digit",
                    })}
                    , {nextTermin.uhrzeit} Uhr
                  </p>
                </div>
              ) : (
                <p className="text-xs text-gray-500">
                  Keine kommenden Termine.
                </p>
              )}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
