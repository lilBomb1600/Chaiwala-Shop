import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

// a tiny painted board: enamel letter with a turmeric shade on the shop's maroon
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
          background: "#8e1b22",
          borderRadius: "14px",
          border: "3px solid #f4b223",
        }}
      >
        <span
          style={{
            fontFamily: "Georgia, serif",
            fontWeight: 700,
            fontSize: 40,
            color: "#fff6ea",
            textShadow: "3px 3px 0 #f4b223",
            marginTop: -2,
          }}
        >
          C
        </span>
      </div>
    ),
    { ...size }
  );
}
