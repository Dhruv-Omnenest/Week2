import { create } from 'zustand';
import type { Position } from '../types/position.type';
import { positions as initialPositions } from '../data/positionData';

interface PositionsStore {
  positions: Position[];
  addPosition: (newPos: Omit<Position, 'id'>) => void;
  removePosition: (id: string) => void;
  updatePosition: (id: string, updates: Partial<Position>) => void;
}

export const usePositionsStore = create<PositionsStore>((set) => ({
  positions: initialPositions,

  addPosition: (newPos) => set((state) => {
    const existingIndex = state.positions.findIndex(
      p => p.symbol.trim().toUpperCase() === newPos.symbol.trim().toUpperCase()
    );

    if (existingIndex !== -1) {
      const existing = state.positions[existingIndex];
      const updatedPositions = [...state.positions];
      const totalQty = existing.qty + newPos.qty;
      const weightedAvg = ((existing.avgPrice * existing.qty) + (newPos.avgPrice * newPos.qty)) / totalQty;

      updatedPositions[existingIndex] = {
        ...existing,
        qty: totalQty,
        avgPrice: weightedAvg,
      };
      return { positions: updatedPositions };
    }

    // New position logic
    const positionWithId: Position = { 
      ...newPos, 
      id: `p-${Math.random().toString(36).substr(2, 9)}` 
    };
    return { positions: [...state.positions, positionWithId] };
  }),

  removePosition: (id) => set((state) => ({
    positions: state.positions.filter(p => p.id !== id)
  })),

  updatePosition: (id, updates) => set((state) => ({
    positions: state.positions.map(p => p.id === id ? { ...p, ...updates } : p)
  }))
}));