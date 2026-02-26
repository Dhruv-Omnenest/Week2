import React from 'react';
import DataTable from '../../components/DataTable';
import type { Holding } from '../../types/holding.types';
import PortfolioPieChart from '../../components/PortfolioPieCharts';

import { useHoldingsStore } from '../../stores/useHoldings';
import HoldingComparePanel from '../../components/HoldingComparePanel';

const HoldingsFeature: React.FC = () => {
  const storeHoldings = useHoldingsStore((s) => s.holdings);
  const addHolding = useHoldingsStore((s) => s.addHolding);
  const compareList = useHoldingsStore((s) => s.compareList);
  const toggleCompare = useHoldingsStore((s) => s.toggleCompare);
  const removeHolding = useHoldingsStore((s) => s.removeHolding);

  const chartData = storeHoldings.map((h) => ({
    name: h.symbol,
    value: Number(h.currentValue) || 0,
  }));

  return (
    <div style={{ paddingBottom: '120px' }}>
      <h2 style={{ color: '#1E40AF' }}>Holdings</h2>

      <PortfolioPieChart data={chartData} />

      <DataTable<Holding>
        data={storeHoldings}
        rowKey="id"
        pageSize={10}
        columns={[
          {
            key: 'compare-btn' as any,
            header: 'Compare',
            render: (_, hold) => {
              const inCompare = compareList.some((h) => h.id === hold.id);
              return (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleCompare(hold);
                  }}
                  style={{
                    background: inCompare ? '#2563EB' : '#E5E7EB',
                    color: inCompare ? '#fff' : '#374151',
                    border: 'none',
                    borderRadius: 4,
                    padding: '4px 12px',
                    cursor: 'pointer',
                    fontSize: '12px',
                    fontWeight: 'bold',
                  }}
                >
                  {inCompare ? '✓' : '+'}
                </button>
              );
            },
          },
          { key: 'symbol', header: 'Symbol', sortable: true },
          { key: 'qty', header: 'Qty', sortable: true },
          {
            key: 'investedValue',
            header: 'Invested Value',
            sortable: true,
            render: (value) => '$' + Number(value).toLocaleString(),
          },
          {
            key: 'currentValue',
            header: 'Current Value',
            sortable: true,
            render: (value) => '$' + Number(value).toLocaleString(),
          },
          {
            key: 'totalReturn',
            header: 'Total Return',
            sortable: true,
            render: (value) => {
              const val = Number(value);
              const color = val >= 0 ? '#166534' : '#991B1B';
              return (
                <span style={{ color, fontWeight: 'bold' }}>
                  {val >= 0 ? '+' : ''}${val.toLocaleString()}
                </span>
              );
            },
          },
          {
            key: 'actions' as any,
            header: 'Actions',
            render: (_, hold) => (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  removeHolding(hold.id);
                }}
                style={{
                  color: '#DC2626',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '11px',
                  textDecoration: 'underline'
                }}
              >
                Remove
              </button>
            ),
          },
          {
            key: 'add' as any,
            header: 'Add +1',
            render: (_, hold) => (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  const currentPrice = hold.currentValue / hold.qty;
                  addHolding({
                    symbol: hold.symbol,
                    qty: 1,
                    investedValue: currentPrice,
                    currentValue: currentPrice,
                    totalReturn: 0
                  });
                }}
              >
                +1
              </button>
            )
          }
        ]}
      />

      <HoldingComparePanel />
    </div>
  );
};

export default HoldingsFeature;