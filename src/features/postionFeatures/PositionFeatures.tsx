import React from 'react';
import DataTable from '../../components/DataTable';

import { useStockStore } from '../../stores/useStockStore';
import type { Position } from '../../types/position.type';
import { usePositionsStore } from '../../stores/usePositions';
import StockComparePanel from '../../components/stockComparePanel';


function pnlCell(value: unknown, suffix: string = ''): React.ReactNode {
  const numberValue = Number(value);
  const isPositive = numberValue >= 0;
  const textColour = isPositive ? '#166534' : '#991B1B';

  return (
    <span style={{ color: textColour, fontWeight: 'bold' }}>
      {isPositive ? '+' : ''}
      {suffix === '%' ? '' : '$'}
      {numberValue.toFixed(2)}
      {suffix}
    </span>
  );
}
const PositionsFeature: React.FC = () => {
  const positions = usePositionsStore((s) => s.positions);
  const removePosition = usePositionsStore((s) => s.removePosition);
  const compareList = useStockStore((s) => s.compareList);
  const toggleCompare = useStockStore((s) => s.toggleCompare);
  const allStocks = useStockStore((s) => s.allStocks);

  return (
    <div style={{ paddingBottom: '100px' }}> 
      <h2 style={{ color: '#1E40AF' }}>Your Portfolio Positions</h2>
      
      <DataTable<Position>
        data={positions || []}
        rowKey="id"
        pageSize={10}
        columns={[
          {
            key: 'compare-btn-col' as any,
            header: 'Compare',
            render: (_, pos) => {
              const inCompare = compareList.some((s) => s.symbol === pos.symbol);
              
              return (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    const stockObj = allStocks.find((s) => s.symbol === pos.symbol);
                    if (stockObj) {
                      toggleCompare(stockObj);
                    } else {
                      console.warn(`Stock metadata not found for symbol: ${pos.symbol}`);
                    }
                  }}
                  style={{
                    background: inCompare ? '#1E40AF' : '#E5E7EB',
                    color: inCompare ? '#fff' : '#374151',
                    border: 'none',
                    borderRadius: 4,
                    padding: '4px 12px',
                    cursor: 'pointer',
                    fontSize: '12px',
                    fontWeight: 'bold',
                    transition: 'all 0.2s'
                  }}
                >
                  {inCompare ? '✓' : '+'}
                </button>
              );
            }
          },
          { key: 'symbol', header: 'Symbol', sortable: true },
          { key: 'qty', header: 'Qty', sortable: true },
          { 
            key: 'avgPrice', 
            header: 'Avg Price', 
            sortable: true,
            render: (v) => '$' + Number(v).toFixed(2) 
          },
          { 
            key: 'pnl', 
            header: 'P&L', 
            sortable: true,
            render: (v) => pnlCell(v) 
          },
          { 
            key: 'pnlPct', 
            header: 'P&L %', 
            sortable: true,
            render: (v) => pnlCell(v, '%') 
          },
          {
            key: 'remove-btn-col' as any, 
            header: 'Actions',
            render: (_, pos) => (
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  removePosition(pos.id);
                }}
                style={{ 
                  color: '#DC2626', 
                  border: '1px solid #FEE2E2', 
                  background: '#FEF2F2', 
                  padding: '4px 8px',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '11px'
                }}
              >
                Remove
              </button>
            )
          }
        ]}
      />
      <StockComparePanel />
    </div>
  );
};

export default PositionsFeature;