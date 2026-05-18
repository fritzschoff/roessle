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
