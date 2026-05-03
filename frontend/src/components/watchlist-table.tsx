"use client";

import { Instrument } from "@/lib/types";

function pnlColor(v: number) {
  if (v > 0) return "positive";
  if (v < 0) return "negative";
  return "neutral";
}

export default function WatchlistTable({ data }: { data: Instrument[] }) {
  return (
    <table className="data-table">
      <thead>
        <tr>
          <th>Instrument</th>
          <th className="r">LTP</th>
          <th className="r">Chg%</th>
        </tr>
      </thead>
      <tbody>
        {data.map((w) => (
          <tr key={w.symbol} style={{ cursor: "pointer" }}>
            <td>
              <div className="instrument-cell">
                <span className="instr-name">{w.symbol}</span>
                <span className="instr-exch">{w.exchange}</span>
              </div>
            </td>
            <td className="r" style={{ fontWeight: 600, fontVariantNumeric: "tabular-nums" }}>
              {w.ltp.toFixed(2)}
            </td>
            <td className="r">
              <span className={pnlColor(w.changePct)} style={{ fontVariantNumeric: "tabular-nums" }}>
                {w.changePct >= 0 ? "+" : ""}{w.changePct.toFixed(2)}%
              </span>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
