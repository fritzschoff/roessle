import type { Team } from "@/lib/teams";

/**
 * Vereine werden nur als Text gezeigt (Wappen dürfen wir nicht verwenden) —
 * die Klubfarbe macht sie trotzdem auf einen Blick erkennbar.
 */
const CHIP_SIZES = {
  sm: "text-[10px] px-1.5 py-[3px]",
  md: "text-[12px] px-2 py-1",
  lg: "text-[14px] px-2.5 py-1.5",
} as const;

export function TeamChip({
  team,
  size = "md",
  short = false,
}: {
  team: Team;
  size?: keyof typeof CHIP_SIZES;
  short?: boolean;
}) {
  return (
    <span
      className={`inline-block rounded border font-bold leading-none whitespace-nowrap ${CHIP_SIZES[size]}`}
      style={{
        backgroundColor: team.bg,
        color: team.fg,
        borderColor: `${team.fg}66`,
      }}
    >
      {short ? team.short : team.name}
    </span>
  );
}

/** Wettbewerbe ebenfalls nur als Schrift — erbt die Textfarbe des Umfelds. */
export function CompetitionLabel({
  name,
  className = "",
}: {
  name: string;
  className?: string;
}) {
  return (
    <span
      className={`uppercase font-semibold tracking-[0.14em] leading-none whitespace-nowrap ${className}`}
    >
      {name}
    </span>
  );
}
