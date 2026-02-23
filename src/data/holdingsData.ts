import type { Holding} from "../types/holding.types";

 
export const holdings: Holding[] = [
  { id: 'h1', symbol: 'AAPL', qty: 10,
    investedValue: 1750.00, currentValue: 1893.00, totalReturn:  143.00 },
  { id: 'h2', symbol: 'MSFT', qty: 5,
    investedValue: 1800.00, currentValue: 1894.50, totalReturn:   94.50 },
  { id: 'h3', symbol: 'TSLA', qty: 8,
    investedValue: 2120.00, currentValue: 1988.00, totalReturn: -132.00 },
  { id: 'h4', symbol: 'GOOGL', qty: 15,
    investedValue: 2175.00, currentValue: 2127.00, totalReturn:  -48.00 },
  { id: 'h5', symbol: 'JPM',  qty: 20,
    investedValue: 3840.00, currentValue: 3928.00, totalReturn:   88.00 },
];
