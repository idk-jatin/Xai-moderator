export default function AttentionText({ words, weights }) {
  const max = Math.max(...weights);

  return (
    <div className="attention-text">
      {words.map((w, i) => {
        const norm = weights[i] / max;

        return (
          <span key={i} className="attn-word">
            <span
              className="attn-highlight"
              style={{
                background: `rgba(255, 80, 80, ${norm})`
              }}
            >
              {w}
            </span>

            <span className="attn-tooltip">
              attention: {weights[i].toFixed(4)}
            </span>
          </span>
        );
      })}
    </div>
  );
}
