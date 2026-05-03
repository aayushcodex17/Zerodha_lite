"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getFunds } from "@/lib/api";
import { FundsSegment } from "@/lib/types";

function fmt(n: number) {
  return `₹${n.toLocaleString("en-IN", { maximumFractionDigits: 2 })}`;
}

function FundsPanel({ title, data }: { title: string; data: FundsSegment }) {
  const usedTotal = data.usedMargin + data.spanMargin + data.exposureMargin + data.optionPremium;

  return (
    <div className="funds-panel">
      <div className="funds-panel-head">
        <span className="funds-panel-title">{title}</span>
        <div style={{ display: "flex", gap: 8 }}>
          <button className="btn btn-add-funds btn-sm">Add funds</button>
          <button className="btn btn-withdraw btn-sm">Withdraw</button>
        </div>
      </div>

      <div className="funds-avail">
        <div className="funds-avail-label">Available for trading</div>
        <div className="funds-avail-value positive">{fmt(data.available)}</div>
      </div>

      <div className="funds-rows">
        <div style={{ padding: "8px 20px 4px", fontSize: 11, color: "var(--muted)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.04em" }}>
          Credits
        </div>
        <div className="funds-row">
          <span className="funds-row-lbl">Opening balance</span>
          <span className="funds-row-val">{fmt(data.openingBalance)}</span>
        </div>
        <div className="funds-row">
          <span className="funds-row-lbl">Opening balance</span>
          <span className="funds-row-val">{fmt(data.openingBalance)}</span>
        </div>
        <div className="funds-row">
          <span className="funds-row-lbl">Collateral (Liquid funds / Stocks)</span>
          <span className="funds-row-val">{fmt(data.collateral)}</span>
        </div>
        <div className="funds-row">
          <span className="funds-row-lbl">Adhoc margin / Payin</span>
          <span className="funds-row-val">{fmt(data.adhocMargin)}</span>
        </div>

        <div style={{ padding: "12px 20px 4px", fontSize: 11, color: "var(--muted)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.04em" }}>
          Debits
        </div>
        <div className="funds-row used">
          <span className="funds-row-lbl">Opening balance utilised</span>
          <span className="funds-row-val" style={{ color: "var(--red)" }}>{usedTotal > 0 ? `− ${fmt(usedTotal)}` : fmt(0)}</span>
        </div>
        <div className="funds-row" style={{ paddingLeft: 32 }}>
          <span className="funds-row-lbl" style={{ color: "var(--muted)" }}>SPAN margin</span>
          <span className="funds-row-val" style={{ color: "var(--muted)" }}>{fmt(data.spanMargin)}</span>
        </div>
        <div className="funds-row" style={{ paddingLeft: 32 }}>
          <span className="funds-row-lbl" style={{ color: "var(--muted)" }}>Exposure margin</span>
          <span className="funds-row-val" style={{ color: "var(--muted)" }}>{fmt(data.exposureMargin)}</span>
        </div>
        <div className="funds-row" style={{ paddingLeft: 32 }}>
          <span className="funds-row-lbl" style={{ color: "var(--muted)" }}>Option premium</span>
          <span className="funds-row-val" style={{ color: "var(--muted)" }}>{fmt(data.optionPremium)}</span>
        </div>
        <div className="funds-row" style={{ paddingLeft: 32 }}>
          <span className="funds-row-lbl" style={{ color: "var(--muted)" }}>Delivery margin</span>
          <span className="funds-row-val" style={{ color: "var(--muted)" }}>{fmt(data.usedMargin)}</span>
        </div>
        <div className="funds-row" style={{ paddingLeft: 32 }}>
          <span className="funds-row-lbl" style={{ color: "var(--muted)" }}>Marked to market (MTM)</span>
          <span className="funds-row-val" style={{ color: "var(--muted)" }}>{fmt(0)}</span>
        </div>

        <div className="funds-row subtotal">
          <span className="funds-row-lbl">Net cash balance</span>
          <span className="funds-row-val positive">{fmt(data.cashBalance - usedTotal)}</span>
        </div>
        <div className="funds-row">
          <span className="funds-row-lbl">Available cash</span>
          <span className="funds-row-val fw-600">{fmt(data.available)}</span>
        </div>
        <div className="funds-row">
          <span className="funds-row-lbl" style={{ color: "var(--muted)" }}>Available intraday</span>
          <span className="funds-row-val" style={{ color: "var(--muted)" }}>{fmt(data.available * 5)}</span>
        </div>
      </div>
    </div>
  );
}

export default function FundsPage() {
  const [tab, setTab] = useState<"equity" | "commodity">("equity");
  const { data, isLoading } = useQuery({ queryKey: ["funds"], queryFn: getFunds });

  return (
    <>
      <div className="page-header">
        <span className="page-title">Funds</span>
      </div>

      <div className="tab-bar" style={{ marginBottom: 16 }}>
        <button className={`tab-btn ${tab === "equity" ? "active" : ""}`} onClick={() => setTab("equity")}>
          Equity
        </button>
        <button className={`tab-btn ${tab === "commodity" ? "active" : ""}`} onClick={() => setTab("commodity")}>
          Commodity
        </button>
      </div>

      {isLoading || !data ? (
        <div style={{ padding: 40, textAlign: "center", color: "var(--muted)", fontSize: 13 }}>Loading funds…</div>
      ) : (
        <div className="funds-grid">
          <FundsPanel
            title={tab === "equity" ? "Equity" : "Commodity"}
            data={tab === "equity" ? data.equity : data.commodity}
          />

          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {/* Margin used breakdown */}
            <div className="funds-panel">
              <div className="funds-panel-head">
                <span className="funds-panel-title">Margin utilisation</span>
              </div>
              <div style={{ padding: "16px 20px" }}>
                {(() => {
                  const seg = tab === "equity" ? data.equity : data.commodity;
                  const used = seg.usedMargin;
                  const total = seg.openingBalance;
                  const pct = total > 0 ? (used / total) * 100 : 0;
                  return (
                    <>
                      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                        <span style={{ fontSize: 12, color: "var(--muted)" }}>Used</span>
                        <span style={{ fontSize: 13, fontWeight: 600 }}>{fmt(used)}</span>
                      </div>
                      <div style={{ height: 8, background: "#f0f0f0", borderRadius: 4, overflow: "hidden", marginBottom: 8 }}>
                        <div style={{ height: "100%", width: `${pct}%`, background: pct > 80 ? "var(--red)" : pct > 50 ? "var(--orange)" : "var(--blue)", borderRadius: 4, transition: "width 0.3s" }} />
                      </div>
                      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: "var(--muted)" }}>
                        <span>{pct.toFixed(1)}% of opening balance used</span>
                        <span>{fmt(total)} total</span>
                      </div>
                    </>
                  );
                })()}
              </div>
            </div>

            {/* Fund transfer history placeholder */}
            <div className="funds-panel">
              <div className="funds-panel-head">
                <span className="funds-panel-title">Recent transactions</span>
              </div>
              <div style={{ padding: "12px 0" }}>
                {[
                  { date: "01 Nov, 09:00", desc: "Opening balance credit", amount: "+₹3,00,000", pos: true },
                  { date: "01 Nov, 09:16", desc: "Order: BUY RELIANCE × 5", amount: "−₹14,526.50", pos: false },
                  { date: "01 Nov, 11:05", desc: "Order: BUY BHARTIARTL × 4", amount: "−₹7,113.60", pos: false },
                ].map((tx, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "8px 20px", borderBottom: "1px solid var(--border-light)" }}>
                    <div>
                      <div style={{ fontSize: 13 }}>{tx.desc}</div>
                      <div style={{ fontSize: 11, color: "var(--muted)" }}>{tx.date}</div>
                    </div>
                    <span style={{ fontWeight: 600, fontSize: 13, color: tx.pos ? "var(--green)" : "var(--text)" }}>{tx.amount}</span>
                  </div>
                ))}
                <div style={{ padding: "12px 20px", textAlign: "center" }}>
                  <button className="btn btn-secondary btn-sm">View all transactions</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div style={{ fontSize: 11, color: "var(--muted)", marginTop: 12, lineHeight: 1.6 }}>
        * Funds shown are for paper-trading simulation only. No real money is involved. Available intraday = 5× leverage (MIS).
      </div>
    </>
  );
}
