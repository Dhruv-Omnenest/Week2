import DataTable from './DataTable';
import PortfolioSummary from './PortfolioSummary';
import type { Stock } from '../types/stock.types';
import type { Holding } from '../types/holding.types';
import type { Position } from '../types/position.type';

interface Props {
  stocks: Stock[];
  holdings: Holding[];
  positions: Position[];
}

export default function HoldingsSection({ stocks, holdings, positions }: Props) {
  return (
    <section>
      <PortfolioSummary availableStocks={stocks} />
      
      <h3>Holdings</h3>
      <DataTable<Holding> data={holdings} rowKey="id" columns={[/* ... Same columns as before ... */]} />

      <h3>Positions</h3>
      <DataTable<Position> data={positions} rowKey="id" columns={[/* ... Same columns as before ... */]} />
    </section>
  );
}