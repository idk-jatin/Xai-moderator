export default function PredictionCard({ result }) {
  const color =
    result.label === "hatespeech" ? "var(--hate)" :
    result.label === "offensive" ? "var(--offensive)" :
    "var(--normal)";

  return (
    <div className="card">
      <h2>Prediction</h2>
      <p style={{ fontSize: 36, fontWeight: 700, color }}>
        {result.label.toUpperCase()}
      </p>
    </div>
  );
}
