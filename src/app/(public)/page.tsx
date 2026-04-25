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
    <>
      {/* ===== PAGE CONTENT ===== */}
      <div className="bg-white relative">
        <section className="min-h-[calc(100vh-105px-81px)] flex flex-col">
          {/* Hero */}
          <div className="flex-1 px-6 sm:px-10 lg:px-32 pt-20 sm:pt-24 pb-12">
            <p className="font-lobster text-lg sm:text-2xl text-ckb-red mb-1">
              Fern der Heimat, nah im Herzen
            </p>

            <h1 className="text-[34px] sm:text-5xl font-extrabold uppercase leading-[1.05] tracking-tight text-black max-w-[90%] lg:max-w-lg">
              Die mit Abstand lauteste Kurve in Berlin
            </h1>

            <p className="text-xs text-black mt-6 max-w-md leading-relaxed">
              Dein Treffpunkt für Alles rund um den VfB in der Hauptstadt.
              <br />
              Wir freuen uns auf deinen Besuch!
            </p>

            <div className="flex gap-4 mt-8">
              <Link
                href="/ueber-uns"
                className="bg-ckb-red text-white text-xs w-[152px] h-[36px] flex items-center justify-center hover:bg-ckb-red-dark transition-colors"
              >
                Jetzt entdecken
              </Link>
              <Link
                href="/mitgliedschaft"
                className="border-2 border-black text-black text-xs w-[152px] h-[36px] flex items-center justify-center hover:bg-black hover:text-white transition-colors"
              >
                Mitgliedschaft
              </Link>
            </div>
          </div>

          {/* Blog + matches section */}
          <div className="bg-black/[0.02]">
            <div className="px-6 sm:px-10 lg:px-32 pt-8 pb-6">
              <p className="text-xs text-ckb-red mb-2">Blog Aktuell</p>
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
                  {latestPost.publishedAt && (
                    <p className="text-[10px] text-black mt-2">
                      {latestPost.publishedAt.toLocaleDateString("de-DE", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </p>
                  )}
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
                Die nächsten Spiele im Rössle:
              </p>
              {upcomingTermine.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl">
                  {upcomingTermine.map((t) => (
                    <div key={t.id}>
                      <p className="text-xs font-bold text-black">
                        <Link
                          href="/termine"
                          className="underline hover:text-ckb-red transition-colors"
                        >
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
