import { cn } from "@/lib/cn";

/**
 * World route chart: value moving between Gelian's two home ports —
 * Colombo and Canberra — and major global markets, in both directions.
 *
 * Everything sits on an equirectangular projection (x from longitude, y from
 * latitude) so the geography reads true. The landmasses are drawn as a
 * stipple: a dot grid clipped to rough continent outlines, kept faint so the
 * gold routes stay the focus. The arcs draw themselves when the parent Reveal
 * enters the viewport (see the `.route-line` rules in globals.css).
 *
 * Decorative. Port names are also rendered as real text beside this
 * component so the information is never locked inside the graphic.
 */

const W = 1000;
const H = 500;
const projX = (lon: number) => ((lon + 180) / 360) * W;
const projY = (lat: number) => ((90 - lat) / 180) * H;

// Rough continent outlines in [lon, lat] — approximate, used only to shape
// the background stipple. Faint by design, so precision is not the point.
const CONTINENTS: [number, number][][] = [
  // North America
  [
    [-168, 66], [-150, 71], [-125, 70], [-100, 73], [-82, 72], [-62, 66],
    [-52, 60], [-56, 52], [-67, 47], [-70, 41], [-81, 31], [-80, 26],
    [-97, 26], [-107, 23], [-115, 29], [-124, 36], [-124, 48], [-135, 56],
    [-150, 60], [-165, 60], [-168, 66],
  ],
  // Greenland
  [
    [-46, 60], [-30, 68], [-18, 72], [-22, 79], [-42, 82], [-56, 78],
    [-54, 68], [-46, 60],
  ],
  // South America
  [
    [-80, 9], [-68, 11], [-52, 5], [-42, -3], [-35, -6], [-39, -14],
    [-49, -25], [-58, -34], [-66, -45], [-72, -52], [-74, -44], [-71, -32],
    [-70, -18], [-77, -12], [-81, -5], [-80, 2], [-80, 9],
  ],
  // Africa
  [
    [-16, 15], [-14, 24], [-6, 32], [8, 37], [22, 32], [33, 31], [43, 12],
    [51, 12], [44, -2], [40, -15], [32, -26], [25, -34], [18, -35],
    [13, -23], [9, -5], [8, 4], [-8, 4], [-16, 15],
  ],
  // Europe
  [
    [-10, 37], [-9, 44], [-2, 49], [6, 53], [10, 58], [22, 60], [34, 60],
    [42, 56], [40, 48], [30, 45], [22, 41], [12, 38], [0, 37], [-10, 37],
  ],
  // Asia
  [
    [40, 48], [50, 46], [55, 52], [70, 56], [90, 62], [110, 60], [125, 56],
    [140, 58], [158, 62], [170, 66], [162, 56], [142, 50], [140, 44],
    [127, 40], [122, 30], [118, 22], [108, 20], [104, 10], [98, 8],
    [95, 16], [88, 20], [80, 9], [76, 9], [70, 20], [62, 24], [54, 27],
    [46, 32], [40, 40], [40, 48],
  ],
  // Australia
  [
    [114, -22], [122, -18], [131, -12], [138, -11], [144, -13], [148, -20],
    [153, -26], [151, -34], [146, -38], [138, -37], [130, -32], [122, -34],
    [115, -33], [114, -28], [114, -22],
  ],
];

const POLYGONS = CONTINENTS.map((poly) =>
  poly.map(([lon, lat]) => [projX(lon), projY(lat)] as [number, number]),
);

function inside(x: number, y: number, poly: [number, number][]) {
  let c = false;
  for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
    const [xi, yi] = poly[i];
    const [xj, yj] = poly[j];
    if (yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) {
      c = !c;
    }
  }
  return c;
}

// Stipple the land: a dot wherever a grid point falls inside a continent.
const STEP = 15;
const DOTS: [number, number][] = [];
for (let x = STEP / 2; x < W; x += STEP) {
  for (let y = STEP / 2; y < H; y += STEP) {
    if (POLYGONS.some((poly) => inside(x, y, poly))) DOTS.push([x, y]);
  }
}

type Point = {
  name: string;
  x: number;
  y: number;
  // Optional label placement, for de-crowding tight clusters.
  anchor?: "start" | "middle" | "end";
  ldx?: number;
  ldy?: number;
};

// Home ports — where routes originate, in both directions.
const HOME: Point[] = [
  { name: "Colombo", x: 722, y: 231 },
  { name: "Canberra", x: 914, y: 348 },
];

// Major markets the routes reach.
const PORTS: Point[] = [
  { name: "New York", x: 294, y: 137 },
  { name: "London", x: 500, y: 107 },
  { name: "Dubai", x: 654, y: 180 },
  { name: "Singapore", x: 788, y: 246 },
  { name: "Shanghai", x: 837, y: 163, anchor: "end", ldx: -8, ldy: -14 },
  { name: "Tokyo", x: 888, y: 151, anchor: "start", ldx: 8, ldy: -14 },
];

const ROUTES = HOME.flatMap((home) =>
  PORTS.map((port) => ({ from: home, to: port })),
);

/** A gently bowed arc between two points, lift scaled to the span. */
function arc(a: Point, b: Point) {
  const mx = (a.x + b.x) / 2;
  const my = (a.y + b.y) / 2;
  const lift = Math.abs(b.x - a.x) * 0.2 + 20;
  return `M ${a.x} ${a.y} Q ${mx} ${my - lift} ${b.x} ${b.y}`;
}

export function RouteDiagram({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      viewBox={`0 0 ${W} ${H}`}
      className={cn("h-auto w-full", className)}
      fill="none"
    >
      <defs>
        <linearGradient id="lane" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#C8A24A" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#C8A24A" stopOpacity="0.18" />
        </linearGradient>
        <radialGradient id="port-glow">
          <stop offset="0%" stopColor="#C8A24A" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#C8A24A" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="ocean" cx="50%" cy="44%" r="78%">
          <stop offset="0%" stopColor="#0C2C3B" />
          <stop offset="100%" stopColor="#050F16" />
        </radialGradient>
      </defs>

      {/* Ocean panel — a defined, deep backdrop so the land reads clearly */}
      <rect x="0" y="0" width={W} height={H} rx="18" fill="url(#ocean)" />

      {/* Stippled landmasses */}
      <g fill="#7FB0C4" fillOpacity="0.85">
        {DOTS.map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r="1.5" />
        ))}
      </g>

      {/* Routes — every home port to every market */}
      <g strokeLinecap="round">
        {ROUTES.map((route, i) => (
          <path
            key={`${route.from.name}-${route.to.name}`}
            className="route-line"
            pathLength={1}
            d={arc(route.from, route.to)}
            stroke="url(#lane)"
            strokeWidth="1.2"
            style={{ ["--route-delay" as string]: `${i * 90}ms` }}
          />
        ))}
      </g>

      {/* Market fixes */}
      <g>
        {PORTS.map((port, i) => (
          <g
            key={port.name}
            className="route-node"
            style={{ ["--route-delay" as string]: `${i * 90 + 220}ms` }}
          >
            <circle cx={port.x} cy={port.y} r="3.5" fill="#C8A24A" fillOpacity="0.9" />
            <circle
              cx={port.x}
              cy={port.y}
              r="11"
              stroke="#C8A24A"
              strokeOpacity="0.3"
              strokeWidth="1"
            />
            <text
              x={port.x + (port.ldx ?? 0)}
              y={port.y + (port.ldy ?? -20)}
              textAnchor={port.anchor ?? "middle"}
              fill="#DCD2BE"
              fillOpacity="0.8"
              fontSize="15"
              letterSpacing="0.5"
              fontFamily="var(--font-sans)"
            >
              {port.name}
            </text>
          </g>
        ))}
      </g>

      {/* Home ports — Colombo and Canberra, prominent */}
      <g>
        {HOME.map((home) => (
          <g key={home.name}>
            <circle cx={home.x} cy={home.y} r="36" fill="url(#port-glow)" />
            <circle
              cx={home.x}
              cy={home.y}
              r="22"
              stroke="#C8A24A"
              strokeOpacity="0.22"
              strokeWidth="1"
            />
            <circle cx={home.x} cy={home.y} r="6" fill="#C8A24A" />
            <text
              x={home.x}
              y={home.y + 36}
              textAnchor="middle"
              fill="#C8A24A"
              fontSize="16"
              letterSpacing="1"
              fontFamily="var(--font-sans)"
            >
              {home.name}
            </text>
          </g>
        ))}
      </g>
    </svg>
  );
}
