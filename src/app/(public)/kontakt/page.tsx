"use client";

import { useState } from "react";
import type { Metadata } from "next";
import { submitContact } from "@/lib/actions/contact";

export default function KontaktPage() {
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  async function handleSubmit(formData: FormData) {
    setPending(true);
    setError(null);

    const result = await submitContact(formData);

    if (result.success) {
      setSuccess(true);
    } else if (result.error) {
      setError(result.error);
    }

    setPending(false);
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="font-lobster text-4xl text-ckb-red mb-8">Kontakt</h1>

      <div className="grid md:grid-cols-2 gap-12">
        <div>
          <div className="prose prose-lg max-w-none mb-8">
            <p>
              Du hast Fragen zur Cannstatter Kurve Berlin, möchtest Mitglied
              werden oder einfach mal vorbeischauen? Schreib uns!
            </p>
          </div>

          <div className="bg-amber-50 border border-amber-300 rounded-lg p-4 mb-8">
            <p className="font-semibold text-amber-800 text-sm">
              Platzreservierungen sind nicht möglich! Keine Karten für Externe.
            </p>
            <p className="text-amber-700 text-xs mt-1">
              Das Rössle ist unser Vereinsheim — bitte keine Anfragen zu
              Tischreservierungen oder Ticketwünschen.
            </p>
          </div>

          {success ? (
            <div className="bg-green-50 border border-green-300 rounded-lg p-6">
              <p className="font-semibold text-green-800">
                Nachricht gesendet!
              </p>
              <p className="text-green-700 text-sm mt-1">
                Vielen Dank für deine Nachricht. Wir melden uns so schnell wie
                möglich bei dir.
              </p>
            </div>
          ) : (
            <form action={handleSubmit} className="space-y-4">
              {error && (
                <div className="bg-red-50 border border-red-300 rounded-lg p-3">
                  <p className="text-red-800 text-sm">{error}</p>
                </div>
              )}

              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium mb-1"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-ckb-red focus:ring-1 focus:ring-ckb-red focus:outline-none"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium mb-1"
                >
                  E-Mail
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-ckb-red focus:ring-1 focus:ring-ckb-red focus:outline-none"
                />
              </div>

              <div>
                <label
                  htmlFor="nachricht"
                  className="block text-sm font-medium mb-1"
                >
                  Nachricht
                </label>
                <textarea
                  id="nachricht"
                  name="nachricht"
                  rows={5}
                  required
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-ckb-red focus:ring-1 focus:ring-ckb-red focus:outline-none resize-vertical"
                />
              </div>

              <button
                type="submit"
                disabled={pending}
                className="bg-ckb-red text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-ckb-red-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {pending ? "Wird gesendet..." : "Nachricht senden"}
              </button>
            </form>
          )}
        </div>

        <div className="space-y-6">
          <div>
            <h2 className="font-semibold text-lg mb-2">E-Mail</h2>
            <a
              href="mailto:kontakt@ckb08.de"
              className="text-ckb-red hover:underline"
            >
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
              S-Bahn Sonnenallee (Ring)
              <br />
              Bus M41 bis Braunschweiger Straße
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
