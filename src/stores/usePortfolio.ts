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
  isLoading: true, // Starts loading
  error: null,

 loadPortfolio: (availableStocks) => {
  // 1. Immediate check: if it's null, undefined, or not an array, stop loading.
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
      // 2. Double-check inside the timeout to be safe
      const stocksToProcess = availableStocks || [];
      const topThree = stocksToProcess.slice(0, 3);
      
      const totalValue = topThree.reduce((sum, s) => {
        // 3. Ensure price exists before calculating
        return sum + (s?.price || 0) * 10;
      }, 0);

      const totalCost = topThree.reduce((sum, s) => {
        // 4. Ensure change exists before calculating
        return sum + ((s?.price || 0) - (s?.change || 0)) * 10;
      }, 0);

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