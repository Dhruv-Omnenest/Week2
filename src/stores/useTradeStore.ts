import { create } from "zustand";
import type { Trade } from "../types/stock.types";
import { trades } from "../data/stockData";
type NewTradeInput = Omit<Trade,"id" | "date">;
interface TradeStore{
    tradeHistory: Trade[];
    addTrade:(input:NewTradeInput) => void;
}
export const useTradeStore = create<TradeStore>((set) => ({
  tradeHistory: trades, 

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
















    
    
    
    
    
    
    
    
    
    
    
    
//     (set) {
//         tradeHistory: trades,


//         addTrade: function(input){
//             const newTrade:Trade{
//                 ...input,
//                 id:`t${Date.now()}`,
//                 date:new Date().toISOString().split("T")[0],
//             }
//         }

//         set(
//             function (prev) {
//                 return {tradeHistory:[newTrade,...prev.TradeHistory]};
//             }
//         )

//     }
// )