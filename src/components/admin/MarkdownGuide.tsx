import { Accordion, Code, Text, Title, Box, List, ThemeIcon } from '@mantine/core'
import { IconMarkdown, IconCode, IconList, IconQuote, IconLink, IconTable, IconPhoto } from '@tabler/icons-react'

export function MarkdownGuide() {
    return (
        <Box>
            <Title order={3} mb="md" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <IconMarkdown size={24} />
                Guide Markdown
            </Title>

            <Accordion variant="separated">
                <Accordion.Item value="formatting">
                    <Accordion.Control icon={<IconCode size={16} />}>
                        Formatage de base
                    </Accordion.Control>
                    <Accordion.Panel>
                        <List spacing="xs">
                            <List.Item>
                                <Code>**texte**</Code> ou <Code>__texte__</Code> pour du <strong>gras</strong>
                            </List.Item>
                            <List.Item>
                                <Code>*texte*</Code> ou <Code>_texte_</Code> pour de l'<em>italique</em>
                            </List.Item>
                            <List.Item>
                                <Code>`code`</Code> pour du <Code>code inline</Code>
                            </List.Item>
                            <List.Item>
                                <Code>~~texte~~</Code> pour du <del>texte barré</del>
                            </List.Item>
                        </List>
                    </Accordion.Panel>
                </Accordion.Item>

                <Accordion.Item value="headings">
                    <Accordion.Control icon={<IconCode size={16} />}>
                        Titres
                    </Accordion.Control>
                    <Accordion.Panel>
                        <List spacing="xs">
                            <List.Item><Code># Titre 1</Code></List.Item>
                            <List.Item><Code>## Titre 2</Code></List.Item>
                            <List.Item><Code>### Titre 3</Code></List.Item>
                            <List.Item><Code>#### Titre 4</Code></List.Item>
                            <List.Item><Code>##### Titre 5</Code></List.Item>
                            <List.Item><Code>###### Titre 6</Code></List.Item>
                        </List>
                    </Accordion.Panel>
                </Accordion.Item>

                <Accordion.Item value="lists">
                    <Accordion.Control icon={<IconList size={16} />}>
                        Listes
                    </Accordion.Control>
                    <Accordion.Panel>
                        <Text size="sm" mb="xs"><strong>Liste non ordonnée :</strong></Text>
                        <Code block mb="md">
                            {`- Premier élément
- Deuxième élément
  - Sous-élément
- Troisième élément`}
                        </Code>

                        <Text size="sm" mb="xs"><strong>Liste ordonnée :</strong></Text>
                        <Code block>
                            {`1. Premier point
2. Deuxième point
3. Troisième point`}
                        </Code>
                    </Accordion.Panel>
                </Accordion.Item>

                <Accordion.Item value="quotes">
                    <Accordion.Control icon={<IconQuote size={16} />}>
                        Citations
                    </Accordion.Control>
                    <Accordion.Panel>
                        <Code block>
                            {`> Ceci est une citation.
> Elle peut s'étendre sur plusieurs lignes.`}
                        </Code>
                    </Accordion.Panel>
                </Accordion.Item>

                <Accordion.Item value="code">
                    <Accordion.Control icon={<IconCode size={16} />}>
                        Blocs de code
                    </Accordion.Control>
                    <Accordion.Panel>
                        <Text size="sm" mb="xs">Utilisez trois backticks avec le langage :</Text>
                        <Code block>
                            {`\`\`\`javascript
function saluer(nom) {
    console.log(\`Bonjour \${nom}!\`);
}
\`\`\``}
                        </Code>
                    </Accordion.Panel>
                </Accordion.Item>

                <Accordion.Item value="links">
                    <Accordion.Control icon={<IconLink size={16} />}>
                        Liens et images
                    </Accordion.Control>
                    <Accordion.Panel>
                        <List spacing="xs">
                            <List.Item>
                                <strong>Lien :</strong> <Code>[Texte du lien](https://example.com)</Code>
                            </List.Item>
                            <List.Item>
                                <strong>Image :</strong> <Code>![Texte alternatif](url-de-l-image.jpg)</Code>
                            </List.Item>
                        </List>
                    </Accordion.Panel>
                </Accordion.Item>

                <Accordion.Item value="tables">
                    <Accordion.Control icon={<IconTable size={16} />}>
                        Tableaux
                    </Accordion.Control>
                    <Accordion.Panel>
                        <Code block>
                            {`| Colonne 1 | Colonne 2 | Colonne 3 |
|-----------|-----------|-----------|
| Cellule 1 | Cellule 2 | Cellule 3 |
| Cellule 4 | Cellule 5 | Cellule 6 |`}
                        </Code>
                    </Accordion.Panel>
                </Accordion.Item>

                <Accordion.Item value="misc">
                    <Accordion.Control icon={<IconCode size={16} />}>
                        Autres éléments
                    </Accordion.Control>
                    <Accordion.Panel>
                        <List spacing="xs">
                            <List.Item>
                                <strong>Séparateur :</strong> <Code>---</Code> ou <Code>***</Code>
                            </List.Item>
                            <List.Item>
                                <strong>Saut de ligne :</strong> Deux espaces à la fin d'une ligne
                            </List.Item>
                            <List.Item>
                                <strong>Échapper un caractère :</strong> <Code>\*texte\*</Code> (avec backslash)
                            </List.Item>
                        </List>
                    </Accordion.Panel>
                </Accordion.Item>
            </Accordion>
        </Box>
    )
}
