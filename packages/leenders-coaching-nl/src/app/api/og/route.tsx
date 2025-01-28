import React from "react";
import { ImageResponse } from "next/og";
import { defaultMetadata } from "@/config/metadata.config";

export const runtime = "edge";

/* Font loading */
const playfairDisplayData = fetch(
  new URL("../../../assets/fonts/PlayfairDisplay-Bold.ttf", import.meta.url)
).then((res) => res.arrayBuffer());

const montserratData = fetch(
  new URL("../../../assets/fonts/Montserrat-Regular.ttf", import.meta.url)
).then((res) => res.arrayBuffer());

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get("title");
  const description = searchParams.get("description");
  const imagePath = searchParams.get("image");

  if (!title) {
    return new Response("Missing title parameter", { status: 400 });
  }

  try {
    /* Load fonts */
    const [playfairDisplay, montserrat] = await Promise.all([
      playfairDisplayData,
      montserratData,
    ]);

    return new ImageResponse(
      (
        <div
          style={{
            height: "100%",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            justifyContent: "center",
            background: imagePath
              ? `linear-gradient(to right, rgba(236, 105, 39, 0.9), rgba(236, 105, 39, 0.8)), url(${imagePath})`
              : `linear-gradient(135deg, #f7f3f0 0%, #efe7e1 100%)`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Decorative elements */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: "8px",
              background: "linear-gradient(90deg, rgb(236, 105, 39), transparent)",
            }}
          />
          <div
            style={{
              position: "absolute",
              top: "48px",
              left: "48px",
              fontSize: "32px",
              fontFamily: "Montserrat",
              color: imagePath ? "#f7f3f0" : "rgb(236, 105, 39)",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
            }}
          >
            {defaultMetadata.title}
          </div>
          {/* Main content */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "32px",
              padding: "0 48px",
              maxWidth: "90%",
              marginTop: "48px",
            }}
          >
            <h1
              style={{
                fontSize: "120px",
                fontFamily: "Playfair Display",
                lineHeight: 1.1,
                margin: 0,
                background: "linear-gradient(to bottom, rgb(236, 105, 39) 0%, rgb(236, 105, 39) 50%, rgba(236, 105, 39, 0.8) 100%)",
                backgroundClip: "text",
                color: "transparent",
                textShadow: "none",
                letterSpacing: "-0.02em",
                fontWeight: 800,
              }}
            >
              {title}
            </h1>
            {description && (
              <p
                style={{
                  fontSize: "42px",
                  fontFamily: "Montserrat",
                  margin: 0,
                  color: imagePath ? "#f7f3f0" : "rgb(236, 105, 39)",
                  lineHeight: 1.4,
                  textShadow: imagePath ? "0 1px 2px rgba(38, 24, 16, 0.1)" : "none",
                  maxWidth: "95%",
                }}
              >
                {description}
              </p>
            )}
          </div>
          {/* Bottom decorative line */}
          <div
            style={{
              position: "absolute",
              bottom: 0,
              right: 0,
              width: "50%",
              height: "4px",
              background: "linear-gradient(90deg, transparent, rgb(236, 105, 39))",
            }}
          />
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
