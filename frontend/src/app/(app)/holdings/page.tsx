export default function HoldingsPage() {
  return (
    <section className="grid">
      <header>
        <h1 style={{ margin: 0 }}>Holdings (Delivery Portfolio)</h1>
        <p className="muted">Long-term CNC investments with allocation and day/total return analytics.</p>
      </header>

      <div className="holdings-metrics">
        <div className="kpi"><h4>Total Investment</h4><p>₹32,956.50</p></div>
        <div className="kpi"><h4>Current Value</h4><p>₹33,367.50</p></div>
        <div className="kpi"><h4>Total Return</h4><p className="up">+₹411.00 (1.24%)</p></div>
      </div>

      <article className="panel">
        <table className="table">
          <thead><tr><th>Instrument</th><th>Qty</th><th>Avg. cost</th><th>LTP</th><th>Invested</th><th>Current value</th><th>Day P&L</th><th>Total P&L</th><th>Allocation</th></tr></thead>
          <tbody>
            <tr>
              <td>RELIANCE</td><td>5</td><td>2910.30</td><td>2924.40</td><td>14551.50</td><td>14622.00</td>
              <td className="up">+25.00</td><td className="up">+70.50</td><td>43.8%</td>
            </tr>
            <tr>
              <td>INFY</td><td>10</td><td>1840.20</td><td>1874.55</td><td>18402.00</td><td>18745.50</td>
              <td className="up">+94.10</td><td className="up">+343.50</td><td>56.2%</td>
            </tr>
          </tbody>
        </table>
      </article>
    </section>
  );
}
