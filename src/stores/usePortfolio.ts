import { create } from "zustand";
import type { Stock } from "../types/stock.types";

interface PortfolioState {
  holdings: Stock[];
  totalValue: number;
  gainLoss: number;
  isLoading: boolean;
  error: string | null;
}

interface PortfolioStore extends PortfolioState {
  loadPortfolio: (availableStocks: Stock[]) => void;
}

export const usePortfolioStore = create<PortfolioStore>()((set) => ({
  holdings: [],
  totalValue: 0,
  gainLoss: 0,
  isLoading: true,
  error: null,

  loadPortfolio: (availableStocks) => {
    if (!availableStocks || !Array.isArray(availableStocks) || availableStocks.length === 0) {
      set({
        isLoading: false,
        holdings: [],
        totalValue: 0,
        gainLoss: 0,
        error: availableStocks ? null : "No stock data provided"
      });
      return;
    }

    set({ isLoading: true, error: null });

    setTimeout(() => {
      try {
        const stocksToProcess = availableStocks || [];
        const topThree = stocksToProcess.slice(0, 3);

        const totalValue = topThree.reduce((sum, s) => sum + (s?.price || 0) * 10, 0);
        const totalCost = topThree.reduce((sum, s) => sum + ((s?.price || 0) - (s?.change || 0)) * 10, 0);

        set({
          holdings: topThree,
          totalValue,
          gainLoss: totalValue - totalCost,
          isLoading: false,
          error: null,
        });
      } catch (err) {
        console.error("Calculation error:", err);
        set({ isLoading: false, error: "Failed to calculate portfolio values." });
      }
    }, 800);
  },
}));