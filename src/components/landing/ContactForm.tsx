'use client';

import { useForm } from '@mantine/form';
import {
  TextInput, Textarea, Button, Grid, Stack, Text, Alert,
} from '@mantine/core';
import { useState } from 'react';
import { IconCircleCheck, IconAlertCircle } from '@tabler/icons-react';

export default function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const form = useForm({
    initialValues: { name: '', email: '', company: '', message: '' },
    validate: {
      name: v => v.trim().length < 2 ? 'Nom requis' : null,
      email: v => (/^\S+@\S+\.\S+$/.test(v) ? null : 'Email invalide'),
      message: v => v.trim().length < 10 ? 'Message trop court' : null,
    },
  });

  const handleSubmit = form.onSubmit(async () => {
    setStatus('sending');
    // TODO: brancher un vrai service email (Resend, Formspree, etc.)
    setTimeout(() => {
      setStatus('success');
      form.reset();
    }, 900);
  });

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 560, margin: '0 auto', textAlign: 'left' }}>
      <Stack gap="md">
        <Grid gutter="md">
          <Grid.Col span={{ base: 12, sm: 6 }}>
            <TextInput label="Nom" placeholder="Votre nom" required {...form.getInputProps('name')} />
          </Grid.Col>
          <Grid.Col span={{ base: 12, sm: 6 }}>
            <TextInput label="Email" placeholder="vous@exemple.fr" required type="email" {...form.getInputProps('email')} />
          </Grid.Col>
        </Grid>

        <TextInput label="Entreprise" placeholder="Nom de votre entreprise (optionnel)" {...form.getInputProps('company')} />

        <Textarea
          label="Message"
          placeholder="Décrivez votre besoin d'automatisation…"
          required
          minRows={4}
          autosize
          {...form.getInputProps('message')}
        />

        <Button type="submit" size="lg" loading={status === 'sending'} fullWidth>
          Envoyer le message
        </Button>

        {status === 'success' && (
          <Alert icon={<IconCircleCheck size={16} />} color="green" radius="md">
            Message envoyé ! Nous vous répondrons sous 24h.
          </Alert>
        )}
        {status === 'error' && (
          <Alert icon={<IconAlertCircle size={16} />} color="red" radius="md">
            Une erreur s&apos;est produite. Veuillez réessayer.
          </Alert>
        )}
      </Stack>
    </form>
  );
}
