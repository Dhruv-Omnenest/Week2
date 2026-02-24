import type { BinanceTickerRaw } from "../types/ticker.types";

export const createBinanceSocket = (
  onMessage: (data: BinanceTickerRaw[]) => void
) => {
  const socket = new WebSocket(
    "wss://stream.binance.com/ws/!ticker@arr"
  );

  socket.onopen = () => {
    console.log("Binance WebSocket Connected");
  };

  socket.onmessage = (event) => {
    const parsed: BinanceTickerRaw[] = JSON.parse(event.data);
    onMessage(parsed);
  };

  socket.onerror = (error) => {
    console.error(" WebSocket Error:", error);
  };

  socket.onclose = (event) => {
    console.log("WebSocket Closed:", event.reason);
  };

  return socket;
};