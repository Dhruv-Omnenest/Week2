import React from 'react';
import  { useStockStore } from '../stores/useStockStore';
import type { Stock }    from '../types/stock.types';
const COMPARE_ROWS: {
  label:   string;
  key:     keyof Stock;
  format?: (v: unknown) => string;
}[] = [
  {
    label:  'Price',
    key:    'price',
    format: function (v) { return '$' + Number(v).toFixed(2); },
  },
  {
    label:  'Change',
    key:    'change',
    format: function (v) { return '$' + Number(v).toFixed(2); },
  },
  {
    label:  'Change %',
    key:    'changePct',
    format: function (v) { return Number(v).toFixed(2) + '%'; },
  },
  {
    label:  'Volume',
    key:    'volume',
    format: function (v) { return Number(v).toLocaleString(); },
  },
  {
    label:  'Market Cap',
    key:    'marketCap',
    format: function (v) { return '$' + (Number(v) / 1_000_000_000).toFixed(1) + 'B'; },
  },
  {
    label: 'Sector',
    key:   'sector',
  },
];


const StockComparePanel: React.FC = () => {
  const compareList   = useStockStore(function (s) { return s.compareList; });
  const clearCompare  = useStockStore(function (s) { return s.clearCompare; });
  const toggleCompare = useStockStore(function (s) { return s.toggleCompare; });
  if (compareList.length < 2) return null;

  return (
    <div
      style={{
        position:    'fixed',
        bottom:      0,
        left:        0,
        right:       0,
        background:  '#fff',
        borderTop:   '2px solid #1E40AF',
        padding:     '16px 24px',
        zIndex:      1000,
        boxShadow:   '0 -4px 12px rgba(0,0,0,0.12)',
        maxHeight:   '40vh',
        overflowY:   'auto',
      }}
    >

      <div
        style={{
          display:        'flex',
          justifyContent: 'space-between',
          alignItems:     'center',
          marginBottom:   12,
        }}
      >
        <h3 style={{ margin: 0, color: '#1E3A8A', fontSize: 16 }}>
          Comparing {compareList.length} Stock{compareList.length > 1 ? 's' : ''}
        </h3>

        <button
          onClick={clearCompare}
          style={{
            background:   '#FEE2E2',
            color:        '#991B1B',
            border:       'none',
            borderRadius: 4,
            padding:      '6px 14px',
            cursor:       'pointer',
            fontSize:     13,
            fontWeight:   'bold',
          }}
        >
          Clear All
        </button>
      </div>

      <table
        style={{
          width:           '100%',
          borderCollapse:  'collapse',
          fontSize:        13,
        }}
      >
        <thead>
          <tr style={{ backgroundColor: '#1E3A8A', color: '#fff' }}>
            <th
              style={{
                padding:   '8px 12px',
                textAlign: 'left',
                width:     130,
                fontWeight: 'bold',
              }}
            >
              Metric
            </th>
            {compareList.map(function (stock) {
              return (
                <th
                  key={stock.id}
                  style={{
                    padding:   '8px 12px',
                    textAlign: 'center',
                    fontWeight: 'bold',
                    minWidth:  110,
                  }}
                >
                  <span>{stock.symbol}</span>
                  <button
                    onClick={function () { toggleCompare(stock); }}
                    style={{
                      marginLeft:  8,
                      background:  'rgba(255,255,255,0.15)',
                      border:      '1px solid rgba(255,255,255,0.4)',
                      color:       '#fff',
                      borderRadius: 3,
                      padding:     '1px 5px',
                      cursor:      'pointer',
                      fontSize:    10,
                      lineHeight:  '14px',
                    }}
                  >
                    ✕
                  </button>
                  <div style={{ fontSize: 10, fontWeight: 'normal', opacity: 0.8, marginTop: 2 }}>
                    {stock.name}
                  </div>
                </th>
              );
            })}
          </tr>
        </thead>

        <tbody>
          {COMPARE_ROWS.map(function (row, rowIndex) {
            return (
              <tr
                key={row.key}
                style={{
                  backgroundColor: rowIndex % 2 === 0 ? '#fff' : '#F8FAFC',
                }}
              >
                <td
                  style={{
                    padding:    '7px 12px',
                    fontWeight: 'bold',
                    color:      '#374151',
                    borderRight: '1px solid #E5E7EB',
                  }}
                >
                  {row.label}
                </td>

                {compareList.map(function (stock) {
                  const rawValue    = stock[row.key];
                  const displayText = row.format
                    ? row.format(rawValue)
                    : String(rawValue);
                  const isNumeric = typeof rawValue === 'number';
                  const allNums   = isNumeric
                    ? compareList.map(function (s) { return s[row.key] as number; })
                    : [];
                  const maxVal    = isNumeric ? Math.max(...allNums) : null;
                  const isBest    = isNumeric && rawValue === maxVal;

                  return (
                    <td
                      key={stock.id}
                      style={{
                        padding:         '7px 12px',
                        textAlign:       'center',
                        color:           isBest ? '#166534' : '#111827',
                        fontWeight:      isBest ? 'bold'    : 'normal',
                        backgroundColor: isBest ? '#D1FAE5' : 'transparent',
                        borderRight:     '1px solid #F3F4F6',
                        transition:      'background-color 0.2s ease',
                      }}
                    >
                      {isBest && <span style={{ marginRight: 4 }}>▲</span>}
                      {displayText}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>

    </div>
  );
};

export default StockComparePanel;