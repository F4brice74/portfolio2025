import { Badge } from '@mantine/core';

interface TechnologyBadgeProps {
    technology: string;
}

/**
 * Badge pour afficher une technologie
 * Utilisé dans les pages factory pour montrer les technologies utilisées
 */
export function TechnologyBadge({ technology }: TechnologyBadgeProps) {
    return (
        <Badge
            variant="light"
            size="lg"
            radius="md"
            style={{
                textTransform: 'none',
                fontWeight: 500,
            }}
        >
            {technology}
        </Badge>
    );
}

