import { Box, Group, Text, Title } from '@mantine/core';

interface SectionHeaderProps {
  label: string;
  title: string;
  description: string;
}

export default function SectionHeader({ label, title, description }: SectionHeaderProps) {
  return (
    <Box ta="center" mb={64}>
      <Group justify="center" gap="lg" mb="xl" wrap="nowrap">
        <Box visibleFrom="xs" style={{ width: 64, height: 2, backgroundColor: 'var(--ossawayas-brand)', borderRadius: 1 }} />
        <Text
          size="lg"
          fw={600}
          tt="uppercase"
          c="navy.7"
          className="font-heading"
          style={{ letterSpacing: '0.12em', whiteSpace: 'nowrap' }}
        >
          {label}
        </Text>
        <Box visibleFrom="xs" style={{ width: 64, height: 2, backgroundColor: 'var(--ossawayas-brand)', borderRadius: 1 }} />
      </Group>

      <Title
        order={2}
        mb="md"
        style={{ fontSize: 'clamp(1.875rem, 3.5vw, 2.75rem)', lineHeight: 1.15 }}
      >
        {title}
      </Title>

      <Text c="gray.7" size="lg" maw={560} mx="auto" lh={1.7}>
        {description}
      </Text>
    </Box>
  );
}
