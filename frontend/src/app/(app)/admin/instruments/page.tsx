"use client";

import { ChangeEvent, useState } from "react";

export default function InstrumentsAdminPage() {
  const [fileName, setFileName] = useState("");

  const handleSelect = (event: ChangeEvent<HTMLInputElement>) => {
    setFileName(event.target.files?.[0]?.name ?? "");
  };

  return (
    <section className="grid">
      <header>
        <h1 style={{ margin: 0 }}>Admin · Instrument Master</h1>
        <p className="muted">Upload, validate and publish tradable symbol master data.</p>
      </header>

      <article className="panel" style={{ maxWidth: 760 }}>
        <div className="grid">
          <label>
            Upload CSV
            <input className="input" type="file" accept=".csv" onChange={handleSelect} />
          </label>
          <div style={{ display: "flex", gap: "0.5rem" }}>
            <button type="button" className="btn">Validate</button>
            <button type="button" className="btn secondary">Publish</button>
          </div>
          {fileName ? <p>Selected file: <strong>{fileName}</strong></p> : <p className="muted">No file selected.</p>}
        </div>
      </article>

      <article className="panel">
        <h3 style={{ marginTop: 0 }}>Validation policy</h3>
        <ul>
          <li>Required headers: <code>symbol</code>, <code>exchange</code>, <code>tick_size</code>, <code>lot_size</code></li>
          <li>No duplicate symbol + exchange pair</li>
          <li>Tick size and lot size must be positive decimals</li>
          <li>Instrument status should be one of: ACTIVE, SUSPENDED, DELISTED</li>
        </ul>
      </article>
    </section>
  );
}
