import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'RAAVE Outfitter - Get Your Perfect Outfit';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #FF8C00 0%, #FF4444 50%, #9B59B6 100%)',
          fontFamily: 'system-ui, -apple-system, sans-serif',
        }}
      >
        {/* DJ Character */}
        <div
          style={{
            fontSize: 200,
            marginBottom: 20,
          }}
        >
          🎧
        </div>

        {/* Title */}
        <div
          style={{
            fontSize: 80,
            fontWeight: 'bold',
            color: 'white',
            textAlign: 'center',
            marginBottom: 20,
            textShadow: '4px 4px 8px rgba(0,0,0,0.3)',
          }}
        >
          RAAVE Outfitter
        </div>

        {/* Subtitle */}
        <div
          style={{
            fontSize: 36,
            color: 'white',
            textAlign: 'center',
            maxWidth: 900,
            textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
          }}
        >
          Get your perfect outfit for the raave! 🕺🏻
        </div>

        {/* Decorative elements */}
        <div
          style={{
            position: 'absolute',
            bottom: 40,
            display: 'flex',
            gap: 20,
            fontSize: 40,
          }}
        >
          <span>🌺</span>
          <span>🎵</span>
          <span>🌸</span>
          <span>🎶</span>
          <span>🌼</span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}

