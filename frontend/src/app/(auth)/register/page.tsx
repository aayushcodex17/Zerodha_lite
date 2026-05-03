"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";

function KiteLogoMark() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="white">
      <path d="M12 2L4 9l8 4 8-4-8-7z" opacity="0.95"/>
      <path d="M4 9l8 13 8-13-8 4-8-4z" opacity="0.75"/>
    </svg>
  );
}

export default function RegisterPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
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
          <span className="auth-hero-tag">Open an account</span>
          <h1 className="auth-hero-title">Start your trading<br />journey today.</h1>
          <p className="auth-hero-sub">
            Create a free paper-trading account and access full brokerage-grade
            tools — watchlists, order management, portfolio analytics and more.
          </p>
          <ul className="auth-hero-points">
            <li>₹3,00,000 virtual funds on sign-up</li>
            <li>Instant account activation</li>
            <li>No real money required</li>
            <li>Practice unlimited strategies</li>
          </ul>
        </div>

        <div className="auth-left-footer">
          Educational simulation only · Prices are simulated · Not investment advice
        </div>
      </div>

      {/* Right panel */}
      <div className="auth-right">
        <div className="auth-form-wrap">
          <div className="auth-kite-logo">
            <div className="auth-kite-mark"><KiteLogoMark /></div>
            <span className="auth-kite-name">Kite</span>
            <span className="auth-kite-by">Powered by Zerodha Lite</span>
          </div>

          {submitted ? (
            <div style={{ textAlign: "center", padding: "24px 0" }}>
              <div style={{ fontSize: 40, marginBottom: 12 }}>✓</div>
              <h2 className="auth-form-title">Account created!</h2>
              <p className="auth-form-sub">You can now sign in to start paper trading.</p>
              <Link href="/login">
                <button className="btn-submit" style={{ marginTop: 16 }}>Go to Login</button>
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <h2 className="auth-form-title">Create account</h2>
              <p className="auth-form-sub">Fill in your details to get started</p>

              <div className="form-group">
                <label className="form-label">Full name</label>
                <input className="form-input" type="text" placeholder="Rahul Kumar" required />
              </div>

              <div className="form-group">
                <label className="form-label">Email</label>
                <input className="form-input" type="email" placeholder="rahul@example.com" required />
              </div>

              <div className="form-group">
                <div className="form-row">
                  <div>
                    <label className="form-label">Mobile</label>
                    <input className="form-input" type="tel" placeholder="+91 98765 43210" required />
                  </div>
                  <div>
                    <label className="form-label">PAN</label>
                    <input className="form-input" type="text" placeholder="ABCDE1234F" maxLength={10} style={{ textTransform: "uppercase" }} required />
                  </div>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Password</label>
                <input className="form-input" type="password" placeholder="At least 8 characters" minLength={8} required />
              </div>

              <div className="form-group">
                <label className="form-label">Confirm password</label>
                <input className="form-input" type="password" placeholder="Re-enter password" minLength={8} required />
              </div>

              <div style={{ fontSize: 11, color: "var(--muted)", marginBottom: 12, lineHeight: 1.6 }}>
                By creating an account, you agree to our{" "}
                <Link href="#" style={{ color: "var(--blue)" }}>Terms &amp; Conditions</Link>{" "}
                and{" "}
                <Link href="#" style={{ color: "var(--blue)" }}>Privacy Policy</Link>.
              </div>

              <button type="submit" className="btn-submit">Create account</button>
            </form>
          )}

          <p className="auth-switch">
            Already have an account?{" "}
            <Link href="/login">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
