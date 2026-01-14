import { useState } from "react";

export default function TextInput({ onAnalyze }) {
  const [text, setText] = useState("");
  const [wordCount, setWordCount] = useState(0);

  const handleChange = (e) => {
    const value = e.target.value;
    const words = value.trim().split(/\s+/).filter(Boolean);

    if (words.length <= 120) {
      setText(value);
      setWordCount(words.length);
    }
  };

  return (
    <div className="card" style={{ marginTop: 20 }}>
      <textarea
        style={{ width: "88%", height: "100px", resize: "none" }}
        rows={5}
        placeholder="Enter text (max 120 words)..."
        value={text}
        onChange={handleChange}
      />

      <div style={{ display: "flex", justifyContent: "space-between", marginTop: 10 }}>
        <span>{wordCount} / 120 words</span>
        <button onClick={() => onAnalyze(text)}>Analyze</button>
      </div>
    </div>
  );
}
