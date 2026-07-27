import { ImageResponse } from 'next/og';

export const alt = 'Ossawayas — Automatisation IA pour TPE et PME';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '80px',
          background: 'linear-gradient(135deg, #1e3a5f 0%, #2d4f7c 60%, #1e3a5f 100%)',
          color: 'white',
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '20px',
            marginBottom: '40px',
          }}
        >
          <div
            style={{
              width: 72,
              height: 72,
              borderRadius: 16,
              backgroundColor: 'rgba(255,255,255,0.12)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 40,
              fontWeight: 700,
            }}
          >
            O
          </div>
          <span style={{ fontSize: 52, fontWeight: 700 }}>Ossawayas</span>
        </div>
        <p style={{ fontSize: 40, fontWeight: 500, lineHeight: 1.3, maxWidth: 900, margin: 0 }}>
          Automatisation IA pour TPE et PME
        </p>
        <p style={{ fontSize: 26, color: 'rgba(255,255,255,0.75)', marginTop: 24, maxWidth: 800 }}>
          Gagnez plusieurs heures par semaine avec des systèmes sur mesure
        </p>
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: 8,
            background: 'linear-gradient(90deg, #ff732d, #3b6fd9)',
          }}
        />
      </div>
    ),
    { ...size },
  );
}
