import { orders, positions, watchlist } from "@/lib/mock-data";

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function getWatchlist() {
  await wait(250);
  return watchlist;
}

export async function getOrders() {
  await wait(250);
  return orders;
}

export async function getPositions() {
  await wait(250);
  return positions;
}
