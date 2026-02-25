import React from "react";
import { useBinanceTicker } from "../customHooks/useBinanceTicker";

const CurrencyTicker: React.FC = () => {
  const data = useBinanceTicker();

  return (
    <div style={wrapperStyle}>
      <style>{animationStyle}</style>

      <div style={tickerStyle}>
        {[...data, ...data].map((item, index) => (
          <div
           style={itemStyle} 
           key={`${item.symbol}-${index}`}
          >
            <span style={symbolStyle}>{item.symbol}</span>

            <span style={priceStyle}>
              ${item.price.toLocaleString()}
            </span>

            <span
              style={
                item.change >= 0 ? positiveStyle : negativeStyle
              }
            >
              {item.change >= 0 ? "+" : ""}
              {item.change.toFixed(2)} ({item.changePercent.toFixed(2)}%)
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

const wrapperStyle: React.CSSProperties = {
  overflow: "hidden",
  background: "#0f172a",
  padding: "10px 0",
  whiteSpace: "nowrap",
};

const tickerStyle: React.CSSProperties = {
  display: "flex",
  animation: "scroll 25s linear infinite",
  willChange: "transform", 
  backfaceVisibility: "hidden",
};

const itemStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: "12px",
  padding: "0 40px",
  fontSize: "14px",
  fontWeight: 500,
  color: "white",
};

const symbolStyle: React.CSSProperties = {
  fontWeight: 600,
};

const priceStyle: React.CSSProperties = {
  color: "#e2e8f0",
};

const positiveStyle: React.CSSProperties = {
  color: "#16c784",
};

const negativeStyle: React.CSSProperties = {
  color: "#ea3943",
};

const animationStyle = `
@keyframes scroll {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-50%);
  }
}
`;

export default CurrencyTicker;