import { create } from "zustand";
import type { Stock } from "../types/stock.types";
interface PortfolioState {
  holdings:   Stock[];
  totalValue: number;
  gainLoss:   number;
  isLoading:  boolean;
  error:      string | null;
}
interface PortfolioStore extends PortfolioState {
  loadPortfolio: (availableStocks: Stock[]) => void;
}

export const usePortfolioStore = create<PortfolioStore>()(function(set) {
  return {
    holdings:   [],
    totalValue: 0,
    gainLoss:   0,
    isLoading:  true,
    error:      null,

    loadPortfolio: function(availableStocks) {
      set({ isLoading: true, error: null });
      setTimeout(function() {
        try {
          const topThree   = availableStocks.slice(0, 3);
          const totalValue = topThree.reduce(function(sum, s) {
            return sum + s.price * 10;
          }, 0);
          const totalCost = topThree.reduce(function(sum, s) {
            return sum + (s.price - s.change) * 10;
          }, 0);
          set({
            holdings:   topThree,
            totalValue: totalValue,
            gainLoss:   totalValue - totalCost,
            isLoading:  false,
            error:      null,
          });
        } catch (err) {
          set({ isLoading: false, error: "Failed to load portfolio." });
        }
      }, 800);
    },
  };
});
