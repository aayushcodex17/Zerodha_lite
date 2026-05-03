"use client";

import { useQuery } from "@tanstack/react-query";
import { getHoldings } from "@/lib/api";
import { Holding } from "@/lib/types";

function pnlColor(v: number) {
  if (v > 0) return "positive";
  if (v < 0) return "negative";
  return "neutral";
}

function HoldingRow({ h }: { h: Holding }) {
  const pnlCls = pnlColor(h.pnl);
  const dayCls = pnlColor(h.dayChange);
  const invested = h.qty * h.avgCost;
  const allocationPct = 0; // will be calculated in parent

  return (
    <tr>
      <td>
        <div className="instrument-cell">
          <span className="instr-name">{h.symbol}</span>
          <span className="instr-exch">{h.exchange}</span>
        </div>
        {h.t1Qty > 0 && (
          <div style={{ fontSize: 10, color: "var(--orange)", marginTop: 2 }}>
            T1: {h.t1Qty} qty pending settlement
          </div>
        )}
      </td>
      <td className="r" style={{ fontWeight: 500 }}>{h.qty}</td>
      <td className="r" style={{ fontVariantNumeric: "tabular-nums" }}>{h.avgCost.toFixed(2)}</td>
      <td className="r" style={{ fontVariantNumeric: "tabular-nums", fontWeight: 600 }}>{h.ltp.toFixed(2)}</td>
      <td className="r" style={{ fontVariantNumeric: "tabular-nums" }}>
        ₹{invested.toLocaleString("en-IN", { maximumFractionDigits: 2 })}
      </td>
      <td className="r" style={{ fontVariantNumeric: "tabular-nums" }}>
        ₹{h.curVal.toLocaleString("en-IN", { maximumFractionDigits: 2 })}
      </td>
      <td className="r">
        <span className={dayCls} style={{ fontVariantNumeric: "tabular-nums" }}>
          {h.dayChange >= 0 ? "+" : ""}₹{h.dayChange.toFixed(2)}
        </span>
        <div className={`small ${dayCls}`}>
          {h.dayChangePct >= 0 ? "+" : ""}{h.dayChangePct.toFixed(2)}%
        </div>
      </td>
      <td className="r">
        <span className={pnlCls} style={{ fontWeight: 600, fontVariantNumeric: "tabular-nums" }}>
          {h.pnl >= 0 ? "+" : ""}₹{h.pnl.toFixed(2)}
        </span>
        <div className={`small ${pnlCls}`}>
          {h.pnlPct >= 0 ? "+" : ""}{h.pnlPct.toFixed(2)}%
        </div>
      </td>
      <td>
        <div style={{ display: "flex", gap: 4 }}>
          <button className="btn btn-green btn-sm">Buy</button>
          <button className="btn btn-red btn-sm" style={{ background: "var(--red)", color: "#fff" }}>Sell</button>
        </div>
      </td>
    </tr>
  );
}

export default function HoldingsPage() {
  const { data: holdings = [], isLoading } = useQuery({
    queryKey: ["holdings"],
    queryFn: getHoldings,
    refetchInterval: 5000,
  });

  const totalInvested = holdings.reduce((s, h) => s + h.qty * h.avgCost, 0);
  const totalCurVal = holdings.reduce((s, h) => s + h.curVal, 0);
  const totalPnl = holdings.reduce((s, h) => s + h.pnl, 0);
  const totalPnlPct = totalInvested > 0 ? (totalPnl / totalInvested) * 100 : 0;
  const totalDayChange = holdings.reduce((s, h) => s + h.dayChange, 0);
  const totalDayChangePct = totalCurVal > 0 ? (totalDayChange / (totalCurVal - totalDayChange)) * 100 : 0;

  const pnlCls = pnlColor(totalPnl);
  const dayCls = pnlColor(totalDayChange);

  return (
    <>
      <div className="page-header">
        <span className="page-title">Holdings ({holdings.length})</span>
        <div className="page-actions">
          <button className="btn btn-secondary btn-sm">Download</button>
        </div>
      </div>

      {/* Summary */}
      <div className="holdings-summary">
        <div className="holdings-summary-item">
          <div className="h-sum-label">Total investment</div>
          <div className="h-sum-value">
            ₹{totalInvested.toLocaleString("en-IN", { maximumFractionDigits: 0 })}
          </div>
        </div>
        <div className="holdings-summary-item">
          <div className="h-sum-label">Current value</div>
          <div className={`h-sum-value ${pnlCls}`}>
            ₹{totalCurVal.toLocaleString("en-IN", { maximumFractionDigits: 0 })}
          </div>
          <div className={`h-sum-change ${pnlCls}`}>
            {totalPnl >= 0 ? "+" : ""}₹{totalPnl.toFixed(2)} ({totalPnlPct >= 0 ? "+" : ""}{totalPnlPct.toFixed(2)}%)
          </div>
        </div>
        <div className="holdings-summary-item">
          <div className="h-sum-label">Day&apos;s P&amp;L</div>
          <div className={`h-sum-value ${dayCls}`}>
            {totalDayChange >= 0 ? "+" : ""}₹{totalDayChange.toFixed(2)}
          </div>
          <div className={`h-sum-change ${dayCls}`}>
            {totalDayChangePct >= 0 ? "+" : ""}{totalDayChangePct.toFixed(2)}% today
          </div>
        </div>
        <div className="holdings-summary-item">
          <div className="h-sum-label">Total returns</div>
          <div className={`h-sum-value ${pnlCls}`}>
            {totalPnlPct >= 0 ? "+" : ""}{totalPnlPct.toFixed(2)}%
          </div>
          <div className={`h-sum-change ${pnlCls}`}>
            {totalPnl >= 0 ? "+" : ""}₹{totalPnl.toFixed(2)} overall
          </div>
        </div>
      </div>

      <div className="table-panel">
        <div className="table-scroll">
          {isLoading ? (
            <div style={{ padding: 40, textAlign: "center", color: "var(--muted)", fontSize: 13 }}>Loading holdings…</div>
          ) : (
            <table className="data-table">
              <thead>
                <tr>
                  <th>Instrument</th>
                  <th className="r">Qty</th>
                  <th className="r">Avg cost</th>
                  <th className="r">LTP</th>
                  <th className="r">Invested</th>
                  <th className="r">Cur val</th>
                  <th className="r">Day change</th>
                  <th className="r">Overall P&amp;L</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {holdings.length === 0 ? (
                  <tr className="no-data">
                    <td colSpan={9}>No holdings. Place a CNC order to build your portfolio.</td>
                  </tr>
                ) : (
                  holdings.map((h) => <HoldingRow key={h.symbol} h={h} />)
                )}
              </tbody>
              {holdings.length > 0 && (
                <tfoot>
                  <tr style={{ background: "#f9f9f9" }}>
                    <td style={{ padding: "10px 12px", fontSize: 12, color: "var(--muted)", fontWeight: 600 }}>
                      Total ({holdings.length} stocks)
                    </td>
                    <td colSpan={3} />
                    <td className="r" style={{ padding: "10px 12px", fontWeight: 700 }}>
                      ₹{totalInvested.toLocaleString("en-IN", { maximumFractionDigits: 0 })}
                    </td>
                    <td className="r" style={{ padding: "10px 12px", fontWeight: 700 }}>
                      ₹{totalCurVal.toLocaleString("en-IN", { maximumFractionDigits: 0 })}
                    </td>
                    <td className={`r ${dayCls}`} style={{ padding: "10px 12px", fontWeight: 700 }}>
                      {totalDayChange >= 0 ? "+" : ""}₹{totalDayChange.toFixed(2)}
                    </td>
                    <td className={`r ${pnlCls}`} style={{ padding: "10px 12px", fontWeight: 700 }}>
                      {totalPnl >= 0 ? "+" : ""}₹{totalPnl.toFixed(2)}
                    </td>
                    <td />
                  </tr>
                </tfoot>
              )}
            </table>
          )}
        </div>
      </div>

      <div style={{ fontSize: 11, color: "var(--muted)", marginTop: 10, lineHeight: 1.6 }}>
        * Holdings include only CNC (delivery) positions. T1 quantities are pending settlement and cannot be sold.
        P&amp;L calculated using average cost method.
      </div>
    </>
  );
}
