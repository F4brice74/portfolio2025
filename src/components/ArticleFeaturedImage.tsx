import Image from 'next/image';
import {
  ARTICLE_ASPECT_RATIO,
  getArticleCardImageUrl,
  getArticleHeroImageUrl,
} from '@/lib/images';

type ArticleFeaturedImageProps = {
  src: string;
  alt: string;
  variant: 'card' | 'hero';
  priority?: boolean;
};

export function ArticleFeaturedImage({
  src,
  alt,
  variant,
  priority = false,
}: ArticleFeaturedImageProps) {
  const transformedSrc =
    variant === 'card' ? getArticleCardImageUrl(src) : getArticleHeroImageUrl(src);

  const sizes =
    variant === 'card'
      ? '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px'
      : '(max-width: 768px) 100vw, 768px';

  return (
    <div
      data-testid="article-image"
      style={{
        position: 'relative',
        width: '100%',
        aspectRatio: ARTICLE_ASPECT_RATIO,
        overflow: 'hidden',
      }}
    >
      <Image
        src={transformedSrc}
        alt={alt}
        fill
        style={{ objectFit: 'cover' }}
        sizes={sizes}
        priority={priority}
        loading={priority ? undefined : 'lazy'}
      />
    </div>
  );
}
