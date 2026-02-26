import React, { useEffect } from 'react';

import PortfolioSummary from '../../components/PortfolioSummary';
import { usePortfolioStore } from '../../stores/usePortfolio';
import { useStockStore } from '../../stores/useStockStore';

const PortfolioFeature: React.FC = () => {
  // Grab the load function from the store
  const loadPortfolio = usePortfolioStore((state) => state.loadPortfolio);
  const availableStocks = useStockStore((s) => s.allStocks);

  // When the component mounts or stocks change, update the store
  useEffect(() => {
    loadPortfolio(availableStocks);
  }, [availableStocks, loadPortfolio]);

  return (
    <div style={{ padding: '20px' }}>
      <h2 style={{ color: '#1E40AF' }}>Portfolio Summary</h2>
      <PortfolioSummary />
    </div>
  );
};

export default PortfolioFeature;