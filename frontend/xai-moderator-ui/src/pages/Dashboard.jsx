import { useState } from "react";
import { get_inference } from "../api";

import InputCard from "../components/InputCard";
import PipelineFlow from "../components/PipelineFlow";
import VerdictCard from "../components/VerdictCard";

import MainModelPanel from "../components/MainModelPanel";
import ModelPanel from "../components/ModelPanel";

import "../styles/dashboard.css";

export default function Dashboard() {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [stage, setStage] = useState(0);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  async function handlePrediction() {
    if (!text.trim() || loading) return;

    setLoading(true);
    setResult(null);
    setError("");
    setStage(0);

    const advance = (i) =>
      new Promise((r) =>
        setTimeout(() => {
          setStage(i);
          r();
        }, 450)
      );

    try {
      await advance(1); 
      await advance(2); 
      await advance(3); 
      await advance(4); 
      await advance(5); 

      const data = await get_inference(text);

      await advance(6); 
      setResult(data);
    } catch (e) {
      console.error(e);
      setError("Backend not reachable");
    }

    setLoading(false);
  }

  return (
    <div style={{ padding: 18, maxWidth: 1400, margin: "0 auto" }}>
      <h1 style={{ marginBottom: 0 }}>
        <span style={{ color: "#22c55e",fontFamily:'monospace',fontSize:40 }}>Xai</span> Moderator
      </h1>
      <InputCard
        text={text}
        setText={setText}
        onAnalyze={handlePrediction}
        loading={loading}
      />
      {loading && (
        <>
          <h3 style={{ marginTop: 220 }}>{""}</h3>
          <PipelineFlow stage={stage} />
        </>
      )}

      {error && <p style={{ color: "#ef4444" }}>{error}</p>}
      {result && (
        <>
          <VerdictCard result={result} />

          <MainModelPanel model={result.distilbert} />
          <div className="model-grid" style={{ marginTop: 10 }}>
            <ModelPanel
              title="TF-IDF"
              model={result.tfidf}
              showKeywords
            />

            <ModelPanel title="BiLSTM" model={result.bilstm} />
          </div>
        </>
      )}
    </div>
  );
}
