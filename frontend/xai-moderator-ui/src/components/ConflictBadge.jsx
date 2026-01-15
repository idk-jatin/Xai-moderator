export default function ConflictBadge({ distilbert, tfidf, bilstm }) {
  const labels = [distilbert, tfidf, bilstm];
  const unique = new Set(labels);

  if (unique.size === 1) {
    return <span className="badge good">Consensus</span>;
  }
  if (unique.size === 2) {
    return <span className="badge warn">Partial conflict</span>;
  }
  return <span className="badge bad">Strong conflict</span>;
}