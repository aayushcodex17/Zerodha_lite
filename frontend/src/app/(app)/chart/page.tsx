"use client";

import { FormEvent, useMemo, useState } from "react";
import { chartCandles } from "@/lib/mock-data";

export default function ChartPage() {
  const [qty, setQty] = useState(1);
  const [price, setPrice] = useState(2924.4);
  const [type, setType] = useState<"MARKET" | "LIMIT">("MARKET");
  const [product, setProduct] = useState<"MIS" | "CNC">("MIS");

  const validation = useMemo(() => {
    if (qty <= 0) return "Quantity must be greater than 0";
    if (type === "LIMIT" && price <= 0) return "Limit price must be greater than 0";
    if (product === "MIS" && qty > 500) return "MIS max quantity is 500";
    return "";
  }, [qty, type, price, product]);

  const placeOrder = (event: FormEvent) => {
    event.preventDefault();
    if (validation) return;
  };

  return (
    <section className="grid grid-2">
      <article className="panel">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
          <h1 style={{ margin: 0 }}>RELIANCE</h1>
          <p className="up" style={{ margin: 0, fontWeight: 700 }}>2924.40 (+0.86%)</p>
        </div>
        <p className="muted">NSE · Candles (MVP proxy) · 5m</p>
        <div style={{ height: 260, border: "1px solid var(--line)", borderRadius: 12, padding: "0.6rem", overflow: "auto" }}>
          <table className="table">
            <thead><tr><th>#</th><th>Open</th><th>High</th><th>Low</th><th>Close</th></tr></thead>
            <tbody>
              {chartCandles.map((candle) => (
                <tr key={candle.x}>
                  <td>{candle.x}</td>
                  <td>{candle.open.toFixed(2)}</td>
                  <td>{candle.high.toFixed(2)}</td>
                  <td>{candle.low.toFixed(2)}</td>
                  <td className={candle.close >= candle.open ? "up" : "down"}>{candle.close.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </article>

      <form className="panel grid" onSubmit={placeOrder}>
        <h2 style={{ margin: 0 }}>Order Window</h2>
        <div style={{ display: "flex", gap: "0.5rem" }}>
          <button type="button" className="btn">Buy</button>
          <button type="button" className="btn secondary">Sell</button>
        </div>

        <label>Order type
          <select className="input" value={type} onChange={(event) => setType(event.target.value as "MARKET" | "LIMIT")}>
            <option value="MARKET">MARKET</option>
            <option value="LIMIT">LIMIT</option>
          </select>
        </label>

        <label>Product
          <select className="input" value={product} onChange={(event) => setProduct(event.target.value as "MIS" | "CNC")}>
            <option value="MIS">MIS (Intraday)</option>
            <option value="CNC">CNC (Delivery)</option>
          </select>
        </label>

        <label>Quantity
          <input className="input" type="number" min={1} value={qty} onChange={(event) => setQty(Number(event.target.value))} />
        </label>

        <label>Price
          <input
            className="input"
            type="number"
            min={0}
            step="0.05"
            disabled={type === "MARKET"}
            value={price}
            onChange={(event) => setPrice(Number(event.target.value))}
          />
        </label>

        <div className="panel" style={{ background: "var(--panel-muted)", padding: "0.8rem" }}>
          <p style={{ margin: 0 }}><strong>Margin impact:</strong> ₹{(qty * price * (product === "MIS" ? 0.2 : 1)).toFixed(2)}</p>
          <p className="muted" style={{ margin: "0.25rem 0 0" }}>Available margin: ₹3,20,000</p>
        </div>

        {validation ? <p className="down">{validation}</p> : <p className="up">Order passes frontend validations.</p>}
        <button className="btn" type="submit" disabled={Boolean(validation)}>Place order</button>
      </form>
    </section>
  );
}
