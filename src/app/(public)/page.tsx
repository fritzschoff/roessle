import Image from "next/image";
import Link from "next/link";
import { db } from "@/lib/db";
import { blogPosts, termine } from "@/lib/schema";
import { desc, eq, gte } from "drizzle-orm";

export const revalidate = 60;

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
    <section className="h-[calc(100vh-4rem)] bg-gradient-to-b from-ckb-dark via-ckb-red to-ckb-dark relative flex flex-col items-center justify-center">
      <div className="absolute inset-0 bg-black/40" />

      <div className="relative z-10 flex flex-col items-center gap-6 px-4 text-center text-white">
        <Image
          src="/images/logo-ckb.svg"
          alt="CKB Logo"
          width={128}
          height={128}
          className="h-24 sm:h-32 w-auto"
          priority
        />
        <h1 className="font-lobster text-4xl sm:text-5xl lg:text-6xl">
          Cannstatter Kurve Berlin
        </h1>
        <p className="text-lg sm:text-xl text-white/80">
          Fern der Heimat, nah im Herzen.
        </p>
      </div>

      <div className="relative z-10 mt-12 flex flex-col sm:flex-row gap-4 max-w-3xl w-full px-4">
        {latestPost ? (
          <Link
            href={`/aktuelles/${latestPost.slug}`}
            className="flex-1 bg-black/60 backdrop-blur-sm rounded-lg p-5 border border-ckb-red/30 text-white hover:border-ckb-red/60 transition-colors"
          >
            <h2 className="font-semibold text-sm uppercase tracking-wide text-ckb-red-light mb-2">
              Aktuelles
            </h2>
            <p className="font-medium">{latestPost.title}</p>
            {latestPost.publishedAt && (
              <p className="text-sm text-gray-400 mt-1">
                {latestPost.publishedAt.toLocaleDateString("de-DE", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                })}
              </p>
            )}
          </Link>
        ) : (
          <div className="flex-1 bg-black/60 backdrop-blur-sm rounded-lg p-5 border border-ckb-red/30 text-white">
            <h2 className="font-semibold text-sm uppercase tracking-wide text-ckb-red-light mb-2">
              Aktuelles
            </h2>
            <p className="text-gray-400">Noch keine Beiträge.</p>
          </div>
        )}

        {nextTermin ? (
          <Link
            href="/termine"
            className="flex-1 bg-black/60 backdrop-blur-sm rounded-lg p-5 border border-ckb-red/30 text-white hover:border-ckb-red/60 transition-colors"
          >
            <h2 className="font-semibold text-sm uppercase tracking-wide text-ckb-red-light mb-2">
              Nächster Termin
            </h2>
            <p className="font-medium">{nextTermin.gegner}</p>
            <p className="text-sm text-gray-400 mt-1">
              {new Date(nextTermin.datum).toLocaleDateString("de-DE", {
                weekday: "long",
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
              })}{" "}
              &middot; {nextTermin.uhrzeit} Uhr
            </p>
          </Link>
        ) : (
          <div className="flex-1 bg-black/60 backdrop-blur-sm rounded-lg p-5 border border-ckb-red/30 text-white">
            <h2 className="font-semibold text-sm uppercase tracking-wide text-ckb-red-light mb-2">
              Nächster Termin
            </h2>
            <p className="text-gray-400">Keine kommenden Termine.</p>
          </div>
        )}
      </div>
    </section>
  );
}
