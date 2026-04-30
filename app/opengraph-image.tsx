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
          background:
            "linear-gradient(135deg, #f8efe5 0%, #f4e4d7 44%, #ead7c5 100%)",
          color: "#3a2e23",
          position: "relative",
          overflow: "hidden",
          fontFamily: "Georgia, 'Times New Roman', serif",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(circle at top right, rgba(184, 155, 119, 0.24), transparent 34%), radial-gradient(circle at bottom left, rgba(122, 98, 68, 0.18), transparent 36%)",
          }}
        />
        <div
          style={{
            position: "relative",
            zIndex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            width: "100%",
            padding: "54px 64px",
          }}
        >
          <div
            style={{
              display: "flex",
              fontSize: 24,
              letterSpacing: "0.28em",
              textTransform: "uppercase",
              color: "#b88b77",
            }}
          >
            Podologia clínica em Fortaleza
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 18,
              maxWidth: 850,
            }}
          >
            <div
              style={{
                display: "flex",
                fontSize: 94,
                lineHeight: 0.94,
                letterSpacing: "-0.05em",
              }}
            >
              {SITE_NAME}
            </div>
            <div
              style={{
                display: "flex",
                fontFamily: "Arial, sans-serif",
                fontSize: 30,
                lineHeight: 1.35,
                color: "#5c4a38",
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
              fontFamily: "Arial, sans-serif",
              fontSize: 24,
              color: "#7a6244",
            }}
          >
            <div style={{ display: "flex" }}>
              Zucarina • Jannié • Parquelândia
            </div>
            <div style={{ display: "flex" }}>zlpodologia.com.br</div>
          </div>
        </div>
      </div>
    ),
    size
  );
}
