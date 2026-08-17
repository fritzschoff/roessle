/**
 * Einmalige Migration: Spalte `heim` für die Termine-Tabelle.
 *
 * Bis dahin speicherte ein Termin nur den Gegner — der VfB stand deshalb in
 * jeder Paarung links, auch bei Auswärtsspielen. Additiv und idempotent:
 * bestehende Zeilen bekommen den Default 1 (Heimspiel).
 *
 * Aufruf: npx tsx --env-file=.env.local scripts/add-heim-column.ts
 */
import { createClient } from "@libsql/client";

async function main() {
  const client = createClient({
    url: process.env.DATABASE_URL!,
    authToken: process.env.DATABASE_AUTH_TOKEN,
  });

  const vorher = await client.execute("PRAGMA table_info(termine)");
  const spalten = vorher.rows.map((r) => r.name as string);
  console.log("Spalten vorher:", spalten.join(", "));

  if (spalten.includes("heim")) {
    console.log("-> Spalte `heim` existiert bereits, nichts zu tun.");
    return;
  }

  await client.execute(
    "ALTER TABLE termine ADD COLUMN heim INTEGER NOT NULL DEFAULT 1"
  );
  console.log("-> Spalte `heim` hinzugefügt (Default 1 = Heimspiel).");

  const nachher = await client.execute("PRAGMA table_info(termine)");
  console.log("Spalten nachher:", nachher.rows.map((r) => r.name).join(", "));
}

main();
