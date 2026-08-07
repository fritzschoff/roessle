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
      wettbewerb: "Bundesliga",
      datum: "2026-08-15",
      uhrzeit: "18:30",
    },
    {
      gegner: "FC Bayern München",
      wettbewerb: "DFB-Pokal",
      datum: "2026-08-22",
      uhrzeit: "18:00",
    },
    {
      gegner: "Noch unbekannt",
      wettbewerb: "Champions League",
      datum: "2026-09-03",
      uhrzeit: "21:00",
    },
    {
      gegner: "Noch unbekannt",
      wettbewerb: "Europa League",
      datum: "2026-09-10",
      uhrzeit: "21:00",
    },
    {
      gegner: "Noch unbekannt",
      wettbewerb: "Conference League",
      datum: "2026-09-17",
      uhrzeit: "18:45",
    },
    {
      gegner: "Hamburger SV",
      wettbewerb: "Freundschaftsspiel",
      datum: "2026-09-24",
      uhrzeit: "15:30",
    },
    {
      gegner: "Eintracht Frankfurt",
      wettbewerb: null,
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
    });
    console.log(`Added: ${t.wettbewerb ?? "—"} — ${t.gegner}`);
  }

  console.log("Done.");
  process.exit(0);
}

run().catch((e) => { console.error(e); process.exit(1); });
