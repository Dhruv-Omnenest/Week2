import { useEffect, useState } from "react";
import type { Stock } from "../types/stock.types";

interface PortfolioState {
    holdings: Stock[];
    totalValue: number;
    gainLoss: number;
    isloading: boolean;
    error: string | null;
}

interface PortfolioSummaryProps {
    availableStocks: Stock[];
}

const PortfolioSummary: React.FC<PortfolioSummaryProps> = ({ availableStocks }) => {
    const [portfolio, setPortfolio] = useState<PortfolioState>({
        holdings: [],
        totalValue: 0,
        gainLoss: 0,
        isloading: true,
        error: null,
    });

    const [selectedSector, setSelectedSector] = useState<string>("All");
    const [sortBy, setSortBy] = useState<"price" | "change" | "volume">("price");

    useEffect(() => {
        const timer = setTimeout(() => {
            const topThree = availableStocks.slice(0, 3);
            const totalValue = topThree.reduce((sum, s) => sum + s.price * 10, 0);
            const totalCost = topThree.reduce((sum, s) => sum + (s.price - s.change) * 10, 0);

            setPortfolio({
                holdings: topThree,
                totalValue,
                gainLoss: totalValue - totalCost,
                isloading: false,
                error: null,
            });
        }, 800);
    }, [availableStocks]);


    const filtered = selectedSector === 'All' ? portfolio.holdings : portfolio.holdings.filter(s => s.sector === selectedSector);

    if (portfolio.isloading) return <p>Loading Portfolio :</p>
    if (portfolio.error) return <p>Error: {portfolio.error}</p>


    return (
        <div style={
            {
                border:'1px solid #D1D5DB',borderRadius:8,padding:16
            }
        }>

            <h2>Portfolio Summary:</h2>
            <p>Total Value: ${portfolio.totalValue.toLocaleString()}</p>
            <p style={{
                color:portfolio.gainLoss >=0 ? 'green': 'red'
            }}>
                Gain Loss : ${portfolio.gainLoss.toFixed(2)}
            </p>

            <select value={selectedSector} onChange={e=>setSelectedSector(e.target.value)}>
                <option>All</option>
                <option>Technology</option>
                <option>Finanace</option>
                <option>Automotive</option>
            </select>
            <ul>
                {
                    filtered.map(s=>(
                        <li key={s.id}> {s.symbol} : ${s.price.toFixed(2)}</li>
                    ))
                }
            </ul>
        </div>
    );
};

export default PortfolioSummary;