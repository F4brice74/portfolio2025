'use client';

import { useState, useEffect, useRef } from 'react';
import {
  Container, Title, Text, Box, Group, Badge, Anchor, Button,
  Stack, TextInput, Textarea, SimpleGrid, Loader,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { IconCircleCheck, IconSend } from '@tabler/icons-react';

const CAL_LINK = 'fabrice-miquet-sage/20min';

interface LeadForm {
  nom: string;
  prenom: string;
  societe: string;
  telephone: string;
  besoins: string;
}

type CalFunction = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (...args: any[]): void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  q?: any[][];
  loaded?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ns?: Record<string, any>;
};

declare global {
  interface Window {
    Cal?: CalFunction;
  }
}

function CalEmbed() {
  const calRef = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // Script officiel Cal.com embed (version inline)
    if (!window.Cal) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const cal: CalFunction = function (...args: any[]) {
        cal.q = cal.q || [];
        cal.q.push(args);
      };
      cal.q = [];
      window.Cal = cal;
      const s = document.createElement('script');
      s.src = 'https://app.cal.com/embed/embed.js';
      s.async = true;
      document.head.appendChild(s);
    }

    window.Cal!('init', 'audit', { origin: 'https://cal.com' });
    window.Cal!('inline', 'audit', {
      elementOrSelector: '#cal-inline',
      calLink: CAL_LINK,
      layout: 'month_view',
    });
    window.Cal!('ui', 'audit', {
      hideEventTypeDetails: false,
      layout: 'month_view',
    });

    const timer = setTimeout(() => setReady(true), 800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Box style={{ position: 'relative' }}>
      {!ready && (
        <Stack align="center" py="xl">
          <Loader size="md" />
          <Text size="sm" c="dimmed">Chargement du calendrier…</Text>
        </Stack>
      )}
      <div
        id="cal-inline"
        ref={calRef}
        style={{
          width: '100%',
          minHeight: '600px',
          opacity: ready ? 1 : 0,
          transition: 'opacity 0.3s ease',
        }}
      />
    </Box>
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
      besoins: (v) => v.trim().length < 10 ? 'Décrivez brièvement vos besoins (10 car. min)' : null,
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
    <Box id="contact" py={80}>
      <Container size="lg">
        <Box
          p={{ base: 'xl', md: 60 }}
          style={{
            backgroundColor: 'var(--mantine-color-gray-0)',
            border: '1px solid var(--mantine-color-gray-2)',
            borderRadius: 'var(--mantine-radius-lg)',
          }}
        >
          <Stack align="center" mb={40}>
            <Title order={2} ta="center">Prêt à récupérer vos 10h par semaine ?</Title>
            <Text size="lg" c="dimmed" maw={520} ta="center">
              {submitted
                ? 'Merci ! Choisissez maintenant votre créneau ci-dessous.'
                : 'Remplissez le formulaire — le calendrier s\'ouvrira directement sur cette page.'}
            </Text>
            <Group gap="sm">
              {['✓ Gratuit', '✓ 20 minutes', '✓ Sans engagement'].map(label => (
                <Badge key={label} variant="outline" color="blue" size="lg" radius="xl">
                  {label}
                </Badge>
              ))}
            </Group>
          </Stack>

          {submitted ? (
            /* --- Calendrier Cal.com inline --- */
            <Box>
              <Stack align="center" gap="xs" mb="xl">
                <IconCircleCheck size={40} color="var(--mantine-color-green-6)" />
                <Title order={4} c="green.7">Formulaire envoyé ! Choisissez votre créneau :</Title>
              </Stack>
              <CalEmbed />
            </Box>
          ) : (
            /* --- Formulaire --- */
            <form onSubmit={form.onSubmit(handleSubmit)} noValidate>
              <Stack gap="md" maw={640} mx="auto">
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
                    placeholder="Acme SAS"
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
                  placeholder="Ex : je perds 2h par jour à ressaisir des devis manuellement, j'aimerais automatiser ça…"
                  autosize
                  minRows={4}
                  {...form.getInputProps('besoins')}
                />

                {error && <Text c="red" size="sm">{error}</Text>}

                <Button
                  type="submit"
                  size="lg"
                  loading={loading}
                  rightSection={<IconSend size={16} />}
                  fullWidth
                >
                  Envoyer ma demande
                </Button>

                <Text size="xs" c="dimmed" ta="center">
                  Le calendrier de réservation apparaîtra ici après l&apos;envoi.
                </Text>
              </Stack>
            </form>
          )}

          <Text mt="xl" size="sm" c="dimmed" ta="center" mb={0}>
            Questions ? Écrivez à{' '}
            <Anchor href="mailto:contact@ossawayas.com" c="blue.6">
              contact@ossawayas.com
            </Anchor>
          </Text>
        </Box>
      </Container>
    </Box>
  );
}
