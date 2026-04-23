import { readFile } from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og";
import { notFound } from "next/navigation";
import { getCase } from "@/lib/cases";

export const runtime = "nodejs";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

async function readCoverAsDataUrl(coverPath: string) {
  const localPath = path.join(
    process.cwd(),
    "public",
    ...coverPath.replace(/^\//, "").split("/"),
  );
  const file = await readFile(localPath);
  const extension = path.extname(localPath).toLowerCase();
  const mimeType = extension === ".png" ? "image/png" : "image/jpeg";

  return `data:${mimeType};base64,${file.toString("base64")}`;
}

export default async function CaseOpenGraphImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = getCase(slug);

  if (!item) {
    notFound();
  }

  const coverImage = await readCoverAsDataUrl(item.cover);

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          position: "relative",
          width: "100%",
          height: "100%",
          background: item.accent,
          color: "#f6f1e8",
          overflow: "hidden",
        }}
      >
        <img
          src={coverImage}
          alt=""
          width={1200}
          height={630}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(180deg, rgba(10, 10, 15, 0.12) 0%, rgba(10, 10, 15, 0.76) 100%)",
          }}
        />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            width: "100%",
            padding: "52px 56px",
            zIndex: 1,
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              fontSize: 22,
              letterSpacing: "0.24em",
              textTransform: "uppercase",
              color: "rgba(246, 241, 232, 0.72)",
            }}
          >
            <div style={{ display: "flex" }}>Case study</div>
            <div style={{ display: "flex" }}>{item.year}</div>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              maxWidth: 900,
              gap: 18,
            }}
          >
            <div
              style={{
                display: "flex",
                fontSize: 28,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "rgba(246, 241, 232, 0.72)",
              }}
            >
              {item.client}
            </div>
            <div
              style={{
                display: "flex",
                fontFamily: "Georgia, Times New Roman, serif",
                fontSize: 70,
                lineHeight: 1,
                letterSpacing: "-0.05em",
              }}
            >
              {item.title}
            </div>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              fontSize: 24,
              color: "rgba(246, 241, 232, 0.78)",
            }}
          >
            <div style={{ display: "flex" }}>{item.categories.join(" / ")}</div>
            <div style={{ display: "flex" }}>Pageforce</div>
          </div>
        </div>
      </div>
    ),
    size,
  );
}
