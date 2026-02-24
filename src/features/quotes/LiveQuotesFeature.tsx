import React from 'react';
import type { Stock}    from '../../types/stock.types';
import StockCard    from '../../components/StockCard';
import SearchBar    from '../../components/SearchBar';
import DataTable    from '../../components/DataTable';
 
interface LiveQuotesFeatureProps {
  stocks:         Stock[];     
  selectedStock:  Stock | null; 
  onSelectStock:  (stock: Stock) => void;  
  onSearch:       (query: string) => void;  
  onFilterChange: (sector: string) => void; 
}
 
const LiveQuotesFeature: React.FC<LiveQuotesFeatureProps> = ({
  stocks,
  selectedStock,
  onSelectStock,
  onSearch,
  onFilterChange,
}) => {
  return (
    <>
      <SearchBar
        onSearch={onSearch}
        onFilterChange={onFilterChange}
        placeholder="Search by symbol or name..."
      />
 
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 24 }}>
        {stocks.map(function(stock) {
          return (
            <StockCard
              key={stock.id}
              stock={stock}
              isSelected={selectedStock?.id === stock.id}
              onSelect={onSelectStock}
            />
          );
        })}
      </div>
 
      <h2 style={{ color: '#1E40AF' }}>Live Quotes</h2>
      <DataTable<Stock>
        data={stocks}
        rowKey="id"
        onRowClick={onSelectStock}
        emptyMessage="No stocks match your search."
        columns={[
          { key: 'symbol',    header: 'Symbol',   sortable: true },
          { key: 'name',      header: 'Company' },
          { key: 'price',     header: 'Price',    sortable: true,
            render: function(value) {
              return '$' + Number(value).toFixed(2);
            }
          },
          { key: 'changePct', header: 'Change %', sortable: true,
            render: function(value) {
              var numberValue = Number(value);
              var isPositive  = numberValue >= 0;
              var colour      = isPositive ? 'green' : 'red';
              var prefix      = isPositive ? '+' : '';
              return <span style={{ color: colour }}>{prefix}{numberValue.toFixed(2)}%</span>;
            }
          },
          { key: 'volume', header: 'Volume',
            render: function(value) { return Number(value).toLocaleString(); }
          },
          { key: 'sector', header: 'Sector' },
        ]}
      />
    </>
  );
};
 
export default LiveQuotesFeature;
