import DataTable from './DataTable';
import PortfolioSummary from './PortfolioSummary';
import type { Stock } from '../types/stock.types';
import type { Holding } from '../types/holding.types';

interface Props {
  stocks: Stock[];
  holdings: Holding[];
}
export default function HoldingsSection({  holdings }: Props) {
  return (
    <section>
      <PortfolioSummary />

      <h3>Holdings</h3>
      <DataTable<Holding> data={holdings} rowKey="id" columns={
        [
          { key: 'symbol', header: 'Symbol', },
          { key: 'qty', header: 'Qty', },
          {
            key: 'investedValue', header: 'Invested Value', sortable: true,
            render: v => `$${Number(v).toLocaleString()}`
          },
          {
            key: 'currentValue', header: 'Current Value', sortable: true,
            render: v => `$${Number(v).toLocaleString()}`
          },
        ]
      } />
    </section>
  );
}