export default function TradesPage() {
  return (
    <section className="grid">
      <header>
        <h1 style={{ margin: 0 }}>Trades</h1>
        <p className="muted">Execution history with fill price and realized P&L context.</p>
      </header>
      <article className="panel">
        <table className="table">
          <thead><tr><th>Time</th><th>Order ID</th><th>Symbol</th><th>Side</th><th>Qty</th><th>Fill price</th><th>Type</th><th>Status</th></tr></thead>
          <tbody>
            <tr><td>09:20:14</td><td>O-1001</td><td>RELIANCE</td><td className="up">BUY</td><td>5</td><td>2920.00</td><td>LIMIT</td><td><span className="pill">FILLED</span></td></tr>
            <tr><td>10:11:03</td><td>O-1002</td><td>TCS</td><td className="down">SELL</td><td>2</td><td>4308.20</td><td>MARKET</td><td><span className="pill">OPEN</span></td></tr>
          </tbody>
        </table>
      </article>
    </section>
  );
}
