export default function InputCard({ text, setText, onAnalyze, loading }) {
  return (
    <div className="card" style={{ alignItems: "center" }}>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter text to analyze..."
      />
      <button onClick={onAnalyze} disabled={loading}>
        {loading ? "Analyzing..." : "Analyze"}
      </button>
    </div>
  );
}
