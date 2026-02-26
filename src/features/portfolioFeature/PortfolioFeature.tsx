import React, { useEffect } from 'react';

import PortfolioSummary from '../../components/PortfolioSummary';
import type { Stock } from '../../types/stock.types';
import { usePortfolioStore } from '../../stores/usePortfolio';

interface PortfolioFeatureProps {
  availableStocks: Stock[];
}

const PortfolioFeature: React.FC<PortfolioFeatureProps> = ({ availableStocks }) => {
  // Grab the load function from the store
  const loadPortfolio = usePortfolioStore((state) => state.loadPortfolio);

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