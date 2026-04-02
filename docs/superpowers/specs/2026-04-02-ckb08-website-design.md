# CKB08 Website — Design Spec

**Projekt:** Neue Website für Cannstatter Kurve Berlin e.V. (CKB'08)
**Datum:** 2026-04-02
**Status:** Draft

---

## Überblick

Website für den ersten offiziellen VfB Stuttgart Fanclub in Berlin. Ersetzt die bestehende WordPress-Seite unter ckb08.de. Schlicht, stilvoll, CKB-Rot + Weiß. Deutsch, mit schwäbischem Einschlag wo passend.

**Motto:** "Fern der Heimat, nah im Herzen"

---

## Tech Stack

| Komponente | Technologie | Kosten |
|-----------|-------------|--------|
| Framework | Next.js 15 (App Router) | Gratis |
| Hosting | Vercel Free Tier | Gratis |
| Datenbank | Turso (SQLite) + Drizzle ORM | Gratis |
| Auth | NextAuth.js (Credentials: Email + Passwort) | Gratis |
| Styling | Tailwind CSS | Gratis |
| Blog-Editor | Tiptap WYSIWYG | Gratis |
| Bild-Upload | Vercel Blob (256MB Free) | Gratis |

**Gesamtkosten: 0€** (Domain besteht bereits: ckb08.de)

---

## Farbschema & Design

- **Hintergrund:** Weiß (`#FFFFFF`)
- **Text:** Dunkelgrau/Schwarz (`#1a1a1a`)
- **Akzentfarbe:** CKB-Rot (`#96191d`, RGB: 150/25/29)
- **Navigation:** CKB-Rot Hintergrund, weißer Text
- **Footer:** Dunkel (`#1a1a1a`), heller Text
- **Cards/Hover:** Leichtes Grau (`#f5f5f5`)

**Fonts:**
- Überschriften/Logo: Lobster (aus vorhandenen Assets)
- Body-Text: Inter (Google Fonts) oder System-Font-Stack
- PoplarStd als Reserve

**Design-Prinzipien:**
- Schlicht, stilvoll, nicht überladen
- CKB-Wappen verwenden, kein VfB-Wappen
- Mobile-first, responsive (Smartphone + Tablet)

---

## Seitenstruktur

### Navigation (alle Seiten)
- **Links:** CKB-Wappen + "Cannstatter Kurve Berlin"
- **Rechts:** Über uns | Das Rössle | Aktuelles | Termine | Mitgliedschaft | Kontakt
- **Mobil:** Hamburger-Menü

### 1. Startseite (`/`)

**Layout: Overlay Cards** — Hero-Bild als Vollbild-Hintergrund (weißer Gesamthintergrund, Hero-Bereich mit Stadion-Foto), News + Termin als halbtransparente Cards darüber.

Inhalte:
- Hero-Bereich mit aussagekräftigem Foto + "Cannstatter Kurve Berlin"
- Overlay Card: Neuester Blog-Post (Titel, Datum, Link)
- Overlay Card: Nächster Spieltermin (Gegner, Datum, Uhrzeit)

**Offene Frage für Jenny:** "Kein Scrollen" — strikt oder "kurz und knackig" gemeint? Design ist flexibel, funktioniert beides. Wir bauen Desktop ohne Scroll, Mobil mit leichtem Scroll falls nötig.

### 2. Über uns (`/ueber-uns`)

Geschichte des Fanclubs. Statischer Content.

Bestehender Text (wird von Jenny überarbeitet):
> "Die Cannstatter Kurve Berlin e.V. ist der erste offizielle VfB Stuttgart Fanclub in Berlin. Bei uns treffen sich Menschen aller Altersgruppen, Berufe und Herkünfte — vereint durch die Leidenschaft für den VfB Stuttgart."

Inhalte:
- Gründungsgeschichte
- Was der Verein macht (Spielübertragungen, Auswärtsfahrten, Kicken)
- Fotos (kommen von Jörg)

### 3. Das Rössle (`/das-roessle`)

Vorstellung des Vereinsheims. Statischer Content + Google Maps Embed.

Bestehender Text (wird überarbeitet):
> "Mitten in Berlin-Neukölln befindet sich seit Anfang 2010 eine schwäbische Enklave: Unser Vereinsheim Rössle."

Inhalte:
- Beschreibung der Räumlichkeiten
- Was es gibt: VfB-Spiele live, Getränke, Kicker, gemütliche Sofas
- Hinweis: "Wir arbeiten nicht kommerziell und rein ehrenamtlich."
- Tagesmitgliedschaft: 5€ für Nicht-Mitglieder
- **Google Maps Embed:** Braunschweiger Straße 51, Berlin-Neukölln
- Hinweis: Öffentliche Verkehrsmittel empfohlen (S+U Neukölln)
- Fotos vom Rössle (kommen von Jörg: Wappenwand, Stadionsitze, Kickerraum, Lounge, Bar & Gläser)

### 4. Aktuelles / Blog (`/aktuelles`)

Blog-Liste, neuester Post oben. Kein Kommentar.

- Liste aller veröffentlichten Posts (Titel, Datum, Excerpt, Bild)
- Klick führt zur Einzelansicht (`/aktuelles/[slug]`)
- Neuester Post erscheint auch auf der Startseite
- Kein Kommentar-System
- Pagination wenn > 10 Posts

Bestehende News (zu migrieren als initiale Blog-Posts):
- "Union Wochenende im Rössle" (Saisonstart 2025/2026)
- "Das Rössle bleibt" (Vertrag bis Herbst 2029 gesichert)
- "DFB-Pokalfinale im Rössle"

### 5. Termine (`/termine`)

Alle Spieltermine + Öffnungszeiten. Verwaltet über Admin-Panel.

- Liste/Tabelle: Datum, Uhrzeit, Gegner, Ort, Öffnungszeit
- Vergangene Termine ausgegraut, nach unten sortiert
- Nächster Termin hervorgehoben
- Hinweis: "Wir öffnen immer erst 30 Minuten vor Spielbeginn!" (60 Min. bei CL-Spielen um 21 Uhr)
- Hinweis: Reservierungen nicht möglich

### 6. Mitgliedschaft (`/mitgliedschaft`)

Infos zum Vereinsbeitritt. Statischer Content.

Inhalte:
- Wie man Mitglied wird
- Vorteile der Mitgliedschaft
- Kontaktmöglichkeiten
- Bestehender Aufruf: "Du bist neu in Berlin? Du bist VfB-Fan? Du suchst Gleichgesinnte? Dann bist Du bei uns richtig!"

### 7. Kontakt (`/kontakt`)

Kontaktformular + Hinweise.

- Formular: Name*, Email*, Nachricht* (alle Pflichtfelder)
- **Hinweis (prominent):** "Platzreservierungen zu den Spielübertragungen im Rössle sind nicht möglich!"
- **Hinweis:** Keine Karten für Externe über uns
- Adresse: Braunschweiger Straße 51, Neukölln
- Email: kontakt@ckb08.de
- Nachrichten landen in der Datenbank, einsehbar im Admin-Panel
- Erfolgsmeldung: "Deine Nachricht wurde gesendet. Vielen Dank!"

### 8. Impressum (`/impressum`)

Statische Seite. Übernommen von bestehender Seite.

- Cannstatter Kurve Berlin e.V.
- VR 28286 B, Amtsgericht Charlottenburg
- kontakt@ckb08.de / webmaster@ckb08.de
- Haftungsausschluss, Urheberrecht, Bildrechte

### 9. Datenschutzerklärung (`/datenschutz`)

Statische Seite. Muss für die neue Seite neu erstellt/angepasst werden (kein Facebook-Plugin mehr etc.).

### Footer (alle Seiten)
- Dunkel (`#1a1a1a`)
- Links: Impressum | Datenschutzerklärung
- Ggf. Email: kontakt@ckb08.de

---

## Admin-Panel (`/admin`)

### Zugang
- Geschützt via NextAuth.js (Credentials Provider)
- Email + Passwort Login
- Berechtigte User: olaf@ckb08.de, fritzschoff@icloud.com (initial)
- Weitere User können im Admin hinzugefügt werden

### Bereiche

#### Dashboard (`/admin`)
- Übersicht: Letzte Blog-Posts, nächster Termin
- Ungelesene Kontaktanfragen (Badge/Counter)

#### Blog-Verwaltung (`/admin/blog`)
- Liste aller Posts (Entwurf + Veröffentlicht)
- Neuen Post erstellen / bestehenden bearbeiten / löschen
- Tiptap WYSIWYG-Editor: Überschriften, Fett/Kursiv, Links, Bilder, Listen
- Bild-Upload direkt im Editor (Vercel Blob)
- Status: Entwurf / Veröffentlicht
- Vorschau-Funktion
- Slug wird automatisch aus Titel generiert

#### Termine-Verwaltung (`/admin/termine`)
- Spieltermine anlegen / bearbeiten / löschen
- Felder: Datum, Uhrzeit, Gegner, Ort, Öffnungszeit, Beschreibung (optional)
- Vergangene Termine automatisch nach unten sortiert

#### Kontaktanfragen (`/admin/kontakt`)
- Liste aller eingegangenen Nachrichten
- Gelesen/Ungelesen markieren
- Löschen
- Anzeige: Name, Email, Nachricht, Datum

#### User-Verwaltung (`/admin/users`)
- Neue berechtigte User hinzufügen (Email + Passwort)
- Bestehende User entfernen
- Passwort zurücksetzen

---

## Datenmodell (Turso/SQLite + Drizzle)

### users
| Feld | Typ | Beschreibung |
|------|-----|-------------|
| id | TEXT (ULID) | Primary Key |
| email | TEXT | Unique, Login |
| name | TEXT | Anzeigename |
| password_hash | TEXT | bcrypt Hash |
| created_at | INTEGER | Timestamp |

### blog_posts
| Feld | Typ | Beschreibung |
|------|-----|-------------|
| id | TEXT (ULID) | Primary Key |
| author_id | TEXT | FK → users.id |
| title | TEXT | Titel |
| slug | TEXT | Unique, URL-Pfad |
| content | TEXT | HTML (Tiptap Output) |
| excerpt | TEXT | Kurztext für Übersicht |
| image_url | TEXT | Titelbild (Vercel Blob URL) |
| status | TEXT | 'draft' oder 'published' |
| published_at | INTEGER | Veröffentlichungszeitpunkt |
| created_at | INTEGER | Erstellungszeitpunkt |
| updated_at | INTEGER | Letzte Änderung |

### termine
| Feld | Typ | Beschreibung |
|------|-----|-------------|
| id | TEXT (ULID) | Primary Key |
| gegner | TEXT | Gegnerischer Verein |
| datum | TEXT | Spieltag (ISO date) |
| uhrzeit | TEXT | Anstoßzeit |
| ort | TEXT | Spielort |
| oeffnungszeit | TEXT | Wann Rössle öffnet |
| beschreibung | TEXT | Optionale Zusatzinfo |
| created_at | INTEGER | Timestamp |

### sessions
| Feld | Typ | Beschreibung |
|------|-----|-------------|
| id | TEXT | Primary Key |
| session_token | TEXT | Unique Token |
| user_id | TEXT | FK → users.id |
| expires | INTEGER | Ablaufzeitpunkt |

### contact_messages
| Feld | Typ | Beschreibung |
|------|-----|-------------|
| id | TEXT (ULID) | Primary Key |
| name | TEXT | Absender-Name |
| email | TEXT | Absender-Email |
| nachricht | TEXT | Nachrichtentext |
| is_read | INTEGER | 0/1 Boolean |
| created_at | INTEGER | Timestamp |

---

## Assets (vorhanden)

| Asset | Datei | Verwendung |
|-------|-------|-----------|
| CKB Wappen | `ckb_wappen.svg`, `LogoCKB.png/svg` | Navigation, Favicon |
| Graffiti-Logo | `ckb_graffiti_schriftzug.svg` | Evtl. Hero/About |
| Stuttgarter Pferd | `ckb_ross.jpg` | Dekorativ |
| Shirt-Design | `CKB08_SchwarzesShirt_Front.jpg` | Referenz |
| Font: Lobster | `Lobster 1.4.otf` | Überschriften |
| Font: PoplarStd | `PoplarStd.otf` | Reserve |
| Farbcode | `Farbcode_CKB_Rot.txt` | #96191d |

**Fehlende Assets (kommen noch):**
- Fotos vom Rössle (Jörg macht sie)
- Überarbeitete Texte (Jenny schreibt über Ostern)
- Hero-Foto für Startseite

---

## Offene Punkte

1. **"Kein Scrollen" Startseite** — Bei Jenny nachfragen: strikt oder "kurz und knackig"? Design ist flexibel.
2. **Fotos** — Jörg macht Fotos (Wappenwand, Stadionsitze, Kickerraum, Lounge, Bar). Termin offen.
3. **Texte** — Jenny überarbeitet über Ostern. Platzhalter mit bestehendem Content.
4. **Design von Jörg** — Jörg arbeitet parallel am grafischen Design. Ergebnisse abwarten und ggf. einarbeiten.
5. **Datenschutzerklärung** — Muss für neue Seite neu erstellt werden (kein WordPress/Facebook mehr).
6. **Domain-Umstellung** — ckb08.de muss auf Vercel zeigen (DNS-Einstellungen).
