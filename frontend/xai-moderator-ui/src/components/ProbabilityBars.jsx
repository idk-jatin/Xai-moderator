import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

const COLORS = {
  hatespeech: "#ef4444",
  offensive: "#f59e0b",
  normal: "#22c55e",
};

function CustomTooltip({ active, payload }) {
  if (active && payload && payload.length) {
    return (
      <div style={{
        background: "#050505",
        border: "1px solid #1f2933",
        padding: "8px 12px",
        borderRadius: 8,
        fontSize: 13
      }}>
        <b>{payload[0].payload.label}</b>
        <div>{payload[0].value.toFixed(2)}%</div>
      </div>
    );
  }
  return null;
}

export default function ProbabilityBars({ probs }) {
  const data = Object.keys(probs).map(k => ({
    label: k,
    value: +(probs[k] * 100).toFixed(2),
  }));

  return (
    <div style={{ width: "100%", height: 180 }}>
      <ResponsiveContainer>
        <BarChart
          data={data}
          layout="vertical"
          margin={{ left: 10, right: 20, top: 10, bottom: 10 }}
        >
          <XAxis
            type="number"
            domain={[0, 100]}
            tick={{ fill: "#9ca3af", fontSize: 12 }}
            axisLine={false}
            tickLine={false}
          />

          <YAxis
            type="category"
            dataKey="label"
            width={85}
            tick={{ fill: "#e5e7eb", fontSize: 13 }}
            axisLine={false}
            tickLine={false}
          />

          <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(255,255,255,0.04)" }} />

          <Bar
            dataKey="value"
            radius={[0, 8, 8, 0]}
            isAnimationActive
            animationDuration={900}
          >
            {data.map((entry, index) => (
              <Cell
                key={index}
                fill={COLORS[entry.label] || "#38bdf8"}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
