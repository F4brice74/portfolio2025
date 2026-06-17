import { createTheme, type MantineColorsTuple } from '@mantine/core';

const navy: MantineColorsTuple = [
  '#e8edf3',
  '#c5d0de',
  '#a2b3c9',
  '#7f96b4',
  '#5c799f',
  '#3d5f82',
  '#2d4a6b',
  '#1e3a5f',
  '#162e4d',
  '#0e223b',
];

const brand: MantineColorsTuple = [
  '#fff4ed',
  '#ffe4d4',
  '#ffc9a8',
  '#ffae7c',
  '#ff9350',
  '#ff732d',
  '#e66528',
  '#cc5723',
  '#b3491e',
  '#993b19',
];

interface OssawayasFonts {
  body: string;
  heading: string;
}

export function createOssawayasTheme({ body, heading }: OssawayasFonts) {
  return createTheme({
    primaryColor: 'navy',
    colors: {
      navy,
      brand,
    },
    fontFamily: body,
    headings: {
      fontFamily: heading,
      fontWeight: '600',
    },
    defaultRadius: 'md',
    components: {
      Button: {
        defaultProps: {
          radius: 'md',
        },
      },
      Card: {
        defaultProps: {
          radius: 'lg',
        },
      },
      Title: {
        styles: {
          root: {
            letterSpacing: '-0.02em',
          },
        },
      },
    },
  });
}
