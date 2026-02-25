import type { Stock } from '../types/stock.types';
import { useStockStore } from '../stores/useStockStore';
interface StockCardProps {
  stock:       Stock;
  onSelect?:   (stock: Stock) => void;
  isSelected?: boolean;
}

const StockCard: React.FC<StockCardProps> = ({
  stock,
  onSelect,
  isSelected = false,
}) => {

  const toggleCompare = useStockStore(function (s) { return s.toggleCompare; });
  const compareList = useStockStore((s) => s.compareList);
  const inCompare = compareList.some(s => s.id === stock.id);
  const isPositive = stock.change >= 0;

  return (
    <div
      onClick={function () { onSelect?.(stock); }}
      style={{
        position:        'relative',
        border:          isSelected ? '2px solid #1E40AF' : '1px solid #D1D5DB',
        borderRadius:    8,
        padding:         16,
        cursor:          'pointer',
        backgroundColor: isSelected ? '#DBEAFE' : '#fff',
      }}
    >
      <button
        onClick={function (e) {
          e.stopPropagation();
          toggleCompare(stock);
        }}
        style={{
          position:     'absolute',
          top:          8,
          right:        8,
          background:   inCompare ? '#1E40AF' : '#E5E7EB',
          color:        inCompare ? '#fff'    : '#374151',
          border:       'none',
          borderRadius: 4,
          padding:      '2px 8px',
          fontSize:     11,
          cursor:       'pointer',
          fontWeight:   inCompare ? 'bold' : 'normal',
        }}
      >
        {inCompare ? '✓ Compare' : '+ Compare'}
      </button>
      <h3 style={{ margin: '0 0 8px 0', paddingRight: 80 }}>
        {stock.symbol} - {stock.name}
      </h3>

      <p style={{ margin: '4px 0' }}>
        Price: ${stock.price.toFixed(2)}
      </p>

      <p style={{ margin: '4px 0', color: isPositive ? 'green' : 'red' }}>
        {isPositive ? '+' : ''}{stock.change.toFixed(2)}
        ({stock.changePct.toFixed(2)}%)
      </p>

      <small style={{ color: '#6B7280' }}>
        Sector: {stock.sector}
      </small>

    </div>
  );
};

export default StockCard;