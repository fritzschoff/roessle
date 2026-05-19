import Image from "next/image";
import { db } from "@/lib/db";
import { blogPosts, termine as termineTable } from "@/lib/schema";
import { and, desc, eq, gte, isNull, or } from "drizzle-orm";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { GameBar } from "@/components/game-bar";
import { NewsTicker } from "@/components/news-ticker";

export const dynamic = "force-dynamic";

export default async function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const now = new Date();
  const today = now.toISOString().split("T")[0];

  const [tickerRows, upcomingTermine, latestPosts] = await Promise.all([
    db
      .select()
      .from(blogPosts)
      .where(
        and(
          eq(blogPosts.status, "published"),
          eq(blogPosts.tickerEnabled, true),
          or(isNull(blogPosts.tickerExpiry), gte(blogPosts.tickerExpiry, now))
        )
      )
      .orderBy(desc(blogPosts.publishedAt))
      .limit(1),
    db
      .select()
      .from(termineTable)
      .where(gte(termineTable.datum, today))
      .orderBy(termineTable.datum)
      .limit(8),
    db
      .select()
      .from(blogPosts)
      .where(eq(blogPosts.status, "published"))
      .orderBy(desc(blogPosts.publishedAt))
      .limit(4),
  ]);

  const tickerPost = tickerRows[0];
  const tickerBody = tickerPost
    ? tickerPost.excerpt ||
      tickerPost.content
        .replace(/<[^>]*>/g, " ")
        .replace(/\s+/g, " ")
        .trim()
        .slice(0, 300)
    : "";

  return (
    <div className="h-dvh flex flex-col overflow-hidden">
      <div className="flex-1 flex flex-col relative overflow-hidden">
        {/* Full-height red diagonal stripe — desktop only (lg+) */}
        <div
          className="hidden lg:block absolute top-0 right-0 bottom-0 w-[38%] xl:w-[33%] 2xl:w-[30%] z-40 pointer-events-none"
          style={{
            clipPath: "polygon(100% 0, 100% 100%, 0 100%, 180px 0)",
          }}
        >
          <div className="absolute inset-0 bg-ckb-red" />
          <div className="absolute top-[8%] -left-[20%] w-[140%] h-[85%]">
            <Image
              src="/images/ckb-wappen.svg"
              alt=""
              fill
              className="object-contain object-right"
              style={{ filter: "brightness(0) invert(1)" }}
              aria-hidden="true"
            />
          </div>
        </div>

        <Navbar />

        {/* News ticker — full width, fades out before the diagonal's top edge */}
        {tickerPost && (
          <div className="relative">
            <NewsTicker
              title={tickerPost.title}
              excerpt={tickerBody}
              href={`/aktuelles/${tickerPost.slug}`}
            />
            {/*
              Diagonal at the TOP of the stripe is offset by 180px (from clip-path polygon).
              So the fade ends at (stripe-width − 180px) from the right of the viewport.
            */}
            <div
              className="hidden lg:block absolute inset-y-0 w-28 pointer-events-none z-10
                         right-[calc(38%-180px)] xl:right-[calc(33%-180px)] 2xl:right-[calc(30%-180px)]
                         bg-gradient-to-r from-transparent to-ckb-red"
            />
          </div>
        )}

        <main className="flex-1 overflow-y-auto lg:mr-[38%] xl:mr-[33%] 2xl:mr-[30%]">
          {children}
        </main>

        {/* Game bar — featured game (left red) + blog slider + small games (right gray) */}
        <GameBar termine={upcomingTermine} blogPosts={latestPosts} />
      </div>

      <Footer />
    </div>
  );
}
