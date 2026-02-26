import { create } from 'zustand';
import { holdings as initialHoldings } from '../data/holdingsData';
import type { Holding } from '../types/holding.types';

interface HoldingsStore {
  holdings: Holding[];
  compareList: Holding[];
  // Add this to allow the Feature component to sync data
  setHoldings: (holdings: Holding[]) => void; 
  addHolding: (newHold: Omit<Holding, 'id'>) => void;
  removeHolding: (id: string) => void;
  toggleCompare: (holding: Holding) => void;
  clearCompare: () => void;
}

export const useHoldingsStore = create<HoldingsStore>((set) => ({
  holdings: initialHoldings,
  compareList: [],

  // Implementation for syncing data
  setHoldings: (holdings) => set({ holdings }),

  addHolding: (newHold) =>
    set((state) => {
      const existingIndex = state.holdings.findIndex(
        (h) => h.symbol.trim().toUpperCase() === newHold.symbol.trim().toUpperCase()
      );

      if (existingIndex !== -1) {
        const existing = state.holdings[existingIndex];
        const updatedHoldings = [...state.holdings];

        const totalQty = Number(existing.qty) + Number(newHold.qty);
        const totalInvested = Number(existing.investedValue) + Number(newHold.investedValue);
        const totalCurrent = Number(existing.currentValue) + Number(newHold.currentValue);

        updatedHoldings[existingIndex] = {
          ...existing,
          qty: totalQty,
          investedValue: totalInvested,
          currentValue: totalCurrent,
          totalReturn: totalCurrent - totalInvested,
        };

        return { holdings: updatedHoldings };
      }

      const holdingWithId: Holding = {
        ...newHold,
        id: `h-${Math.random().toString(36).slice(2, 9)}`,
      };

      return { holdings: [...state.holdings, holdingWithId] };
    }),

  removeHolding: (id) =>
    set((state) => ({
      holdings: state.holdings.filter((h) => h.id !== id),
      compareList: state.compareList.filter((h) => h.id !== id),
    })),

  toggleCompare: (holding) =>
    set((state) => {
      const exists = state.compareList.some((h) => h.id === holding.id);
      return {
        compareList: exists
          ? state.compareList.filter((h) => h.id !== holding.id)
          : [...state.compareList, holding],
      };
    }),

  clearCompare: () => set({ compareList: [] }),
}));