import React from 'react';
import { usePortfolioStore } from '../stores/usePortfolio';

const PortfolioSummary: React.FC = () => {
  const state = usePortfolioStore();

  if (!state) return <div>Store not found</div>;

  const { holdings = [], totalValue = 0, gainLoss = 0, isLoading, error } = state;

  if (isLoading) return <div>Calculating portfolio...</div>;
  if (error) return <div style={{ color: 'red' }}>{error}</div>;

  return (
    <div className="portfolio-summary-card">
      <div className="stats">

        <p>Total Value: <strong>${totalValue?.toFixed(2) ?? '0.00'}</strong></p>
        <p>Gain/Loss: 
          <span style={{ color: (gainLoss ?? 0) >= 0 ? 'green' : 'red' }}>
            {(gainLoss ?? 0) >= 0 ? ' +' : ' '}{gainLoss?.toFixed(2) ?? '0.00'}
          </span>
        </p>
      </div>
      
      <ul>
        {(holdings || []).map((stock) => (
          <li key={stock?.symbol || Math.random()}>
            {stock?.name} ({stock?.symbol}): ${stock?.price}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PortfolioSummary;