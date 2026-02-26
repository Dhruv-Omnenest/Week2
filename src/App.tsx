import { lazy, useState } from 'react';
import SuspenseBoundary from './boundaries/SuspenseBoundary';
import type { Stock } from './types/stock.types';
import { stocks } from './data/stockData';
import CardGridSkeleton from './skeleton/CardGridSkeleton';
import TableSkeleton from './skeleton/TableSkeleton';
import { holdings } from './data/holdingsData';
import FormSkeleton from './skeleton/FormSkeleton';
import CurrencyTicker from './components/currencyTicker';
import StockComparePanel from './components/stockComparePanel';
const LiveQuotesFeature = lazy(() => import('./features/quotes/LiveQuotesFeature'));
const PortfolioFeature = lazy(() => import('./features/portfolioFeature/PortfolioFeature'));
const PositionsFeature = lazy(() => import('./features/postionFeatures/PositionFeatures'));
const HoldingsFeature = lazy(() => import('./features/holdings/HoldingsFeature'));
const TradeFeature = lazy(() => import('./features/tradeFeature/TradeFeature'));
function App() {
  const [selectedStock, setSelectedStock] = useState<Stock | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [sectorFilter, setSectorFilter] = useState('');
  const filteredStocks = stocks.filter((stock) => {
    const queryLower = searchQuery.toLowerCase();
    const searchMatches = 
      stock.symbol.toLowerCase().includes(queryLower) || 
      stock.name.toLowerCase().includes(queryLower);
    const sectorMatches = sectorFilter === '' || stock.sector === sectorFilter;
    return searchMatches && sectorMatches;
  });

  return (
    <div style={{ maxWidth: 1100, margin: '0 auto', padding: 24, fontFamily: 'Arial, sans-serif' }}>
      <CurrencyTicker />
      <h1 style={{ color: '#1E3A8A' }}>Stock Market Dashboard</h1>
      <StockComparePanel />

      <SuspenseBoundary
        fallback={
          <>
            <CardGridSkeleton count={filteredStocks.length || 3} />
            <TableSkeleton rows={5} cols={6} title="Live Quotes" />
          </>
        }
      >
        <LiveQuotesFeature
          stocks={filteredStocks}
          selectedStock={selectedStock}
          onSelectStock={setSelectedStock}
          onSearch={setSearchQuery}
          onFilterChange={setSectorFilter}
        />
      </SuspenseBoundary>

      <SuspenseBoundary fallback={<TableSkeleton rows={3} cols={3} title="Portfolio Summary" />}>
        <PortfolioFeature availableStocks={stocks} />
      </SuspenseBoundary>

      <SuspenseBoundary fallback={<TableSkeleton rows={5} cols={6} title="Positions" />}>
        <PositionsFeature />
      </SuspenseBoundary>

      <SuspenseBoundary fallback={<TableSkeleton rows={5} cols={5} title="Holdings" />}>
        <HoldingsFeature holdings={holdings} />
      </SuspenseBoundary>

      <SuspenseBoundary
        fallback={
          <>
            <TableSkeleton rows={3} cols={5} title="Trade History" />
            <FormSkeleton />
          </>
        }
      >
        <TradeFeature
          stocks={stocks}
          selectedStock={selectedStock}
        />
      </SuspenseBoundary>
    </div>
  );
}

export default App;