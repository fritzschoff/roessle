export type Competition = {
  name: string;
  logo: string;
};

export const COMPETITIONS: Competition[] = [
  { name: "Kein Wettbewerb", logo: "" },
  { name: "Bundesliga", logo: "/images/competitions/bundesliga.png" },
  { name: "DFB-Pokal", logo: "/images/competitions/dfb-pokal.svg" },
  { name: "Champions League", logo: "/images/competitions/champions-league.svg" },
  { name: "Europa League", logo: "/images/competitions/europa-league.svg" },
  { name: "Conference League", logo: "/images/competitions/conference-league.svg" },
  { name: "Freundschaftsspiel", logo: "/images/competitions/freundschaftsspiel.svg" },
];
