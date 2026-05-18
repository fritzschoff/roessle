# Team Logos, Game Display Redesign & UX Cleanups — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add team/competition logos to the Termine feature, redesign the homepage game bar, sticky mobile game strip, simplify the contact page, and tidy up the navbar.

**Architecture:** Static config files (`teams.ts`, `competitions.ts`) map team/competition names to logo paths; logos live in `public/images/teams/` and `public/images/competitions/`. Three new nullable columns (`gegnerLogo`, `wettbewerb`, `wettbewerbLogo`) are added to the `termine` table. A new client component `TerminForm` handles the admin selectors; a new server component `GameBar` renders the match display on public pages.

**Tech Stack:** Next.js App Router, Drizzle ORM + Turso SQLite, Tailwind CSS, `drizzle-kit push` for migrations, `curl` for logo downloads, `gh` CLI for GitHub.

---

## File Map

| Action | Path | Responsibility |
|--------|------|----------------|
| Create | `public/images/teams/placeholder.svg` | Generic shield for unknown opponents |
| Create | `public/images/teams/vfb.svg` | VfB Stuttgart crest (home team) |
| Create | `public/images/teams/{slug}.svg` | One per Bundesliga / DFB Pokal club |
| Create | `public/images/competitions/{slug}.svg` | 6 competition badges |
| Create | `src/lib/teams.ts` | TEAMS array with name + logo path |
| Create | `src/lib/competitions.ts` | COMPETITIONS array with name + logo path |
| Create | `src/components/news-ticker.tsx` | Thin bar below navbar: "AKTUELLES: {latest title}" |
| Create | `src/components/game-bar.tsx` | Two-column bar: dark-red game left + white blog right + mini strip below |
| Create | `src/components/admin/termin-form.tsx` | Client form with team/competition selectors |
| Modify | `src/lib/schema.ts` | Add 3 nullable columns, update Termin type |
| Modify | `src/lib/actions/termine.ts` | Read new form fields in create + update |
| Modify | `src/app/admin/(dashboard)/termine/new/page.tsx` | Use TerminForm |
| Modify | `src/app/admin/(dashboard)/termine/[id]/edit/page.tsx` | Use TerminForm with defaults |
| Modify | `src/app/(public)/page.tsx` | Add NewsTicker + GameBar, remove old bottom section |
| Modify | `src/app/(public)/termine/page.tsx` | Show logos in game cards |
| Modify | `src/components/navbar.tsx` | Add "e.V." in all 3 breakpoints |
| Modify | `src/app/(public)/kontakt/page.tsx` | Remove form, add mailto button |

---

## Task 1: Navbar — add "e.V."

**Files:**
- Modify: `src/components/navbar.tsx`

- [ ] **Step 1: Update all three breakpoints**

In `src/components/navbar.tsx`, change every `CKB&rsquo;08` span to include e.V.:

Desktop (line ~63):
```tsx
<span className="font-poplar text-[34px] text-black uppercase tracking-wide leading-tight">
  CKB&rsquo;08 e.V.
</span>
```

Tablet (line ~93):
```tsx
<span className="font-poplar text-[30px] text-black uppercase tracking-wide leading-tight">
  CKB&rsquo;08 e.V.
</span>
```

Mobile (line ~169):
```tsx
<p className="font-poplar text-2xl text-black uppercase leading-tight">
  CKB&rsquo;08 e.V.
</p>
```

- [ ] **Step 2: Verify in browser**

Run `npm run dev`, open `http://localhost:3000`. Confirm "CKB'08 e.V." appears in all three breakpoints (desktop, ~800px, ~375px).

- [ ] **Step 3: Commit**

```bash
git add src/components/navbar.tsx
git commit -m "feat: add e.V. to navbar brand name"
```

---

## Task 2: Contact page — replace form with mailto button

**Files:**
- Modify: `src/app/(public)/kontakt/page.tsx`

- [ ] **Step 1: Replace the entire file**

The page was a client component (`"use client"`) because of form state. It becomes a simple server component:

```tsx
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Kontakt" };

export default function KontaktPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="font-lobster text-4xl text-ckb-red mb-8">Kontakt</h1>

      <div className="grid md:grid-cols-2 gap-12">
        <div>
          <p className="text-gray-700 mb-6">
            Du hast Fragen oder möchtest aus einem anderen Grund Kontakt zu uns
            aufnehmen? Schreib uns direkt eine E-Mail.
          </p>

          <a
            href="mailto:kontakt@ckb08.de"
            className="inline-block bg-ckb-red text-white px-8 py-3 rounded-lg font-medium hover:bg-ckb-red-dark transition-colors text-sm"
          >
            E-Mail schreiben →
          </a>
        </div>

        <div className="space-y-6">
          <div>
            <h2 className="font-semibold text-lg mb-2">E-Mail</h2>
            <a href="mailto:kontakt@ckb08.de" className="text-ckb-red hover:underline">
              kontakt@ckb08.de
            </a>
          </div>

          <div>
            <h2 className="font-semibold text-lg mb-2">Adresse</h2>
            <p className="text-gray-600">
              Cannstatter Kurve Berlin e.V.
              <br />
              Braunschweiger Straße 51
              <br />
              12055 Berlin-Neukölln
            </p>
          </div>

          <div>
            <h2 className="font-semibold text-lg mb-2">ÖPNV</h2>
            <p className="text-gray-600">
              S- und U-Bahn Neukölln
              <br />
              Bus 171 bis Zeitzer Straße
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Verify in browser**

Open `http://localhost:3000/kontakt`. Confirm no form is visible, the mailto button is present, clicking it opens the system mail client, address info is still shown.

- [ ] **Step 3: Commit**

```bash
git add src/app/(public)/kontakt/page.tsx
git commit -m "feat: replace contact form with mailto button"
```

---

## Task 3: Close GitHub issue #9

**Files:** none

- [ ] **Step 1: Close the issue**

```bash
gh issue close 9 --comment "Contact form has been removed in favour of a direct mailto link — captcha is no longer needed."
```

Expected output: `✓ Closed issue #9`

---

## Task 4: Download competition logos

**Files:**
- Create: `public/images/competitions/bundesliga.svg`
- Create: `public/images/competitions/dfb-pokal.svg`
- Create: `public/images/competitions/champions-league.svg`
- Create: `public/images/competitions/europa-league.svg`
- Create: `public/images/competitions/conference-league.svg`
- Create: `public/images/competitions/freundschaftsspiel.svg`

- [ ] **Step 1: Create the directory**

```bash
mkdir -p public/images/competitions
```

- [ ] **Step 2: Download competition badges from Wikimedia Commons**

```bash
# Bundesliga
curl -L -o public/images/competitions/bundesliga.svg \
  "https://upload.wikimedia.org/wikipedia/commons/d/df/Bundesliga_logo_%282017%29.svg"

# DFB-Pokal
curl -L -o public/images/competitions/dfb-pokal.svg \
  "https://upload.wikimedia.org/wikipedia/commons/d/db/DFB-Pokal_Logo.svg"

# Champions League
curl -L -o public/images/competitions/champions-league.svg \
  "https://upload.wikimedia.org/wikipedia/commons/b/bf/UEFA_Champions_League_logo_2.svg"

# Europa League
curl -L -o public/images/competitions/europa-league.svg \
  "https://upload.wikimedia.org/wikipedia/commons/5/55/UEFA_Europa_League_Logo_2021.svg"

# Conference League
curl -L -o public/images/competitions/conference-league.svg \
  "https://upload.wikimedia.org/wikipedia/commons/4/4f/UEFA_Europa_Conference_League_Logo_%282021%29.svg"
```

If any `curl` returns an HTML error page (check with `head -1 <file>`), look up the correct current filename on Wikimedia Commons (`https://commons.wikimedia.org/wiki/Special:Search?search=<competition+name>+logo`), update the URL, and re-download.

- [ ] **Step 3: Create the Freundschaftsspiel icon (football shape)**

```bash
cat > public/images/competitions/freundschaftsspiel.svg << 'EOF'
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <circle cx="50" cy="50" r="45" fill="#1a1a1a" stroke="white" stroke-width="3"/>
  <polygon points="50,18 60,35 78,35 64,47 70,65 50,53 30,65 36,47 22,35 40,35" fill="white" opacity="0.15"/>
  <path d="M50,5 A45,45 0 0,1 95,50" fill="none" stroke="white" stroke-width="2" opacity="0.4"/>
</svg>
EOF
```

- [ ] **Step 4: Verify files are valid SVGs**

```bash
for f in public/images/competitions/*.svg; do
  head -1 "$f"
done
```

Every file should start with `<svg` or `<?xml`. If any starts with `<!DOCTYPE html>`, the download failed — re-download that file.

- [ ] **Step 5: Commit**

```bash
git add public/images/competitions/
git commit -m "feat: add competition logo assets"
```

---

## Task 5: Download team logos

**Files:**
- Create: `public/images/teams/placeholder.svg`
- Create: `public/images/teams/vfb.svg`
- Create: `public/images/teams/{slug}.svg` for ~25 clubs

- [ ] **Step 1: Create directory and placeholder SVG**

```bash
mkdir -p public/images/teams

cat > public/images/teams/placeholder.svg << 'EOF'
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 120">
  <path d="M50 4 L96 22 L96 60 C96 85 74 108 50 116 C26 108 4 85 4 60 L4 22 Z"
        fill="#cccccc" stroke="#999999" stroke-width="2"/>
  <text x="50" y="72" text-anchor="middle" font-family="sans-serif"
        font-size="14" font-weight="bold" fill="#666666">?</text>
</svg>
EOF
```

- [ ] **Step 2: Download Bundesliga team logos**

```bash
# VfB Stuttgart (home team)
curl -L -o public/images/teams/vfb.svg \
  "https://upload.wikimedia.org/wikipedia/commons/e/eb/VfB_Stuttgart_1893_Logo.svg"

# FC Bayern München
curl -L -o public/images/teams/fcb.svg \
  "https://upload.wikimedia.org/wikipedia/commons/1/1f/FC_Bayern_M%C3%BCnchen_logo_%282002%E2%80%932017%29.svg"

# Borussia Dortmund
curl -L -o public/images/teams/bvb.svg \
  "https://upload.wikimedia.org/wikipedia/commons/6/67/Borussia_Dortmund_logo.svg"

# Bayer 04 Leverkusen
curl -L -o public/images/teams/b04.svg \
  "https://upload.wikimedia.org/wikipedia/commons/5/58/Bayer_04_Leverkusen_logo.svg"

# RB Leipzig
curl -L -o public/images/teams/rbl.svg \
  "https://upload.wikimedia.org/wikipedia/commons/0/04/RB_Leipzig_2014_logo.svg"

# Eintracht Frankfurt
curl -L -o public/images/teams/sge.svg \
  "https://upload.wikimedia.org/wikipedia/commons/0/04/Eintracht_Frankfurt_Logo.svg"

# SC Freiburg
curl -L -o public/images/teams/scf.svg \
  "https://upload.wikimedia.org/wikipedia/commons/0/0e/SC-Freiburg_Logo-neu.svg"

# Borussia Mönchengladbach
curl -L -o public/images/teams/bmg.svg \
  "https://upload.wikimedia.org/wikipedia/commons/8/81/Borussia_M%C3%B6nchengladbach_logo.svg"

# TSG 1899 Hoffenheim
curl -L -o public/images/teams/tsg.svg \
  "https://upload.wikimedia.org/wikipedia/commons/e/e7/Logo_TSG_Hoffenheim.svg"

# 1. FC Union Berlin
curl -L -o public/images/teams/fcu.svg \
  "https://upload.wikimedia.org/wikipedia/commons/4/44/1._FC_Union_Berlin_Logo.svg"

# 1. FSV Mainz 05
curl -L -o public/images/teams/m05.svg \
  "https://upload.wikimedia.org/wikipedia/commons/9/9e/Mainz05_logo.svg"

# SV Werder Bremen
curl -L -o public/images/teams/svw.svg \
  "https://upload.wikimedia.org/wikipedia/commons/b/be/SV-Werder-Bremen-Logo.svg"

# FC Augsburg
curl -L -o public/images/teams/fca.svg \
  "https://upload.wikimedia.org/wikipedia/commons/b/b5/Logo_FC_Augsburg.svg"

# VfL Wolfsburg
curl -L -o public/images/teams/wob.svg \
  "https://upload.wikimedia.org/wikipedia/commons/f/f3/Logo_VfL_Wolfsburg.svg"

# 1. FC Heidenheim 1846
curl -L -o public/images/teams/fch.svg \
  "https://upload.wikimedia.org/wikipedia/commons/9/9d/1._FC_Heidenheim_1846.svg"

# Holstein Kiel
curl -L -o public/images/teams/ksh.svg \
  "https://upload.wikimedia.org/wikipedia/commons/8/8f/Holstein_Kiel_Logo.svg"

# FC St. Pauli
curl -L -o public/images/teams/fcsp.svg \
  "https://upload.wikimedia.org/wikipedia/commons/5/55/FC_St._Pauli_logo_%282018%29.svg"

# VfL Bochum
curl -L -o public/images/teams/vflb.svg \
  "https://upload.wikimedia.org/wikipedia/commons/7/76/VfL_Bochum_logo.svg"
```

- [ ] **Step 3: Download DFB Pokal extras**

```bash
# Hamburger SV
curl -L -o public/images/teams/hsv.svg \
  "https://upload.wikimedia.org/wikipedia/commons/f/f7/Hamburger_SV_logo.svg"

# FC Schalke 04
curl -L -o public/images/teams/s04.svg \
  "https://upload.wikimedia.org/wikipedia/commons/6/6d/FC_Schalke_04_Logo.svg"

# Hertha BSC
curl -L -o public/images/teams/bsc.svg \
  "https://upload.wikimedia.org/wikipedia/commons/8/81/Hertha_BSC_Logo_2012.svg"

# 1. FC Nürnberg
curl -L -o public/images/teams/fcn.svg \
  "https://upload.wikimedia.org/wikipedia/commons/b/b9/1_FC_N%C3%BCrnberg.svg"

# Hannover 96
curl -L -o public/images/teams/h96.svg \
  "https://upload.wikimedia.org/wikipedia/commons/6/6d/Hannover_96_Logo.svg"

# Fortuna Düsseldorf
curl -L -o public/images/teams/f95.svg \
  "https://upload.wikimedia.org/wikipedia/commons/6/62/Fortuna_D%C3%BCsseldorf_Logo.svg"

# Karlsruher SC
curl -L -o public/images/teams/ksc.svg \
  "https://upload.wikimedia.org/wikipedia/commons/d/d9/KSC-Logo_2018.svg"

# 1. FC Kaiserslautern
curl -L -o public/images/teams/fck.svg \
  "https://upload.wikimedia.org/wikipedia/commons/c/c6/1._FC_Kaiserslautern_Logo.svg"

# SpVgg Greuther Fürth
curl -L -o public/images/teams/sgf.svg \
  "https://upload.wikimedia.org/wikipedia/commons/f/f3/SpVgg_Greuther_F%C3%BCrth_Logo.svg"
```

- [ ] **Step 4: Verify no failed downloads**

```bash
for f in public/images/teams/*.svg; do
  first=$(head -1 "$f")
  if echo "$first" | grep -q "<!DOCTYPE"; then
    echo "FAILED: $f"
  fi
done
```

For any FAILED file, search Wikimedia Commons (`https://commons.wikimedia.org`) for the club name + "logo svg", get the correct file URL, and re-run the curl command with the corrected path.

- [ ] **Step 5: Commit**

```bash
git add public/images/teams/
git commit -m "feat: add team logo assets (Bundesliga + DFB Pokal)"
```

---

## Task 6: Create teams.ts and competitions.ts config

**Files:**
- Create: `src/lib/teams.ts`
- Create: `src/lib/competitions.ts`

- [ ] **Step 1: Create src/lib/teams.ts**

```typescript
export type Team = {
  name: string;
  logo: string;
};

export const TEAMS: Team[] = [
  { name: "Noch unbekannt", logo: "/images/teams/placeholder.svg" },
  // Bundesliga
  { name: "FC Bayern München", logo: "/images/teams/fcb.svg" },
  { name: "Borussia Dortmund", logo: "/images/teams/bvb.svg" },
  { name: "Bayer 04 Leverkusen", logo: "/images/teams/b04.svg" },
  { name: "RB Leipzig", logo: "/images/teams/rbl.svg" },
  { name: "Eintracht Frankfurt", logo: "/images/teams/sge.svg" },
  { name: "SC Freiburg", logo: "/images/teams/scf.svg" },
  { name: "Borussia Mönchengladbach", logo: "/images/teams/bmg.svg" },
  { name: "TSG 1899 Hoffenheim", logo: "/images/teams/tsg.svg" },
  { name: "1. FC Union Berlin", logo: "/images/teams/fcu.svg" },
  { name: "1. FSV Mainz 05", logo: "/images/teams/m05.svg" },
  { name: "SV Werder Bremen", logo: "/images/teams/svw.svg" },
  { name: "FC Augsburg", logo: "/images/teams/fca.svg" },
  { name: "VfL Wolfsburg", logo: "/images/teams/wob.svg" },
  { name: "1. FC Heidenheim 1846", logo: "/images/teams/fch.svg" },
  { name: "Holstein Kiel", logo: "/images/teams/ksh.svg" },
  { name: "FC St. Pauli", logo: "/images/teams/fcsp.svg" },
  { name: "VfL Bochum", logo: "/images/teams/vflb.svg" },
  // DFB Pokal regulars
  { name: "Hamburger SV", logo: "/images/teams/hsv.svg" },
  { name: "FC Schalke 04", logo: "/images/teams/s04.svg" },
  { name: "Hertha BSC", logo: "/images/teams/bsc.svg" },
  { name: "1. FC Nürnberg", logo: "/images/teams/fcn.svg" },
  { name: "Hannover 96", logo: "/images/teams/h96.svg" },
  { name: "Fortuna Düsseldorf", logo: "/images/teams/f95.svg" },
  { name: "Karlsruher SC", logo: "/images/teams/ksc.svg" },
  { name: "1. FC Kaiserslautern", logo: "/images/teams/fck.svg" },
  { name: "SpVgg Greuther Fürth", logo: "/images/teams/sgf.svg" },
];

export const VFB: Team = {
  name: "VfB Stuttgart",
  logo: "/images/teams/vfb.svg",
};
```

- [ ] **Step 2: Create src/lib/competitions.ts**

```typescript
export type Competition = {
  name: string;
  logo: string;
};

export const COMPETITIONS: Competition[] = [
  { name: "Bundesliga", logo: "/images/competitions/bundesliga.svg" },
  { name: "DFB-Pokal", logo: "/images/competitions/dfb-pokal.svg" },
  { name: "Champions League", logo: "/images/competitions/champions-league.svg" },
  { name: "Europa League", logo: "/images/competitions/europa-league.svg" },
  { name: "Conference League", logo: "/images/competitions/conference-league.svg" },
  { name: "Freundschaftsspiel", logo: "/images/competitions/freundschaftsspiel.svg" },
];
```

- [ ] **Step 3: Commit**

```bash
git add src/lib/teams.ts src/lib/competitions.ts
git commit -m "feat: add static teams and competitions config"
```

---

## Task 7: Schema migration — add logo columns

**Files:**
- Modify: `src/lib/schema.ts`

- [ ] **Step 1: Add three columns to the termine table**

In `src/lib/schema.ts`, update the `termine` table definition (after `beschreibung`):

```typescript
export const termine = sqliteTable("termine", {
  id: text("id").primaryKey(),
  gegner: text("gegner").notNull(),
  gegnerLogo: text("gegner_logo"),
  wettbewerb: text("wettbewerb"),
  wettbewerbLogo: text("wettbewerb_logo"),
  datum: text("datum").notNull(),
  uhrzeit: text("uhrzeit").notNull(),
  ort: text("ort").notNull().default("Das Rössle"),
  oeffnungszeit: text("oeffnungszeit"),
  beschreibung: text("beschreibung"),
  createdAt: integer("created_at", { mode: "timestamp" })
    .notNull()
    .default(sql`(unixepoch())`),
});
```

- [ ] **Step 2: Push the migration**

```bash
npx drizzle-kit push
```

Expected: `[✓] Changes applied` (adds 3 nullable columns). Existing rows will have NULL for the new columns — that is fine; the UI handles it gracefully.

- [ ] **Step 3: Commit**

```bash
git add src/lib/schema.ts
git commit -m "feat: add gegnerLogo, wettbewerb, wettbewerbLogo columns to termine"
```

---

## Task 8: Update termine server actions

**Files:**
- Modify: `src/lib/actions/termine.ts`

- [ ] **Step 1: Update createTermin to read the new fields**

Replace the body of `createTermin` with:

```typescript
export async function createTermin(formData: FormData) {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Nicht autorisiert");

  const gegner = formData.get("gegner") as string;
  const gegnerLogo = (formData.get("gegnerLogo") as string) || null;
  const wettbewerb = (formData.get("wettbewerb") as string) || null;
  const wettbewerbLogo = (formData.get("wettbewerbLogo") as string) || null;
  const datum = formData.get("datum") as string;
  const uhrzeit = formData.get("uhrzeit") as string;
  const ort = (formData.get("ort") as string) || "Das Rössle";
  const oeffnungszeit = (formData.get("oeffnungszeit") as string) || null;
  const beschreibung = (formData.get("beschreibung") as string) || null;

  await db.insert(termine).values({
    id: ulid(),
    gegner,
    gegnerLogo,
    wettbewerb,
    wettbewerbLogo,
    datum,
    uhrzeit,
    ort,
    oeffnungszeit,
    beschreibung,
  });

  revalidatePath("/termine");
  revalidatePath("/");
  redirect("/admin/termine");
}
```

- [ ] **Step 2: Update updateTermin to read the new fields**

Replace the body of `updateTermin` with:

```typescript
export async function updateTermin(id: string, formData: FormData) {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Nicht autorisiert");

  const gegner = formData.get("gegner") as string;
  const gegnerLogo = (formData.get("gegnerLogo") as string) || null;
  const wettbewerb = (formData.get("wettbewerb") as string) || null;
  const wettbewerbLogo = (formData.get("wettbewerbLogo") as string) || null;
  const datum = formData.get("datum") as string;
  const uhrzeit = formData.get("uhrzeit") as string;
  const ort = (formData.get("ort") as string) || "Das Rössle";
  const oeffnungszeit = (formData.get("oeffnungszeit") as string) || null;
  const beschreibung = (formData.get("beschreibung") as string) || null;

  await db
    .update(termine)
    .set({ gegner, gegnerLogo, wettbewerb, wettbewerbLogo, datum, uhrzeit, ort, oeffnungszeit, beschreibung })
    .where(eq(termine.id, id));

  revalidatePath("/termine");
  revalidatePath("/");
  redirect("/admin/termine");
}
```

- [ ] **Step 3: Commit**

```bash
git add src/lib/actions/termine.ts
git commit -m "feat: pass gegnerLogo and wettbewerb fields through server actions"
```

---

## Task 9: Create TerminForm client component

**Files:**
- Create: `src/components/admin/termin-form.tsx`

This client component renders the full admin form with team/competition selectors. It uses hidden inputs to pass the logo paths to the server action.

- [ ] **Step 1: Create src/components/admin/termin-form.tsx**

```tsx
"use client";

import Image from "next/image";
import { useState } from "react";
import { TEAMS, type Team } from "@/lib/teams";
import { COMPETITIONS, type Competition } from "@/lib/competitions";

type Props = {
  action: (formData: FormData) => void | Promise<void>;
  defaults?: {
    gegner?: string;
    gegnerLogo?: string | null;
    wettbewerb?: string | null;
    wettbewerbLogo?: string | null;
    datum?: string;
    uhrzeit?: string;
    ort?: string;
    oeffnungszeit?: string | null;
    beschreibung?: string | null;
  };
  submitLabel: string;
};

export function TerminForm({ action, defaults = {}, submitLabel }: Props) {
  const initialTeam =
    TEAMS.find((t) => t.name === defaults.gegner) ?? TEAMS[0];
  const initialComp =
    COMPETITIONS.find((c) => c.name === defaults.wettbewerb) ??
    COMPETITIONS[0];

  const [selectedTeam, setSelectedTeam] = useState<Team>(initialTeam);
  const [selectedComp, setSelectedComp] = useState<Competition>(initialComp);

  return (
    <form action={action} className="space-y-6">
      {/* Team selector */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Gegner *
        </label>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 relative shrink-0">
            <Image
              src={selectedTeam.logo}
              alt={selectedTeam.name}
              fill
              className="object-contain"
              onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
            />
          </div>
          <select
            className="flex-1 rounded-md border border-gray-300 px-3 py-2 focus:border-ckb-red focus:ring-ckb-red"
            value={selectedTeam.name}
            onChange={(e) => {
              const team = TEAMS.find((t) => t.name === e.target.value)!;
              setSelectedTeam(team);
            }}
          >
            {TEAMS.map((team) => (
              <option key={team.name} value={team.name}>
                {team.name}
              </option>
            ))}
          </select>
        </div>
        <input type="hidden" name="gegner" value={selectedTeam.name} />
        <input type="hidden" name="gegnerLogo" value={selectedTeam.logo} />
      </div>

      {/* Competition selector */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Wettbewerb
        </label>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 relative shrink-0">
            <Image
              src={selectedComp.logo}
              alt={selectedComp.name}
              fill
              className="object-contain"
              onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
            />
          </div>
          <select
            className="flex-1 rounded-md border border-gray-300 px-3 py-2 focus:border-ckb-red focus:ring-ckb-red"
            value={selectedComp.name}
            onChange={(e) => {
              const comp = COMPETITIONS.find((c) => c.name === e.target.value)!;
              setSelectedComp(comp);
            }}
          >
            {COMPETITIONS.map((comp) => (
              <option key={comp.name} value={comp.name}>
                {comp.name}
              </option>
            ))}
          </select>
        </div>
        <input type="hidden" name="wettbewerb" value={selectedComp.name} />
        <input type="hidden" name="wettbewerbLogo" value={selectedComp.logo} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="datum" className="block text-sm font-medium text-gray-700 mb-1">
            Datum *
          </label>
          <input
            id="datum"
            name="datum"
            type="date"
            required
            defaultValue={defaults.datum ?? ""}
            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-ckb-red focus:ring-ckb-red"
          />
        </div>
        <div>
          <label htmlFor="uhrzeit" className="block text-sm font-medium text-gray-700 mb-1">
            Anstoß *
          </label>
          <input
            id="uhrzeit"
            name="uhrzeit"
            type="time"
            required
            defaultValue={defaults.uhrzeit ?? ""}
            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-ckb-red focus:ring-ckb-red"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="ort" className="block text-sm font-medium text-gray-700 mb-1">
            Ort
          </label>
          <input
            id="ort"
            name="ort"
            type="text"
            defaultValue={defaults.ort ?? "Das Rössle"}
            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-ckb-red focus:ring-ckb-red"
          />
        </div>
        <div>
          <label htmlFor="oeffnungszeit" className="block text-sm font-medium text-gray-700 mb-1">
            Rössle öffnet
          </label>
          <input
            id="oeffnungszeit"
            name="oeffnungszeit"
            type="time"
            defaultValue={defaults.oeffnungszeit ?? ""}
            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-ckb-red focus:ring-ckb-red"
          />
        </div>
      </div>

      <div>
        <label htmlFor="beschreibung" className="block text-sm font-medium text-gray-700 mb-1">
          Beschreibung
        </label>
        <textarea
          id="beschreibung"
          name="beschreibung"
          rows={3}
          defaultValue={defaults.beschreibung ?? ""}
          className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-ckb-red focus:ring-ckb-red"
        />
      </div>

      <div className="flex gap-4">
        <button
          type="submit"
          className="bg-ckb-red text-white px-6 py-2 rounded-md hover:bg-ckb-red-dark transition-colors font-medium"
        >
          {submitLabel}
        </button>
        <a
          href="/admin/termine"
          className="px-6 py-2 rounded-md border border-gray-300 hover:bg-gray-50 transition-colors text-gray-700"
        >
          Abbrechen
        </a>
      </div>
    </form>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/admin/termin-form.tsx
git commit -m "feat: add TerminForm client component with team/competition selectors"
```

---

## Task 10: Update admin new/edit termine pages

**Files:**
- Modify: `src/app/admin/(dashboard)/termine/new/page.tsx`
- Modify: `src/app/admin/(dashboard)/termine/[id]/edit/page.tsx`

- [ ] **Step 1: Replace new/page.tsx**

```tsx
import { createTermin } from "@/lib/actions/termine";
import { TerminForm } from "@/components/admin/termin-form";

export default function NewTerminPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-ckb-dark mb-8">Neuer Termin</h1>
      <div className="bg-white rounded-lg shadow p-6">
        <TerminForm action={createTermin} submitLabel="Erstellen" />
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Replace edit/page.tsx**

```tsx
import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { termine } from "@/lib/schema";
import { eq } from "drizzle-orm";
import { updateTermin } from "@/lib/actions/termine";
import { TerminForm } from "@/components/admin/termin-form";

export default async function EditTerminPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const [termin] = await db
    .select()
    .from(termine)
    .where(eq(termine.id, id))
    .limit(1);

  if (!termin) notFound();

  const updateAction = updateTermin.bind(null, id);

  return (
    <div>
      <h1 className="text-3xl font-bold text-ckb-dark mb-8">
        Termin bearbeiten
      </h1>
      <div className="bg-white rounded-lg shadow p-6">
        <TerminForm
          action={updateAction}
          defaults={{
            gegner: termin.gegner,
            gegnerLogo: termin.gegnerLogo,
            wettbewerb: termin.wettbewerb,
            wettbewerbLogo: termin.wettbewerbLogo,
            datum: termin.datum,
            uhrzeit: termin.uhrzeit,
            ort: termin.ort,
            oeffnungszeit: termin.oeffnungszeit,
            beschreibung: termin.beschreibung,
          }}
          submitLabel="Speichern"
        />
      </div>
    </div>
  );
}
```

- [ ] **Step 3: Verify in browser**

Open `http://localhost:3000/admin/termine/new` (log in first). Confirm:
- Team dropdown shows all clubs, logo preview updates on change
- Competition dropdown shows all competitions, logo preview updates on change
- Date/time/ort fields are present
- Submitting creates a termin and redirects to `/admin/termine`

Open an existing termin's edit page. Confirm selected team and competition pre-populate to the saved values.

- [ ] **Step 4: Commit**

```bash
git add src/app/admin/(dashboard)/termine/new/page.tsx \
        src/app/admin/(dashboard)/termine/[id]/edit/page.tsx
git commit -m "feat: use TerminForm in admin new/edit termine pages"
```

---

## Task 11: Create NewsTicker + GameBar components

**Files:**
- Create: `src/components/news-ticker.tsx`
- Create: `src/components/game-bar.tsx`

The design (confirmed by stakeholder images) shows two new homepage elements:
1. **NewsTicker** — thin dark-red strip just below the navbar: "AKTUELLES: {latest post title}"
2. **GameBar** — two-column bottom bar:
   - Left column (~38% width, `bg-ckb-red`): label + [VfB logo 52px] [date block] [competition badge 24px] [opponent logo 52px]
   - Right column (white): blog post title + excerpt + "Mehr lesen" + date
   - Below both: darker mini-games strip with scrollable upcoming games
   - On mobile: sticky top-0, right column hidden, game fills full width

- [ ] **Step 1: Create src/components/news-ticker.tsx**

```tsx
import Link from "next/link";

export function NewsTicker({ title, href }: { title: string; href: string }) {
  return (
    <div className="bg-ckb-red px-4 sm:px-6 lg:px-8 py-2 border-b border-white/10">
      <p className="text-white text-[11px] font-bold uppercase tracking-widest truncate">
        <span className="opacity-60 mr-2">Aktuelles:</span>
        <Link href={href} className="hover:underline">
          {title}
        </Link>
      </p>
    </div>
  );
}
```

- [ ] **Step 2: Create src/components/game-bar.tsx**

```tsx
import Image from "next/image";
import Link from "next/link";
import { VFB } from "@/lib/teams";
import type { Termin, BlogPost } from "@/lib/schema";

function formatShortDate(datum: string) {
  // Append noon to avoid UTC-midnight parsing shifting the date in German timezone
  const d = new Date(datum + "T12:00:00");
  const weekday = d.toLocaleDateString("de-DE", { weekday: "short" });
  const dayMonth = d.toLocaleDateString("de-DE", { day: "2-digit", month: "2-digit" });
  return { weekday, dayMonth };
}

function TeamLogo({
  src,
  alt,
  size,
}: {
  src: string | null | undefined;
  alt: string;
  size: number;
}) {
  if (!src) return null;
  return (
    <div style={{ width: size, height: size }} className="relative shrink-0">
      <Image src={src} alt={alt} fill className="object-contain drop-shadow-sm" />
    </div>
  );
}

function MiniGame({ termin }: { termin: Termin }) {
  const { weekday, dayMonth } = formatShortDate(termin.datum);
  return (
    <Link
      href="/termine"
      className="flex items-center gap-1.5 shrink-0 hover:opacity-80 transition-opacity"
    >
      <TeamLogo src={VFB.logo} alt="VfB" size={20} />
      <div className="text-center leading-none">
        <p className="text-[8px] font-bold text-white/90">
          {weekday} {dayMonth}
        </p>
        <p className="text-[8px] text-white/70">{termin.uhrzeit}</p>
      </div>
      {termin.wettbewerbLogo && (
        <TeamLogo src={termin.wettbewerbLogo} alt={termin.wettbewerb ?? ""} size={12} />
      )}
      <TeamLogo
        src={termin.gegnerLogo ?? "/images/teams/placeholder.svg"}
        alt={termin.gegner}
        size={20}
      />
    </Link>
  );
}

type Props = {
  termine: Termin[];
  latestPost?: Pick<BlogPost, "title" | "slug" | "excerpt" | "publishedAt"> | null;
};

export function GameBar({ termine, latestPost }: Props) {
  if (termine.length === 0 && !latestPost) return null;

  const [next, ...rest] = termine;

  return (
    // sticky on mobile so it pins below the navbar when user scrolls; static on md+
    <div className="sticky top-0 z-20 md:static">
      {/* Two-column main bar */}
      <div className="flex">
        {/* Left column: next game (always dark red, full width on mobile) */}
        {next && (() => {
          const { weekday, dayMonth } = formatShortDate(next.datum);
          return (
            <Link
              href="/termine"
              className="flex flex-col justify-center gap-3 bg-ckb-red px-4 sm:px-5 py-4
                         w-full md:w-[38%] lg:w-[32%] shrink-0"
            >
              <p className="text-white text-[9px] font-bold uppercase tracking-widest leading-relaxed opacity-75">
                Die nächsten Spiele<br className="hidden sm:block" /> live im Rössle
              </p>
              <div className="flex items-center gap-2 sm:gap-3">
                <TeamLogo src={VFB.logo} alt="VfB Stuttgart" size={52} />
                <div className="text-white">
                  <p className="font-extrabold text-xl leading-none">{dayMonth}</p>
                  <p className="text-xs leading-tight opacity-80 mt-0.5">
                    {weekday}: {next.uhrzeit}
                  </p>
                </div>
                {next.wettbewerbLogo && (
                  <TeamLogo
                    src={next.wettbewerbLogo}
                    alt={next.wettbewerb ?? ""}
                    size={24}
                  />
                )}
                <TeamLogo
                  src={next.gegnerLogo ?? "/images/teams/placeholder.svg"}
                  alt={next.gegner}
                  size={52}
                />
              </div>
            </Link>
          );
        })()}

        {/* Right column: latest blog post — hidden on mobile */}
        {latestPost && (
          <div className="hidden md:flex flex-col justify-center flex-1 bg-white px-5 lg:px-8 py-4 min-w-0 border-t border-gray-100">
            <Link
              href={`/aktuelles/${latestPost.slug}`}
              className="font-bold text-sm text-black hover:text-ckb-red transition-colors leading-snug line-clamp-2"
            >
              {latestPost.title}
            </Link>
            {latestPost.excerpt && (
              <p className="text-xs text-gray-600 mt-1 line-clamp-2 leading-relaxed">
                {latestPost.excerpt}
              </p>
            )}
            <div className="flex items-center gap-3 mt-2">
              <Link
                href={`/aktuelles/${latestPost.slug}`}
                className="text-xs text-ckb-red hover:underline font-medium"
              >
                Mehr lesen...
              </Link>
              {latestPost.publishedAt && (
                <span className="text-xs text-gray-400">
                  {new Date(latestPost.publishedAt).toLocaleDateString("de-DE", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </span>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Mini upcoming games strip */}
      {rest.length > 0 && (
        <div className="bg-[#6b1010] px-4 sm:px-6 py-2 border-t border-white/10">
          <div className="flex items-center gap-5 overflow-x-auto">
            {rest.slice(0, 7).map((t) => (
              <MiniGame key={t.id} termin={t} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
```

- [ ] **Step 3: Commit**

```bash
git add src/components/news-ticker.tsx src/components/game-bar.tsx
git commit -m "feat: add NewsTicker and GameBar components"
```

---

## Task 12: Update homepage with NewsTicker + GameBar

**Files:**
- Modify: `src/app/(public)/page.tsx`

- [ ] **Step 1: Replace the file**

```tsx
import { db } from "@/lib/db";
import { blogPosts, termine } from "@/lib/schema";
import { desc, eq, gte } from "drizzle-orm";
import { GameBar } from "@/components/game-bar";
import { NewsTicker } from "@/components/news-ticker";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [latestPost] = await db
    .select()
    .from(blogPosts)
    .where(eq(blogPosts.status, "published"))
    .orderBy(desc(blogPosts.publishedAt))
    .limit(1);

  const today = new Date().toISOString().split("T")[0];
  const upcomingTermine = await db
    .select()
    .from(termine)
    .where(gte(termine.datum, today))
    .orderBy(termine.datum)
    .limit(8);

  return (
    <div className="bg-white relative flex flex-col min-h-[calc(100vh-100px-81px)] md:min-h-[calc(100vh-105px-81px)]">
      {/* News ticker — only when there's a latest post */}
      {latestPost && (
        <NewsTicker
          title={latestPost.title}
          href={`/aktuelles/${latestPost.slug}`}
        />
      )}

      {/* Hero — grows to fill available space */}
      <div className="flex-1 px-6 sm:px-10 lg:px-32 pt-16 sm:pt-20 pb-8">
        <p className="font-lobster text-lg sm:text-2xl text-ckb-red mb-1">
          Fern der Heimat, nah im Herzen
        </p>

        <h1 className="text-[34px] sm:text-5xl font-extrabold uppercase leading-[1.05] tracking-tight text-black max-w-[90%] lg:max-w-lg">
          Cannstatter Kurve Berlin
        </h1>

        <p className="text-xs text-black mt-6 max-w-md leading-relaxed">
          Dein Treffpunkt für Alles rund um den VfB in der Hauptstadt.
          <br />
          Wir freuen uns auf deinen Besuch!
        </p>
      </div>

      {/* Game bar — sticks to top on mobile when scrolled */}
      <GameBar termine={upcomingTermine} latestPost={latestPost} />
    </div>
  );
}
```

- [ ] **Step 2: Verify in browser**

Open `http://localhost:3000`. Confirm all of:
- News ticker bar is visible just below the navbar, showing latest blog post title; clicking links to that post
- Hero text (tagline, h1, subtitle) unchanged
- GameBar at bottom: left dark-red column shows VfB logo + date + competition badge + opponent logo; right white column shows blog post excerpt + "Mehr lesen"
- Mini games strip shows remaining upcoming games in a horizontal row
- No termine → GameBar renders nothing (no empty red bar)
- On mobile (≤768px): right blog column is hidden; game display fills full width; scrolling makes the GameBar stick below the navbar

- [ ] **Step 3: Commit**

```bash
git add src/app/(public)/page.tsx
git commit -m "feat: add NewsTicker and GameBar to homepage"
```

---

## Task 13: Update public termine page with logos

**Files:**
- Modify: `src/app/(public)/termine/page.tsx`

- [ ] **Step 1: Replace the file**

```tsx
import type { Metadata } from "next";
import Image from "next/image";
import { db } from "@/lib/db";
import { termine } from "@/lib/schema";
import { asc } from "drizzle-orm";
import { VFB } from "@/lib/teams";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Termine",
};

function TeamBadge({
  src,
  alt,
}: {
  src: string | null | undefined;
  alt: string;
}) {
  if (!src) return null;
  return (
    <div className="relative w-10 h-10 shrink-0">
      <Image src={src} alt={alt} fill className="object-contain" />
    </div>
  );
}

export default async function TerminePage() {
  const allTermine = await db
    .select()
    .from(termine)
    .orderBy(asc(termine.datum));

  const today = new Date().toISOString().split("T")[0];
  const upcoming = allTermine.filter((t) => t.datum >= today);
  const past = allTermine.filter((t) => t.datum < today).reverse();

  function formatDate(datum: string) {
    return new Date(datum).toLocaleDateString("de-DE", {
      weekday: "long",
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="font-lobster text-4xl text-ckb-red mb-8">Termine</h1>

      <p className="text-lg text-ckb-dark mb-8">
        Komm vorbei und lass uns die Spiele des VfB gemeinsam erleben. Die
        nächsten Gelegenheiten dafür:
      </p>

      {upcoming.length > 0 && (
        <section className="mb-12">
          <h2 className="text-xl font-semibold mb-4">Kommende Termine</h2>
          <div className="space-y-3">
            {upcoming.map((t, index) => (
              <div
                key={t.id}
                className={`rounded-lg p-4 ${
                  index === 0
                    ? "bg-ckb-red text-white"
                    : "bg-ckb-gray text-ckb-dark"
                }`}
              >
                <div className="flex items-center gap-3">
                  <TeamBadge src={VFB.logo} alt="VfB Stuttgart" />
                  {t.wettbewerbLogo && (
                    <TeamBadge src={t.wettbewerbLogo} alt={t.wettbewerb ?? ""} />
                  )}
                  <TeamBadge
                    src={t.gegnerLogo ?? "/images/teams/placeholder.svg"}
                    alt={t.gegner}
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-base leading-tight truncate">
                      VfB Stuttgart vs. {t.gegner}
                    </p>
                    <p
                      className={`text-sm ${
                        index === 0 ? "text-white/80" : "text-gray-500"
                      }`}
                    >
                      {formatDate(t.datum)}
                    </p>
                  </div>
                  <div className="text-sm text-right shrink-0">
                    <p>
                      <strong>Anstoß:</strong> {t.uhrzeit} Uhr
                    </p>
                    {t.oeffnungszeit && (
                      <p
                        className={
                          index === 0 ? "text-white/80" : "text-gray-500"
                        }
                      >
                        Öffnung: {t.oeffnungszeit} Uhr
                      </p>
                    )}
                  </div>
                </div>
                {t.beschreibung && (
                  <p
                    className={`text-xs mt-2 ${
                      index === 0 ? "text-white/70" : "text-gray-500"
                    }`}
                  >
                    {t.beschreibung}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {upcoming.length === 0 && (
        <p className="text-gray-500 mb-12">
          Aktuell sind keine kommenden Termine eingetragen.
        </p>
      )}

      {past.length > 0 && (
        <section>
          <h2 className="text-xl font-semibold mb-4 text-gray-400">
            Vergangene Termine
          </h2>
          <div className="space-y-3 opacity-50">
            {past.map((t) => (
              <div key={t.id} className="rounded-lg p-4 bg-ckb-gray">
                <div className="flex items-center gap-3">
                  <TeamBadge src={VFB.logo} alt="VfB Stuttgart" />
                  <TeamBadge
                    src={t.gegnerLogo ?? "/images/teams/placeholder.svg"}
                    alt={t.gegner}
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold truncate">
                      VfB Stuttgart vs. {t.gegner}
                    </p>
                    <p className="text-sm text-gray-500">{formatDate(t.datum)}</p>
                  </div>
                  <p className="text-sm text-gray-500 shrink-0">{t.uhrzeit} Uhr</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
```

- [ ] **Step 2: Verify in browser**

Open `http://localhost:3000/termine`. Confirm:
- Each upcoming game shows VfB crest + competition badge + opponent crest
- The first upcoming game is highlighted in red
- Past games are shown below with reduced opacity
- Graceful if `gegnerLogo` is null (placeholder shown instead)

- [ ] **Step 3: Commit**

```bash
git add src/app/(public)/termine/page.tsx
git commit -m "feat: show team and competition logos on termine page"
```

---

## Task 14: Final verification and cleanup

- [ ] **Step 1: Full browser walkthrough**

With `npm run dev` running:

1. `/` — hero visible, GameBar at bottom with correct logos, sticky on mobile scroll
2. `/termine` — logos render, no broken images
3. `/kontakt` — no form, mailto button works
4. `/admin/termine/new` — team + competition selectors with previews, form submits
5. `/admin/termine/[id]/edit` — selectors pre-populate from saved values
6. Navbar shows "CKB'08 e.V." at all breakpoints

- [ ] **Step 2: Check for broken images**

Open the browser DevTools console on `/` and `/termine`. Confirm no `404` errors for logo paths. If any logos failed to download in Task 5, replace them now by searching Wikimedia Commons for the correct file URL and re-running the appropriate `curl` command.

- [ ] **Step 3: Confirm GitHub issue is closed**

```bash
gh issue view 9
```

Expected: `State: closed`

- [ ] **Step 4: Final commit if anything was patched**

```bash
git add -p
git commit -m "fix: patch any broken logo paths after final verification"
```
