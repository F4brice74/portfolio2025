import { ImageResponse } from 'next/og';
import { ArticleService } from '@/lib/articles';

export const alt = 'Article Ossawayas';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = await ArticleService.getBySlug(slug);

  const title = article?.title ?? 'Blog Ossawayas';
  const category = article?.category?.name ?? 'Blog';

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          padding: '72px 80px',
          background: 'linear-gradient(135deg, #1e3a5f 0%, #2d4f7c 60%, #1e3a5f 100%)',
          color: 'white',
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        <div
          style={{
            display: 'inline-flex',
            alignSelf: 'flex-start',
            padding: '10px 18px',
            borderRadius: 999,
            backgroundColor: 'rgba(255,255,255,0.14)',
            fontSize: 24,
            fontWeight: 600,
            marginBottom: 28,
          }}
        >
          {category}
        </div>
        <p
          style={{
            fontSize: 56,
            fontWeight: 700,
            lineHeight: 1.15,
            maxWidth: 1000,
            margin: 0,
          }}
        >
          {title}
        </p>
        <p
          style={{
            fontSize: 28,
            color: 'rgba(255,255,255,0.75)',
            marginTop: 24,
            marginBottom: 0,
          }}
        >
          Ossawayas — Automatisation IA pour TPE et PME
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
