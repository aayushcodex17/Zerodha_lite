"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getDayPositions, getNetPositions } from "@/lib/api";
import { Position } from "@/lib/types";

function pnlColor(v: number) {
  if (v > 0) return "positive";
  if (v < 0) return "negative";
  return "neutral";
}
function fmtPnl(v: number) {
  if (v === 0) return "—";
  const sign = v > 0 ? "+" : "";
  return `${sign}${v.toFixed(2)}`;
}
function fmtPct(v: number) {
  const sign = v > 0 ? "+" : "";
  return `(${sign}${v.toFixed(2)}%)`;
}

function PositionRow({ p }: { p: Position }) {
  const exposure = (p.qty * p.ltp).toFixed(2);
  const pnlCls = pnlColor(p.pnl);
  const chgAmt = p.ltp - p.closePrice;
  const chgPct = ((p.ltp - p.closePrice) / p.closePrice) * 100;

  return (
    <tr>
      <td>
        <div className="instrument-cell">
          <span className="instr-name">{p.symbol}</span>
          <span className="instr-exch">{p.exchange}</span>
        </div>
      </td>
      <td>
        <span className={`badge ${p.product === "MIS" ? "badge-mis" : p.product === "CNC" ? "badge-cnc" : "badge-nrml"}`}>
          {p.product}
        </span>
      </td>
      <td className="r" style={{ fontVariantNumeric: "tabular-nums" }}>
        <span style={{ color: p.qty > 0 ? "var(--green)" : p.qty < 0 ? "var(--red)" : undefined, fontWeight: 600 }}>
          {p.qty > 0 ? `+${p.qty}` : p.qty}
        </span>
      </td>
      <td className="r" style={{ fontVariantNumeric: "tabular-nums" }}>{p.avgPrice.toFixed(2)}</td>
      <td className="r" style={{ fontVariantNumeric: "tabular-nums", fontWeight: 500 }}>{p.ltp.toFixed(2)}</td>
      <td className="r" style={{ fontVariantNumeric: "tabular-nums" }}>
        <span className={pnlCls} style={{ fontWeight: 600 }}>{fmtPnl(p.pnl)}</span>
        <div className={`small ${pnlCls}`}>{fmtPct(p.pnlPct)}</div>
      </td>
      <td className="r" style={{ fontVariantNumeric: "tabular-nums" }}>
        <span className={pnlColor(chgAmt)} style={{ fontWeight: 500 }}>
          {chgAmt > 0 ? "+" : ""}{chgAmt.toFixed(2)}
        </span>
        <div className={`small ${pnlColor(chgAmt)}`}>
          {chgPct > 0 ? "+" : ""}{chgPct.toFixed(2)}%
        </div>
      </td>
      <td className="r" style={{ fontVariantNumeric: "tabular-nums", color: "var(--muted)" }}>
        {p.closePrice.toFixed(2)}
      </td>
      <td>
        <button className="btn btn-ghost-red btn-sm">Exit</button>
      </td>
    </tr>
  );
}

export default function PositionsPage() {
  const [tab, setTab] = useState<"day" | "net">("day");

  const { data: dayPos = [], isLoading: dayLoading } = useQuery({
    queryKey: ["positions", "day"],
    queryFn: getDayPositions,
    refetchInterval: 3000,
  });
  const { data: netPos = [], isLoading: netLoading } = useQuery({
    queryKey: ["positions", "net"],
    queryFn: getNetPositions,
    refetchInterval: 3000,
  });

  const positions = tab === "day" ? dayPos : netPos;
  const isLoading = tab === "day" ? dayLoading : netLoading;

  const totalPnl = positions.reduce((s, p) => s + p.pnl, 0);
  const totalDayPnl = positions.reduce((s, p) => s + p.dayPnl, 0);
  const totalExposure = positions.reduce((s, p) => s + Math.abs(p.qty * p.ltp), 0);

  const misPosCount = dayPos.filter((p) => p.product === "MIS" && p.qty !== 0).length;

  return (
    <>
      <div className="page-header">
        <span className="page-title">Positions</span>
        <div className="page-actions">
          {tab === "day" && misPosCount > 0 && (
            <button className="btn btn-ghost-red btn-sm">Exit all MIS ({misPosCount})</button>
          )}
        </div>
      </div>

      {/* Summary bar */}
      <div className="summary-bar">
        <div className="summary-item">
          <span className="summary-label">P&amp;L</span>
          <span className={`summary-value ${pnlColor(totalPnl)}`}>
            {totalPnl >= 0 ? "+" : ""}₹{totalPnl.toFixed(2)}
          </span>
          <span className="summary-sub">Unrealised MTM</span>
        </div>
        <div className="summary-divider" />
        <div className="summary-item">
          <span className="summary-label">Day&apos;s P&amp;L</span>
          <span className={`summary-value ${pnlColor(totalDayPnl)}`} style={{ fontSize: 16 }}>
            {totalDayPnl >= 0 ? "+" : ""}₹{totalDayPnl.toFixed(2)}
          </span>
          <span className="summary-sub">Since previous close</span>
        </div>
        <div className="summary-divider" />
        <div className="summary-item">
          <span className="summary-label">Exposure</span>
          <span className="summary-value" style={{ fontSize: 16 }}>₹{totalExposure.toLocaleString("en-IN", { maximumFractionDigits: 0 })}</span>
          <span className="summary-sub">Current market value</span>
        </div>
        <div className="summary-divider" />
        <div className="summary-item">
          <span className="summary-label">Open positions</span>
          <span className="summary-value" style={{ fontSize: 16 }}>{positions.filter((p) => p.qty !== 0).length}</span>
          <span className="summary-sub">{tab === "day" ? "Intraday" : "Overnight carry"}</span>
        </div>
      </div>

      <div className="table-panel">
        <div className="tab-bar" style={{ padding: "0 12px" }}>
          <button className={`tab-btn ${tab === "day" ? "active" : ""}`} onClick={() => setTab("day")}>
            Day ({dayPos.length})
          </button>
          <button className={`tab-btn ${tab === "net" ? "active" : ""}`} onClick={() => setTab("net")}>
            Net ({netPos.length})
          </button>
        </div>

        <div className="table-scroll">
          {isLoading ? (
            <div style={{ padding: 40, textAlign: "center", color: "var(--muted)", fontSize: 13 }}>Fetching positions…</div>
          ) : (
            <table className="data-table">
              <thead>
                <tr>
                  <th>Instrument</th>
                  <th>Product</th>
                  <th className="r">Qty</th>
                  <th className="r">Avg</th>
                  <th className="r">LTP</th>
                  <th className="r">P&amp;L</th>
                  <th className="r">Chg</th>
                  <th className="r">Close</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {positions.length === 0 ? (
                  <tr className="no-data">
                    <td colSpan={9}>No {tab} positions. Place an order to start trading.</td>
                  </tr>
                ) : (
                  positions.map((p) => <PositionRow key={`${p.symbol}-${p.product}`} p={p} />)
                )}
              </tbody>
              {positions.length > 0 && (
                <tfoot>
                  <tr style={{ background: "#fafafa" }}>
                    <td colSpan={5} style={{ fontSize: 11, color: "var(--muted)", padding: "8px 12px" }}>
                      Total ({positions.length} positions)
                    </td>
                    <td className="r" style={{ padding: "8px 12px", fontWeight: 700 }}>
                      <span className={pnlColor(totalPnl)}>
                        {totalPnl >= 0 ? "+" : ""}₹{totalPnl.toFixed(2)}
                      </span>
                    </td>
                    <td colSpan={3} />
                  </tr>
                </tfoot>
              )}
            </table>
          )}
        </div>
      </div>

      <div style={{ fontSize: 11, color: "var(--muted)", marginTop: 10, lineHeight: 1.6 }}>
        * P&amp;L is the difference between avg price and LTP. Intraday MIS positions will be auto-squared off before market close.
        Settlement prices used for realised P&amp;L.
      </div>
    </>
  );
}
