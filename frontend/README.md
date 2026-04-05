# Zerodha Lite Frontend (Kite-style UI)

This frontend implements a richer, production-style UI inspired by the Kite terminal layout:

- Left trading sidebar + top market/search bar
- Dense trading dashboards and portfolio analytics
- Distinct positions (MTM/risk) and holdings (investment analytics) pages
- Advanced order window controls (type/product/validation/margin impact)

## Stack

- Next.js 14 (App Router)
- React 18 + TypeScript
- React Query (server state)
- Zustand (client auth state)
- Custom CSS design system (Kite-inspired)

## Pages

- `/login`, `/register`
- `/dashboard`
- `/chart`
- `/orders`
- `/trades`
- `/positions`
- `/holdings`
- `/funds`
- `/admin/instruments`

## Key UX decisions

1. **Kite-like shell**: sticky sidebar navigation + top search/indices strip.
2. **Data density first**: tables/cards prioritize trader-at-a-glance metrics.
3. **Page-specific identity**:
   - Positions = open exposure + MTM + risk monitor
   - Holdings = long-term allocation + day/total returns
4. **Integration ready**: mock adapter in `src/lib/api.ts` can be swapped with backend APIs.

## Run

```bash
cd frontend
npm install
npm run dev
```
