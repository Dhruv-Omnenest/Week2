
import React, { useState } from "react";
import type {Stock, Trade} from '../types/stock.types';

//Partial<T>: every field becomes optional - great for editing forms
type EditableStocks = Partial<Stock>;

//Pick<T, K>: keep only these fields from Stock
type StockSummary = Pick<Stock, 'symbol' | 'name' | 'price' | 'sector'>;

//Omit<T, K>: remove 'id' and 'date' - used when user creates a new trade
type NewTradeInput = Omit<Trade, 'id' | 'date'>;

interface TradeFormProps {
    stocks: StockSummary[]; //pick only the fields we need
    onSubmitTrade: (trade: NewTradeInput) => void; //omit - no id/date yet
    initialValues?: EditableStocks;
}

const TradeForm: React.FC<TradeFormProps> = ({
    stocks, 
    onSubmitTrade,
    initialValues = {},
}) => {
    const [form, setForm] = useState<NewTradeInput>({
        stockId: initialValues.id ?? '',
        symbol: initialValues.symbol ?? '',
        type: 'BUY',
        quantity: 1,
        price: initialValues.price ?? 0,
    });

    //?? -> null operator : if not price -> 0 else price
    const handleStockExchange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selected = stocks.find(s => s.symbol === e.target.value);
        if (selected) {
            setForm(prev => ({
                ...prev,
                symbol: selected.symbol,
                price: selected.price,
            }));
        }
    }

    const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        onSubmitTrade(form); //passes NewTradeInput (no id/date)
    };

    return (
        <form onSubmit={handleSubmit} style={{display: 'flex', flexDirection: 'column', gap: 12}}>
            <h3>Place a Trade</h3>

            <select value={form.symbol} onChange={handleStockExchange}>
                <option value="">--Select Stock--</option>
                {stocks.map(s => (
                    <option key={s.symbol} value={s.symbol}> 
                        {s.symbol} - {s.name}
                    </option>
                ))}
            </select>

            <div style={{display: 'flex', gap: 8}}>
                {(['BUY', 'SELL'] as const).map(t => (
                    <button key={t} type="button" onClick={() => setForm(prev => ({...prev, type: t}))} style={{background: form.type === t ? '#1e40af' : '#e5e7eb', color: form.type === t ? '#fff' : '#374151', padding: '6px 16px'}}>
                        {t}
                    </button>
                ))}
            </div>

            <input type="number" min={1} value={form.quantity}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setForm(prev => ({...prev, quantity: Number(e.target.value)}))} placeholder="Quantity"/>

            <p>Price: ${form.price.toFixed(2)} | Total: ${(form.price*form.quantity).toFixed(2)}</p>
            <button type="submit" disabled={!form.symbol}>Submit Trade</button>
        </form>
    )
}

export default TradeForm