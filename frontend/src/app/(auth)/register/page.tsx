"use client";

import Link from "next/link";

export default function RegisterPage() {
  return (
    <main className="auth-wrap">
      <section className="auth-card">
        <aside className="auth-hero">
          <h1 style={{ marginTop: 0 }}>Create your paper account</h1>
          <p>Start practicing with simulated market data and execution rules.</p>
          <p style={{ fontSize: "0.84rem", marginTop: "2rem", opacity: 0.9 }}>
            Admin approval is required for instrument upload and risk policy updates.
          </p>
        </aside>
        <form className="auth-form">
          <h2 style={{ margin: 0 }}>Register</h2>
          <input className="input" placeholder="Full name" required />
          <input className="input" placeholder="Email" type="email" required />
          <input className="input" placeholder="Phone" required />
          <input className="input" placeholder="Password" type="password" minLength={8} required />
          <button className="btn" type="submit">Create account</button>
          <p className="muted" style={{ margin: 0 }}>
            Already registered? <Link href="/login" style={{ color: "var(--accent)", fontWeight: 600 }}>Sign in</Link>
          </p>
        </form>
      </section>
    </main>
  );
}
