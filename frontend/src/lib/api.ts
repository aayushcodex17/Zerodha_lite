import { dayPositions, funds, holdings, netPositions, orders, trades, watchlist } from "@/lib/mock-data";

const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));

export async function getWatchlist() { await wait(200); return watchlist; }
export async function getOrders() { await wait(200); return orders; }
export async function getTrades() { await wait(200); return trades; }
export async function getDayPositions() { await wait(200); return dayPositions; }
export async function getNetPositions() { await wait(200); return netPositions; }
export async function getHoldings() { await wait(200); return holdings; }
export async function getFunds() { await wait(200); return funds; }
