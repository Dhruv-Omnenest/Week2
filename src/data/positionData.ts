import type { Position } from "../types/position.type";

 
export const positions: Position[] = [
  { id: 'p1', symbol: 'AAPL', qty: 10,
    avgPrice: 175.00, ltp: 189.30,
    pnl: 143.00, pnlPct: 8.17 },
  { id: 'p2', symbol: 'MSFT', qty: 5,
    avgPrice: 360.00, ltp: 378.90,
    pnl: 94.50, pnlPct: 5.25 },
  { id: 'p3', symbol: 'TSLA', qty: 8,
    avgPrice: 265.00, ltp: 248.50,
    pnl: -132.00, pnlPct: -6.23 },
  { id: 'p4', symbol: 'GOOGL', qty: 15,
    avgPrice: 145.00, ltp: 141.80,
    pnl: -48.00, pnlPct: -2.21 },
  { id: 'p5', symbol: 'JPM',  qty: 20,
    avgPrice: 192.00, ltp: 196.40,
    pnl: 88.00, pnlPct: 2.29 },
];
