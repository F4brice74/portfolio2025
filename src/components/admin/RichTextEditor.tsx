'use client';

import { Textarea, Text } from '@mantine/core';

interface RichTextEditorProps {
    value: string;
    onChange: (value: string) => void;
    error?: string;
    placeholder?: string;
}

export function RichTextEditor({
    value,
    onChange,
    error,
    placeholder = "Rédigez le contenu de votre article ici..."
}: RichTextEditorProps) {
    return (
        <div>
            <Textarea
                value={value}
                onChange={(event) => onChange(event.currentTarget.value)}
                placeholder={placeholder}
                minRows={15}
                autosize
                error={error}
                description="Vous pouvez utiliser Markdown pour le formatage (gras: **texte**, italique: *texte*, etc.)"
            />
            {error && (
                <Text size="xs" c="red" mt="xs">
                    {error}
                </Text>
            )}
        </div>
    );
}
