
import React from 'react';
import DataTable from '../../components/DataTable';
import type { Position } from '../../types/position.type';
import useInfiniteScroll from '../../customHooks/useInfiniteScroll';

interface Props {
  positions: Position[];
}

const PositionsFeature: React.FC<Props> = ({ positions }) => {
  const { visibleItems, bottomRef, hasMore } = useInfiniteScroll(positions, 5);

  return (
    <section>
      <h2 style={{ color: '#1E40AF' }}>Positions</h2>

      <DataTable<Position>
        data={visibleItems} 
        rowKey='id'
        columns={[
          { key: 'symbol', header: 'Symbol' },
          { key: 'qty', header: 'Qty' },
          {
            key: 'avgPrice', header: 'Avg Price',
            render: v => `$${Number(v).toFixed(2)}`
          },
          {
            key: 'ltp', header: 'LTP', sortable: true,
            render: v => `$${Number(v).toFixed(2)}`
          },
          {
            key: 'pnl', header: 'P&L', sortable: true,
            render: v => {
              const n = Number(v);
              return (
                <span style={{ color: n >= 0 ? '#166534' : '#991B1B' }}>
                  {n >= 0 ? '+' : ''}{n.toFixed(2)}%
                </span>
              );
            }
          },
          {
            key: 'pnlPct', header: 'P&L %', sortable: true,
            render: v => {
              const n = Number(v);
              return (
                <span style={{ color: n >= 0 ? '#166534' : '#991B1B' }}>
                  {n >= 0 ? '+' : ''}{n.toFixed(2)}%
                </span>
              );
            }
          },
        ]}
      />

      <div ref={bottomRef} style={{ height: 1 }} />
      <div style={{ padding: '16px', textAlign: 'center', color: '#6B7280', fontSize: '14px' }}>
        {hasMore ? (
          <p>Loading more positions...</p>
        ) : (
          <p>You've reached the end of your positions.</p>
        )}
      </div>
    </section>
  );
};

export default PositionsFeature;