export default function PulseProgress({ step, steps }) {
  // Draws a single continuous heartbeat trace; the "spike" position
  // moves along the line as the patient advances through steps.
  const width = 700;
  const height = 46;
  const spikeX = (width / (steps.length - 1)) * step;

  const path = `M0,${height / 2}
    L${spikeX - 40},${height / 2}
    L${spikeX - 26},${height / 2}
    L${spikeX - 18},${height - 10}
    L${spikeX - 6},4
    L${spikeX + 6},${height - 6}
    L${spikeX + 16},${height / 2}
    L${width},${height / 2}`;

  return (
    <div>
      <svg className="pulse-track" viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none">
        <path d={path} fill="none" stroke="#d8e3e0" strokeWidth="2" />
        <path
          d={`M0,${height / 2} L${spikeX - 40},${height / 2} L${spikeX - 26},${height / 2} L${spikeX - 18},${height - 10} L${spikeX - 6},4 L${spikeX + 6},${height - 6} L${spikeX + 16},${height / 2}`}
          fill="none"
          stroke="#114b5f"
          strokeWidth="2.5"
        />
        <circle cx={spikeX - 6} cy="4" r="4" fill="#d9a441" />
      </svg>
      <div className="pulse-labels">
        {steps.map((label, i) => (
          <span key={label} className={i === step ? "current" : ""}>
            {label}
          </span>
        ))}
      </div>
    </div>
  );
}
