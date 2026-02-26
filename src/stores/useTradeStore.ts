// stores/useTradeStore.ts
import { create } from "zustand";
import type { Trade } from "../types/stock.types";
import { trades as initialTrades } from "../data/stockData";

export type NewTradeInput = Omit<Trade, "id" | "date">;

interface TradeStore {
  tradeHistory: Trade[];
  addTrade: (input: NewTradeInput) => void;
}

export const useTradeStore = create<TradeStore>((set) => ({
  tradeHistory: initialTrades,

  addTrade: (input) => {
    const newTrade: Trade = {
      ...input,
      id: `t${Date.now()}`,
      date: new Date().toISOString().split("T")[0],
    };

    set((state) => ({
      tradeHistory: [newTrade, ...state.tradeHistory],
    }));
  },
}));