import { Funds, Holding, Instrument, Order, Position, Trade } from "@/lib/types";

export const watchlist: Instrument[] = [
  { symbol: "RELIANCE", name: "Reliance Industries Ltd.", exchange: "NSE", ltp: 2924.40, changePct: 0.86, change: 24.95, open: 2901.00, high: 2938.60, low: 2895.10, close: 2899.45, volume: 4821340 },
  { symbol: "TCS", name: "Tata Consultancy Services", exchange: "NSE", ltp: 4308.20, changePct: -0.24, change: -10.30, open: 4325.00, high: 4330.00, low: 4298.50, close: 4318.50, volume: 1023450 },
  { symbol: "INFY", name: "Infosys Ltd.", exchange: "NSE", ltp: 1874.55, changePct: 1.02, change: 18.95, open: 1858.00, high: 1882.40, low: 1854.00, close: 1855.60, volume: 2341200 },
  { symbol: "HDFCBANK", name: "HDFC Bank Ltd.", exchange: "NSE", ltp: 1728.80, changePct: -0.75, change: -13.10, open: 1745.00, high: 1749.90, low: 1722.00, close: 1741.90, volume: 5672310 },
  { symbol: "ICICIBANK", name: "ICICI Bank Ltd.", exchange: "NSE", ltp: 1238.45, changePct: 1.34, change: 16.35, open: 1224.00, high: 1244.90, low: 1220.00, close: 1222.10, volume: 6234500 },
  { symbol: "BHARTIARTL", name: "Bharti Airtel Ltd.", exchange: "NSE", ltp: 1782.30, changePct: 2.18, change: 37.95, open: 1752.00, high: 1789.70, low: 1748.00, close: 1744.35, volume: 3120000 },
  { symbol: "KOTAKBANK", name: "Kotak Mahindra Bank", exchange: "NSE", ltp: 1924.10, changePct: -0.43, change: -8.30, open: 1936.00, high: 1940.00, low: 1918.00, close: 1932.40, volume: 1876540 },
  { symbol: "WIPRO", name: "Wipro Ltd.", exchange: "NSE", ltp: 489.75, changePct: 0.61, change: 2.95, open: 487.00, high: 493.40, low: 485.10, close: 486.80, volume: 4231000 },
];

export const orders: Order[] = [
  { id: "241101000001", time: "09:16:43", tradedAt: "09:16:43", symbol: "RELIANCE", exchange: "NSE", side: "BUY", product: "CNC", type: "MARKET", validity: "DAY", qty: 5, filledQty: 5, price: 0, avgPrice: 2905.30, status: "COMPLETE" },
  { id: "241101000002", time: "09:31:12", tradedAt: "09:31:23", symbol: "TCS", exchange: "NSE", side: "SELL", product: "MIS", type: "LIMIT", validity: "DAY", qty: 2, filledQty: 2, price: 4310.00, avgPrice: 4310.00, status: "COMPLETE" },
  { id: "241101000003", time: "10:02:55", symbol: "INFY", exchange: "NSE", side: "BUY", product: "CNC", type: "LIMIT", validity: "DAY", qty: 10, filledQty: 0, price: 1870.00, avgPrice: 0, status: "OPEN" },
  { id: "241101000004", time: "10:18:44", tradedAt: "10:18:45", symbol: "HDFCBANK", exchange: "NSE", side: "BUY", product: "MIS", type: "MARKET", validity: "DAY", qty: 3, filledQty: 3, price: 0, avgPrice: 1726.50, status: "COMPLETE" },
  { id: "241101000005", time: "10:42:18", symbol: "ICICIBANK", exchange: "NSE", side: "SELL", product: "MIS", type: "SL", validity: "DAY", qty: 5, filledQty: 0, price: 1230.00, avgPrice: 0, triggerPrice: 1232.00, status: "TRIGGER PENDING" },
  { id: "241101000006", time: "11:05:03", tradedAt: "11:05:04", symbol: "BHARTIARTL", exchange: "NSE", side: "BUY", product: "CNC", type: "MARKET", validity: "DAY", qty: 4, filledQty: 4, price: 0, avgPrice: 1778.40, status: "COMPLETE" },
  { id: "241101000007", time: "11:22:30", symbol: "WIPRO", exchange: "NSE", side: "BUY", product: "CNC", type: "LIMIT", validity: "DAY", qty: 20, filledQty: 0, price: 485.00, avgPrice: 0, status: "CANCELLED" },
  { id: "241101000008", time: "12:10:17", symbol: "KOTAKBANK", exchange: "NSE", side: "SELL", product: "MIS", type: "MARKET", validity: "DAY", qty: 2, filledQty: 0, price: 0, avgPrice: 0, status: "REJECTED", statusMessage: "Insufficient funds" },
  { id: "241101000009", time: "13:45:22", tradedAt: "13:45:22", symbol: "INFY", exchange: "NSE", side: "BUY", product: "MIS", type: "MARKET", validity: "DAY", qty: 8, filledQty: 8, price: 0, avgPrice: 1871.20, status: "COMPLETE" },
  { id: "241101000010", time: "14:30:05", symbol: "RELIANCE", exchange: "NSE", side: "SELL", product: "CNC", type: "LIMIT", validity: "DAY", qty: 2, filledQty: 0, price: 2940.00, avgPrice: 0, status: "OPEN" },
];

export const trades: Trade[] = [
  { id: "T-241101-001", orderId: "241101000001", time: "09:16:43", symbol: "RELIANCE", exchange: "NSE", side: "BUY", product: "CNC", qty: 5, avgPrice: 2905.30 },
  { id: "T-241101-002", orderId: "241101000002", time: "09:31:23", symbol: "TCS", exchange: "NSE", side: "SELL", product: "MIS", qty: 2, avgPrice: 4310.00 },
  { id: "T-241101-003", orderId: "241101000004", time: "10:18:45", symbol: "HDFCBANK", exchange: "NSE", side: "BUY", product: "MIS", qty: 3, avgPrice: 1726.50 },
  { id: "T-241101-004", orderId: "241101000006", time: "11:05:04", symbol: "BHARTIARTL", exchange: "NSE", side: "BUY", product: "CNC", qty: 4, avgPrice: 1778.40 },
  { id: "T-241101-005", orderId: "241101000009", time: "13:45:22", symbol: "INFY", exchange: "NSE", side: "BUY", product: "MIS", qty: 8, avgPrice: 1871.20 },
];

export const dayPositions: Position[] = [
  { symbol: "INFY", exchange: "NSE", product: "MIS", qty: 8, avgPrice: 1871.20, ltp: 1874.55, closePrice: 1855.60, pnl: 26.80, pnlPct: 0.18, dayPnl: 26.80, buyQty: 8, sellQty: 0, buyValue: 14969.60, sellValue: 0, multiplier: 1 },
  { symbol: "HDFCBANK", exchange: "NSE", product: "MIS", qty: 3, avgPrice: 1726.50, ltp: 1728.80, closePrice: 1741.90, pnl: 6.90, pnlPct: 0.13, dayPnl: 6.90, buyQty: 3, sellQty: 0, buyValue: 5179.50, sellValue: 0, multiplier: 1 },
  { symbol: "TCS", exchange: "NSE", product: "MIS", qty: -2, avgPrice: 4310.00, ltp: 4308.20, closePrice: 4318.50, pnl: 3.60, pnlPct: 0.04, dayPnl: 3.60, buyQty: 0, sellQty: 2, buyValue: 0, sellValue: 8620.00, multiplier: 1 },
];

export const netPositions: Position[] = [
  { symbol: "RELIANCE", exchange: "NSE", product: "CNC", qty: 5, avgPrice: 2905.30, ltp: 2924.40, closePrice: 2899.45, pnl: 95.50, pnlPct: 0.66, dayPnl: 124.75, buyQty: 5, sellQty: 0, buyValue: 14526.50, sellValue: 0, multiplier: 1 },
  { symbol: "BHARTIARTL", exchange: "NSE", product: "CNC", qty: 4, avgPrice: 1778.40, ltp: 1782.30, closePrice: 1744.35, pnl: 15.60, pnlPct: 0.22, dayPnl: 151.80, buyQty: 4, sellQty: 0, buyValue: 7113.60, sellValue: 0, multiplier: 1 },
  ...dayPositions,
];

export const holdings: Holding[] = [
  { symbol: "RELIANCE", exchange: "NSE", qty: 12, t1Qty: 0, avgCost: 2820.40, ltp: 2924.40, curVal: 35092.80, pnl: 1248.00, pnlPct: 3.68, dayChange: 299.40, dayChangePct: 0.86, isin: "INE002A01018" },
  { symbol: "INFY", exchange: "NSE", qty: 25, t1Qty: 0, avgCost: 1756.20, ltp: 1874.55, curVal: 46863.75, pnl: 2958.75, pnlPct: 6.73, dayChange: 473.75, dayChangePct: 1.02, isin: "INE009A01021" },
  { symbol: "HDFCBANK", exchange: "NSE", qty: 15, t1Qty: 0, avgCost: 1680.50, ltp: 1728.80, curVal: 25932.00, pnl: 724.50, pnlPct: 2.87, dayChange: -196.50, dayChangePct: -0.75, isin: "INE040A01034" },
  { symbol: "ICICIBANK", exchange: "NSE", qty: 20, t1Qty: 0, avgCost: 1154.20, ltp: 1238.45, curVal: 24769.00, pnl: 1685.00, pnlPct: 7.29, dayChange: 327.00, dayChangePct: 1.34, isin: "INE090A01021" },
  { symbol: "TCS", exchange: "NSE", qty: 8, t1Qty: 0, avgCost: 4122.30, ltp: 4308.20, curVal: 34465.60, pnl: 1487.20, pnlPct: 4.51, dayChange: -82.40, dayChangePct: -0.24, isin: "INE467B01029" },
  { symbol: "BHARTIARTL", exchange: "NSE", qty: 10, t1Qty: 4, avgCost: 1634.80, ltp: 1782.30, curVal: 17823.00, pnl: 1475.00, pnlPct: 9.02, dayChange: 379.50, dayChangePct: 2.18, isin: "INE397D01024" },
];

export const funds: Funds = {
  equity: {
    available: 320000,
    openingBalance: 300000,
    usedMargin: 44300,
    spanMargin: 0,
    exposureMargin: 0,
    optionPremium: 0,
    adhocMargin: 0,
    cashBalance: 300000,
    collateral: 0,
  },
  commodity: {
    available: 50000,
    openingBalance: 50000,
    usedMargin: 0,
    spanMargin: 0,
    exposureMargin: 0,
    optionPremium: 0,
    adhocMargin: 0,
    cashBalance: 50000,
    collateral: 0,
  },
};

export const chartCandles = Array.from({ length: 40 }, (_, i) => {
  const base = 2850 + i * 1.8;
  const o = base + (Math.random() - 0.5) * 20;
  const c = base + (Math.random() - 0.5) * 22;
  return { x: i, open: o, high: Math.max(o, c) + Math.random() * 12, low: Math.min(o, c) - Math.random() * 12, close: c };
});
