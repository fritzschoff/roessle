import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";
import { termine } from "../src/lib/schema";
import { ulid } from "ulid";

const client = createClient({
  url: process.env.DATABASE_URL!,
  authToken: process.env.DATABASE_AUTH_TOKEN,
});
const db = drizzle(client);

async function run() {
  // Delete all existing termine
  await db.delete(termine);
  console.log("Deleted all termine.");

  // One game per competition with real teams
  const testTermine = [
    {
      gegner: "Borussia Dortmund",
      gegnerLogo: "/images/teams/bvb.svg",
      wettbewerb: "Bundesliga",
      wettbewerbLogo: "/images/competitions/bundesliga.png",
      datum: "2026-08-15",
      uhrzeit: "18:30",
    },
    {
      gegner: "FC Bayern München",
      gegnerLogo: "/images/teams/fcb.svg",
      wettbewerb: "DFB-Pokal",
      wettbewerbLogo: "/images/competitions/dfb-pokal.svg",
      datum: "2026-08-22",
      uhrzeit: "18:00",
    },
    {
      gegner: "Noch unbekannt",
      gegnerLogo: "/images/teams/placeholder.svg",
      wettbewerb: "Champions League",
      wettbewerbLogo: "/images/competitions/champions-league.svg",
      datum: "2026-09-03",
      uhrzeit: "21:00",
    },
    {
      gegner: "Noch unbekannt",
      gegnerLogo: "/images/teams/placeholder.svg",
      wettbewerb: "Europa League",
      wettbewerbLogo: "/images/competitions/europa-league.svg",
      datum: "2026-09-10",
      uhrzeit: "21:00",
    },
    {
      gegner: "Noch unbekannt",
      gegnerLogo: "/images/teams/placeholder.svg",
      wettbewerb: "Conference League",
      wettbewerbLogo: "/images/competitions/conference-league.svg",
      datum: "2026-09-17",
      uhrzeit: "18:45",
    },
    {
      gegner: "Hamburger SV",
      gegnerLogo: "/images/teams/hsv.svg",
      wettbewerb: "Freundschaftsspiel",
      wettbewerbLogo: "/images/competitions/freundschaftsspiel.svg",
      datum: "2026-09-24",
      uhrzeit: "15:30",
    },
    {
      gegner: "Eintracht Frankfurt",
      gegnerLogo: "/images/teams/sge.svg",
      wettbewerb: "Kein Wettbewerb",
      wettbewerbLogo: "",
      datum: "2026-10-01",
      uhrzeit: "20:30",
    },
  ];

  for (const t of testTermine) {
    await db.insert(termine).values({
      id: ulid(),
      ort: "Das Rössle",
      oeffnungszeit: null,
      beschreibung: null,
      ...t,
      wettbewerbLogo: t.wettbewerbLogo || null,
    });
    console.log(`Added: ${t.wettbewerb} — ${t.gegner}`);
  }

  console.log("Done.");
  process.exit(0);
}

run().catch((e) => { console.error(e); process.exit(1); });
