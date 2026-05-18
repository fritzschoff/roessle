# Team Logos, Game Display Redesign & UX Cleanups

**Date:** 2026-05-18  
**Project:** CKB08 Website (ckb08.de)  
**Stack:** Next.js (App Router), Drizzle ORM, Turso/SQLite

---

## Scope

1. Team logos — download & store for all Bundesliga 25/26 + common DFB Pokal opponents
2. Competition logos — Bundesliga, DFB-Pokal, UCL, UEL, UECL
3. Schema — add `gegnerLogo` and `wettbewerb` columns to `termine`
4. Admin forms — replace text input with logo-aware team selector + competition selector
5. Homepage — styled game bar matching the new design (VfB logo | date | competition badge | opponent logo), sticky on mobile
6. Termine page — show team crests on all game cards
7. Navbar — add "e.V." to club name
8. Contact page — remove form, replace with mailto button; keep address/transport info
9. GitHub issue #9 — close

---

## 1. Asset Storage

### Team logos
- Path: `/public/images/teams/<slug>.svg` (or `.png` where SVG unavailable)
- Source: Wikimedia Commons (CC-licensed, standard fan-site practice)
- Naming: lowercase, hyphenated slug matching the `teams.ts` config key
- Special entry: `placeholder.svg` — a generic football shield silhouette for "Noch unbekannt / Internationaler Gegner"

### Competition logos
- Path: `/public/images/competitions/<slug>.svg`
- Entries: `bundesliga.svg`, `dfb-pokal.svg`, `champions-league.svg`, `europa-league.svg`, `conference-league.svg`, `freundschaftsspiel.svg`

---

## 2. Static Teams Config

File: `src/lib/teams.ts`

```ts
export type Team = { name: string; logo: string }
export const TEAMS: Team[] = [
  { name: "Noch unbekannt", logo: "/images/teams/placeholder.svg" },
  // Bundesliga 25/26 opponents (17 teams excl. VfB itself)
  { name: "Bayern München", logo: "/images/teams/fcb.svg" },
  // ... all Bundesliga clubs ...
  // DFB Pokal common opponents
  // ...
]
```

The VfB Stuttgart logo is always the "home" crest — stored at `/public/images/teams/vfb.svg` and referenced as a constant, not part of the TEAMS list.

### Competition config

File: `src/lib/competitions.ts`

```ts
export type Competition = { name: string; logo: string }
export const COMPETITIONS: Competition[] = [
  { name: "Bundesliga", logo: "/images/competitions/bundesliga.svg" },
  { name: "DFB-Pokal", logo: "/images/competitions/dfb-pokal.svg" },
  { name: "Champions League", logo: "/images/competitions/champions-league.svg" },
  { name: "Europa League", logo: "/images/competitions/europa-league.svg" },
  { name: "Conference League", logo: "/images/competitions/conference-league.svg" },
  { name: "Freundschaftsspiel", logo: "/images/competitions/freundschaftsspiel.svg" },
]
```

---

## 3. Schema Changes

Add two nullable text columns to `termine`:

```ts
gegnerLogo: text("gegner_logo"),          // e.g. "/images/teams/bvb.svg"
wettbewerb: text("wettbewerb"),           // e.g. "Bundesliga"
wettbewerbLogo: text("wettbewerb_logo"),  // e.g. "/images/competitions/bundesliga.svg"
```

Existing rows will have `NULL` for these — the UI falls back to text-only display when logo is absent.

Migration: `drizzle-kit push` (Turso dev DB).

---

## 4. Admin Forms

### Team selector (replaces the `gegner` text input)
- `<select>` rendered as a styled dropdown
- Each `<option>` value is JSON: `{ name, logo }` — on change, hidden inputs for `gegner` and `gegnerLogo` are populated
- Shows team crest (16×16) + team name in the option label
- Since `<option>` can't render images natively, use a custom JS-enhanced select or a simple `<select>` with crest shown separately in a preview area next to the dropdown

### Competition selector (new field)
- Same pattern: `<select>` of competitions, populates `wettbewerb` + `wettbewerbLogo` hidden inputs
- Default: "Bundesliga"

Both the `new/page.tsx` and `[id]/edit/page.tsx` admin pages need updating.

---

## 5. Homepage Game Bar

Replace the current text-only bottom section with a styled component matching the screenshot:

**Desktop/tablet layout:**
```
┌─────────────────────────────────────────────────────────────────┐
│  DIE NÄCHSTEN SPIELE          [VfB] Sa 04.04 [BL] [BVB]        │  ← dark red bg
│  LIVE IM RÖSSLE               18:30                             │
├─────────────────────────────────────────────────────────────────┤
│  [VfB][date][BL][BVB]  [VfB][date][BL][HSV]  [VfB][date]...   │  ← darker strip
└─────────────────────────────────────────────────────────────────┘
```

**Mobile layout:**
- The game bar is `position: sticky; top: 0; z-index: 20` so it sticks below the navbar when scrolling
- Stack: label text above, then the game card centered

**Component:** `src/components/game-bar.tsx` — server component, receives `termine[]` as props.

Fallback: if `gegnerLogo` is null, show opponent name as text. If `wettbewerbLogo` is null, omit the competition badge.

---

## 6. Termine Page

Each game card gets VfB crest (left) + competition badge (center) + opponent crest (right), same visual language as the game bar. Text fallback when logos absent.

---

## 7. Navbar

Change brand text from `CKB'08` to `CKB'08 e.V.` in all three breakpoints (desktop, tablet, mobile) inside `src/components/navbar.tsx`.

---

## 8. Contact Page

Remove the entire `<form>` and `submitContact` action. Replace with:

```
┌─────────────────────────────────────────────────────┐
│  Du hast Fragen? Schreib uns direkt eine E-Mail.    │
│                                                      │
│  [  kontakt@ckb08.de  →  E-Mail schreiben  ]        │
└─────────────────────────────────────────────────────┘
```

The button is `<a href="mailto:kontakt@ckb08.de">` — opens the user's mail client. Keep the address/ÖPNV info on the right column. Remove the amber "Hinweis" box since it was there to manage form expectations. The `contact.ts` action and `contactMessages` DB table can stay untouched (used by admin side).

---

## 9. GitHub Issue

Close issue #9 (add captcha) — no longer relevant since the contact form is removed.

---

## Error Handling & Fallbacks

- All logo `<Image>` elements have `alt` and an `onError` fallback to hide the image (show initials or nothing)
- Games without `gegnerLogo` render gracefully with text only
- The sticky game bar only applies on mobile (`md:static`)

---

## Out of Scope

- Liveticker feature (future)
- Middle-section content changes (discussed separately)
- Transparent background visualization for Jörg (design mockup request, not implementation)
- Managing teams/competitions via admin UI (static config is sufficient for seasonal updates)
