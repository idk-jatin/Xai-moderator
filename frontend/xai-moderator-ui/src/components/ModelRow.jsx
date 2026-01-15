import ProbabilityBars from "./ProbabilityBars";

export default function ModelRow({ name, label, probabilities, color }) {
  return (
    <div className="model-row" style={{ borderLeft: `4px solid ${color}` }}>
      <div className="model-info">
        <h4>{name}</h4>
        <p>{label}</p>
      </div>

      <div className="model-bars">
        <ProbabilityBars probs={probabilities} />
      </div>
    </div>
  );
}
