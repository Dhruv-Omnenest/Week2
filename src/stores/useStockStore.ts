import { create } from 'zustand';

import type { Stock } from '../types/stock.types';

import { stocks as allStocksData } from '../data/stockData';
interface StockStore {
  allStocks:      Stock[];      
  searchQuery:    string;        
  sectorFilter:   string;     
  selectedStock:  Stock | null;  
  filteredStocks: Stock[];                                 
  compareList:    Stock[];      

  setSearchQuery:   (query: string)        => void; 
  setSectorFilter:  (sector: string)       => void; 
  setSelectedStock: (stock: Stock | null)  => void; 
  toggleCompare:    (stock: Stock)         => void; 
  clearCompare:     ()                     => void; 
  isInCompare:      (id: string)           => boolean; 
}


function computeFiltered(
  stocks: Stock[],
  query:  string,
  sector: string,
): Stock[] {
  return stocks.filter(function (stock) {
    const q = query.toLowerCase();
    const matchesSearch =
      stock.symbol.toLowerCase().includes(q) ||
      stock.name.toLowerCase().includes(q);
    const matchesSector = sector === '' || stock.sector === sector;
    return matchesSearch && matchesSector;
  });
}

export const useStockStore = create<StockStore>(function (set, get) {
  return {
    allStocks:      allStocksData,  
    searchQuery:    '',           
    sectorFilter:   '',            
    selectedStock:  null,           
    filteredStocks: allStocksData,  
    compareList:    [],            
    setSearchQuery: function (query) {
      set({ searchQuery: query });
      const { allStocks, sectorFilter } = get();
      set({ filteredStocks: computeFiltered(allStocks, query, sectorFilter) });
    },
    setSectorFilter: function (sector) {
      set({ sectorFilter: sector });

      const { allStocks, searchQuery } = get();
      set({ filteredStocks: computeFiltered(allStocks, searchQuery, sector) });
    },
    setSelectedStock: function (stock) {
      set({ selectedStock: stock });
    },

    toggleCompare: function (stock) {
      set(function (prev) {
        const alreadyIn = prev.compareList.some(function (s) {
          return s.id === stock.id;
        });

        if (alreadyIn) {
          return {
            compareList: prev.compareList.filter(function (s) {
              return s.id !== stock.id;
            }),
          };
        }

        if (prev.compareList.length >= 4) {
          alert('You can compare up to 4 stocks at a time.');
          return prev;
        }

        return {
          compareList: [...prev.compareList, stock],
        };
      });
    },
    clearCompare: function () {
      set({ compareList: [] });
    },
    isInCompare: function (id) {
      return get().compareList.some(function (s) {
        return s.id === id;
      });
    },

  };
});