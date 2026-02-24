import { useState } from 'react';
import { stocks, trades } from './data/stockData';
import { holdings } from './data/holdingsData';
import { positions } from './data/positionData';
import type { Stock, Trade } from './types/stock.types';

import QuotesSection from './components/QuoteSection';
import HoldingsSection from './components/Holdings';
import TradeFeature from './components/TradeFeature';
import PositionsFeature from './features/postionFeatures/PositionFeatures';

function App() {
  const [selectedStock, setSelectedStock] = useState<Stock | null>(null);
  const [tradeHistory, setTradeHistory] = useState<Trade[]>(trades);

  const handleNewTrade = (input: Omit<Trade, 'id' | 'date'>) => {
    const newTrade: Trade = {
      ...input,
      id: `t${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
    };
    setTradeHistory(prev => [newTrade, ...prev]);
  };

  return (
    <main style={{ maxWidth: 1100, margin: '0 auto', padding: 24 }}>
      <h1 style={{ color: '#1E3A8A' }}>Stock Market Dashboard</h1>

      {/* 1. Market Data & Search */}
      <QuotesSection 
        stocks={stocks} 
        selectedStock={selectedStock} 
        onSelectStock={setSelectedStock} 
      />

      {/* 2. Portfolio & Assets */}
      <HoldingsSection 
        stocks={stocks} 
        holdings={holdings} 
      />

      <PositionsFeature positions={positions} />

      {/* 3. Trading Interface */}
      <TradeFeature
        stocks={stocks}
        tradeHistory={tradeHistory}
        selectedStock={selectedStock || stocks[0]}
        onSubmitTrade={handleNewTrade}
      />
    </main>
  );
}

export default App;