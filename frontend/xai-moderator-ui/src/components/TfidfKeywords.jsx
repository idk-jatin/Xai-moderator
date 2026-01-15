export default function TfidfKeywords({ keywords }) {
  return (
    <div>
      {keywords.map((k, i) => (
        <div key={i}>
          <b>{k.word}</b> : { k.score.toFixed(3)}
        </div>
      ))}
    </div>
  );
}