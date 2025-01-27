import React from "react";
import { ImageResponse } from "next/og";
import { defaultMetadata } from "@/config/metadata.config";

export const runtime = "edge";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get("title");
  const description = searchParams.get("description");
  const imagePath = searchParams.get("image");

  if (!title) {
    return new Response("Missing title parameter", { status: 400 });
  }

  try {
    const playfairDisplay = await fetch(
      new URL(
        "https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&display=swap",
      ),
    ).then((res) => res.arrayBuffer());

    const montserrat = await fetch(
      new URL(
        "https://fonts.googleapis.com/css2?family=Montserrat:wght@400&display=swap",
      ),
    ).then((res) => res.arrayBuffer());

    return new ImageResponse(
      (
        <div
          style={{
            height: "100%",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            justifyContent: "flex-end",
            backgroundImage: imagePath
              ? `url(${imagePath})`
              : "linear-gradient(to bottom right, #0A0B0F, #1F2937)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            padding: "48px",
          }}
        >
          <div
            style={{
              marginTop: "auto",
              display: "flex",
              flexDirection: "column",
              gap: "16px",
              color: "white",
            }}
          >
            <h1
              style={{
                fontSize: "64px",
                fontFamily: "Playfair Display",
                lineHeight: 1.1,
                margin: 0,
                background: "linear-gradient(to right, #FFFFFF, #E5E7EB)",
                WebkitBackgroundClip: "text",
                color: "transparent",
                maxWidth: "800px",
              }}
            >
              {title}
            </h1>
            {description && (
              <p
                style={{
                  fontSize: "24px",
                  fontFamily: "Montserrat",
                  margin: 0,
                  color: "#E5E7EB",
                  maxWidth: "600px",
                }}
              >
                {description}
              </p>
            )}
          </div>
          <div
            style={{
              marginTop: "48px",
              display: "flex",
              alignItems: "center",
              gap: "16px",
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logo.png"
              alt={defaultMetadata.title}
              width={48}
              height={48}
              style={{
                borderRadius: "50%",
              }}
            />
            <p
              style={{
                fontSize: "24px",
                fontFamily: "Montserrat",
                color: "#FFFFFF",
                margin: 0,
              }}
            >
              {defaultMetadata.title}
            </p>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
        fonts: [
          {
            name: "Playfair Display",
            data: playfairDisplay,
            style: "normal",
            weight: 700,
          },
          {
            name: "Montserrat",
            data: montserrat,
            style: "normal",
            weight: 400,
          },
        ],
      },
    );
  } catch (e) {
    console.error(e);
    return new Response("Failed to generate image", { status: 500 });
  }
}
