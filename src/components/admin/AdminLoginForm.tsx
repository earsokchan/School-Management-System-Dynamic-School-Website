"use client";

import { useState } from "react";
import Image from "next/image";
import { Eye, EyeOff, LogIn, ShieldCheck } from "lucide-react";

export function AdminLoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
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
    <div className="admin-login-root">
      {/* ── LEFT PANEL ── */}
      <div className="admin-login-left">
        <div className="admin-login-left-inner">
          {/* Logo */}
          <div className="admin-login-logo-wrap">
            <Image
              src="/images/school/logo.png"
              alt="Hun Sen Kampong Tralach High School logo"
              width={110}
              height={110}
              className="admin-login-logo-img"
              priority
            />
          </div>

          {/* School name */}
          <h1 className="admin-login-school-name-km">វិទ្យាល័យ ហ៊ុន សែន កំពង់ត្រឡាច</h1>
          <p className="admin-login-school-name-en">Hun Sen Kampong Tralach High School</p>

          {/* Divider */}
          <div className="admin-login-divider" />

          {/* Tagline */}
          <p className="admin-login-tagline">
            Admin&nbsp;Portal &mdash; Secure Access
          </p>

          {/* Badge */}
          <div className="admin-login-badge">
            <ShieldCheck className="admin-login-badge-icon" aria-hidden="true" />
            <span>Official Staff Only</span>
          </div>
        </div>

        {/* Decorative circles */}
        <div className="admin-login-deco-1" aria-hidden="true" />
        <div className="admin-login-deco-2" aria-hidden="true" />
      </div>

      {/* ── RIGHT PANEL ── */}
      <div className="admin-login-right">
        <div className="admin-login-form-wrap">
          <div className="admin-login-form-header">
            <h2 className="admin-login-form-title">Sign in</h2>
            <p className="admin-login-form-subtitle">Enter your credentials to access the admin panel.</p>
          </div>

          <form onSubmit={handleSubmit} className="admin-login-form" noValidate>
            {/* Username */}
            <div className="admin-login-field">
              <label htmlFor="admin-username" className="admin-login-label">
                Username
              </label>
              <input
                id="admin-username"
                type="text"
                autoComplete="username"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="admin-login-input"
                placeholder="Enter your username"
              />
            </div>

            {/* Password */}
            <div className="admin-login-field">
              <label htmlFor="admin-password" className="admin-login-label">
                Password
              </label>
              <div className="admin-login-password-wrap">
                <input
                  id="admin-password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="admin-login-input admin-login-input-password"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="admin-login-eye-btn"
                >
                  {showPassword
                    ? <EyeOff className="admin-login-eye-icon" aria-hidden="true" />
                    : <Eye className="admin-login-eye-icon" aria-hidden="true" />}
                </button>
              </div>
            </div>

            {/* Error */}
            {error ? (
              <div className="admin-login-error" role="alert">
                {error}
              </div>
            ) : null}

            {/* Submit */}
            <button
              type="submit"
              id="admin-login-submit"
              disabled={loading}
              className="admin-login-submit"
            >
              <LogIn className="admin-login-submit-icon" aria-hidden="true" />
              {loading ? "Signing in…" : "Sign in"}
            </button>
          </form>
        </div>
      </div>

      {/* ── Inline Styles ── */}
      <style>{`
        /* ── Root ── */
        .admin-login-root {
          display: flex;
          min-height: 100vh;
          width: 100%;
          font-family: var(--font-sans, system-ui, sans-serif);
        }

        /* ── LEFT PANEL ── */
        .admin-login-left {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 50%;
          overflow: hidden;
          background: linear-gradient(145deg, #0f172a 0%, #1e3a5f 45%, #0d2b4b 100%);
        }

        @media (max-width: 768px) {
          .admin-login-left { display: none; }
          .admin-login-right { width: 100%; }
        }

        .admin-login-left-inner {
          position: relative;
          z-index: 10;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          padding: 3rem 2.5rem;
          max-width: 420px;
        }

        /* Logo */
        .admin-login-logo-wrap {
          width: 110px;
          height: 110px;
          border-radius: 50%;
          background: white;
          padding: 4px;
          box-shadow: 0 0 0 4px rgba(255,255,255,0.15), 0 20px 60px rgba(0,0,0,0.4);
          margin-bottom: 1.75rem;
          flex-shrink: 0;
        }

        .admin-login-logo-img {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          object-fit: contain;
        }

        /* School Name */
        .admin-login-school-name-km {
          font-size: 1.3rem;
          font-weight: 800;
          color: #ffffff;
          line-height: 1.5;
          margin: 0 0 0.4rem;
          letter-spacing: 0.01em;
          text-shadow: 0 2px 12px rgba(0,0,0,0.3);
        }

        .admin-login-school-name-en {
          font-size: 0.8rem;
          font-weight: 500;
          color: rgba(255,255,255,0.6);
          text-transform: uppercase;
          letter-spacing: 0.1em;
          margin: 0;
        }

        /* Divider */
        .admin-login-divider {
          width: 48px;
          height: 3px;
          border-radius: 99px;
          background: linear-gradient(90deg, #f59e0b, #fbbf24);
          margin: 1.5rem auto;
        }

        /* Tagline */
        .admin-login-tagline {
          font-size: 0.85rem;
          font-weight: 600;
          color: rgba(255,255,255,0.75);
          letter-spacing: 0.04em;
          margin: 0 0 1.25rem;
        }

        /* Badge */
        .admin-login-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          padding: 0.45rem 1rem;
          border-radius: 99px;
          background: rgba(255,255,255,0.08);
          border: 1px solid rgba(255,255,255,0.15);
          color: rgba(255,255,255,0.7);
          font-size: 0.75rem;
          font-weight: 600;
          letter-spacing: 0.06em;
          text-transform: uppercase;
        }

        .admin-login-badge-icon {
          width: 14px;
          height: 14px;
          color: #f59e0b;
        }

        /* Decorative circles */
        .admin-login-deco-1 {
          position: absolute;
          width: 420px;
          height: 420px;
          border-radius: 50%;
          border: 1px solid rgba(255,255,255,0.06);
          top: -120px;
          right: -120px;
        }

        .admin-login-deco-2 {
          position: absolute;
          width: 320px;
          height: 320px;
          border-radius: 50%;
          border: 1px solid rgba(255,255,255,0.05);
          bottom: -100px;
          left: -80px;
        }

        /* ── RIGHT PANEL ── */
        .admin-login-right {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 50%;
          background: #f8fafc;
          padding: 2rem 1.5rem;
        }

        .admin-login-form-wrap {
          width: 100%;
          max-width: 400px;
        }

        /* Form Header */
        .admin-login-form-header {
          margin-bottom: 2rem;
        }

        .admin-login-form-title {
          font-size: 1.9rem;
          font-weight: 800;
          color: #0f172a;
          margin: 0 0 0.4rem;
          letter-spacing: -0.02em;
        }

        .admin-login-form-subtitle {
          font-size: 0.875rem;
          color: #64748b;
          margin: 0;
        }

        /* Form */
        .admin-login-form {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        /* Field */
        .admin-login-field {
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
        }

        .admin-login-label {
          font-size: 0.8rem;
          font-weight: 700;
          color: #334155;
          letter-spacing: 0.04em;
          text-transform: uppercase;
        }

        .admin-login-input {
          width: 100%;
          padding: 0.8rem 1rem;
          border-radius: 10px;
          border: 1.5px solid #e2e8f0;
          background: #ffffff;
          font-size: 0.9rem;
          color: #0f172a;
          outline: none;
          transition: border-color 0.18s, box-shadow 0.18s;
          box-sizing: border-box;
        }

        .admin-login-input::placeholder { color: #94a3b8; }

        .admin-login-input:focus {
          border-color: #1e3a5f;
          box-shadow: 0 0 0 3px rgba(30,58,95,0.1);
        }

        /* Password wrapper */
        .admin-login-password-wrap {
          position: relative;
        }

        .admin-login-input-password {
          padding-right: 3rem;
        }

        .admin-login-eye-btn {
          position: absolute;
          right: 0.75rem;
          top: 50%;
          transform: translateY(-50%);
          background: none;
          border: none;
          cursor: pointer;
          padding: 0.25rem;
          color: #94a3b8;
          display: flex;
          align-items: center;
          border-radius: 6px;
          transition: color 0.15s;
        }

        .admin-login-eye-btn:hover { color: #475569; }

        .admin-login-eye-icon {
          width: 18px;
          height: 18px;
        }

        /* Error */
        .admin-login-error {
          padding: 0.7rem 1rem;
          border-radius: 10px;
          background: #fef2f2;
          border: 1.5px solid #fecaca;
          color: #dc2626;
          font-size: 0.84rem;
          font-weight: 500;
        }

        /* Submit */
        .admin-login-submit {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          width: 100%;
          padding: 0.85rem 1.25rem;
          border-radius: 10px;
          border: none;
          background: linear-gradient(135deg, #0f172a 0%, #1e3a5f 100%);
          color: #ffffff;
          font-size: 0.9rem;
          font-weight: 700;
          cursor: pointer;
          letter-spacing: 0.02em;
          transition: opacity 0.18s, transform 0.15s, box-shadow 0.18s;
          box-shadow: 0 4px 18px rgba(15,23,42,0.28);
          margin-top: 0.25rem;
        }

        .admin-login-submit:hover:not(:disabled) {
          opacity: 0.92;
          transform: translateY(-1px);
          box-shadow: 0 8px 24px rgba(15,23,42,0.34);
        }

        .admin-login-submit:active:not(:disabled) {
          transform: translateY(0);
        }

        .admin-login-submit:disabled {
          cursor: not-allowed;
          opacity: 0.6;
        }

        .admin-login-submit-icon {
          width: 17px;
          height: 17px;
        }
      `}</style>
    </div>
  );
}
