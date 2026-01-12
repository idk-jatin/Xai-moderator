export default function ProbabilityChart({ probs }) {
  return (
    <div className="card">
      <h2>Probabilities</h2>

      {Object.entries(probs).map(([k,v]) => (
        <div key={k} style={{ marginBottom: 12 }}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span>{k}</span>
            <span>{(v*100).toFixed(1)}%</span>
          </div>
          <div style={{ background:"#020617" }}>
            <div style={{
              width: `${v*100}%`,
              height: 10,
              background: `var(--${k})`
            }}/>
          </div>
        </div>
      ))}
    </div>
  );
}
