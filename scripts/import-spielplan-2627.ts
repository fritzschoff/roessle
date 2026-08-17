/**
 * Einmal-Import des VfB-Spielplans 2026/27 (Bundesliga + DFB-Pokal 1. Runde).
 *
 * Quelle: offizieller Spielplan auf vfb.de (Stand 17.08.2026).
 * Zeitgenau angesetzt sind bislang nur Pokal-Runde 1, die Bundesliga-Spieltage
 * 1–4 und der 34. Spieltag. Alle übrigen Spieltage haben von der DFL nur ein
 * Wochenendfenster — dort steht das wahrscheinlichste Datum (Samstag bzw. der
 * Mittwoch der englischen Wochen) und die Anstoßzeit bleibt leer, damit auf der
 * Seite ehrlich „offen“ steht statt einer erfundenen Uhrzeit. Das echte Fenster
 * steht jeweils in der Beschreibung.
 *
 * ACHTUNG: Das Skript ersetzt den kompletten Inhalt der Termine-Tabelle.
 * Nach dem ersten Lauf werden Änderungen aus dem Admin überschrieben —
 * ab dann Termine nur noch über /admin/termine pflegen.
 *
 * Aufruf: npx tsx --env-file=.env.local scripts/import-spielplan-2627.ts
 */
import { db } from "../src/lib/db";
import { termine } from "../src/lib/schema";
import { TEAMS } from "../src/lib/teams";
import { ulid } from "ulid";

type Spiel = {
  gegner: string;
  heim: boolean;
  datum: string;
  /** Leer = von der DFL noch nicht terminiert. */
  uhrzeit: string;
  wettbewerb: string;
  /** Nur für noch nicht terminierte Spiele: das angekündigte Zeitfenster. */
  fenster?: string;
  spieltag: number;
};

const POKAL: Spiel = {
  gegner: "Hansa Rostock",
  heim: false,
  datum: "2026-08-21",
  uhrzeit: "20:45",
  wettbewerb: "DFB-Pokal",
  spieltag: 1,
};

const BUNDESLIGA: Spiel[] = [
  { spieltag: 1, gegner: "FC Bayern München", heim: false, datum: "2026-08-28", uhrzeit: "20:30", wettbewerb: "Bundesliga" },
  { spieltag: 2, gegner: "1. FC Köln", heim: true, datum: "2026-09-04", uhrzeit: "20:30", wettbewerb: "Bundesliga" },
  { spieltag: 3, gegner: "TSG 1899 Hoffenheim", heim: false, datum: "2026-09-12", uhrzeit: "15:30", wettbewerb: "Bundesliga" },
  { spieltag: 4, gegner: "Borussia Dortmund", heim: true, datum: "2026-09-19", uhrzeit: "18:30", wettbewerb: "Bundesliga" },
  { spieltag: 5, gegner: "SC Paderborn", heim: false, datum: "2026-10-10", uhrzeit: "", wettbewerb: "Bundesliga", fenster: "9.–11. Oktober 2026" },
  { spieltag: 6, gegner: "Hamburger SV", heim: false, datum: "2026-10-17", uhrzeit: "", wettbewerb: "Bundesliga", fenster: "16.–18. Oktober 2026" },
  { spieltag: 7, gegner: "Borussia Mönchengladbach", heim: true, datum: "2026-10-24", uhrzeit: "", wettbewerb: "Bundesliga", fenster: "23.–25. Oktober 2026" },
  { spieltag: 8, gegner: "Bayer 04 Leverkusen", heim: false, datum: "2026-10-31", uhrzeit: "", wettbewerb: "Bundesliga", fenster: "30. Oktober–1. November 2026" },
  { spieltag: 9, gegner: "SV Werder Bremen", heim: true, datum: "2026-11-07", uhrzeit: "", wettbewerb: "Bundesliga", fenster: "6.–8. November 2026" },
  { spieltag: 10, gegner: "FC Schalke 04", heim: false, datum: "2026-11-21", uhrzeit: "", wettbewerb: "Bundesliga", fenster: "20.–22. November 2026" },
  { spieltag: 11, gegner: "Eintracht Frankfurt", heim: true, datum: "2026-11-28", uhrzeit: "", wettbewerb: "Bundesliga", fenster: "27.–29. November 2026" },
  { spieltag: 12, gegner: "SV Elversberg", heim: false, datum: "2026-12-05", uhrzeit: "", wettbewerb: "Bundesliga", fenster: "4.–6. Dezember 2026" },
  { spieltag: 13, gegner: "1. FC Union Berlin", heim: true, datum: "2026-12-12", uhrzeit: "", wettbewerb: "Bundesliga", fenster: "11.–13. Dezember 2026" },
  { spieltag: 14, gegner: "SC Freiburg", heim: false, datum: "2026-12-19", uhrzeit: "", wettbewerb: "Bundesliga", fenster: "18.–20. Dezember 2026" },
  { spieltag: 15, gegner: "FC Augsburg", heim: true, datum: "2027-01-09", uhrzeit: "", wettbewerb: "Bundesliga", fenster: "8.–10. Januar 2027" },
  { spieltag: 16, gegner: "RB Leipzig", heim: false, datum: "2027-01-13", uhrzeit: "", wettbewerb: "Bundesliga", fenster: "12.–14. Januar 2027 (englische Woche)" },
  { spieltag: 17, gegner: "1. FSV Mainz 05", heim: true, datum: "2027-01-16", uhrzeit: "", wettbewerb: "Bundesliga", fenster: "15.–17. Januar 2027" },
  { spieltag: 18, gegner: "FC Bayern München", heim: true, datum: "2027-01-23", uhrzeit: "", wettbewerb: "Bundesliga", fenster: "22.–24. Januar 2027" },
  { spieltag: 19, gegner: "1. FC Köln", heim: false, datum: "2027-01-30", uhrzeit: "", wettbewerb: "Bundesliga", fenster: "29.–31. Januar 2027" },
  { spieltag: 20, gegner: "TSG 1899 Hoffenheim", heim: true, datum: "2027-02-06", uhrzeit: "", wettbewerb: "Bundesliga", fenster: "5.–7. Februar 2027" },
  { spieltag: 21, gegner: "Borussia Dortmund", heim: false, datum: "2027-02-13", uhrzeit: "", wettbewerb: "Bundesliga", fenster: "12.–14. Februar 2027" },
  { spieltag: 22, gegner: "SC Paderborn", heim: true, datum: "2027-02-20", uhrzeit: "", wettbewerb: "Bundesliga", fenster: "19.–21. Februar 2027" },
  { spieltag: 23, gegner: "Hamburger SV", heim: true, datum: "2027-02-27", uhrzeit: "", wettbewerb: "Bundesliga", fenster: "26.–28. Februar 2027" },
  { spieltag: 24, gegner: "Borussia Mönchengladbach", heim: false, datum: "2027-03-03", uhrzeit: "", wettbewerb: "Bundesliga", fenster: "2.–4. März 2027 (englische Woche)" },
  { spieltag: 25, gegner: "Bayer 04 Leverkusen", heim: true, datum: "2027-03-06", uhrzeit: "", wettbewerb: "Bundesliga", fenster: "5.–7. März 2027" },
  { spieltag: 26, gegner: "SV Werder Bremen", heim: false, datum: "2027-03-13", uhrzeit: "", wettbewerb: "Bundesliga", fenster: "12.–14. März 2027" },
  { spieltag: 27, gegner: "FC Schalke 04", heim: true, datum: "2027-03-20", uhrzeit: "", wettbewerb: "Bundesliga", fenster: "19.–21. März 2027" },
  { spieltag: 28, gegner: "Eintracht Frankfurt", heim: false, datum: "2027-04-03", uhrzeit: "", wettbewerb: "Bundesliga", fenster: "2.–4. April 2027" },
  { spieltag: 29, gegner: "SV Elversberg", heim: true, datum: "2027-04-10", uhrzeit: "", wettbewerb: "Bundesliga", fenster: "9.–11. April 2027" },
  { spieltag: 30, gegner: "1. FC Union Berlin", heim: false, datum: "2027-04-17", uhrzeit: "", wettbewerb: "Bundesliga", fenster: "16.–18. April 2027" },
  { spieltag: 31, gegner: "SC Freiburg", heim: true, datum: "2027-04-24", uhrzeit: "", wettbewerb: "Bundesliga", fenster: "23.–25. April 2027" },
  { spieltag: 32, gegner: "FC Augsburg", heim: false, datum: "2027-05-08", uhrzeit: "", wettbewerb: "Bundesliga", fenster: "7.–9. Mai 2027" },
  { spieltag: 33, gegner: "RB Leipzig", heim: true, datum: "2027-05-15", uhrzeit: "", wettbewerb: "Bundesliga", fenster: "14.–16. Mai 2027" },
  { spieltag: 34, gegner: "1. FSV Mainz 05", heim: false, datum: "2027-05-22", uhrzeit: "15:30", wettbewerb: "Bundesliga" },
];

/** Rössle öffnet eine halbe Stunde vor Anpfiff. */
function oeffnung(uhrzeit: string): string | null {
  if (!uhrzeit) return null;
  const [h, m] = uhrzeit.split(":").map(Number);
  const d = new Date(2000, 0, 1, h, m - 30);
  return `${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;
}

function beschreibung(s: Spiel): string {
  const runde =
    s.wettbewerb === "DFB-Pokal"
      ? `DFB-Pokal, ${s.spieltag}. Runde`
      : `Bundesliga, ${s.spieltag}. Spieltag`;
  return s.fenster
    ? `${runde} — Anstoßzeit noch nicht terminiert (Zeitfenster: ${s.fenster})`
    : runde;
}

/**
 * Prüft die Daten, bevor irgendetwas gelöscht wird. Ein Tippfehler im
 * Gegnernamen würde sonst unbemerkt Klubfarbe und Kürzel verlieren.
 */
function pruefen() {
  const fehler: string[] = [];
  const bekannt = new Set(TEAMS.map((t) => t.name));

  for (const s of [POKAL, ...BUNDESLIGA]) {
    if (!bekannt.has(s.gegner)) {
      fehler.push(`Unbekannter Verein in teams.ts: "${s.gegner}"`);
    }
  }

  // Die Rückrunde spiegelt die Hinrunde: Spieltag n und n+17 sind dieselbe
  // Paarung mit vertauschtem Heimrecht.
  for (let n = 0; n < 17; n++) {
    const hin = BUNDESLIGA[n];
    const rueck = BUNDESLIGA[n + 17];
    if (hin.gegner !== rueck.gegner) {
      fehler.push(
        `Spieltag ${hin.spieltag}/${rueck.spieltag}: ${hin.gegner} ≠ ${rueck.gegner}`
      );
    }
    if (hin.heim === rueck.heim) {
      fehler.push(
        `Spieltag ${hin.spieltag}/${rueck.spieltag} (${hin.gegner}): Heimrecht nicht gespiegelt`
      );
    }
  }

  const daten = BUNDESLIGA.map((s) => s.datum);
  for (let i = 1; i < daten.length; i++) {
    if (daten[i] <= daten[i - 1]) {
      fehler.push(`Datum nicht aufsteigend: ${daten[i - 1]} -> ${daten[i]}`);
    }
  }

  if (BUNDESLIGA.length !== 34) {
    fehler.push(`${BUNDESLIGA.length} statt 34 Bundesliga-Spiele`);
  }

  if (fehler.length > 0) {
    console.error("Import abgebrochen:");
    for (const f of fehler) console.error(`  - ${f}`);
    process.exit(1);
  }
  console.log("Prüfung bestanden: 34 Spieltage, Rückrunde gespiegelt, alle Vereine bekannt.\n");
}

async function main() {
  pruefen();

  const vorher = await db.select().from(termine);
  console.log(`Bestehende Termine: ${vorher.length}`);
  for (const t of vorher) {
    console.log(`  gelöscht: ${t.datum} ${t.uhrzeit} ${t.gegner} (${t.wettbewerb})`);
  }
  await db.delete(termine);

  const alle = [POKAL, ...BUNDESLIGA];
  for (const s of alle) {
    await db.insert(termine).values({
      id: ulid(),
      gegner: s.gegner,
      wettbewerb: s.wettbewerb,
      heim: s.heim,
      datum: s.datum,
      uhrzeit: s.uhrzeit,
      ort: "Das Rössle",
      oeffnungszeit: oeffnung(s.uhrzeit),
      beschreibung: beschreibung(s),
    });
  }

  const terminiert = alle.filter((s) => s.uhrzeit).length;
  console.log(
    `\nImportiert: ${alle.length} Spiele (${terminiert} mit fester Anstoßzeit, ${
      alle.length - terminiert
    } noch offen).`
  );
}

main();
