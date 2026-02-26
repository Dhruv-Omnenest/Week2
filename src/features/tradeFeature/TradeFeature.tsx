import React from 'react';
import type { Trade } from '../../types/stock.types';
import useInfiniteScroll from '../../customHooks/useInfiniteScroll';
import { useTradeStore } from '../../stores/useTradeStore';
import { useStockStore } from '../../stores/useStockStore';
import DataTable from '../../components/DataTable';
import TradeForm from '../../components/TradeForm';

const TradeFeature: React.FC = () => {
  const stocks = useStockStore((s) => s.allStocks);
  const selectedStock = useStockStore((s) => s.selectedStock);

  const tradeHistory = useTradeStore((state) => state.tradeHistory);
  const addTrade = useTradeStore((state) => state.addTrade);

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
          { key: 'symbol', header: 'Symbol', sortable: true },
          {
            key: 'type', header: 'Type',
            render: (value) => {
              const colour = value === 'BUY' ? '#166534' : '#991B1B';
              return <strong style={{ color: colour }}>{String(value)}</strong>;
            }
          },
          { key: 'quantity', header: 'Qty', sortable: true },
          {
            key: 'price', header: 'Price', sortable: true,
            render: (value) => '$' + Number(value).toFixed(2)
          },
          { key: 'date', header: 'Date', sortable: true },
        ]}
      />

      <div ref={bottomRef} style={{ height: 1 }} />

      {hasMore && (
        <p style={{ textAlign: 'center', color: '#6B7280', padding: '8px 0' }}>
          Scroll down to see more trades...
        </p>
      )}

      <h2 style={{ color: '#1E40AF', marginTop: 32 }}>Place a Trade</h2>
      <TradeForm
        stocks={stocks}
        onSubmitTrade={addTrade}
        initialValues={selectedStock ?? {}}
      />
    </>
  );
};

export default TradeFeature;