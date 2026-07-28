import { cn } from "@/lib/cn";

/**
 * Abstract navigational chart: latitude arcs crossed by rhumb lines radiating
 * from a single point. Rendered as inline SVG so it costs nothing to load,
 * scales cleanly and inherits the brass accent.
 *
 * Purely decorative — always aria-hidden.
 */
export function Meridians({
  className,
  opacity = 0.5,
}: {
  className?: string;
  opacity?: number;
}) {
  const rhumbs = Array.from({ length: 16 }, (_, i) => (i * 360) / 16);

  return (
    <svg
      aria-hidden="true"
      focusable="false"
      viewBox="0 0 1200 700"
      preserveAspectRatio="xMidYMid slice"
      className={cn("pointer-events-none absolute inset-0 h-full w-full", className)}
      style={{ opacity }}
    >
      <defs>
        <radialGradient id="meridian-fade" cx="50%" cy="46%" r="62%">
          <stop offset="0%" stopColor="#fff" stopOpacity="1" />
          <stop offset="55%" stopColor="#fff" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#fff" stopOpacity="0" />
        </radialGradient>
        <mask id="meridian-mask">
          <rect width="1200" height="700" fill="url(#meridian-fade)" />
        </mask>
      </defs>

      <g mask="url(#meridian-mask)" fill="none" strokeWidth="1">
        {/* Latitude arcs */}
        <g stroke="#1D4A5E" strokeOpacity="0.85">
          {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
            <ellipse
              key={`lat-${i}`}
              cx="600"
              cy="350"
              rx={620}
              ry={60 + i * 62}
            />
          ))}
        </g>

        {/* Rhumb lines from the fix */}
        <g stroke="#1D4A5E" strokeOpacity="0.55">
          {rhumbs.map((deg) => {
            const rad = (deg * Math.PI) / 180;
            return (
              <line
                key={`rhumb-${deg}`}
                x1="600"
                y1="350"
                x2={600 + Math.cos(rad) * 900}
                y2={350 + Math.sin(rad) * 900}
              />
            );
          })}
        </g>

        {/* The fix itself, in brass */}
        <g stroke="#C8A24A" strokeOpacity="0.55">
          <circle cx="600" cy="350" r="112" />
          <circle cx="600" cy="350" r="186" strokeOpacity="0.28" />
        </g>
      </g>
    </svg>
  );
}
