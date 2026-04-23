import { ImageResponse } from "next/og";
import { SITE_DESCRIPTION, SITE_NAME } from "@/lib/site";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          height: "100%",
          width: "100%",
          position: "relative",
          background:
            "linear-gradient(145deg, #0a0a0f 0%, #101521 52%, #13243a 100%)",
          color: "#f4efe7",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(circle at top right, rgba(239, 159, 39, 0.28), transparent 38%), radial-gradient(circle at bottom left, rgba(55, 138, 221, 0.24), transparent 42%)",
          }}
        />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "56px 64px",
            width: "100%",
            zIndex: 1,
          }}
        >
          <div
            style={{
              display: "flex",
              fontSize: 22,
              letterSpacing: "0.32em",
              textTransform: "uppercase",
              color: "rgba(244, 239, 231, 0.72)",
            }}
          >
            Engrenagem Comercial Digital
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              maxWidth: 820,
              gap: 18,
            }}
          >
            <div
              style={{
                display: "flex",
                fontFamily: "Georgia, Times New Roman, serif",
                fontSize: 92,
                lineHeight: 1,
                letterSpacing: "-0.06em",
              }}
            >
              {SITE_NAME}
            </div>
            <div
              style={{
                display: "flex",
                maxWidth: 760,
                fontSize: 34,
                lineHeight: 1.35,
                color: "rgba(244, 239, 231, 0.84)",
              }}
            >
              {SITE_DESCRIPTION}
            </div>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              fontSize: 24,
              color: "rgba(244, 239, 231, 0.72)",
            }}
          >
            <div style={{ display: "flex" }}>Captar · Converter · Responder · Organizar · Medir</div>
            <div style={{ display: "flex" }}>pageforce.studio</div>
          </div>
        </div>
      </div>
    ),
    size,
  );
}
