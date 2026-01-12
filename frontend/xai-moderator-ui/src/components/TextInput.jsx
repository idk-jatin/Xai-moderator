import { useState } from "react";

export default function TextInput({ onAnalyze }) {
  const [text, setText] = useState("");

  return (
    <div className="card" style={{ marginTop: 20 }}>
      <textarea
      style={{width:"88%",height:"100px",resize:"none"}}
        rows={5}
        placeholder="Enter text to analyze..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <div style={{ textAlign: "right", marginTop: 10 }}>
        <button onClick={() => onAnalyze(text)}>Analyze</button>
      </div>
    </div>
  );
}
