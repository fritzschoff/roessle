/*
 * Kill-Switch, kein echter Service Worker.
 *
 * Auf localhost:3000 (und ggf. auf der Domain) hängen bei einigen Browsern noch
 * Service Worker aus früheren Projekten fest. Die liefern veraltete JS-Bundles
 * aus ihrem Cache aus — was sich als sehr verwirrende Fehler äußert, etwa
 * "Cannot read properties of undefined" in Komponenten, die es längst nicht
 * mehr gibt. Ein normales Neuladen hilft nicht, weil der Service Worker die
 * Anfragen abfängt, bevor sie den Server erreichen.
 *
 * Browser fragen registrierte Service Worker regelmäßig auf Updates ab. Diese
 * Datei wird dabei ausgeliefert, räumt alle Caches ab, meldet sich selbst ab
 * und lädt offene Tabs neu. Danach ist der Spuk vorbei.
 *
 * Wichtig: Diese Datei registriert nichts. Sie wird ausschließlich von Browsern
 * geladen, die bereits eine Registrierung haben.
 */
self.addEventListener("install", () => {
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      const keys = await caches.keys();
      await Promise.all(keys.map((key) => caches.delete(key)));

      await self.registration.unregister();

      const clients = await self.clients.matchAll({ type: "window" });
      for (const client of clients) {
        client.navigate(client.url);
      }
    })()
  );
});
