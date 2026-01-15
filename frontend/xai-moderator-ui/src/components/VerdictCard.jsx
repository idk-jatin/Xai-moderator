import ConflictBadge from "./ConflictBadge";
import RiskMeter from "./RiskMeter";
import ProbabilityBars from "./ProbabilityBars";
import '../styles/dashboard.css'
export default function VerdictCard({ result }) {
  const finalLabel = result.ensemble.soft;
  const conf = (result.ensemble.avg_prob[finalLabel] * 100).toFixed(2);

  return (
    <div className="card verdict-card">
      <div className="verdict-block">
        <div style={{ fontSize: 14, opacity: 0.7 }}>Prediction</div>

        <div
          className="final-label"
          style={{ color: `var(--${finalLabel})` }}
        >
          {finalLabel.toUpperCase()}
        </div>

        <div style={{ fontSize: 14, marginTop: 4 }}>Confidence</div>
        <div style={{ fontSize: 20, fontWeight: 700 }}>
          {conf}%
        </div>
      </div>
      <div className="verdict-block">
        <div style={{ fontSize: 14, opacity: 0.7 , paddingBottom:8}}>Agreement</div>
        <ConflictBadge
          distilbert={result.distilbert.label}
          tfidf={result.tfidf.label}
          bilstm={result.bilstm.label}
        />
      </div>
      <div className="verdict-block">
        <div style={{ fontSize: 14, opacity: 0.7 }}>Risk level</div>
        <RiskMeter
          avg_prob={result.ensemble.avg_prob}
          label={finalLabel}
        />
      </div>
      <div className="verdict-block verdict-graph">
        <div style={{ fontSize: 14, opacity: 0.7, marginBottom: 4 }}>
          Probability Distribution
        </div>
        <ProbabilityBars probs={result.ensemble.avg_prob} />
      </div>

    </div>
  );
}
