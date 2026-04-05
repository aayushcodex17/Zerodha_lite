"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { PropsWithChildren } from "react";
import { useAuthStore } from "@/store/auth-store";

const links = [
  ["Dashboard", "/dashboard", "⌂"],
  ["Chart", "/chart", "◔"],
  ["Orders", "/orders", "◫"],
  ["Trades", "/trades", "↻"],
  ["Positions", "/positions", "◧"],
  ["Holdings", "/holdings", "◩"],
  ["Funds", "/funds", "₹"],
  ["Admin", "/admin/instruments", "⚙"]
] as const;

export default function AppShell({ children }: PropsWithChildren) {
  const pathname = usePathname();
  const { user, logout } = useAuthStore();

  return (
    <div className="kite-shell">
      <aside className="kite-sidebar">
        <div className="brand">
          <div className="brand-dot" />
          <div>
            <h3 style={{ margin: 0 }}>Kite Lite</h3>
            <p className="muted" style={{ margin: 0, fontSize: "0.8rem" }}>Paper mode</p>
          </div>
        </div>

        <nav className="side-nav">
          {links.map(([label, href, icon]) => {
            const active = pathname.startsWith(href);
            return (
              <Link
                key={href}
                href={href}
                style={active ? { background: "var(--accent-soft)", color: "var(--accent)", fontWeight: 700 } : {}}
              >
                {icon} <span>{label}</span>
              </Link>
            );
          })}
        </nav>

        <div style={{ marginTop: "auto", padding: "0.75rem", border: "1px solid var(--line)", borderRadius: 12 }} className="profile-block">
          <p style={{ margin: 0, fontWeight: 600 }}>{user ?? "demo@kite-lite.dev"}</p>
          <p className="muted" style={{ margin: "0.15rem 0 0.7rem", fontSize: "0.82rem" }}>Retail Individual</p>
          <button className="btn secondary" style={{ width: "100%" }} onClick={logout}>Logout</button>
        </div>
      </aside>

      <div className="kite-main">
        <header className="kite-topbar">
          <input className="search" placeholder="Search eg: INFY, NIFTY 50, SBIN" />
          <div style={{ display: "flex", gap: "0.6rem", alignItems: "center" }}>
            <span className="pill">NIFTY 50 24,338.10</span>
            <span className="pill up">SENSEX +0.42%</span>
          </div>
        </header>
        <main className="content-wrap">{children}</main>
      </div>
    </div>
  );
}
