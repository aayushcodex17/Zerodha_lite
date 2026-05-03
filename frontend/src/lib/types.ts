export type Exchange = "NSE" | "BSE";
export type OrderSide = "BUY" | "SELL";
export type OrderType = "MARKET" | "LIMIT" | "SL" | "SL-M";
export type ProductType = "CNC" | "MIS" | "NRML";
export type OrderStatus = "COMPLETE" | "OPEN" | "TRIGGER PENDING" | "REJECTED" | "CANCELLED";
export type Validity = "DAY" | "IOC";

export type Instrument = {
  symbol: string;
  name: string;
  exchange: Exchange;
  ltp: number;
  changePct: number;
  change: number;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
};

export type Order = {
  id: string;
  time: string;
  tradedAt?: string;
  symbol: string;
  exchange: Exchange;
  side: OrderSide;
  product: ProductType;
  type: OrderType;
  validity: Validity;
  qty: number;
  filledQty: number;
  price: number;
  avgPrice: number;
  triggerPrice?: number;
  status: OrderStatus;
  statusMessage?: string;
};

export type Trade = {
  id: string;
  orderId: string;
  time: string;
  symbol: string;
  exchange: Exchange;
  side: OrderSide;
  product: ProductType;
  qty: number;
  avgPrice: number;
};

export type Position = {
  symbol: string;
  exchange: Exchange;
  product: ProductType;
  qty: number;
  avgPrice: number;
  ltp: number;
  closePrice: number;
  pnl: number;
  pnlPct: number;
  dayPnl: number;
  buyQty: number;
  sellQty: number;
  buyValue: number;
  sellValue: number;
  multiplier: number;
};

export type Holding = {
  symbol: string;
  exchange: Exchange;
  qty: number;
  t1Qty: number;
  avgCost: number;
  ltp: number;
  curVal: number;
  pnl: number;
  pnlPct: number;
  dayChange: number;
  dayChangePct: number;
  isin: string;
};

export type Funds = {
  equity: FundsSegment;
  commodity: FundsSegment;
};

export type FundsSegment = {
  available: number;
  openingBalance: number;
  usedMargin: number;
  spanMargin: number;
  exposureMargin: number;
  optionPremium: number;
  adhocMargin: number;
  cashBalance: number;
  collateral: number;
};
