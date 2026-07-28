import { ImageResponse } from "next/og";
import { site } from "@/content/site";

/**
 * Default social card. Composed from layout primitives and a data-URI chart
 * mark — no remote fonts or images, so it renders identically everywhere.
 */
export const alt = `${site.name} — ${site.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const ROSE = `data:image/svg+xml,${encodeURIComponent(
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" fill="none">
    <path d="M100 6 L110 90 L194 100 L110 110 L100 194 L90 110 L6 100 L90 90 Z" stroke="#C8A24A" stroke-opacity="0.30" stroke-width="1.4" stroke-linejoin="round"/>
    <circle cx="100" cy="100" r="62" stroke="#C8A24A" stroke-opacity="0.18" stroke-width="1.2"/>
    <circle cx="100" cy="100" r="88" stroke="#C8A24A" stroke-opacity="0.10" stroke-width="1.2"/>
  </svg>`,
)}`;

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background:
            "radial-gradient(1000px 700px at 50% -10%, #0B2A38 0%, #07202C 45%, #04121A 100%)",
          color: "#F6F2E9",
          position: "relative",
        }}
      >
        <img
          src={ROSE}
          width={620}
          height={620}
          alt=""
          style={{ position: "absolute", right: -140, bottom: -190 }}
        />

        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div style={{ width: 56, height: 1, background: "#C8A24A" }} />
          <div
            style={{
              fontSize: 20,
              letterSpacing: 6,
              textTransform: "uppercase",
              color: "#C8A24A",
            }}
          >
            {site.name}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
          <div
            style={{
              fontSize: 68,
              lineHeight: 1.1,
              letterSpacing: -1.5,
              maxWidth: 860,
            }}
          >
            A vessel for Ceylon value, bound for the world.
          </div>
          <div style={{ fontSize: 26, color: "#9FB3BE", maxWidth: 780 }}>
            A privately held investment vehicle between Colombo and global
            markets.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            borderTop: "1px solid #14394A",
            paddingTop: 28,
            fontSize: 20,
            color: "#9FB3BE",
            letterSpacing: 2,
          }}
        >
          <div style={{ display: "flex" }}>COLOMBO &nbsp;·&nbsp; EST. 2024</div>
          <div style={{ display: "flex", color: "#C8A24A" }}>
            6.9271° N, 79.8612° E
          </div>
        </div>
      </div>
    ),
    size,
  );
}
