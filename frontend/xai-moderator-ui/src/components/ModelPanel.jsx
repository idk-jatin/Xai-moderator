import ProbabilityBars from "./ProbabilityBars";
import TfidfKeywords from "./TfidfKeywords";

export default function ModelPanel({ title, model, showKeywords=false }) {
  return (
    <div className="card" style={{ flexDirection: "column" }}>
      <h2>{title}</h2>
        <h3> Prediction: <span style={{color: `var(--${model.label})`}}>{model.label.toUpperCase()}</span></h3>
      <ProbabilityBars probs={model.probabilities} />

      {showKeywords && (
        <>
          <h4>TF-IDF Keywords</h4>
          <TfidfKeywords keywords={model.keywords} />
        </>
      )}
    </div>
  );
}
