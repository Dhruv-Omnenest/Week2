import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

interface PieItem {
  name: string;
  value: number;
}

interface Props {
  data: PieItem[];
}

const COLORS = [
  "#2563EB",
  "#16A34A",
  "#F59E0B",
  "#DC2626",
  "#7C3AED",
  "#0891B2",
];

export default function PortfolioPieChart({ data }: Props) {
  if (!data.length) {
    return <p>No allocation data</p>;
  }

  return (
    <div style={{ width: "100%", height: 500, marginBottom: 24 }}>
      <h3>Portfolio Allocation</h3>

      <ResponsiveContainer width="100%" height={350}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            outerRadius={120}
            label
          >
            {data.map((_, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>

          <Tooltip
            formatter={(value) =>
              typeof value === "number"
                ? `$${value.toLocaleString()}`
                : value
            }
          />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}