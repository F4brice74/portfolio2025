'use client';

import { useMemo } from 'react';
import { Box, Container, Button, Group } from '@mantine/core';
import { Carousel } from '@mantine/carousel';
import { useReducedMotion } from '@mantine/hooks';
import { IconArrowRight } from '@tabler/icons-react';
import Autoplay from 'embla-carousel-autoplay';
import Link from 'next/link';
import ArticleCard from '@/components/ArticleCard';
import SectionHeader from '@/components/landing/SectionHeader';
import type { Article } from '@/lib/articles/types';

interface LatestArticlesSectionProps {
  articles: Article[];
}

export default function LatestArticlesSection({ articles }: LatestArticlesSectionProps) {
  const reduceMotion = useReducedMotion();

  const plugins = useMemo(
    () => (reduceMotion
      ? []
      : [Autoplay({ delay: 5000, stopOnMouseEnter: true, stopOnInteraction: false })]),
    [reduceMotion],
  );

  if (articles.length === 0) return null;

  return (
    <Box
      id="articles"
      py={{ base: 72, md: 96 }}
      className="section-bg-alt"
      style={{ borderTop: '1px solid var(--ossawayas-border)' }}
    >
      <Container size="lg">
        <SectionHeader
          label="Blog"
          title="Automatisation, IA et productivité"
          description="Nos derniers conseils et retours d'expérience pour faire gagner du temps à votre activité."
        />

        <Carousel
          aria-label="Derniers articles du blog"
          slideSize={{ base: '86%', sm: '50%', md: '33.333333%' }}
          slideGap="lg"
          emblaOptions={{ loop: true, align: 'start' }}
          plugins={plugins}
          withControls
          withIndicators
          controlSize={38}
          controlsOffset="xs"
          previousControlProps={{ 'aria-label': 'Articles précédents' }}
          nextControlProps={{ 'aria-label': 'Articles suivants' }}
          classNames={{
            root: 'blog-carousel',
            controls: 'blog-carousel-controls',
            control: 'blog-carousel-control',
            indicators: 'blog-carousel-indicators',
            indicator: 'blog-carousel-indicator',
          }}
        >
          {articles.map((article) => (
            <Carousel.Slide key={article.id}>
              <ArticleCard article={article} />
            </Carousel.Slide>
          ))}
        </Carousel>

        <Group justify="center" mt={64}>
          <Button
            component={Link}
            href="/blog"
            variant="outline"
            color="gray"
            rightSection={<IconArrowRight size={16} />}
          >
            Voir tous les articles
          </Button>
        </Group>
      </Container>
    </Box>
  );
}
