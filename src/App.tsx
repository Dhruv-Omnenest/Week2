import { lazy } from 'react';
import SuspenseBoundary from './boundaries/SuspenseBoundary';
import CardGridSkeleton from './skeleton/CardGridSkeleton';
import TableSkeleton from './skeleton/TableSkeleton';
import FormSkeleton from './skeleton/FormSkeleton';
import CurrencyTicker from './components/currencyTicker';
import StockComparePanel from './components/stockComparePanel';
import { useStockStore } from './stores/useStockStore';

const LiveQuotesFeature = lazy(() => import('./features/quotes/LiveQuotesFeature'));
const PortfolioFeature = lazy(() => import('./features/portfolioFeature/PortfolioFeature'));
const PositionsFeature = lazy(() => import('./features/postionFeatures/PositionFeatures'));
const HoldingsFeature = lazy(() => import('./features/holdings/HoldingsFeature'));
const TradeFeature = lazy(() => import('./features/tradeFeature/TradeFeature'));

function App() {
  const filteredStocks = useStockStore((s) => s.filteredStocks);

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
        <LiveQuotesFeature />
      </SuspenseBoundary>

      <SuspenseBoundary fallback={<TableSkeleton rows={3} cols={3} title="Portfolio Summary" />}>
        <PortfolioFeature />
      </SuspenseBoundary>

      <SuspenseBoundary fallback={<TableSkeleton rows={5} cols={6} title="Positions" />}>
        <PositionsFeature />
      </SuspenseBoundary>

      <SuspenseBoundary fallback={<TableSkeleton rows={5} cols={5} title="Holdings" />}>
        <HoldingsFeature />
      </SuspenseBoundary>

      <SuspenseBoundary
        fallback={
          <>
            <TableSkeleton rows={3} cols={5} title="Trade History" />
            <FormSkeleton />
          </>
        }
      >
        <TradeFeature />
      </SuspenseBoundary>
    </div>
  );
}

export default App;