
import React from 'react';
import type { Stock, Trade } from '../types/stock.types';
import useInfiniteScroll from '../customHooks/useInfiniteScroll';
import DataTable from './DataTable';
import TradeForm from './TradeForm';
 
type NewTradeInput = Omit<Trade, 'id' | 'date'>;
 
interface TradeFeatureProps {
  tradeHistory:  Trade[];
  stocks:        Stock[];
  selectedStock: Stock | null;
  onSubmitTrade: (input: NewTradeInput) => void;
}
 
const TradeFeature: React.FC<TradeFeatureProps> = ({
  tradeHistory,
  stocks,
  selectedStock,
  onSubmitTrade,
}) => {
  const { visibleItems, bottomRef, hasMore } = useInfiniteScroll(tradeHistory, 10);
 
  return (
    <>
      <h2 style={{ color: '#1E40AF', marginTop: 32 }}>
        Trade History
        <span style={{ fontSize: 14, fontWeight: 'normal', color: '#6B7280', marginLeft: 12 }}>
          {visibleItems.length} of {tradeHistory.length} shown
        </span>
      </h2>
      <DataTable<Trade>
        data={visibleItems}
        rowKey="id"
        columns={[
          { key: 'symbol',   header: 'Symbol',  sortable: true },
          { key: 'type',     header: 'Type',
            render: function(value) {
              const colour = value === 'BUY' ? '#166534' : '#991B1B';
              return <strong style={{ color: colour }}>{String(value)}</strong>;
            }
          },
          { key: 'quantity', header: 'Qty',   sortable: true },
          { key: 'price',    header: 'Price', sortable: true,
            render: function(value) { return '$' + Number(value).toFixed(2); }
          },
          { key: 'date',     header: 'Date',  sortable: true },
        ]}
      />
      <div ref={bottomRef} style={{ height: 1 }} />
      {hasMore && (
        <p style={{ textAlign: 'center', color: '#6B7280', padding: '8px 0' }}>
          Scroll down to see more trades...
        </p>
      )}
      {hasMore === false && tradeHistory.length > 0 && (
        <p style={{ textAlign: 'center', color: '#9CA3AF', padding: '8px 0' }}>
          All {tradeHistory.length} trades loaded
        </p>
      )}
      <h2 style={{ color: '#1E40AF', marginTop: 32 }}>Place a Trade</h2>
      <TradeForm
        stocks={stocks}
        onSubmitTrade={onSubmitTrade}
        initialValues={selectedStock ?? {}}
      />
    </>
  );
};
 
export default TradeFeature;

