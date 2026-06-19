'use client';

import { useState, useEffect } from 'react';
import {
  Container, Title, Text, Box, Group, Badge, Anchor, Button,
  Stack, TextInput, Textarea, SimpleGrid, Paper,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { IconCircleCheck, IconSend, IconCalendar } from '@tabler/icons-react';
import Cal, { getCalApi } from '@calcom/embed-react';

const CAL_LINK = 'fabrice-miquet-sage/20min';

const badges = ['Gratuit', '20 minutes', 'Sans engagement'];

interface LeadForm {
  nom: string;
  prenom: string;
  societe: string;
  telephone: string;
  besoins: string;
}

function CalEmbed() {
  useEffect(() => {
    (async () => {
      const cal = await getCalApi();
      cal('ui', {
        hideEventTypeDetails: false,
        layout: 'month_view',
      });
    })();
  }, []);

  return (
    <Cal
      calLink={CAL_LINK}
      style={{ width: '100%', minHeight: 600, overflow: 'auto' }}
      config={{ layout: 'month_view' }}
    />
  );
}

export default function FinalCTA() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<LeadForm>({
    initialValues: { nom: '', prenom: '', societe: '', telephone: '', besoins: '' },
    validate: {
      nom: (v) => v.trim().length < 2 ? 'Nom requis' : null,
      prenom: (v) => v.trim().length < 2 ? 'Prénom requis' : null,
      telephone: (v) => v.trim().length < 6 ? 'Téléphone requis' : null,
    },
  });

  const handleSubmit = async (values: LeadForm) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });
      if (!res.ok) throw new Error('Erreur serveur');
      setSubmitted(true);
    } catch {
      setError('Une erreur est survenue. Réessayez ou écrivez-nous par email.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box id="contact" py={{ base: 72, md: 96 }} className="section-bg" style={{ borderTop: '1px solid var(--ossawayas-border)' }}>
      <Container size="sm">
        <Paper shadow="lg" radius="xl" withBorder style={{ overflow: 'hidden', backgroundColor: 'var(--ossawayas-card)' }}>
          <Box bg="navy.7" px="xl" py={40} ta="center" c="white">
            <Title order={2} c="white">
              Prêt à récupérer vos 10h par semaine ?
            </Title>
            <Text size="sm" maw={420} mx="auto" mt="sm" c="gray.3" lh={1.6}>
              {submitted
                ? 'Choisissez maintenant votre créneau ci-dessous.'
                : 'Remplissez le formulaire pour accéder au planning d\'appel.'}
            </Text>
            {!submitted && (
              <Group justify="center" gap="xs" mt="lg">
                {badges.map((label) => (
                  <Badge
                    key={label}
                    variant="outline"
                    color="gray"
                    size="lg"
                    radius="xl"
                    leftSection={<IconCircleCheck size={12} />}
                    styles={{
                      root: {
                        backgroundColor: 'rgba(255,255,255,0.08)',
                        borderColor: 'rgba(255,255,255,0.15)',
                        color: 'white',
                      },
                    }}
                  >
                    {label}
                  </Badge>
                ))}
              </Group>
            )}
          </Box>

          <Box px="xl" py="xl">
            {submitted ? (
              <Stack align="center" gap="md">
                <Box
                  w={56}
                  h={56}
                  style={{
                    borderRadius: '50%',
                    backgroundColor: 'color-mix(in srgb, var(--ossawayas-success) 12%, transparent)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <IconCalendar size={28} color="var(--ossawayas-success)" />
                </Box>
                <Title order={3} ta="center">Demande envoyée</Title>
                <Text size="sm" c="dimmed" ta="center" maw={360} lh={1.6}>
                  Merci. Choisissez votre créneau pour l&apos;appel découverte gratuit.
                </Text>
                <Box w="100%" mt="md">
                  <CalEmbed />
                  <Text size="xs" c="dimmed" ta="center" mt="sm">
                    Problème d&apos;affichage ?{' '}
                    <Anchor
                      href={`https://cal.com/${CAL_LINK}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      size="xs"
                    >
                      Ouvrir le calendrier dans un nouvel onglet
                    </Anchor>
                  </Text>
                </Box>
              </Stack>
            ) : (
              <form onSubmit={form.onSubmit(handleSubmit)} noValidate>
                <Stack gap="md">
                  <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="md">
                    <TextInput
                      label="Prénom"
                      placeholder="Marie"
                      required
                      {...form.getInputProps('prenom')}
                    />
                    <TextInput
                      label="Nom"
                      placeholder="Dupont"
                      required
                      {...form.getInputProps('nom')}
                    />
                  </SimpleGrid>

                  <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="md">
                    <TextInput
                      label="Société"
                      placeholder="Votre entreprise"
                      {...form.getInputProps('societe')}
                    />
                    <TextInput
                      label="Téléphone"
                      placeholder="+33 6 00 00 00 00"
                      required
                      {...form.getInputProps('telephone')}
                    />
                  </SimpleGrid>

                  <Textarea
                    label="Vos besoins"
                    placeholder="Décrivez en quelques mots le processus qui vous fait perdre le plus de temps…"
                    minRows={4}
                    autosize
                    {...form.getInputProps('besoins')}
                  />

                  {error && <Text c="red" size="sm">{error}</Text>}

                  <Button
                    type="submit"
                    size="lg"
                    color="navy"
                    loading={loading}
                    rightSection={<IconSend size={16} />}
                    fullWidth
                  >
                    Accéder au planning
                  </Button>

                  <Text size="xs" c="dimmed" ta="center">
                    Questions ? Écrivez à{' '}
                    <Anchor href="mailto:contact@ossawayas.com" c="blue.6" size="xs">
                      contact@ossawayas.com
                    </Anchor>
                  </Text>
                </Stack>
              </form>
            )}
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}
