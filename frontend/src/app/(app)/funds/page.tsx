export default function FundsPage() {
  return (
    <section className="grid grid-2">
      <article className="panel">
        <h1 style={{ marginTop: 0 }}>Funds & Margin</h1>
        <table className="table">
          <tbody>
            <tr><td>Opening balance</td><td>₹3,00,000</td></tr>
            <tr><td>Realized P&L (today)</td><td className="up">₹2,340</td></tr>
            <tr><td>Unrealized MTM</td><td className="up">₹4,500</td></tr>
            <tr><td>Span + exposure used</td><td>₹44,300</td></tr>
            <tr><td><strong>Available cash</strong></td><td><strong>₹3,20,000</strong></td></tr>
          </tbody>
        </table>
      </article>
      <article className="panel">
        <h2 style={{ marginTop: 0 }}>Risk Limits</h2>
        <ul>
          <li>Max open orders: 20</li>
          <li>Per-symbol quantity cap: 500</li>
          <li>Daily loss stop: ₹25,000</li>
          <li>Exposure cap: ₹5,00,000</li>
        </ul>
        <p className="up">All limits healthy.</p>
      </article>
    </section>
  );
}
