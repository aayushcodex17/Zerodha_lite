"use client";

import { useQuery } from "@tanstack/react-query";
import { getDayPositions, getHoldings, getOrders, getWatchlist } from "@/lib/api";

function pnlColor(v: number) {
  if (v > 0) return "positive";
  if (v < 0) return "negative";
  return "neutral";
}

export default function DashboardPage() {
  const { data: watchlist = [] } = useQuery({ queryKey: ["watchlist"], queryFn: getWatchlist, refetchInterval: 2500 });
  const { data: orders = [] } = useQuery({ queryKey: ["orders"], queryFn: getOrders });
  const { data: positions = [] } = useQuery({ queryKey: ["positions", "day"], queryFn: getDayPositions });
  const { data: holdings = [] } = useQuery({ queryKey: ["holdings"], queryFn: getHoldings });

  const openOrders = orders.filter((o) => o.status === "OPEN" || o.status === "TRIGGER PENDING").length;
  const totalHoldingVal = holdings.reduce((s, h) => s + h.curVal, 0);
  const totalHoldingPnl = holdings.reduce((s, h) => s + h.pnl, 0);
  const posPnl = positions.reduce((s, p) => s + p.pnl, 0);
  const todayPnl = posPnl + holdings.reduce((s, h) => s + h.dayChange, 0);

  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";
  const marketOpen = hour >= 9 && hour < 15;

  return (
    <>
      <div className="page-header">
        <div>
          <span className="page-title">{greeting}.</span>
          <span style={{ marginLeft: 8, fontSize: 12, color: marketOpen ? "var(--green)" : "var(--muted)" }}>
            {marketOpen ? "● Markets are open" : "○ Markets are closed"}
          </span>
        </div>
        <div style={{ fontSize: 11, color: "var(--muted)" }}>
          Last updated: {new Date().toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", second: "2-digit" })}
        </div>
      </div>

      {/* KPIs */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, marginBottom: 16 }}>
        {[
          { label: "Portfolio value", value: `₹${(totalHoldingVal + 320000).toLocaleString("en-IN", { maximumFractionDigits: 0 })}`, sub: "Holdings + cash" },
          { label: "Today's P&L", value: `${todayPnl >= 0 ? "+" : ""}₹${todayPnl.toFixed(2)}`, sub: "Positions + holdings", cls: pnlColor(todayPnl) },
          { label: "Available margin", value: "₹3,20,000", sub: "Cash balance", cls: "positive" },
          { label: "Open orders", value: String(openOrders), sub: "Pending execution" },
        ].map(({ label, value, sub, cls }) => (
          <div key={label} style={{ background: "#fff", border: "1px solid var(--border)", borderRadius: 4, padding: "14px 16px" }}>
            <div style={{ fontSize: 11, color: "var(--muted)", textTransform: "uppercase", letterSpacing: "0.04em", marginBottom: 4 }}>{label}</div>
            <div style={{ fontSize: 18, fontWeight: 700 }} className={cls}>{value}</div>
            <div style={{ fontSize: 11, color: "var(--muted)", marginTop: 2 }}>{sub}</div>
          </div>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 12 }}>
        {/* Watchlist */}
        <div className="table-panel">
          <div style={{ padding: "10px 14px", borderBottom: "1px solid var(--border)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontWeight: 600, fontSize: 13 }}>Watchlist</span>
            <span style={{ fontSize: 11, color: "var(--muted)" }}>{watchlist.length} instruments</span>
          </div>
          <table className="data-table">
            <thead>
              <tr>
                <th>Instrument</th>
                <th className="r">LTP</th>
                <th className="r">Change</th>
                <th className="r">Volume</th>
              </tr>
            </thead>
            <tbody>
              {watchlist.map((w) => (
                <tr key={w.symbol} style={{ cursor: "pointer" }}>
                  <td>
                    <div className="instrument-cell">
                      <span className="instr-name">{w.symbol}</span>
                      <span className="instr-exch">{w.exchange}</span>
                    </div>
                  </td>
                  <td className="r" style={{ fontWeight: 600, fontVariantNumeric: "tabular-nums" }}>{w.ltp.toFixed(2)}</td>
                  <td className="r">
                    <span className={pnlColor(w.changePct)} style={{ fontVariantNumeric: "tabular-nums" }}>
                      {w.changePct >= 0 ? "+" : ""}{w.changePct.toFixed(2)}%
                    </span>
                    <div className={`small ${pnlColor(w.change)}`} style={{ fontVariantNumeric: "tabular-nums" }}>
                      {w.change >= 0 ? "+" : ""}{w.change.toFixed(2)}
                    </div>
                  </td>
                  <td className="r" style={{ fontSize: 11, color: "var(--muted)" }}>
                    {(w.volume / 1000).toFixed(0)}K
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Holdings snapshot */}
        <div className="table-panel">
          <div style={{ padding: "10px 14px", borderBottom: "1px solid var(--border)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontWeight: 600, fontSize: 13 }}>Holdings</span>
            <span style={{ fontSize: 11, color: "var(--muted)" }}>{holdings.length} stocks</span>
          </div>
          {holdings.length === 0 ? (
            <div style={{ padding: 32, textAlign: "center", color: "var(--muted)", fontSize: 13 }}>No holdings yet</div>
          ) : (
            <table className="data-table">
              <thead>
                <tr>
                  <th>Instrument</th>
                  <th className="r">Qty</th>
                  <th className="r">P&L</th>
                </tr>
              </thead>
              <tbody>
                {holdings.slice(0, 6).map((h) => (
                  <tr key={h.symbol}>
                    <td>
                      <div className="instrument-cell">
                        <span className="instr-name">{h.symbol}</span>
                        <span className="instr-exch">{h.exchange}</span>
                      </div>
                    </td>
                    <td className="r">{h.qty}</td>
                    <td className="r">
                      <span className={pnlColor(h.pnl)} style={{ fontWeight: 600, fontVariantNumeric: "tabular-nums" }}>
                        {h.pnl >= 0 ? "+" : ""}₹{h.pnl.toFixed(2)}
                      </span>
                      <div className={`small ${pnlColor(h.pnlPct)}`}>
                        {h.pnlPct >= 0 ? "+" : ""}{h.pnlPct.toFixed(2)}%
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
}
