"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getOrders, getTrades } from "@/lib/api";
import { Order, Trade } from "@/lib/types";

function fmt(n: number) {
  return n === 0 ? "—" : n.toFixed(2);
}

function OrderRow({ o }: { o: Order }) {
  const statusClass =
    o.status === "COMPLETE" ? "st-complete" :
    o.status === "OPEN" ? "st-open" :
    o.status === "TRIGGER PENDING" ? "st-trigger" :
    o.status === "REJECTED" ? "st-rejected" : "st-cancelled";

  return (
    <tr>
      <td>
        <div style={{ fontSize: 12 }}>{o.time}</div>
        {o.tradedAt && <div style={{ fontSize: 10, color: "var(--muted)" }}>{o.tradedAt}</div>}
      </td>
      <td>
        <span className={`badge ${o.side === "BUY" ? "badge-buy" : "badge-sell"}`}>
          {o.side}
        </span>
      </td>
      <td>
        <div className="instrument-cell">
          <span className="instr-name">{o.symbol}</span>
          <span className="instr-exch">{o.exchange}</span>
        </div>
      </td>
      <td className="r">
        <div style={{ fontVariantNumeric: "tabular-nums" }}>
          {o.filledQty} / {o.qty}
        </div>
        <div style={{ fontSize: 10, color: "var(--muted)" }}>{o.product}</div>
      </td>
      <td className="r">
        <div style={{ fontVariantNumeric: "tabular-nums" }}>{fmt(o.avgPrice)}</div>
        <div style={{ fontSize: 10, color: "var(--muted)" }}>
          {o.type}{o.triggerPrice ? ` @ ${o.triggerPrice}` : ""}
        </div>
      </td>
      <td>
        <span className={`status-pill ${statusClass}`}>{o.status}</span>
        {o.statusMessage && (
          <div style={{ fontSize: 10, color: "var(--red)", marginTop: 2 }}>{o.statusMessage}</div>
        )}
      </td>
      <td>
        {o.status === "OPEN" || o.status === "TRIGGER PENDING" ? (
          <button className="btn btn-ghost-red btn-sm">Cancel</button>
        ) : null}
      </td>
    </tr>
  );
}

function TradeRow({ t }: { t: Trade }) {
  return (
    <tr>
      <td style={{ fontSize: 12 }}>{t.time}</td>
      <td>
        <span className={`badge ${t.side === "BUY" ? "badge-buy" : "badge-sell"}`}>{t.side}</span>
      </td>
      <td>
        <div className="instrument-cell">
          <span className="instr-name">{t.symbol}</span>
          <span className="instr-exch">{t.exchange}</span>
        </div>
      </td>
      <td className="r">{t.qty}</td>
      <td className="r" style={{ fontVariantNumeric: "tabular-nums" }}>{t.avgPrice.toFixed(2)}</td>
      <td style={{ fontSize: 11, color: "var(--muted)" }}>{t.orderId}</td>
      <td>
        <span className={`badge ${t.product === "MIS" ? "badge-mis" : t.product === "CNC" ? "badge-cnc" : "badge-nrml"}`}>
          {t.product}
        </span>
      </td>
    </tr>
  );
}

export default function OrdersPage() {
  const [tab, setTab] = useState<"orders" | "trades">("orders");
  const [statusFilter, setStatusFilter] = useState("all");

  const { data: orders = [], isLoading: ordersLoading } = useQuery({ queryKey: ["orders"], queryFn: getOrders });
  const { data: trades = [], isLoading: tradesLoading } = useQuery({ queryKey: ["trades"], queryFn: getTrades });

  const filteredOrders = statusFilter === "all"
    ? orders
    : orders.filter((o) => o.status.toLowerCase().replace(" ", "_") === statusFilter);

  const openCount = orders.filter((o) => o.status === "OPEN" || o.status === "TRIGGER PENDING").length;
  const completedCount = orders.filter((o) => o.status === "COMPLETE").length;
  const rejectedCount = orders.filter((o) => o.status === "REJECTED" || o.status === "CANCELLED").length;

  return (
    <>
      <div className="page-header">
        <span className="page-title">Orders</span>
        <div className="page-actions">
          <div style={{ display: "flex", gap: 16, fontSize: 12 }}>
            <span><span className="st-open status-pill">{openCount} Open</span></span>
            <span><span className="st-complete status-pill">{completedCount} Executed</span></span>
            <span><span className="st-cancelled status-pill">{rejectedCount} Cancelled</span></span>
          </div>
        </div>
      </div>

      <div className="table-panel">
        <div className="tab-bar" style={{ padding: "0 12px" }}>
          <button className={`tab-btn ${tab === "orders" ? "active" : ""}`} onClick={() => setTab("orders")}>
            Orders
          </button>
          <button className={`tab-btn ${tab === "trades" ? "active" : ""}`} onClick={() => setTab("trades")}>
            Trades
          </button>
        </div>

        {tab === "orders" && (
          <>
            <div className="filter-bar">
              <select className="filter-select" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
                <option value="all">All orders</option>
                <option value="open">Open</option>
                <option value="complete">Executed</option>
                <option value="trigger_pending">Pending trigger</option>
                <option value="rejected">Rejected</option>
                <option value="cancelled">Cancelled</option>
              </select>
              <div className="filter-sep" />
              <input className="filter-date" type="date" defaultValue="2024-11-01" />
              <span style={{ fontSize: 11, color: "var(--muted)" }}>to</span>
              <input className="filter-date" type="date" defaultValue="2024-11-01" />
            </div>

            <div className="table-scroll">
              {ordersLoading ? (
                <div style={{ padding: 40, textAlign: "center", color: "var(--muted)", fontSize: 13 }}>Loading orders…</div>
              ) : (
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Time</th>
                      <th>Type</th>
                      <th>Instrument</th>
                      <th className="r">Qty (Filled/Total)</th>
                      <th className="r">Price (Avg/Ord)</th>
                      <th>Status</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredOrders.length === 0 ? (
                      <tr className="no-data"><td colSpan={7}>No orders found</td></tr>
                    ) : (
                      filteredOrders.map((o) => <OrderRow key={o.id} o={o} />)
                    )}
                  </tbody>
                </table>
              )}
            </div>
          </>
        )}

        {tab === "trades" && (
          <div className="table-scroll">
            {tradesLoading ? (
              <div style={{ padding: 40, textAlign: "center", color: "var(--muted)", fontSize: 13 }}>Loading trades…</div>
            ) : (
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Time</th>
                    <th>Type</th>
                    <th>Instrument</th>
                    <th className="r">Qty</th>
                    <th className="r">Avg Price</th>
                    <th>Order ID</th>
                    <th>Product</th>
                  </tr>
                </thead>
                <tbody>
                  {trades.length === 0 ? (
                    <tr className="no-data"><td colSpan={7}>No trades for today</td></tr>
                  ) : (
                    trades.map((t) => <TradeRow key={t.id} t={t} />)
                  )}
                </tbody>
              </table>
            )}
          </div>
        )}
      </div>
    </>
  );
}
