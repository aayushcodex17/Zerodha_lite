import { Instrument, Order, Position } from "@/lib/types";

export const watchlist: Instrument[] = [
  { symbol: "RELIANCE", name: "Reliance Industries", exchange: "NSE", ltp: 2924.4, changePct: 0.86 },
  { symbol: "TCS", name: "Tata Consultancy", exchange: "NSE", ltp: 4308.2, changePct: -0.24 },
  { symbol: "INFY", name: "Infosys", exchange: "NSE", ltp: 1874.55, changePct: 1.02 },
  { symbol: "HDFCBANK", name: "HDFC Bank", exchange: "NSE", ltp: 1728.8, changePct: -0.75 }
];

export const orders: Order[] = [
  { id: "O-1001", symbol: "RELIANCE", side: "BUY", product: "CNC", type: "LIMIT", qty: 5, price: 2920, status: "COMPLETE", time: "09:20" },
  { id: "O-1002", symbol: "TCS", side: "SELL", product: "MIS", type: "MARKET", qty: 2, price: 4300, status: "OPEN", time: "10:11" }
];

export const positions: Position[] = [
  { symbol: "RELIANCE", qty: 5, avgPrice: 2910.3, ltp: 2924.4, pnl: 70.5 },
  { symbol: "INFY", qty: 10, avgPrice: 1840.2, ltp: 1874.55, pnl: 343.5 }
];

export const chartCandles = Array.from({ length: 30 }, (_, index) => ({
  x: index,
  open: 2880 + Math.random() * 50,
  high: 2920 + Math.random() * 60,
  low: 2850 + Math.random() * 30,
  close: 2890 + Math.random() * 50
}));
