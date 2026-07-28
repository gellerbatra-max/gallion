import { ImageResponse } from "next/og";

/**
 * Favicon generated at build time — a brass compass fix on the oceanic base.
 * Drawn with a data-URI SVG so no font or external asset is required.
 */
export const size = { width: 64, height: 64 };
export const contentType = "image/png";

const MARK = `data:image/svg+xml,${encodeURIComponent(
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" fill="none">
    <circle cx="20" cy="20" r="18" stroke="#C8A24A" stroke-opacity="0.45" stroke-width="1.6"/>
    <path d="M20 3 L22.6 17.4 L37 20 L22.6 22.6 L20 37 L17.4 22.6 L3 20 L17.4 17.4 Z" fill="#C8A24A"/>
  </svg>`,
)}`;

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#04121A",
        }}
      >
        <img src={MARK} width={52} height={52} alt="" />
      </div>
    ),
    size,
  );
}
