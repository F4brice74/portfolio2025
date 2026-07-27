import { absoluteUrl } from '@/lib/seo/config';

const CLOUDINARY_UPLOAD_SEGMENT = '/image/upload/';

export const ARTICLE_OG_WIDTH = 1200;
export const ARTICLE_OG_HEIGHT = 630;
export const ARTICLE_ASPECT_RATIO = `${ARTICLE_OG_WIDTH} / ${ARTICLE_OG_HEIGHT}`;

type ImagePreset = 'og' | 'hero' | 'card';

const PRESETS: Record<ImagePreset, { width: number; height: number }> = {
  og: { width: 1200, height: 630 },
  hero: { width: 1200, height: 630 },
  card: { width: 800, height: 419 },
};

export function isCloudinaryUrl(url: string): boolean {
  return url.includes('res.cloudinary.com') && url.includes(CLOUDINARY_UPLOAD_SEGMENT);
}

function buildCloudinaryTransform(width: number, height: number): string {
  return `w_${width},h_${height},c_fill,f_auto,q_auto`;
}

export function transformImageUrl(url: string, preset: ImagePreset): string {
  const { width, height } = PRESETS[preset];

  if (!isCloudinaryUrl(url)) {
    return url;
  }

  const transform = buildCloudinaryTransform(width, height);
  return url.replace(CLOUDINARY_UPLOAD_SEGMENT, `${CLOUDINARY_UPLOAD_SEGMENT}${transform}/`);
}

export function getArticleOgImageUrl(url: string): string {
  return transformImageUrl(url, 'og');
}

export function getArticleHeroImageUrl(url: string): string {
  return transformImageUrl(url, 'hero');
}

export function getArticleCardImageUrl(url: string): string {
  return transformImageUrl(url, 'card');
}

type ArticleOgSource = {
  featuredImage: string | null;
  slug: string;
};

export function resolveArticleOgImage(article: ArticleOgSource): {
  url: string;
  width: number;
  height: number;
} {
  if (article.featuredImage && isCloudinaryUrl(article.featuredImage)) {
    return {
      url: absoluteUrl(getArticleOgImageUrl(article.featuredImage)),
      width: ARTICLE_OG_WIDTH,
      height: ARTICLE_OG_HEIGHT,
    };
  }

  return {
    url: absoluteUrl(`/blog/${article.slug}/opengraph-image`),
    width: ARTICLE_OG_WIDTH,
    height: ARTICLE_OG_HEIGHT,
  };
}
