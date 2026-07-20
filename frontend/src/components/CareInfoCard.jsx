export default function CareInfoCard({ category, info, disclaimer }) {
  if (!info) return null;

  return (
    <div className="care-info">
      <h3>While you wait: general care for {category}</h3>
      <ul>
        {info.tips.map((tip) => (
          <li key={tip}>{tip}</li>
        ))}
      </ul>
      <div className="seek-help">⚠ {info.seekHelpNow}</div>
      <p className="disclaimer">{disclaimer}</p>
    </div>
  );
}
