import { Title, Text, Card, Stack, Group, Button, TextInput, Textarea, Switch, Divider } from "@mantine/core";
import { IconSettings, IconUser, IconBell, IconShield, IconDeviceFloppy } from "@tabler/icons-react";

export default function AdminSettingsPage() {
    return (
        <Stack gap="xl">
            {/* Page Header */}
            <div>
                <Title order={1} size="h1" mb="sm">
                    Paramètres
                </Title>
                <Text c="dimmed" size="lg">
                    Configurez les paramètres de votre site et de votre compte
                </Text>
            </div>

            {/* Profile Settings */}
            <Card shadow="sm" padding="lg" radius="md" withBorder>
                <Group mb="md">
                    <IconUser size={20} color="var(--mantine-color-blue-6)" />
                    <Title order={3}>Profil</Title>
                </Group>

                <Stack gap="md">
                    <TextInput
                        label="Nom complet"
                        placeholder="Votre nom complet"
                        defaultValue="Fabrice MIQUET-SAGE"
                    />
                    <TextInput
                        label="Email"
                        placeholder="votre@email.com"
                        defaultValue="fabrice@example.com"
                    />
                    <Textarea
                        label="Bio"
                        placeholder="Une courte description de vous"
                        defaultValue="FullStack Developpeur & Catalyseur de projets digitaux"
                        minRows={3}
                    />
                </Stack>
            </Card>

            {/* Site Settings */}
            <Card shadow="sm" padding="lg" radius="md" withBorder>
                <Group mb="md">
                    <IconSettings size={20} color="var(--mantine-color-green-6)" />
                    <Title order={3}>Paramètres du Site</Title>
                </Group>

                <Stack gap="md">
                    <TextInput
                        label="Titre du site"
                        placeholder="Titre de votre site"
                        defaultValue="Fabrice MIQUET-SAGE - Portfolio & Blog"
                    />
                    <Textarea
                        label="Description du site"
                        placeholder="Description de votre site"
                        defaultValue="Portfolio et blog de Fabrice MIQUET-SAGE - FullStack Developpeur & Catalyseur de projets digitaux"
                        minRows={2}
                    />
                    <TextInput
                        label="URL du site"
                        placeholder="https://votre-site.com"
                        defaultValue="https://fabrice-miquet-sage.com"
                    />
                </Stack>
            </Card>

            {/* Notification Settings */}
            <Card shadow="sm" padding="lg" radius="md" withBorder>
                <Group mb="md">
                    <IconBell size={20} color="var(--mantine-color-orange-6)" />
                    <Title order={3}>Notifications</Title>
                </Group>

                <Stack gap="md">
                    <Switch
                        label="Notifications par email"
                        description="Recevoir des notifications par email pour les nouveaux commentaires"
                        defaultChecked
                    />
                    <Switch
                        label="Notifications de publication"
                        description="Recevoir une confirmation lors de la publication d'articles"
                        defaultChecked
                    />
                    <Switch
                        label="Rappels de brouillons"
                        description="Recevoir des rappels pour les articles en brouillon"
                        defaultChecked={false}
                    />
                </Stack>
            </Card>

            {/* Security Settings */}
            <Card shadow="sm" padding="lg" radius="md" withBorder>
                <Group mb="md">
                    <IconShield size={20} color="var(--mantine-color-red-6)" />
                    <Title order={3}>Sécurité</Title>
                </Group>

                <Stack gap="md">
                    <Button variant="outline" color="red">
                        Changer le mot de passe
                    </Button>
                    <Button variant="outline" color="orange">
                        Activer l'authentification à deux facteurs
                    </Button>
                    <Divider />
                    <Text size="sm" c="dimmed">
                        Dernière connexion : Il y a 2 heures
                    </Text>
                </Stack>
            </Card>

            {/* Save Button */}
            <Group justify="flex-end">
                <Button
                    leftSection={<IconDeviceFloppy size={16} />}
                    size="md"
                >
                    Sauvegarder les paramètres
                </Button>
            </Group>
        </Stack>
    );
}
