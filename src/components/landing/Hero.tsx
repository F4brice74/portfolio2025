import {
  Container, Title, Text, Button, Group, Box,
} from '@mantine/core';
import type { CSSProperties } from 'react';
import { IconArrowRight } from '@tabler/icons-react';
import Link from 'next/link';
import { OssawayasLogo } from '@/components/brand/OssawayasLogo';

const stats = [
  { value: '+10h', label: 'économisées par semaine' },
  { value: '100%', label: 'satisfaction client' },
  { value: '3×', label: 'ROI moyen constaté' },
  { value: '< 5 sem.', label: 'délai de livraison' },
];

export default function Hero() {
  return (
    <Box pos="relative" pt={{ base: 56, md: 60 }} pb={64} className="section-bg-hero" style={{ overflow: 'hidden' }}>
      <Box className="hero-grid-bg" aria-hidden />

      <Container size="lg" pos="relative" style={{ zIndex: 1 }}>
        <Box maw={720} mx="auto" ta="center">
          <Box
            mb="lg"
            w="100%"
            className="hero-enter"
            style={{ display: 'flex', justifyContent: 'center', '--hero-delay': '50ms' } as CSSProperties}
          >
            <OssawayasLogo variant="horizontal" height={100} light priority />
          </Box>

          <Title
            order={1}
            mb="lg"
            className="hero-enter"
            style={{
              fontSize: 'clamp(2.25rem, 5vw, 3.75rem)',
              lineHeight: 1.1,
              color: 'white',
              '--hero-delay': '160ms',
            } as CSSProperties}
          >
            Automatisez plusieurs heures de travail{' '}
            <Text span c="brand.5" inherit>par semaine.</Text>
          </Title>

          <Text
            size="lg"
            c="white"
            maw={580}
            mx="auto"
            mb={36}
            lh={1.7}
            className="hero-enter"
            style={{ '--hero-delay': '280ms' } as CSSProperties}
          >
            Ossawayas conçoit des systèmes d&apos;IA et d&apos;automatisation sur mesure
            pour les TPE, artisans, indépendants et PME. Vous gagnez du temps,
            vos équipes se concentrent sur ce qui compte vraiment.
          </Text>

          <Group
            justify="center"
            gap="md"
            wrap="wrap"
            className="hero-enter"
            style={{ '--hero-delay': '390ms' } as CSSProperties}
          >
            <Button
              component={Link}
              href="/#contact"
              size="lg"
              color="brand"
              className="motion-button"
              rightSection={<IconArrowRight size={16} />}
            >
              Réserver un appel gratuit
            </Button>
            <Button
              component={Link}
              href="/#offres"
              variant="outline"
              size="lg"
              color="white"
              className="motion-button"
            >
              Voir les offres
            </Button>
          </Group>

          <Text
            size="xs"
            c="gray.6"
            mt="md"
            className="hero-enter"
            style={{ '--hero-delay': '480ms' } as CSSProperties}
          >
            Sans engagement · Réponse sous 48h
          </Text>
        </Box>

        <Box
          className="hero-stats-grid hero-enter"
          mt={64}
          maw={900}
          mx="auto"
          style={{ '--hero-delay': '580ms' } as CSSProperties}
        >
          {stats.map((stat) => (
            <Box key={stat.label} className="hero-stats-cell">
              <div className="hero-stats-value">{stat.value}</div>
              <div className="hero-stats-label">{stat.label}</div>
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
}
