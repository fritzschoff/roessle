"use client";

import { useEffect, useState } from "react";
import { createUser, deleteUser, resetPassword } from "@/lib/actions/users";

interface UserData {
  id: string;
  email: string;
  name: string;
  createdAt: string;
}

export default function AdminUsersPage() {
  const [users, setUsers] = useState<UserData[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [resetId, setResetId] = useState<string | null>(null);

  async function fetchUsers() {
    const res = await fetch("/api/admin/users");
    const data = await res.json();
    setUsers(data);
    setLoading(false);
  }

  useEffect(() => {
    fetchUsers();
  }, []);

  async function handleCreateUser(formData: FormData) {
    setMessage("");
    setError("");
    const result = await createUser(formData);
    if (result.error) {
      setError(result.error);
    } else {
      setMessage("Benutzer erstellt.");
      await fetchUsers();
    }
  }

  async function handleDeleteUser(id: string) {
    if (!confirm("Benutzer wirklich löschen?")) return;
    setMessage("");
    setError("");
    const result = await deleteUser(id);
    if (result.error) {
      setError(result.error);
    } else {
      setMessage("Benutzer gelöscht.");
      await fetchUsers();
    }
  }

  async function handleResetPassword(id: string, formData: FormData) {
    setMessage("");
    setError("");
    const result = await resetPassword(id, formData);
    if (result.error) {
      setError(result.error);
    } else {
      setMessage("Passwort zurückgesetzt.");
      setResetId(null);
    }
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-ckb-dark mb-8">Benutzer</h1>

      {message && (
        <div className="mb-4 p-3 bg-green-100 text-green-800 rounded-md text-sm">
          {message}
        </div>
      )}
      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-800 rounded-md text-sm">
          {error}
        </div>
      )}

      <div className="bg-white rounded-lg shadow p-6 mb-8">
        <h2 className="text-lg font-semibold text-ckb-dark mb-4">
          Neuen Benutzer anlegen
        </h2>
        <form action={handleCreateUser} className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-ckb-red focus:ring-ckb-red"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-ckb-red focus:ring-ckb-red"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Passwort
            </label>
            <div className="flex gap-2">
              <input
                id="password"
                name="password"
                type="password"
                required
                minLength={8}
                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-ckb-red focus:ring-ckb-red"
              />
              <button
                type="submit"
                className="bg-ckb-red text-white px-4 py-2 rounded-md hover:bg-ckb-red-dark transition-colors font-medium whitespace-nowrap"
              >
                Anlegen
              </button>
            </div>
          </div>
        </form>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="text-left px-6 py-3 text-sm font-medium text-gray-500">
                Name
              </th>
              <th className="text-left px-6 py-3 text-sm font-medium text-gray-500">
                Email
              </th>
              <th className="text-left px-6 py-3 text-sm font-medium text-gray-500">
                Erstellt
              </th>
              <th className="text-right px-6 py-3 text-sm font-medium text-gray-500">
                Aktionen
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {loading ? (
              <tr>
                <td colSpan={4} className="px-6 py-8 text-center text-gray-500">
                  Laden...
                </td>
              </tr>
            ) : users.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-6 py-8 text-center text-gray-500">
                  Keine Benutzer vorhanden.
                </td>
              </tr>
            ) : (
              users.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium text-gray-900">
                    {user.name}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {user.email}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {new Date(user.createdAt).toLocaleDateString("de-DE")}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-3">
                      {resetId === user.id ? (
                        <form
                          action={(formData) =>
                            handleResetPassword(user.id, formData)
                          }
                          className="flex items-center gap-2"
                        >
                          <input
                            name="password"
                            type="password"
                            placeholder="Neues Passwort"
                            required
                            minLength={8}
                            className="rounded-md border border-gray-300 px-2 py-1 text-sm focus:border-ckb-red focus:ring-ckb-red"
                          />
                          <button
                            type="submit"
                            className="text-sm text-green-600 hover:text-green-800 font-medium"
                          >
                            OK
                          </button>
                          <button
                            type="button"
                            onClick={() => setResetId(null)}
                            className="text-sm text-gray-500 hover:text-gray-700 font-medium"
                          >
                            Abbrechen
                          </button>
                        </form>
                      ) : (
                        <button
                          type="button"
                          onClick={() => setResetId(user.id)}
                          className="text-sm text-ckb-red hover:text-ckb-red-dark font-medium"
                        >
                          Passwort
                        </button>
                      )}
                      <button
                        type="button"
                        onClick={() => handleDeleteUser(user.id)}
                        className="text-sm text-red-600 hover:text-red-800 font-medium"
                      >
                        Löschen
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
