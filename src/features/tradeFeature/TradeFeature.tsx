import React from 'react';
import DataTable        from '../../components/DataTable';
import TradeForm        from '../../components/TradeForm';
import type { Stock, Trade } from '../../types/stock.types';
export type NewTradeInput = Omit<Trade, 'id' | 'date'>;
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
  return (
    <>
      <h2 style={{ color: '#1E40AF', marginTop: 32 }}>Trade History</h2>
      <DataTable<Trade>
        data={tradeHistory}
        rowKey="id"
        pageSize={10}
        columns={[
          { key: 'symbol',   header: 'Symbol',  sortable: true },
          { key: 'type',     header: 'Type',
            render: function(value) {
              var isBuy   = value === 'BUY';
              var colour  = isBuy ? '#166534' : '#991B1B';
              return <strong style={{ color: colour }}>{String(value)}</strong>;
            }
          },
          { key: 'quantity', header: 'Qty',     sortable: true },
          { key: 'price',    header: 'Price',   sortable: true,
            render: function(value) { return '$' + Number(value).toFixed(2); }
          },
          { key: 'date',     header: 'Date',    sortable: true },
        ]}
      />
 
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
