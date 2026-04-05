import { Instrument } from "@/lib/types";

export default function WatchlistTable({ data }: { data: Instrument[] }) {
  return (
    <table className="table">
      <thead>
        <tr>
          <th>Instrument</th>
          <th>Exchange</th>
          <th>LTP</th>
          <th>Day %</th>
          <th>Activity</th>
        </tr>
      </thead>
      <tbody>
        {data.map((instrument) => {
          const positive = instrument.changePct >= 0;
          return (
            <tr key={instrument.symbol}>
              <td>
                <strong>{instrument.symbol}</strong>
                <div className="muted" style={{ fontSize: "0.82rem" }}>{instrument.name}</div>
              </td>
              <td>{instrument.exchange}</td>
              <td>{instrument.ltp.toFixed(2)}</td>
              <td className={positive ? "up" : "down"}>{instrument.changePct.toFixed(2)}%</td>
              <td>
                <div style={{ height: 8, borderRadius: 999, background: "#eef3fb", overflow: "hidden" }}>
                  <div
                    style={{
                      width: `${Math.min(100, Math.abs(instrument.changePct) * 40 + 15)}%`,
                      height: "100%",
                      background: positive ? "var(--green)" : "var(--red)"
                    }}
                  />
                </div>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
