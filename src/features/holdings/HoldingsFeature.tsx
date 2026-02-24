import React from 'react';
import DataTable   from '../../components/DataTable';
import type { Holding } from '../../types/holding.types';
import PortfolioPieChart from '../../components/PortfolioPieCharts';
 
interface HoldingsFeatureProps {
  holdings: Holding[];
}
 
function pnlCell(value: unknown, suffix: string = ''): React.ReactNode {
  var numberValue  = Number(value);
  var isPositive   = numberValue >= 0;
  var textColour   = isPositive ? '#166534' : '#991B1B';
  var prefix       = isPositive ? '+' : '';
  var currencySign = suffix === '%' ? '' : '$';
  return (
    <span style={{ color: textColour, fontWeight: 'bold' }}>
      {prefix}{currencySign}{numberValue.toFixed(2)}{suffix}
    </span>
  );
}
 
const HoldingsFeature: React.FC<HoldingsFeatureProps> = ({ holdings }) => {
    const chartData = holdings.map((h) => ({
    name: h.symbol,
    value: Number(h.currentValue) || 0,
  }));
  return (
    <>
      <h2 style={{ color: '#1E40AF' }}>Holdings</h2>
       <PortfolioPieChart data={chartData} />
      <DataTable<Holding>
        data={holdings}
        rowKey="id"
        //filterKey="symbol"
        pageSize={10}
        columns={[
          { key: 'symbol',        header: 'Symbol',         sortable: true },
          { key: 'qty',           header: 'Qty',            sortable: true },
          { key: 'investedValue', header: 'Invested Value', sortable: true,
            render: function(value) { return '$' + Number(value).toLocaleString(); }
          },
          { key: 'currentValue',  header: 'Current Value',  sortable: true,
            render: function(value) { return '$' + Number(value).toLocaleString(); }
          },
          { key: 'totalReturn',   header: 'Total Return',   sortable: true,
            render: function(value) { return pnlCell(value); }
          },
        ]}
      />
    </>
  );
};
 
export default HoldingsFeature;
