/**
 * Vereine werden ausschließlich als Text dargestellt — Vereinswappen dürfen
 * wir nicht verwenden. Zur Auflockerung bekommt jeder Verein seine Klubfarbe
 * (bg) und eine darauf gut lesbare Schriftfarbe (fg).
 */
export type Team = {
  name: string;
  /** Kurzform für enge Zeilen wie den Spielbalken */
  short: string;
  bg: string;
  fg: string;
};

export const TEAMS: Team[] = [
  { name: "Noch unbekannt", short: "offen", bg: "#e5e5e5", fg: "#4b4b4b" },
  // Bundesliga
  { name: "FC Bayern München", short: "Bayern", bg: "#dc052d", fg: "#ffffff" },
  { name: "Borussia Dortmund", short: "Dortmund", bg: "#fde100", fg: "#000000" },
  { name: "Bayer 04 Leverkusen", short: "Leverkusen", bg: "#e32219", fg: "#ffffff" },
  { name: "RB Leipzig", short: "Leipzig", bg: "#dd0741", fg: "#ffffff" },
  { name: "Eintracht Frankfurt", short: "Frankfurt", bg: "#000000", fg: "#ffffff" },
  { name: "SC Freiburg", short: "Freiburg", bg: "#d0021b", fg: "#ffffff" },
  { name: "Borussia Mönchengladbach", short: "Gladbach", bg: "#ffffff", fg: "#000000" },
  { name: "TSG 1899 Hoffenheim", short: "Hoffenheim", bg: "#1c63b7", fg: "#ffffff" },
  { name: "1. FC Union Berlin", short: "Union", bg: "#eb1923", fg: "#ffffff" },
  { name: "1. FSV Mainz 05", short: "Mainz", bg: "#c3141e", fg: "#ffffff" },
  { name: "SV Werder Bremen", short: "Bremen", bg: "#1d9053", fg: "#ffffff" },
  { name: "FC Augsburg", short: "Augsburg", bg: "#ba3733", fg: "#ffffff" },
  { name: "VfL Wolfsburg", short: "Wolfsburg", bg: "#4c9b2f", fg: "#ffffff" },
  { name: "1. FC Heidenheim 1846", short: "Heidenheim", bg: "#e30613", fg: "#ffffff" },
  { name: "Holstein Kiel", short: "Kiel", bg: "#0f3c79", fg: "#ffffff" },
  { name: "FC St. Pauli", short: "St. Pauli", bg: "#6b4a2e", fg: "#ffffff" },
  { name: "VfL Bochum", short: "Bochum", bg: "#005ca9", fg: "#ffffff" },
  // DFB Pokal regulars
  { name: "Hamburger SV", short: "Hamburg", bg: "#0a3a85", fg: "#ffffff" },
  { name: "FC Schalke 04", short: "Schalke", bg: "#004d9d", fg: "#ffffff" },
  { name: "Hertha BSC", short: "Hertha", bg: "#0a5ca8", fg: "#ffffff" },
  { name: "1. FC Nürnberg", short: "Nürnberg", bg: "#aa1124", fg: "#ffffff" },
  { name: "Hannover 96", short: "Hannover", bg: "#009641", fg: "#ffffff" },
  { name: "Fortuna Düsseldorf", short: "Düsseldorf", bg: "#da291c", fg: "#ffffff" },
  { name: "Karlsruher SC", short: "Karlsruhe", bg: "#0c4da2", fg: "#ffffff" },
  { name: "1. FC Kaiserslautern", short: "Lautern", bg: "#e2001a", fg: "#ffffff" },
  { name: "SpVgg Greuther Fürth", short: "Fürth", bg: "#009540", fg: "#ffffff" },
];

export const VFB: Team = {
  name: "VfB Stuttgart",
  short: "VfB",
  bg: "#e32219",
  fg: "#ffffff",
};

const UNKNOWN: Team = TEAMS[0];

/** Termine speichern nur den Vereinsnamen — Farben kommen aus dieser Liste. */
export function findTeam(name: string | null | undefined): Team {
  if (!name) return UNKNOWN;
  return (
    TEAMS.find((t) => t.name === name) ?? { ...UNKNOWN, name, short: name }
  );
}
