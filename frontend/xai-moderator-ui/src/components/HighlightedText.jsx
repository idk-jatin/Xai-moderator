export default function HighlightedText({ words, scores }) {
  return (
    <div className="card">
      <h2>Word importance as per prediction:</h2>

      <div style={{ lineHeight: "2.1em", fontSize: 17 }}>
        {words.map((w, i) => {
          const s = scores[i];
          const bg = `rgba(239,68,68,${s})`;

          return (
            <span key={i} style={{
              background: bg,
              padding: "0px 7px",
              margin: "3px",
              display: "inline-block"
            }}>
              {w}
            </span>
          );
        })}
      </div>
    </div>
  );
}
