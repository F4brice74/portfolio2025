import { Button, Group } from '@mantine/core';
import { IconBrandGithub, IconExternalLink, IconFileText, IconRocket } from '@tabler/icons-react';

interface ProjectLinksProps {
    links: {
        demo?: string;
        github?: string;
        docs?: string;
        live?: string;
    };
}

/**
 * Composant pour afficher les liens d'un projet factory
 * (démo, GitHub, documentation, etc.)
 */
export function ProjectLinks({ links }: ProjectLinksProps) {
    const linkConfigs = [
        {
            key: 'demo',
            url: links.demo,
            label: 'Voir la démo',
            icon: IconRocket,
            variant: 'filled' as const,
        },
        {
            key: 'live',
            url: links.live,
            label: 'Version live',
            icon: IconExternalLink,
            variant: 'filled' as const,
        },
        {
            key: 'github',
            url: links.github,
            label: 'Code source',
            icon: IconBrandGithub,
            variant: 'outline' as const,
        },
        {
            key: 'docs',
            url: links.docs,
            label: 'Documentation',
            icon: IconFileText,
            variant: 'outline' as const,
        },
    ];

    const availableLinks = linkConfigs.filter((config) => config.url);

    if (availableLinks.length === 0) {
        return null;
    }

    return (
        <Group gap="md" style={{ flexWrap: 'wrap' }}>
            {availableLinks.map((config) => (
                <Button
                    key={config.key}
                    component="a"
                    href={config.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    leftSection={<config.icon size={18} />}
                    variant={config.variant}
                    size="md"
                    style={{ minWidth: 'fit-content' }}
                >
                    {config.label}
                </Button>
            ))}
        </Group>
    );
}

