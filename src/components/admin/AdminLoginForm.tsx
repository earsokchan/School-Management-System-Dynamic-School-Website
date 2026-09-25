"use client";

import { useState } from "react";
import { LockKeyhole, LogIn } from "lucide-react";

export function AdminLoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setLoading(true);
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const body: unknown = await response.json().catch(() => null);
      if (!response.ok) {
        const message =
          typeof body === "object" && body !== null && "error" in body && typeof body.error === "string"
            ? body.error
            : "Unable to sign in";
        throw new Error(message);
      }
      window.location.href = "/admin";
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : "Unable to sign in");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-secondary px-4 py-12 font-sans">
      <div className="w-full max-w-md rounded-2xl border border-border bg-white p-8 shadow-card">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-black text-white">
            <LockKeyhole className="h-6 w-6" aria-hidden="true" />
          </div>
          <h1 className="text-2xl font-bold text-foreground">Admin sign in</h1>
          <p className="mt-2 text-sm text-muted-foreground">Enter your credentials to continue.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="admin-username" className="text-sm font-semibold text-foreground">
                Username
              </label>
              <input
                id="admin-username"
                type="text"
                autoComplete="username"
                required
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                className="w-full rounded-xl border border-border px-4 py-3 text-sm outline-none transition-colors focus:border-black focus:ring-1 focus:ring-black"
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="admin-password" className="text-sm font-semibold text-foreground">
                Password
              </label>
              <input
                id="admin-password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="w-full rounded-xl border border-border px-4 py-3 text-sm outline-none transition-colors focus:border-black focus:ring-1 focus:ring-black"
              />
            </div>
          </div>

          {error ? <p className="text-sm font-medium text-red-600">{error}</p> : null}

          <button
            type="submit"
            disabled={loading}
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-black px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <LogIn className="h-4 w-4" aria-hidden="true" />
            {loading ? "Signing in…" : "Sign in"}
          </button>
        </form>
      </div>
    </div>
  );
}
