import React from 'react';
import { useHoldingsStore } from '../stores/useHoldings';
import type { Holding } from '../types/holding.types';
const HOLDING_COMPARE_ROWS: {
  label: string;
  key: keyof Holding;
  format?: (v: unknown) => string;
}[] = [
    { label: 'Quantity', key: 'qty' },
    {
      label: 'Invested Value',
      key: 'investedValue',
      format: (v) => '$' + Number(v).toLocaleString(undefined, { minimumFractionDigits: 2 }),
    },
    {
      label: 'Current Value',
      key: 'currentValue',
      format: (v) => '$' + Number(v).toLocaleString(undefined, { minimumFractionDigits: 2 }),
    },
    {
      label: 'Total Return',
      key: 'totalReturn',
      format: (v) => {
        const val = Number(v);
        return (val >= 0 ? '+' : '') + '$' + val.toFixed(2);
      },
    },
  ];
const HoldingComparePanel: React.FC = () => {
  const compareList = useHoldingsStore((s) => s.compareList);
  const clearCompare = useHoldingsStore((s) => s.clearCompare);
  const toggleCompare = useHoldingsStore((s) => s.toggleCompare);

  if (compareList.length < 2) return null;

  return (
    <div style={{
      position: 'fixed',
      bottom: 0, left: 0, right: 0,
      background: '#fff',
      borderTop: '2px solid #2563EB',
      padding: '16px 24px',
      zIndex: 1000,
      boxShadow: '0 -4px 12px rgba(0,0,0,0.12)',
      maxHeight: '40vh',
      overflowY: 'auto',
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
        <h3 style={{ margin: 0, color: '#1E40AF', fontSize: 16 }}>
          Comparing {compareList.length} Holdings
        </h3>
        <button
          onClick={clearCompare}
          style={{
            background: '#DBEAFE',
            color: '#1E40AF',
            border: 'none',
            borderRadius: 4,
            padding: '6px 14px',
            cursor: 'pointer',
            fontWeight: 'bold',
          }}
        >
          Clear All
        </button>
      </div>

      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
        <thead>
          <tr style={{ backgroundColor: '#2563EB', color: '#fff' }}>
            <th style={{ padding: '8px 12px', textAlign: 'left' }}>Metric</th>
            {compareList.map((hold) => (
              <th key={hold.id} style={{ padding: '8px 12px', textAlign: 'center' }}>
                {hold.symbol}
                <button
                  onClick={() => toggleCompare(hold)}
                  style={{
                    marginLeft: 8,
                    background: 'rgba(255,255,255,0.2)',
                    border: 'none',
                    color: '#fff',
                    borderRadius: '50%',
                    cursor: 'pointer',
                    width: '18px', height: '18px'
                  }}
                >✕</button>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {HOLDING_COMPARE_ROWS.map((row, rowIndex) => (
            <tr key={row.key} style={{ backgroundColor: rowIndex % 2 === 0 ? '#fff' : '#F8FAFC' }}>
              <td style={{ padding: '10px 12px', fontWeight: 'bold', borderRight: '1px solid #E2E8F0' }}>
                {row.label}
              </td>
              {compareList.map((hold) => {
                const rawValue = hold[row.key];
                const isNumeric = typeof rawValue === 'number';
                const allValues = compareList.map(h => h[row.key] as number);
                const isBest = isNumeric && rawValue === Math.max(...allValues);

                return (
                  <td key={hold.id} style={{
                    padding: '10px 12px',
                    textAlign: 'center',
                    backgroundColor: isBest ? '#DBEAFE' : 'transparent',
                    fontWeight: isBest ? 'bold' : 'normal',
                  }}>
                    {row.format ? row.format(rawValue) : String(rawValue)}
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

export default HoldingComparePanel;