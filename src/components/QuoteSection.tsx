import { useState } from 'react';
import SearchBar from './SearchBar';
import StockCard from './StockCard';
import DataTable from './DataTable';
import type { Stock } from '../types/stock.types';

interface Props {
  stocks: Stock[];
  onSelectStock: (stock: Stock) => void;
  selectedStock: Stock | null;
}

export default function QuotesSection({ stocks, onSelectStock, selectedStock }: Props) {
  const [searchQuery, setSearchQuery] = useState('');
  const [sectorFilter, setSectorFilter] = useState('');

  const filteredStocks = stocks.filter(s => {
    const matchesSearch = s.symbol.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         s.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSector = !sectorFilter || s.sector === sectorFilter;
    return matchesSearch && matchesSector;
  });

  return (
    <section>
      <SearchBar onSearch={setSearchQuery} onFilterChange={setSectorFilter} />
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 24 }}>
        {filteredStocks.map(stock => (
          <StockCard 
            key={stock.id} 
            stock={stock} 
            isSelected={selectedStock?.id === stock.id} 
            onSelect={onSelectStock} 
          />
        ))}
      </div>

      <DataTable<Stock>
        data={filteredStocks}
        rowKey="id"
        onRowClick={onSelectStock}
        columns={[
          { key: 'symbol', header: 'Symbol' },
          { key: 'name', header: 'Company' },
          { key: 'price', header: 'Price', render: v => `$${Number(v).toFixed(2)}` },
          { 
            key: 'changePct', 
            header: 'Change %', 
            render: v => <span style={{ color: Number(v) >= 0 ? 'green' : 'red' }}>{Number(v).toFixed(2)}%</span> 
          },
        ]}
      />
    </section>
  );
}