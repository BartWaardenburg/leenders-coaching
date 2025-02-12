import React from 'react';
import { ImageResponse } from 'next/og';

import { metadataConfig } from '@/config/metadata.config';

export const runtime = 'edge';

/* Font loading */
const playfairDisplayData = fetch(
  new URL('../../../assets/fonts/PlayfairDisplay-Bold.ttf', import.meta.url),
).then((res) => res.arrayBuffer());

const montserratData = fetch(
  new URL('../../../assets/fonts/Montserrat-Regular.ttf', import.meta.url),
).then((res) => res.arrayBuffer());

// Default image configuration
const defaultImageConfig = {
  url: '/images/99-Simone-louise-boonstoppel-fotografie.jpg',
  width: 1200,
  height: 800,
};

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get('title');
  const description = searchParams.get('description');
  const variant = searchParams.get('variant') || 'blue';

  // Get the base URL from the request
  const baseUrl = new URL(request.url).origin;
  const imagePath =
    searchParams.get('image') || `${baseUrl}${defaultImageConfig.url}`;

  if (!title) {
    return new Response('Missing title parameter', { status: 400 });
  }

  // Card background colors matching the Card component
  const backgrounds = {
    blue: '#F0F8FF',
    purple: '#F8F0FF',
    green: '#F0FFF0',
    pink: '#FFF0F8',
    yellow: '#FFF8F0',
    teal: '#F0FFF8',
  };

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
            height: '100%',
            width: '100%',
            display: 'flex',
            background: backgrounds[variant as keyof typeof backgrounds],
            position: 'relative',
          }}
        >
          {/* Image Section */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '40%',
              height: '100%',
              display: 'flex',
              overflow: 'hidden',
              borderRight: '1px solid rgba(0,0,0,0.1)',
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={imagePath}
              alt={title}
              width={defaultImageConfig.width}
              height={defaultImageConfig.height}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
            />
          </div>

          {/* Content Section */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              padding: '48px',
              paddingLeft: '528px',
              width: '100%',
              height: '100%',
            }}
          >
            {/* Featured Label if needed */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
                marginBottom: '24px',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  fontFamily: 'Montserrat',
                  fontSize: '24px',
                  color: 'rgba(0,0,0,0.6)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                }}
              >
                {metadataConfig.default.title}
              </div>
              <div
                style={{
                  display: 'flex',
                  width: '48px',
                  height: '2px',
                  background: 'rgba(0,0,0,0.1)',
                }}
              />
            </div>

            {/* Title */}
            <div
              style={{
                display: 'flex',
                fontFamily: 'Playfair Display',
                fontSize: '64px',
                fontWeight: 700,
                color: 'rgba(0,0,0,0.8)',
                lineHeight: 1.2,
                marginBottom: '24px',
              }}
            >
              {title}
            </div>

            {/* Metadata Section */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                borderTop: '1px solid rgba(0,0,0,0.1)',
                borderBottom: '1px solid rgba(0,0,0,0.1)',
                marginBottom: description ? '24px' : 0,
              }}
            >
              {searchParams.get('date') && (
                <div
                  style={{
                    display: 'flex',
                    padding: '16px 16px',
                    borderRight: '1px solid rgba(0,0,0,0.1)',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      fontFamily: 'Montserrat',
                      fontSize: '22px',
                      textTransform: 'uppercase',
                      color: 'rgba(0,0,0,0.6)',
                    }}
                  >
                    {searchParams.get('date')}
                  </div>
                </div>
              )}
              {searchParams.get('categories') && (
                <div
                  style={{
                    display: 'flex',
                    padding: '16px 16px',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      fontFamily: 'Montserrat',
                      fontSize: '22px',
                      textTransform: 'uppercase',
                      color: 'rgba(0,0,0,0.6)',
                    }}
                  >
                    {searchParams.get('categories')}
                  </div>
                </div>
              )}
            </div>

            {/* Description */}
            {description && (
              <div
                style={{
                  display: 'flex',
                  fontFamily: 'Montserrat',
                  fontSize: '24px',
                  color: 'rgba(0,0,0,0.6)',
                  lineHeight: 1.5,
                }}
              >
                {description}
              </div>
            )}

            {/* Read Article Link Indicator */}
            <div
              style={{
                display: 'flex',
                marginTop: 'auto',
                justifyContent: 'flex-end',
                alignItems: 'center',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-end',
                  gap: '8px',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    width: '48px',
                    height: '2px',
                    background: 'rgba(0,0,0,0.1)',
                  }}
                />
                <div
                  style={{
                    display: 'flex',
                    fontFamily: 'Montserrat',
                    fontSize: '16px',
                    color: 'rgba(0,0,0,0.6)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                  }}
                >
                  Lees artikel
                </div>
              </div>
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
        fonts: [
          {
            name: 'Playfair Display',
            data: playfairDisplay,
            style: 'normal',
            weight: 700,
          },
          {
            name: 'Montserrat',
            data: montserrat,
            style: 'normal',
            weight: 400,
          },
        ],
      },
    );
  } catch (e) {
    console.error(e);
    return new Response('Failed to generate image', { status: 500 });
  }
}
