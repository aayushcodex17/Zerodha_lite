"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { useAuthStore } from "@/store/auth-store";

export default function LoginPage() {
  const router = useRouter();
  const login = useAuthStore((state) => state.login);
  const [email, setEmail] = useState("demo@kite-lite.dev");
  const [password, setPassword] = useState("password123");

  const submit = (event: FormEvent) => {
    event.preventDefault();
    login(email);
    router.push("/dashboard");
  };

  return (
    <main className="auth-wrap">
      <section className="auth-card">
        <aside className="auth-hero">
          <h1 style={{ marginTop: 0 }}>Welcome to Kite Lite</h1>
          <p style={{ opacity: 0.95 }}>Modern paper-trading terminal inspired by real brokerage workflows.</p>
          <ul>
            <li>Live watchlist simulation</li>
            <li>Order window with risk checks</li>
            <li>Portfolio analytics and margin view</li>
          </ul>
          <p style={{ marginTop: "2rem", fontSize: "0.84rem", opacity: 0.9 }}>
            Educational only · Not a broker · No real-money trading.
          </p>
        </aside>
        <form onSubmit={submit} className="auth-form">
          <h2 style={{ margin: 0 }}>Login</h2>
          <p className="muted" style={{ margin: 0 }}>Use your credentials to access your dashboard.</p>
          <label>
            Email
            <input className="input" required type="email" value={email} onChange={(event) => setEmail(event.target.value)} />
          </label>
          <label>
            Password
            <input className="input" required type="password" minLength={8} value={password} onChange={(event) => setPassword(event.target.value)} />
          </label>
          <button className="btn" type="submit">Continue to Dashboard</button>
          <p className="muted" style={{ margin: 0 }}>
            New user? <Link href="/register" style={{ color: "var(--accent)", fontWeight: 600 }}>Create account</Link>
          </p>
        </form>
      </section>
    </main>
  );
}
