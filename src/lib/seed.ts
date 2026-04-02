import { db } from "./db";
import { users, blogPosts, termine } from "./schema";
import { hash } from "bcryptjs";
import { ulid } from "ulid";

async function seed() {
  const initialUsers = [
    { email: "olaf@ckb08.de", name: "Olaf" },
    { email: "fritzschoff@icloud.com", name: "Max" },
  ];

  let authorId = "";

  for (const u of initialUsers) {
    const existing = await db.query.users.findFirst({
      where: (users, { eq }) => eq(users.email, u.email),
    });

    if (!existing) {
      const id = ulid();
      const passwordHash = await hash("ckb08-changeme", 12);
      await db.insert(users).values({ id, email: u.email, name: u.name, passwordHash });
      console.log(`Created user: ${u.email}`);
      if (!authorId) authorId = id;
    } else {
      console.log(`User already exists: ${u.email}`);
      if (!authorId) authorId = existing.id;
    }
  }

  const existingPosts = await db.select().from(blogPosts);
  if (existingPosts.length === 0) {
    const posts = [
      {
        title: "Das Rössle bleibt!",
        slug: "das-roessle-bleibt",
        excerpt: "Vertrag bis Herbst 2029 gesichert. Das Rössle ist unser Zuhause — und das bleibt so!",
        content: "<p>Gute Nachrichten! Der Mietvertrag für unser Rössle wurde bis Herbst 2029 verlängert. Die Miete hat sich zwar verdreifacht, weshalb wir Mitgliedsbeiträge und Getränkepreise anpassen mussten. Die Tagesmitgliedschaft kostet jetzt 5 Euro.</p><p>Aber das Wichtigste: <strong>Das Rössle bleibt!</strong> Unser Vereinsheim, unser Zuhause in Berlin.</p>",
        status: "published" as const,
        publishedAt: new Date("2025-08-01"),
      },
      {
        title: "Union Wochenende im Rössle",
        slug: "union-wochenende-im-roessle",
        excerpt: "Mit dem Union-Wochenende startet eine neue Rössle-Saison 2025/2026.",
        content: "<p>Mit dem Union-Wochenende startet eine neue Rössle-Saison 2025/2026!</p><p><strong>Freitag, 22. August:</strong> Ab 20 Uhr Warmup im Rössle</p><p><strong>Samstag, 23. August:</strong></p><ul><li>10-13 Uhr Frühschoppen im Rössle</li><li>13 Uhr Aufbrechen in die Alte Försterei</li><li>15.30 Uhr Übertragung Union Berlin - VfB Stuttgart im Rössle</li><li>Ab 19 Uhr After-Game-Party im Rössle</li></ul>",
        status: "published" as const,
        publishedAt: new Date("2025-08-15"),
      },
    ];

    for (const post of posts) {
      await db.insert(blogPosts).values({
        id: ulid(),
        authorId,
        ...post,
        createdAt: post.publishedAt,
        updatedAt: post.publishedAt,
      });
    }
    console.log(`Created ${posts.length} sample blog posts.`);
  }

  const existingTermine = await db.select().from(termine);
  if (existingTermine.length === 0) {
    const sampleTermine = [
      { gegner: "VfB Stuttgart vs. Borussia Dortmund", datum: "2026-04-04", uhrzeit: "18:30", ort: "Das Rössle", oeffnungszeit: "18:00" },
      { gegner: "VfB Stuttgart vs. Hamburger SV", datum: "2026-04-12", uhrzeit: "15:30", ort: "Das Rössle", oeffnungszeit: "15:00" },
      { gegner: "FC Bayern München vs. VfB Stuttgart", datum: "2026-04-19", uhrzeit: "18:30", ort: "Das Rössle", oeffnungszeit: "18:00" },
      { gegner: "VfB Stuttgart vs. SC Freiburg", datum: "2026-04-23", uhrzeit: "20:30", ort: "Das Rössle", oeffnungszeit: "20:00" },
      { gegner: "VfB Stuttgart vs. SV Werder Bremen", datum: "2026-04-26", uhrzeit: "15:30", ort: "Das Rössle", oeffnungszeit: "15:00" },
    ];

    for (const t of sampleTermine) {
      await db.insert(termine).values({ id: ulid(), ...t });
    }
    console.log(`Created ${sampleTermine.length} sample termine.`);
  }

  console.log("Seed complete.");
}

seed().catch(console.error);
