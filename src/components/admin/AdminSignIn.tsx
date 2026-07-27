'use client';

import { SignIn } from '@clerk/nextjs';
import { Box, Container, Stack, Text, Title } from '@mantine/core';

export function AdminSignIn() {
  return (
    <Box mih="100vh" bg="gray.0" py={64}>
      <Container size="sm">
        <Stack align="center" gap="xl">
          <Stack align="center" gap="xs">
            <Title order={2}>Administration</Title>
            <Text c="dimmed" size="sm" ta="center">
              Connectez-vous pour accéder à l&apos;espace admin.
            </Text>
          </Stack>
          <SignIn
            routing="hash"
            forceRedirectUrl="/admin"
            fallbackRedirectUrl="/admin"
          />
        </Stack>
      </Container>
    </Box>
  );
}
