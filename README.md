# Zerodha Lite (Paper Trading Terminal)

Zerodha Lite is an educational paper-trading simulator that emulates a broker-style trading terminal with watchlists, orders, positions, funds, and P&L. It **does not** place real trades or connect to any broker/exchange.

## Disclaimer

**Educational purpose only. Not a broker. Not investment advice.**

This project simulates trading activity using **paper money** and **simulated or delayed market data**. No real money, rewards, or contests are involved.

## Compliance & Data Usage

- Market data must be simulated or appropriately delayed/authorized.
- If any real data is used, ensure explicit rights/permissions.
- The app must display the disclaimer in the UI and README.
- No features that imply regulated broker behavior or real-money trading.

## Scope (Phase 1)

### In Scope

- Authentication & user accounts (JWT + refresh rotation)
- Instrument master + admin CSV upload
- Watchlists with LTP/percent change
- Quotes (simulated or delayed) + WebSocket updates
- Candles and charting endpoints
- Order management system (market/limit, MIS/CNC)
- Execution simulator + fills
- Positions, holdings, funds, and P&L
- Risk engine with pre-trade checks
- Audit trail for key actions

### Out of Scope

- Real broker connectivity or exchange routing
- Real-money deposits/withdrawals
- Recommendations/advice
- Advanced derivatives margin calculations (Phase 2)

## Roles

- **Trader**: watchlists, quotes, charting, orders, positions, holdings, funds, P&L
- **Admin**: instrument list management, risk limits, audit log access

## Functional Requirements (Highlights)

### Orders & Execution

- Supported order types: `MARKET`, `LIMIT`
- Sides: `BUY`, `SELL`
- Products: `CNC`, `MIS`
- Validity: `DAY`
- Order status lifecycle: `CREATED → VALIDATED → OPEN/ACCEPTED → FILLED/PARTIALLY_FILLED → CANCELLED/REJECTED`
- Market orders fill immediately; limit orders fill on price crossing
- Cancel allowed only for `OPEN` orders
- Tradebook returns fills; orderbook returns all orders with filters

### Risk Engine

- Pre-trade checks: max quantity per symbol, max open orders, max exposure (MIS/CNC), max daily loss
- Deterministic, structured rejection codes (e.g., `INSUFFICIENT_FUNDS`, `EXCEEDS_QTY_LIMIT`)

### Portfolio & P&L

- Positions API includes quantity, avg price, LTP, realized/unrealized P&L
- Holdings API includes quantity, avg cost, current value, P&L
- Funds API includes cash balance, available, margin used, realized P&L today
- End-of-day MIS square-off/mark-to-market closure

### Data & Storage

- Primary DB: PostgreSQL
- Redis for quote caching and WS pub/sub
- Orders/trades retained for 90+ days (configurable)
- Candle history capped (e.g., last 30 days of 1m candles)

## UX Requirements (Next.js)

Pages:

- `/login`
- `/dashboard` (watchlist + quote stream)
- `/chart/[symbol]` (chart + buy/sell modal)
- `/orders`, `/trades`, `/positions`, `/holdings`, `/funds`
- `/admin/instruments` (admin only)

UI behavior:

- Buy/Sell modal shows order type, qty, price (limit), product (MIS/CNC)
- Show available funds/margin context
- Live updates for quotes, order status, and P&L via WS/polling

## Non-Functional Requirements

- Quotes API handles 200–1000 symbols efficiently
- WS supports 1k concurrent clients target
- Orders are idempotent via `Idempotency-Key`
- Password hashing with bcrypt/argon2
- Rate limiting on auth endpoints
- Structured logs + metrics (order latency, fill latency, tick rate)

## Planned Services

- **Backend**: Spring Boot + PostgreSQL + Redis (quotes/pub-sub)
- **Frontend**: Next.js

## Testing Expectations

Backend:

- Unit tests: P&L calculations, risk checks, fill engine crossing logic
- Integration tests: place order → fill → position updates → funds updates
- Load tests: 500 WS clients + 2k quote updates/min

Frontend:

- Component tests for order modal validation
- E2E: login → add watchlist → place order → see filled → see position

## Next Steps

- Scaffold backend (Spring Boot, Flyway, JWT auth)
- Scaffold frontend (Next.js, protected routes)
- Implement simulated market data service
- Define core domain models (orders, trades, positions)


## Frontend Implementation Status

A complete Next.js frontend scaffold has been added in [`frontend/`](frontend) with:

- Auth pages (`/login`, `/register`)
- App shell and primary pages (`/dashboard`, `/chart`, `/orders`, `/trades`, `/positions`, `/holdings`, `/funds`, `/admin/instruments`)
- React Query for async query/caching
- Zustand for client-side auth state
- TypeScript domain models and mock API layer for rapid backend integration

See `frontend/README.md` for detailed architecture and run instructions.
