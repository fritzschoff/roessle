import { db } from "@/lib/db";
import { blogPosts, termine } from "@/lib/schema";
import { desc, eq, gte } from "drizzle-orm";
import { GameBar } from "@/components/game-bar";
import { NewsTicker } from "@/components/news-ticker";

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
    .limit(8);

  return (
    <div className="bg-white relative flex flex-col min-h-[calc(100vh-100px-81px)] md:min-h-[calc(100vh-105px-81px)]">
      {/* News ticker — only when there's a latest post */}
      {latestPost && (
        <NewsTicker
          title={latestPost.title}
          href={`/aktuelles/${latestPost.slug}`}
        />
      )}

      {/* Hero — grows to fill available space */}
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

      {/* Game bar — sticks to top on mobile when scrolled */}
      <GameBar termine={upcomingTermine} latestPost={latestPost} />
    </div>
  );
}
