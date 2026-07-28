import { cn } from "@/lib/cn";

type Node = { code: string; x: number; y: number; lift: number };

/**
 * Sea-lane diagram: a single origin fix with routes fanning outward. The
 * curves draw themselves when the parent Reveal enters the viewport (see the
 * `.route-line` rules in globals.css).
 *
 * Decorative. City names are rendered as real text alongside this component
 * so the information is never locked inside the graphic.
 */
const ORIGIN = { x: 132, y: 262 };

const NODES: Node[] = [
  { code: "LHR", x: 858, y: 62, lift: -96 },
  { code: "DXB", x: 512, y: 122, lift: -74 },
  { code: "JFK", x: 906, y: 196, lift: -58 },
  { code: "SIN", x: 596, y: 396, lift: 78 },
  { code: "SYD", x: 872, y: 452, lift: 104 },
];

function curve(node: Node) {
  const cx = (ORIGIN.x + node.x) / 2;
  const cy = (ORIGIN.y + node.y) / 2 + node.lift;
  return `M ${ORIGIN.x} ${ORIGIN.y} Q ${cx} ${cy} ${node.x} ${node.y}`;
}

export function RouteDiagram({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      viewBox="0 0 1000 520"
      className={cn("h-auto w-full", className)}
      fill="none"
    >
      <defs>
        <linearGradient id="lane" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#C8A24A" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#C8A24A" stopOpacity="0.22" />
        </linearGradient>
      </defs>

      {/* Faint chart grid behind the lanes */}
      <g stroke="#14394A" strokeOpacity="0.55" strokeWidth="0.75">
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <line key={`h${i}`} x1="0" y1={40 + i * 88} x2="1000" y2={40 + i * 88} />
        ))}
        {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
          <line key={`v${i}`} x1={60 + i * 128} y1="0" x2={60 + i * 128} y2="520" />
        ))}
      </g>

      {/* Lanes */}
      <g strokeLinecap="round">
        {NODES.map((node, i) => (
          <path
            key={node.code}
            className="route-line"
            pathLength={1}
            d={curve(node)}
            stroke="url(#lane)"
            strokeWidth="1.4"
            style={{ ["--route-delay" as string]: `${i * 130}ms` }}
          />
        ))}
      </g>

      {/* Destination fixes */}
      <g>
        {NODES.map((node, i) => (
          <g
            key={`n-${node.code}`}
            className="route-node"
            style={{ ["--route-delay" as string]: `${i * 130}ms` }}
          >
            <circle cx={node.x} cy={node.y} r="4" fill="#C8A24A" fillOpacity="0.9" />
            <circle
              cx={node.x}
              cy={node.y}
              r="13"
              stroke="#C8A24A"
              strokeOpacity="0.3"
              strokeWidth="1"
            />
            <text
              x={node.x}
              y={node.y - 26}
              textAnchor="middle"
              fill="#DCD2BE"
              fillOpacity="0.75"
              fontSize="17"
              letterSpacing="3"
              fontFamily="var(--font-sans)"
            >
              {node.code}
            </text>
          </g>
        ))}
      </g>

      {/* Origin — Colombo */}
      <g>
        <circle
          cx={ORIGIN.x}
          cy={ORIGIN.y}
          r="30"
          stroke="#C8A24A"
          strokeOpacity="0.25"
          strokeWidth="1"
        />
        <circle
          cx={ORIGIN.x}
          cy={ORIGIN.y}
          r="46"
          stroke="#C8A24A"
          strokeOpacity="0.12"
          strokeWidth="1"
        />
        <circle cx={ORIGIN.x} cy={ORIGIN.y} r="6.5" fill="#C8A24A" />
        <text
          x={ORIGIN.x}
          y={ORIGIN.y + 74}
          textAnchor="middle"
          fill="#C8A24A"
          fontSize="18"
          letterSpacing="4"
          fontFamily="var(--font-sans)"
        >
          CMB
        </text>
      </g>
    </svg>
  );
}
