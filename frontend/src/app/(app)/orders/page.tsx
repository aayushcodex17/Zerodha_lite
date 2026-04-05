"use client";

import { useQuery } from "@tanstack/react-query";
import { getOrders } from "@/lib/api";

export default function OrdersPage() {
  const { data, isLoading } = useQuery({ queryKey: ["orders"], queryFn: getOrders });

  return (
    <section className="grid">
      <header>
        <h1 style={{ margin: 0 }}>Orders</h1>
        <p className="muted">Track open, completed, and rejected orders with lifecycle status.</p>
      </header>
      <div className="grid grid-3">
        <div className="kpi"><h4>Open</h4><p>1</p></div>
        <div className="kpi"><h4>Completed</h4><p>1</p></div>
        <div className="kpi"><h4>Rejected</h4><p>0</p></div>
      </div>
      <article className="panel">
        {isLoading || !data ? <p>Loading orderbook...</p> : (
          <table className="table">
            <thead><tr><th>ID</th><th>Symbol</th><th>Side</th><th>Product</th><th>Type</th><th>Qty</th><th>Price</th><th>Status</th><th>Time</th></tr></thead>
            <tbody>
              {data.map((order) => (
                <tr key={order.id}>
                  <td>{order.id}</td>
                  <td>{order.symbol}</td>
                  <td className={order.side === "BUY" ? "up" : "down"}>{order.side}</td>
                  <td>{order.product}</td>
                  <td>{order.type}</td>
                  <td>{order.qty}</td>
                  <td>{order.price.toFixed(2)}</td>
                  <td><span className="pill">{order.status}</span></td>
                  <td>{order.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </article>
    </section>
  );
}
