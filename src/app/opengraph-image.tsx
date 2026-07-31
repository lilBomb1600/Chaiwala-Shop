import { ImageResponse } from "next/og";
import { business } from "@/data/business";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#fbf3e6",
          padding: 80,
        }}
      >
        <span
          style={{
            fontFamily: "Georgia, serif",
            fontWeight: 700,
            fontSize: 96,
            color: "#8c2a24",
            letterSpacing: -2,
          }}
        >
          Chaiwala Shop
        </span>
        <span
          style={{
            marginTop: 24,
            fontFamily: "Georgia, serif",
            fontSize: 34,
            color: "#5a3c2a",
          }}
        >
          {business.tagline} · Concord, CA
        </span>
      </div>
    ),
    { ...size }
  );
}
