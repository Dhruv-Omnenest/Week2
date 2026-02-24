
import { createBinanceSocket } from "../services/binance.service";
import type { Ticker } from "../types/ticker.types";
import { useEffect, useState } from "react";

const FILTER_SYMBOLS = ["BTCUSDT", "ETHUSDT", "BNBUSDT", "SOLUSDT"];

export const useBinanceTicker = () => {
  const [tickers, setTickers] = useState<Ticker[]>([]);

  useEffect(() => {
    const socket = createBinanceSocket((data) => {
        const filtered = data   .filter((item) => FILTER_SYMBOLS.includes(item.s))
        .map((item) => ({
          symbol: item.s,
          price: parseFloat(item.c),
          change: parseFloat(item.p),
          changePercent: parseFloat(item.P),
        }));

      setTickers(filtered);
    });

    return () => socket.close();
  }, []);

  return tickers;
};