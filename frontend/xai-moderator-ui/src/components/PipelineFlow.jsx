import "../styles/dashboard.css";

export default function PipelineFlow({ stage }) {
  const steps = [
    "Input",
    "Tokenizing",
    "Loading Vocabulary",
    "Neural Inference",
    "Transformer Attentions",
    "Ensembling Predictions",
    "Decision",
  ];

  return (
    <div className="pipeline">
      {steps.map((s, i) => {
        let status = "upcoming";
        if (i < stage) status = "done";
        if (i === stage) status = "active";

        return (
          <div className="pipe-wrap" key={i}>
            <div className={`pipe-step ${status}`}>{s}</div>
            {i !== steps.length - 1 && <div className={`arrow ${status}`} />}
          </div>
        );
      })}
    </div>
  );
}
