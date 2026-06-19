import Image from 'next/image';
import { Box } from '@mantine/core';

type OssawayasLogoProps = {
  variant: 'horizontal' | 'vertical';
  height?: number;
  /** Affiche le logo en clair sur fond sombre (footer) */
  light?: boolean;
  priority?: boolean;
};

const DIMENSIONS = {
  horizontal: { width: 355, height: 120 },
  vertical: { width: 280, height: 200 },
} as const;

export function OssawayasLogo({
  variant,
  height,
  light = false,
  priority = false,
}: OssawayasLogoProps) {
  const base = DIMENSIONS[variant];
  const renderedHeight = height ?? (variant === 'horizontal' ? 40 : 150);
  const renderedWidth = Math.round((base.width / base.height) * renderedHeight);
  const src =
    variant === 'horizontal'
      ? '/ossawayas-logo-horizontal.svg'
      : '/ossawayas-logo-vertical.svg';

  return (
    <Box
      component="span"
      style={{
        display: 'block',
        width: '100%',
        maxWidth: renderedWidth,
        marginInline: 'auto',
        lineHeight: 0,
        ...(light ? { filter: 'brightness(0) invert(1)' } : {}),
      }}
    >
      <Image
        src={src}
        alt="Ossawayas — Automatisation · IA"
        width={renderedWidth}
        height={renderedHeight}
        priority={priority}
        unoptimized
        style={{
          width: '100%',
          height: 'auto',
          objectFit: 'contain',
          display: 'block',
        }}
      />
    </Box>
  );
}
