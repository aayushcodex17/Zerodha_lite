"use client";

import { useQuery } from "@tanstack/react-query";
import WatchlistTable from "@/components/watchlist-table";
import { getWatchlist } from "@/lib/api";

export default function DashboardPage() {
  const { data, isLoading } = useQuery({
    queryKey: ["watchlist"],
    queryFn: getWatchlist,
    refetchInterval: 2500
  });

  return (
    <section className="grid">
      <header style={{ display: "flex", justifyContent: "space-between", alignItems: "end" }}>
        <div>
          <h1 style={{ margin: 0 }}>Dashboard</h1>
          <p className="muted" style={{ margin: "0.3rem 0 0" }}>Good afternoon. Markets are open.</p>
        </div>
        <div className="pill">Last sync 12:11:03</div>
      </header>

      <div className="grid grid-4">
        <article className="kpi"><h4>Equity</h4><p>₹4,32,240</p></article>
        <article className="kpi"><h4>Today's P&L</h4><p className="up">+₹6,840.20</p></article>
        <article className="kpi"><h4>Available Margin</h4><p>₹3,20,000</p></article>
        <article className="kpi"><h4>Open Orders</h4><p>2</p></article>
      </div>

      <div className="grid grid-2">
        <article className="panel">
          <h3 style={{ marginTop: 0 }}>Watchlist</h3>
          {isLoading || !data ? <p>Streaming quotes...</p> : <WatchlistTable data={data} />}
        </article>

        <article className="panel">
          <h3 style={{ marginTop: 0 }}>Market depth: RELIANCE</h3>
          <div className="orderbook">
            <div className="depth-col">
              <p className="muted" style={{ marginTop: 0 }}>Bids</p>
              {[[2924.1, 120], [2924.0, 232], [2923.8, 440], [2923.6, 801], [2923.4, 640]].map(([p, q]) => (
                <div key={`b-${p}`} className="depth-row"><span className="up">{p}</span><span>{q}</span></div>
              ))}
            </div>
            <div className="depth-col">
              <p className="muted" style={{ marginTop: 0 }}>Asks</p>
              {[[2924.4, 142], [2924.6, 220], [2924.8, 315], [2925.0, 500], [2925.2, 725]].map(([p, q]) => (
                <div key={`a-${p}`} className="depth-row"><span className="down">{p}</span><span>{q}</span></div>
              ))}
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}
