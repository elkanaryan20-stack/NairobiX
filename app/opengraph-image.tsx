import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const alt = "NairobiX — Premium Business Growth Systems";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const markData = await readFile(join(process.cwd(), "app/icon.png"));
const markSrc = `data:image/png;base64,${markData.toString("base64")}`;

export default function Image() {
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
          backgroundColor: "#0b0b0d",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={markSrc} alt="" width={168} height={168} style={{ borderRadius: 28 }} />
        <div
          style={{
            marginTop: 40,
            fontSize: 72,
            fontWeight: 700,
            color: "#ffffff",
            letterSpacing: -1,
          }}
        >
          NairobiX
        </div>
        <div
          style={{
            marginTop: 20,
            width: 64,
            height: 4,
            backgroundColor: "#F97316",
          }}
        />
        <div
          style={{
            marginTop: 24,
            fontSize: 32,
            color: "#94a3b8",
          }}
        >
          Premium Business Growth Systems
        </div>
      </div>
    ),
    { ...size }
  );
}
