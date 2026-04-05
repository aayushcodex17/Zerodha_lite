export type Instrument = {
  symbol: string;
  name: string;
  exchange: "NSE" | "BSE";
  ltp: number;
  changePct: number;
};

export type Order = {
  id: string;
  symbol: string;
  side: "BUY" | "SELL";
  product: "CNC" | "MIS";
  type: "MARKET" | "LIMIT";
  qty: number;
  price: number;
  status: "OPEN" | "COMPLETE" | "REJECTED";
  time: string;
};

export type Position = {
  symbol: string;
  qty: number;
  avgPrice: number;
  ltp: number;
  pnl: number;
};
