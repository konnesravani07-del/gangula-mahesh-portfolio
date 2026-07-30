export function BlueprintBg({ className = "" }: { className?: string }) {
  return (
    <svg
      className={`absolute inset-0 w-full h-full text-primary/25 ${className}`}
      viewBox="0 0 1200 700"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      fill="none"
    >
      <defs>
        <pattern id="bpgrid" width="48" height="48" patternUnits="userSpaceOnUse">
          <path
            d="M 48 0 L 0 0 0 48"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.5"
            opacity="0.35"
          />
        </pattern>
      </defs>
      <rect width="1200" height="700" fill="url(#bpgrid)" />

      {/* Building elevation */}
      <g
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="animate-draw"
      >
        <rect x="120" y="220" width="360" height="380" />
        <line x1="120" y1="320" x2="480" y2="320" />
        <line x1="120" y1="420" x2="480" y2="420" />
        <line x1="120" y1="520" x2="480" y2="520" />
        <line x1="240" y1="220" x2="240" y2="600" />
        <line x1="360" y1="220" x2="360" y2="600" />
        {/* Roof pitch */}
        <path d="M 90 220 L 300 100 L 510 220" />
        {/* Beam callouts */}
        <line x1="540" y1="260" x2="720" y2="260" strokeDasharray="4 4" />
        <circle cx="540" cy="260" r="3" fill="currentColor" />
        <circle cx="720" cy="260" r="3" fill="currentColor" />
        {/* Column */}
        <rect x="780" y="180" width="60" height="420" />
        <line x1="780" y1="240" x2="840" y2="240" />
        <line x1="780" y1="360" x2="840" y2="360" />
        <line x1="780" y1="480" x2="840" y2="480" />
        {/* Site plan circle */}
        <circle cx="980" cy="360" r="140" />
        <circle cx="980" cy="360" r="90" />
        <line x1="840" y1="360" x2="1120" y2="360" />
        <line x1="980" y1="220" x2="980" y2="500" />
      </g>
    </svg>
  );
}
