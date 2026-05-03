"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { useAuthStore } from "@/store/auth-store";

function KiteLogoMark() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="white">
      <path d="M12 2L4 9l8 4 8-4-8-7z" opacity="0.95"/>
      <path d="M4 9l8 13 8-13-8 4-8-4z" opacity="0.75"/>
    </svg>
  );
}

export default function LoginPage() {
  const router = useRouter();
  const login = useAuthStore((s) => s.login);
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [step, setStep] = useState<"id" | "password">("id");
  const [loading, setLoading] = useState(false);

  const handleIdSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (userId.trim()) setStep("password");
  };

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    if (!password) return;
    setLoading(true);
    await new Promise((r) => setTimeout(r, 600));
    login(userId);
    router.push("/dashboard");
  };

  return (
    <div className="auth-page">
      {/* Left panel */}
      <div className="auth-left">
        <div className="auth-left-brand">
          <div className="auth-left-logo"><KiteLogoMark /></div>
          <span className="auth-brand-name">Kite</span>
        </div>

        <div className="auth-left-hero">
          <span className="auth-hero-tag">Paper Trading Terminal</span>
          <h1 className="auth-hero-title">Trade smarter,<br />learn faster.</h1>
          <p className="auth-hero-sub">
            Experience professional-grade trading tools with simulated funds.
            Practice strategies, track P&L, and build confidence — risk-free.
          </p>
          <ul className="auth-hero-points">
            <li>Real-time simulated market data</li>
            <li>Full order management (MIS, CNC, NRML)</li>
            <li>Live positions, holdings & fund tracking</li>
            <li>Risk engine with pre-trade checks</li>
          </ul>
        </div>

        <div className="auth-left-footer">
          Paper trading only · Not a registered broker · No real money involved.<br />
          Market data is simulated for educational purposes only.
        </div>
      </div>

      {/* Right panel - form */}
      <div className="auth-right">
        <div className="auth-form-wrap">
          <div className="auth-kite-logo">
            <div className="auth-kite-mark"><KiteLogoMark /></div>
            <span className="auth-kite-name">Kite</span>
            <span className="auth-kite-by">Powered by Zerodha Lite</span>
          </div>

          {step === "id" ? (
            <form onSubmit={handleIdSubmit}>
              <h2 className="auth-form-title">Sign in</h2>
              <p className="auth-form-sub">Enter your Zerodha user ID</p>

              <div className="form-group">
                <label className="form-label">User ID</label>
                <input
                  className="form-input"
                  type="text"
                  placeholder="e.g. AB1234"
                  value={userId}
                  onChange={(e) => setUserId(e.target.value)}
                  autoFocus
                  required
                />
              </div>
              <button type="submit" className="btn-submit">Continue</button>
            </form>
          ) : (
            <form onSubmit={handleLogin}>
              <h2 className="auth-form-title">Welcome back</h2>
              <p className="auth-form-sub" style={{ marginBottom: 4 }}>
                Signing in as <strong style={{ color: "var(--text)" }}>{userId}</strong>
              </p>
              <button
                type="button"
                onClick={() => setStep("id")}
                style={{ color: "var(--blue)", background: "none", border: "none", fontSize: 12, cursor: "pointer", padding: 0, marginBottom: 20 }}
              >
                ← Change user ID
              </button>

              <div className="form-group">
                <label className="form-label">
                  Password
                  <Link href="#" style={{ color: "var(--blue)", fontSize: 12, fontWeight: 500 }}>Forgot password?</Link>
                </label>
                <input
                  className="form-input"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoFocus
                  minLength={6}
                  required
                />
              </div>
              <button type="submit" className="btn-submit" disabled={loading}>
                {loading ? "Signing in…" : "Login"}
              </button>
            </form>
          )}

          <p className="auth-switch">
            Don&apos;t have an account?{" "}
            <Link href="/register">Open an account</Link>
          </p>

          <p className="auth-disclaimer">
            By logging in, you agree to the{" "}
            <Link href="#" style={{ color: "var(--blue)" }}>Terms &amp; Conditions</Link>
            {" "}and{" "}
            <Link href="#" style={{ color: "var(--blue)" }}>Privacy Policy</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
