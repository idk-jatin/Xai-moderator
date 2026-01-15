export default function RiskMeter({ avg_prob, label }) {
  const conf = avg_prob[label];
  const risk = 1 - conf;

  let text = "Low";
  let color = "rgb(46, 204, 113)";

  if (risk > 0.3) { text = "Medium"; color = "#f1c40f"; }
  if (risk > 0.5) { text = "High"; color = "#e74c3c"; }

  return (
    <div>
      <p><b>Risk:</b> <span style={{ color }}>{text}</span></p>
      <div className="risk-bar">
        <div className="risk-fill" style={{ width: `${risk*100}%`, background: color }} />
      </div>
    </div>
  );
}
