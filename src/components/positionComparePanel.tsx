import React from 'react';
import { usePositionsStore } from '../stores/usePositions';
import type { Position } from '../types/position.type';

const POSITION_COMPARE_ROWS: {
  label: string;
  key: keyof Position;
  format?: (v: unknown) => string;
}[] = [
  { label: 'Quantity', key: 'qty' },
  {
    label: 'Avg Price',
    key: 'avgPrice',
    format: (v) => '$' + Number(v).toFixed(2),
  },
  {
    label: 'P&L',
    key: 'pnl',
    format: (v) => '$' + Number(v).toFixed(2),
  },
  {
    label: 'P&L %',
    key: 'pnlPct',
    format: (v) => Number(v).toFixed(2) + '%',
  },
];

const PositionComparePanel: React.FC = () => {
  const compareList = usePositionsStore((s) => s.compareList);
  const clearCompare = usePositionsStore((s) => s.clearCompare);
  const toggleCompare = usePositionsStore((s) => s.toggleCompare);

  if (compareList.length < 2) return null;

  return (
    <div
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        background: '#fff',
        borderTop: '2px solid #059669',
        padding: '16px 24px',
        zIndex: 1000,
        boxShadow: '0 -4px 12px rgba(0,0,0,0.12)',
        maxHeight: '40vh',
        overflowY: 'auto',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 12,
        }}
      >
        <h3 style={{ margin: 0, color: '#065F46', fontSize: 16 }}>
          Comparing {compareList.length} Position
          {compareList.length > 1 ? 's' : ''}
        </h3>

        <button
          onClick={clearCompare}
          style={{
            background: '#ECFDF5',
            color: '#065F46',
            border: 'none',
            borderRadius: 4,
            padding: '6px 14px',
            cursor: 'pointer',
            fontSize: 13,
            fontWeight: 'bold',
          }}
        >
          Clear All
        </button>
      </div>

      <table
        style={{
          width: '100%',
          borderCollapse: 'collapse',
          fontSize: 13,
        }}
      >
        <thead>
          <tr style={{ backgroundColor: '#059669', color: '#fff' }}>
            <th style={{ padding: '8px 12px', textAlign: 'left' }}>
              Metric
            </th>

            {compareList.map((pos) => (
              <th
                key={pos.id}
                style={{
                  padding: '8px 12px',
                  textAlign: 'center',
                }}
              >
                {pos.symbol}

                <button
                  onClick={() => toggleCompare(pos)}
                  style={{
                    marginLeft: 8,
                    background: 'rgba(255,255,255,0.2)',
                    border: '1px solid rgba(255,255,255,0.4)',
                    color: '#fff',
                    borderRadius: 3,
                    padding: '1px 5px',
                    cursor: 'pointer',
                    fontSize: 10,
                  }}
                >
                  ✕
                </button>
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {POSITION_COMPARE_ROWS.map((row, rowIndex) => (
            <tr
              key={row.key}
              style={{
                backgroundColor: rowIndex % 2 === 0 ? '#fff' : '#F0FDF4',
              }}
            >
              <td
                style={{
                  padding: '7px 12px',
                  fontWeight: 'bold',
                  borderRight: '1px solid #E5E7EB',
                }}
              >
                {row.label}
              </td>

              {compareList.map((pos) => {
                const rawValue = pos[row.key];
                const displayText = row.format
                  ? row.format(rawValue)
                  : String(rawValue);

                const isNumeric = typeof rawValue === 'number';
                const allNums = isNumeric
                  ? compareList.map((p) => p[row.key] as number)
                  : [];
                const maxVal = isNumeric ? Math.max(...allNums) : null;
                const isBest = isNumeric && rawValue === maxVal;

                return (
                  <td
                    key={pos.id}
                    style={{
                      padding: '7px 12px',
                      textAlign: 'center',
                      backgroundColor: isBest ? '#D1FAE5' : 'transparent',
                      fontWeight: isBest ? 'bold' : 'normal',
                    }}
                  >
                    {isBest && <span style={{ marginRight: 4 }}>▲</span>}
                    {displayText}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PositionComparePanel;