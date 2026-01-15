import ProbabilityBars from "./ProbabilityBars";
import AttentionText from "./AttentionText";

export default function MainModelPanel({ model }) {
  return (
    <div className="card" style={{ flexDirection: "column" }}>
      <h2>DistilBERT</h2>
      <h3> Prediction: <span style={{color: `var(--${model.label})`}}>{model.label.toUpperCase()}</span></h3>

      <ProbabilityBars probs={model.probabilities} />

      <h4>Token Attention Heatmap</h4>
      <AttentionText words={model.words} weights={model.attentions} />
    </div>
  );
}
