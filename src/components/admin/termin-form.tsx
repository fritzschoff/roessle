"use client";

import { useState } from "react";
import { findTeam, TEAMS } from "@/lib/teams";
import {
  COMPETITIONS,
  competitionLabel,
  NO_COMPETITION,
} from "@/lib/competitions";
import { TeamChip } from "@/components/team-chip";

type Props = {
  action: (formData: FormData) => void | Promise<void>;
  defaults?: {
    gegner?: string;
    wettbewerb?: string | null;
    datum?: string;
    uhrzeit?: string;
    ort?: string;
    oeffnungszeit?: string | null;
    beschreibung?: string | null;
  };
  submitLabel: string;
};

export function TerminForm({ action, defaults = {}, submitLabel }: Props) {
  const [gegner, setGegner] = useState(defaults.gegner ?? TEAMS[0].name);

  return (
    <form action={action} className="space-y-6">
      {/* Team selector — Vereine werden nur als Text mit Klubfarbe angezeigt */}
      <div>
        <label
          htmlFor="gegner"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Gegner *
        </label>
        <div className="flex items-center gap-3">
          <select
            id="gegner"
            name="gegner"
            className="flex-1 rounded-md border border-gray-300 px-3 py-2 focus:border-ckb-red focus:ring-ckb-red"
            value={gegner}
            onChange={(e) => setGegner(e.target.value)}
          >
            {TEAMS.map((team) => (
              <option key={team.name} value={team.name}>
                {team.name}
              </option>
            ))}
          </select>
          <TeamChip team={findTeam(gegner)} size="lg" />
        </div>
      </div>

      {/* Competition selector */}
      <div>
        <label
          htmlFor="wettbewerb"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Wettbewerb
        </label>
        <select
          id="wettbewerb"
          name="wettbewerb"
          defaultValue={competitionLabel(defaults.wettbewerb) ?? ""}
          className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-ckb-red focus:ring-ckb-red"
        >
          {COMPETITIONS.map((comp) => (
            <option key={comp} value={comp === NO_COMPETITION ? "" : comp}>
              {comp}
            </option>
          ))}
        </select>
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
