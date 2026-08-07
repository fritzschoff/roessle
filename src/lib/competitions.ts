/** Wettbewerbe nur als Text — die Logos der Wettbewerbe dürfen wir nicht verwenden. */
export const NO_COMPETITION = "Kein Wettbewerb";

export const COMPETITIONS: string[] = [
  NO_COMPETITION,
  "Bundesliga",
  "DFB-Pokal",
  "Champions League",
  "Europa League",
  "Conference League",
  "Freundschaftsspiel",
];

/** Gibt den anzeigbaren Wettbewerb zurück — oder null, wenn keiner gesetzt ist. */
export function competitionLabel(wettbewerb: string | null | undefined) {
  return wettbewerb && wettbewerb !== NO_COMPETITION ? wettbewerb : null;
}
