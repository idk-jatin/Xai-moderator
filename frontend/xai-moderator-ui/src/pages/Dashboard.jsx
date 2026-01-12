import TextInput from "../components/TextInput";
import PredictionCard from "../components/PredictionCard";
import ProbabilityChart from "../components/ProbabilityChart";
import HighlightedText from "../components/HighlightedText";


export default function Dashboard({ result, onAnalyze }) {
  return (
    <div style={{ maxWidth: 1200, margin: "0 auto", padding: 30 }}>
      
      <h1 style={{ fontSize: 32 }}>Xai Moderator</h1>
      <p style={{ color: "#9ca3af" }}>
        Explainable Hate Speech Detection System
      </p>
      <TextInput onAnalyze={onAnalyze} />

      {result && (
        <>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginTop: 30 }}>
            <PredictionCard result={result} />
            <ProbabilityChart probs={result.probabilities} />
          </div>

          <div style={{ marginTop: 30 }}>
           <HighlightedText words={result.words} scores={result.attention} />
          </div>
        </>
      )}
    </div>
  );
}
