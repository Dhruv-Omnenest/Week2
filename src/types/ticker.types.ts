export interface BinanceTickerRaw {
  s: string;   // symbol
  c: string;   // last price
  p: string;   // price change
  P: string;   // price change percent
}

export interface Ticker {
  symbol: string;
  price: number;
  change: number;
  changePercent: number;
}