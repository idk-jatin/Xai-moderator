import ProbabilityBars from "./ProbabilityBars";

export default function ModelCard({ title, label, probabilities, color }) {
  return (
    <div className="model-card" style={{ borderTop: `4px solid ${color}` }}>
      <h3>{title}</h3>
      <p><b>Prediction:</b> {label}</p>
      <ProbabilityBars probs={probabilities} />
    </div>
  );
}
