"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { PropsWithChildren } from "react";
import { useAuthStore } from "@/store/auth-store";

function IconDashboard() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/>
      <rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>
    </svg>
  );
}
function IconOrders() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2"/>
      <rect x="9" y="3" width="6" height="4" rx="1"/><line x1="9" y1="12" x2="15" y2="12"/>
      <line x1="9" y1="16" x2="13" y2="16"/>
    </svg>
  );
}
function IconHoldings() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 00-4 0v2M12 12v5M10 14h4"/>
    </svg>
  );
}
function IconPositions() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/>
    </svg>
  );
}
function IconFunds() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="5" width="20" height="14" rx="2"/>
      <line x1="2" y1="10" x2="22" y2="10"/>
    </svg>
  );
}
function IconChart() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/>
      <line x1="6" y1="20" x2="6" y2="14"/><line x1="2" y1="20" x2="22" y2="20"/>
    </svg>
  );
}
function IconSearch() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
    </svg>
  );
}
function IconKite() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
      <path d="M12 2L4 9l8 4 8-4-8-7z" opacity="0.9"/>
      <path d="M4 9l8 13 8-13-8 4-8-4z" opacity="0.7"/>
    </svg>
  );
}

const navItems = [
  { label: "Dashboard", href: "/dashboard", icon: <IconDashboard /> },
  { label: "Chart", href: "/chart", icon: <IconChart /> },
  { label: "Orders", href: "/orders", icon: <IconOrders /> },
  { label: "Holdings", href: "/holdings", icon: <IconHoldings /> },
  { label: "Positions", href: "/positions", icon: <IconPositions /> },
  { label: "Funds", href: "/funds", icon: <IconFunds /> },
];

export default function AppShell({ children }: PropsWithChildren) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuthStore();

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  const initials = (user ?? "DK").split("@")[0].slice(0, 2).toUpperCase();

  return (
    <div className="app-layout">
      <aside className="sidebar">
        <Link href="/dashboard" className="sidebar-logo">
          <div className="logo-icon"><IconKite /></div>
          <div>
            <span className="logo-text">Kite</span>
            <span className="logo-sub">by Zerodha</span>
          </div>
        </Link>

        <nav className="sidebar-nav">
          {navItems.map(({ label, href, icon }) => {
            const active = pathname === href || (href !== "/dashboard" && pathname.startsWith(href));
            return (
              <Link key={href} href={href} className={`nav-item${active ? " active" : ""}`}>
                {icon}
                <span className="nav-label">{label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="sidebar-bottom">
          <div className="sidebar-user">
            <div className="user-avatar">{initials}</div>
            <div>
              <div className="user-name">{(user ?? "demo@kite.dev").split("@")[0]}</div>
              <div className="user-id-text">Retail Individual</div>
            </div>
          </div>
          <button className="btn-logout" onClick={handleLogout}>
            <span className="btn-logout-text">Sign out</span>
          </button>
        </div>
      </aside>

      <div className="main-wrap">
        <header className="topbar">
          <div className="search-wrap">
            <span className="search-icon"><IconSearch /></span>
            <input className="search-input" placeholder="Search eg: INFY, NIFTY 50, SBIN" />
          </div>
          <div className="index-chips">
            <div className="index-chip">
              <span className="index-name">NIFTY 50</span>
              <span className="index-val">24,338.10</span>
              <span className="index-chg up">▲ 0.42%</span>
            </div>
            <div className="index-chip">
              <span className="index-name">SENSEX</span>
              <span className="index-val">80,182.20</span>
              <span className="index-chg up">▲ 0.38%</span>
            </div>
            <div className="index-chip">
              <span className="index-name">NIFTY BANK</span>
              <span className="index-val">52,341.55</span>
              <span className="index-chg down">▼ 0.11%</span>
            </div>
          </div>
        </header>

        <main className="page-content">
          {children}
        </main>
      </div>
    </div>
  );
}
