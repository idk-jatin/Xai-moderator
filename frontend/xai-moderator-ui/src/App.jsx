import { useState } from "react";
import { analyzeText } from "./api";
import Dashboard from "./pages/Dashboard";

export default function App() {
  const [result, setResult] = useState(null);

  const onAnalyze = async (text) => {
    const data = await analyzeText(text);
    setResult(data);
  };

  return <Dashboard result={result} onAnalyze={onAnalyze} />;
}
