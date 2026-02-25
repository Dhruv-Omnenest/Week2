import { create } from 'zustand';
import type { Position } from '../types/position.type';
import { positions as initialPositions } from '../data/positionData';

interface PositionsStore {
  positions: Position[];
  compareList: Position[];

  addPosition: (newPos: Omit<Position, 'id'>) => void;
  removePosition: (id: string) => void;
  updatePosition: (id: string, updates: Partial<Position>) => void;

  toggleCompare: (position: Position) => void;
  clearCompare: () => void;
}

export const usePositionsStore = create<PositionsStore>((set) => ({
  positions: initialPositions,
  compareList: [],
  addPosition: (newPos) =>
    set((state) => {
      const existingIndex = state.positions.findIndex(
        (p) =>
          p.symbol.trim().toUpperCase() ===
          newPos.symbol.trim().toUpperCase()
      );

      if (existingIndex !== -1) {
        const existing = state.positions[existingIndex];
        const updatedPositions = [...state.positions];

        const totalQty = existing.qty + newPos.qty;
        const weightedAvg =
          (existing.avgPrice * existing.qty +
            newPos.avgPrice * newPos.qty) /
          totalQty;

        updatedPositions[existingIndex] = {
          ...existing,
          qty: totalQty,
          avgPrice: weightedAvg,
        };

        return { positions: updatedPositions };
      }

      const positionWithId: Position = {
        ...newPos,
        id: `p-${Math.random().toString(36).slice(2, 9)}`,
      };

      return {
        positions: [...state.positions, positionWithId],
      };
    }),

  removePosition: (id) =>
    set((state) => ({
      positions: state.positions.filter((p) => p.id !== id),
      compareList: state.compareList.filter((p) => p.id !== id),
    })),

  updatePosition: (id, updates) =>
    set((state) => ({
      positions: state.positions.map((p) =>
        p.id === id ? { ...p, ...updates } : p
      ),
    })),
  toggleCompare: (position) =>
    set((state) => {
      const exists = state.compareList.some(
        (p) => p.id === position.id
      );

      if (exists) {
        return {
          compareList: state.compareList.filter(
            (p) => p.id !== position.id
          ),
        };
      }

      return {
        compareList: [...state.compareList, position],
      };
    }),

  clearCompare: () =>
    set({
      compareList: [],
    }),
}));