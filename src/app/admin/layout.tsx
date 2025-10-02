import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { Container, Title, Group, Button } from "@mantine/core";
import { IconArrowLeft, IconSettings, IconArticle, IconDashboard } from "@tabler/icons-react";
import Link from "next/link";

export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    // Vérifier l'authentification
    const { userId } = await auth();

    if (!userId) {
        redirect("/");
    }

    const adminNavItems = [
        {
            href: "/admin",
            icon: IconDashboard,
            label: "Dashboard",
        },
        {
            href: "/admin/articles",
            icon: IconArticle,
            label: "Articles",
        },
        {
            href: "/admin/settings",
            icon: IconSettings,
            label: "Paramètres",
        },
    ];

    return (
        <div style={{ minHeight: "100vh", backgroundColor: "var(--mantine-color-gray-0)" }}>
            {/* Admin Header */}
            <div
                style={{
                    backgroundColor: "var(--mantine-color-white)",
                    borderBottom: "1px solid var(--mantine-color-gray-2)",
                    padding: "16px 0",
                }}
            >
                <Container size="xl">
                    <Group justify="space-between" align="center">
                        <Group gap="xl">
                            <Title order={2} c="blue">
                                Administration
                            </Title>
                            <Group gap="md">
                                {adminNavItems.map((item) => {
                                    const IconComponent = item.icon;
                                    return (
                                        <Link
                                            key={item.href}
                                            href={item.href}
                                            style={{ textDecoration: "none" }}
                                        >
                                            <Button
                                                variant="subtle"
                                                leftSection={<IconComponent size={16} />}
                                                size="sm"
                                            >
                                                {item.label}
                                            </Button>
                                        </Link>
                                    );
                                })}
                            </Group>
                        </Group>

                        <Group gap="sm">
                            <Button
                                component={Link}
                                href="/"
                                variant="outline"
                                leftSection={<IconArrowLeft size={16} />}
                                size="sm"
                            >
                                Retour au site
                            </Button>
                        </Group>
                    </Group>
                </Container>
            </div>

            {/* Admin Content */}
            <Container size="xl" py="xl">
                {children}
            </Container>
        </div>
    );
}
