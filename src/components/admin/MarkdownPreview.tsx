import { Box, Paper, ScrollArea, Text, Title } from '@mantine/core'
import { MarkdownRenderer } from '../MarkdownRenderer'

interface MarkdownPreviewProps {
    content: string
    title?: string
    maxHeight?: number
}

export function MarkdownPreview({ content, title = "Aperçu", maxHeight = 400 }: MarkdownPreviewProps) {
    return (
        <Paper withBorder p="md">
            <Title order={4} size="h5" mb="sm" c="dimmed">
                {title}
            </Title>

            <ScrollArea h={maxHeight}>
                {content.trim() ? (
                    <MarkdownRenderer content={content} />
                ) : (
                    <Text c="dimmed" fs="italic" ta="center" py="xl">
                        Saisissez du contenu Markdown pour voir l'aperçu...
                    </Text>
                )}
            </ScrollArea>
        </Paper>
    )
}
