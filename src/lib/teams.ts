/**
 * Vereine werden ausschließlich als Text dargestellt — Vereinswappen dürfen
 * wir nicht verwenden. Zur Auflockerung bekommt jeder Verein seine Klubfarbe
 * (bg) und eine darauf gut lesbare Schriftfarbe (fg).
 */
export type Team = {
  name: string;
  /** Kurzform für enge Zeilen wie den Spielbalken */
  short: string;
  /** 3–4 Zeichen für die große Paarungs-Anzeige (BVB, HSV, …) */
  abbr: string;
  bg: string;
  fg: string;
};

export const TEAMS: Team[] = [
  { name: "Noch unbekannt", short: "offen", abbr: "offen", bg: "#e5e5e5", fg: "#4b4b4b" },
  // Bundesliga
  { name: "FC Bayern München", short: "Bayern", abbr: "FCB", bg: "#dc052d", fg: "#ffffff" },
  { name: "Borussia Dortmund", short: "Dortmund", abbr: "BVB", bg: "#fde100", fg: "#000000" },
  { name: "Bayer 04 Leverkusen", short: "Leverkusen", abbr: "B04", bg: "#e32219", fg: "#ffffff" },
  { name: "RB Leipzig", short: "Leipzig", abbr: "RBL", bg: "#dd0741", fg: "#ffffff" },
  { name: "Eintracht Frankfurt", short: "Frankfurt", abbr: "SGE", bg: "#000000", fg: "#ffffff" },
  { name: "SC Freiburg", short: "Freiburg", abbr: "SCF", bg: "#d0021b", fg: "#ffffff" },
  { name: "Borussia Mönchengladbach", short: "Gladbach", abbr: "BMG", bg: "#ffffff", fg: "#000000" },
  { name: "TSG 1899 Hoffenheim", short: "Hoffenheim", abbr: "TSG", bg: "#1c63b7", fg: "#ffffff" },
  { name: "1. FC Union Berlin", short: "Union", abbr: "FCU", bg: "#eb1923", fg: "#ffffff" },
  { name: "1. FSV Mainz 05", short: "Mainz", abbr: "M05", bg: "#c3141e", fg: "#ffffff" },
  { name: "SV Werder Bremen", short: "Bremen", abbr: "SVW", bg: "#1d9053", fg: "#ffffff" },
  { name: "FC Augsburg", short: "Augsburg", abbr: "FCA", bg: "#ba3733", fg: "#ffffff" },
  { name: "VfL Wolfsburg", short: "Wolfsburg", abbr: "WOB", bg: "#4c9b2f", fg: "#ffffff" },
  { name: "1. FC Heidenheim 1846", short: "Heidenheim", abbr: "FCH", bg: "#e30613", fg: "#ffffff" },
  { name: "Holstein Kiel", short: "Kiel", abbr: "KSV", bg: "#0f3c79", fg: "#ffffff" },
  { name: "FC St. Pauli", short: "St. Pauli", abbr: "FCSP", bg: "#6b4a2e", fg: "#ffffff" },
  { name: "VfL Bochum", short: "Bochum", abbr: "BOC", bg: "#005ca9", fg: "#ffffff" },
  { name: "1. FC Köln", short: "Köln", abbr: "KOE", bg: "#ed1c24", fg: "#ffffff" },
  { name: "SC Paderborn", short: "Paderborn", abbr: "SCP", bg: "#005ca9", fg: "#ffffff" },
  { name: "SV Elversberg", short: "Elversberg", abbr: "SVE", bg: "#e2001a", fg: "#ffffff" },
  // DFB Pokal regulars
  { name: "Hansa Rostock", short: "Rostock", abbr: "HRO", bg: "#0a3a85", fg: "#ffffff" },
  { name: "Hamburger SV", short: "Hamburg", abbr: "HSV", bg: "#0a3a85", fg: "#ffffff" },
  { name: "FC Schalke 04", short: "Schalke", abbr: "S04", bg: "#004d9d", fg: "#ffffff" },
  { name: "Hertha BSC", short: "Hertha", abbr: "BSC", bg: "#0a5ca8", fg: "#ffffff" },
  { name: "1. FC Nürnberg", short: "Nürnberg", abbr: "FCN", bg: "#aa1124", fg: "#ffffff" },
  { name: "Hannover 96", short: "Hannover", abbr: "H96", bg: "#009641", fg: "#ffffff" },
  { name: "Fortuna Düsseldorf", short: "Düsseldorf", abbr: "F95", bg: "#da291c", fg: "#ffffff" },
  { name: "Karlsruher SC", short: "Karlsruhe", abbr: "KSC", bg: "#0c4da2", fg: "#ffffff" },
  { name: "1. FC Kaiserslautern", short: "Lautern", abbr: "FCK", bg: "#e2001a", fg: "#ffffff" },
  { name: "SpVgg Greuther Fürth", short: "Fürth", abbr: "SGF", bg: "#009540", fg: "#ffffff" },
];

export const VFB: Team = {
  name: "VfB Stuttgart",
  short: "VfB",
  abbr: "VfB",
  bg: "#e32219",
  fg: "#ffffff",
};

const UNKNOWN: Team = TEAMS[0];

/** Termine speichern nur den Vereinsnamen — Farben kommen aus dieser Liste. */
export function findTeam(name: string | null | undefined): Team {
  if (!name) return UNKNOWN;
  return (
    TEAMS.find((t) => t.name === name) ?? { ...UNKNOWN, name, short: name, abbr: name }
  );
}
