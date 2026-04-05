"use client";

import { useQuery } from "@tanstack/react-query";
import { getPositions } from "@/lib/api";

export default function PositionsPage() {
  const { data, isLoading } = useQuery({ queryKey: ["positions"], queryFn: getPositions });

  const netPnl = (data ?? []).reduce((sum, p) => sum + p.pnl, 0);

  return (
    <section className="grid">
      <header>
        <h1 style={{ margin: 0 }}>Positions (Intraday + Carry)</h1>
        <p className="muted">Real-time MTM, exposure, and risk view for open trading positions.</p>
      </header>

      <div className="position-split">
        <article className="panel">
          {isLoading || !data ? <p>Calculating MTM...</p> : (
            <table className="table">
              <thead><tr><th>Symbol</th><th>Qty</th><th>Avg</th><th>LTP</th><th>Exposure</th><th>MTM P&L</th><th>Action</th></tr></thead>
              <tbody>
                {data.map((item) => (
                  <tr key={item.symbol}>
                    <td>{item.symbol}</td>
                    <td>{item.qty}</td>
                    <td>{item.avgPrice.toFixed(2)}</td>
                    <td>{item.ltp.toFixed(2)}</td>
                    <td>₹{(item.qty * item.ltp).toFixed(2)}</td>
                    <td className={item.pnl >= 0 ? "up" : "down"}>{item.pnl.toFixed(2)}</td>
                    <td><button className="btn secondary">Exit</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </article>

        <aside className="grid">
          <article className="kpi"><h4>Net MTM</h4><p className={netPnl >= 0 ? "up" : "down"}>{netPnl.toFixed(2)}</p></article>
          <article className="kpi"><h4>Intraday Margin Used</h4><p>₹44,300</p></article>
          <article className="kpi"><h4>Risk Utilization</h4><p>38%</p></article>
          <article className="panel">
            <h4 style={{ marginTop: 0 }}>Risk monitor</h4>
            <p className="muted">Per-symbol qty cap: 500</p>
            <p className="muted">Daily stop-loss: ₹25,000</p>
            <p className="up">No risk breaches.</p>
          </article>
        </aside>
      </div>
    </section>
  );
}
