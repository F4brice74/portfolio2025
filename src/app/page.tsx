import { Container, Title, Text, Button, Group } from '@mantine/core';

export default function HomePage() {
  return (
    <Container size="lg" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
      <Title order={1} size="3rem" style={{ textAlign: 'center', marginBottom: '2rem' }}>
        Fabrice Portfolio
      </Title>
      
      <Text size="xl" style={{ textAlign: 'center', marginBottom: '2rem', maxWidth: '600px' }}>
        Welcome to my portfolio! I'm a full-stack developer passionate about creating 
        modern web applications with cutting-edge technologies.
      </Text>
      
      <Group justify="center">
        <Button variant="filled" size="lg">
          View My Work
        </Button>
        <Button variant="outline" size="lg">
          Contact Me
        </Button>
      </Group>
      
      <Text size="sm" style={{ marginTop: '2rem', textAlign: 'center', opacity: 0.7 }}>
        Built with Next.js, TypeScript, and Mantine UI
      </Text>
    </Container>
  );
}
