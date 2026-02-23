import type { Holding } from "../types/holding.types";


export const holdings: Holding[] = [
  {
    id: 'h1', symbol: 'AAPL', qty: 10,
    investedValue: 1750.00, currentValue: 1893.00, totalReturn: 143.00
  },
  {
    id: 'h2', symbol: 'MSFT', qty: 5,
    investedValue: 1800.00, currentValue: 1894.50, totalReturn: 94.50
  },
  {
    id: 'h3', symbol: 'TSLA', qty: 8,
    investedValue: 2120.00, currentValue: 1988.00, totalReturn: -132.00
  },
  {
    id: 'h4', symbol: 'GOOGL', qty: 15,
    investedValue: 2175.00, currentValue: 2127.00, totalReturn: -48.00
  },
  {
    id: 'h5', symbol: 'JPM', qty: 20,
    investedValue: 3840.00, currentValue: 3928.00, totalReturn: 88.00
  },
  {
    id: 'h6', symbol: 'AMZN', qty: 3,
    investedValue: 1050.00, currentValue: 987.00, totalReturn: -63.00
  },
  {
    id: 'h7', symbol: 'NVDA', qty: 12,
    investedValue: 1440.00, currentValue: 1584.00, totalReturn: 144.00
  },
  {
    id: 'h8', symbol: 'META', qty: 7,
    investedValue: 1400.00, currentValue: 1330.00, totalReturn: -70.00
  },
  {
    id: 'h9', symbol: 'NFLX', qty: 4,
    investedValue: 2000.00, currentValue: 1800.00, totalReturn: -200.00
  },
  {
    id: 'h10', symbol: 'DIS', qty: 6,
    investedValue: 1200.00, currentValue: 1260.00, totalReturn: 60.00
  },
  {
    id: 'h11', symbol: 'INTC', qty: 18,
    investedValue: 1620.00, currentValue: 1440.00, totalReturn: -180.00
  },
  {
    id: 'h12', symbol: 'PYPL', qty: 9,
    investedValue: 1350.00, currentValue: 1170.00, totalReturn: -180.00
  }, {
    id: 'h13', symbol: 'ADBE', qty: 5,
    investedValue: 1250.00, currentValue: 1100.00, totalReturn: -150.00
  }, {
    id: 'h14', symbol: 'CRM', qty: 7,
    investedValue: 1400.00, currentValue: 1260.00, totalReturn: -140.00
  }, {
    id: 'h15', symbol: 'ORCL', qty: 10,
    investedValue: 1000.00, currentValue: 900.00, totalReturn: -100.00
  }
];
