"use client"

import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeHighlight from 'rehype-highlight'
import rehypeRaw from 'rehype-raw'
import { Box, useMantineColorScheme } from '@mantine/core'
import { useEffect } from 'react'

interface MarkdownRendererProps {
    content: string
    className?: string
}

export function MarkdownRenderer({ content, className }: MarkdownRendererProps) {
    const { colorScheme } = useMantineColorScheme()

    useEffect(() => {
        // Charger dynamiquement le style de coloration syntaxique selon le thème
        const loadHighlightStyle = async () => {
            try {
                // Créer et injecter le style CSS dynamiquement
                const existingStyle = document.getElementById('highlight-theme')
                if (existingStyle) {
                    existingStyle.remove()
                }

                const link = document.createElement('link')
                link.id = 'highlight-theme'
                link.rel = 'stylesheet'
                link.href = colorScheme === 'dark'
                    ? 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/github-dark.min.css'
                    : 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/github.min.css'
                document.head.appendChild(link)
            } catch {
                // Ignore errors
            }
        }
        loadHighlightStyle()
    }, [colorScheme])

    return (
        <Box className={className}>
            <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeHighlight, rehypeRaw]}
                components={{
                    // Personnalisation des composants HTML générés
                    h1: ({ children }) => (
                        <h1 style={{
                            fontSize: '2rem',
                            fontWeight: 700,
                            marginBottom: '1rem',
                            marginTop: '2rem',
                            lineHeight: 1.2,
                            color: 'var(--mantine-color-text)'
                        }}>
                            {children}
                        </h1>
                    ),
                    h2: ({ children }) => (
                        <h2 style={{
                            fontSize: '1.75rem',
                            fontWeight: 600,
                            marginBottom: '0.875rem',
                            marginTop: '1.75rem',
                            lineHeight: 1.3,
                            color: 'var(--mantine-color-text)'
                        }}>
                            {children}
                        </h2>
                    ),
                    h3: ({ children }) => (
                        <h3 style={{
                            fontSize: '1.5rem',
                            fontWeight: 600,
                            marginBottom: '0.75rem',
                            marginTop: '1.5rem',
                            lineHeight: 1.4,
                            color: 'var(--mantine-color-text)'
                        }}>
                            {children}
                        </h3>
                    ),
                    h4: ({ children }) => (
                        <h4 style={{
                            fontSize: '1.25rem',
                            fontWeight: 600,
                            marginBottom: '0.5rem',
                            marginTop: '1.25rem',
                            lineHeight: 1.4,
                            color: 'var(--mantine-color-text)'
                        }}>
                            {children}
                        </h4>
                    ),
                    h5: ({ children }) => (
                        <h5 style={{
                            fontSize: '1.125rem',
                            fontWeight: 600,
                            marginBottom: '0.5rem',
                            marginTop: '1rem',
                            lineHeight: 1.4,
                            color: 'var(--mantine-color-text)'
                        }}>
                            {children}
                        </h5>
                    ),
                    h6: ({ children }) => (
                        <h6 style={{
                            fontSize: '1rem',
                            fontWeight: 600,
                            marginBottom: '0.5rem',
                            marginTop: '1rem',
                            lineHeight: 1.4,
                            color: 'var(--mantine-color-text)'
                        }}>
                            {children}
                        </h6>
                    ),
                    p: ({ children }) => (
                        <p style={{
                            marginBottom: '1rem',
                            lineHeight: 1.7,
                            fontSize: '1.125rem',
                            color: 'var(--mantine-color-text)'
                        }}>
                            {children}
                        </p>
                    ),
                    ul: ({ children }) => (
                        <ul style={{
                            marginBottom: '1rem',
                            paddingLeft: '1.5rem',
                            lineHeight: 1.6,
                            color: 'var(--mantine-color-text)'
                        }}>
                            {children}
                        </ul>
                    ),
                    ol: ({ children }) => (
                        <ol style={{
                            marginBottom: '1rem',
                            paddingLeft: '1.5rem',
                            lineHeight: 1.6,
                            color: 'var(--mantine-color-text)'
                        }}>
                            {children}
                        </ol>
                    ),
                    li: ({ children }) => (
                        <li style={{ marginBottom: '0.25rem' }}>
                            {children}
                        </li>
                    ),
                    blockquote: ({ children }) => (
                        <blockquote style={{
                            borderLeft: '4px solid var(--mantine-color-blue-5)',
                            paddingLeft: '1rem',
                            margin: '1.5rem 0',
                            fontStyle: 'italic',
                            backgroundColor: colorScheme === 'dark' ? 'var(--mantine-color-dark-6)' : 'var(--mantine-color-gray-0)',
                            padding: '1rem',
                            borderRadius: '4px',
                            color: 'var(--mantine-color-dimmed)'
                        }}>
                            {children}
                        </blockquote>
                    ),
                    code: ({ children, ...props }) => {
                        const isInline = !props.className?.includes('language-')
                        return isInline ? (
                            <code style={{
                                backgroundColor: colorScheme === 'dark' ? 'var(--mantine-color-dark-5)' : 'var(--mantine-color-gray-1)',
                                padding: '0.125rem 0.25rem',
                                borderRadius: '3px',
                                fontSize: '0.875rem',
                                fontFamily: 'Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
                                color: colorScheme === 'dark' ? 'var(--mantine-color-red-4)' : 'var(--mantine-color-red-7)'
                            }}>
                                {children}
                            </code>
                        ) : (
                            <code style={{ fontFamily: 'Monaco, Consolas, "Liberation Mono", "Courier New", monospace' }}>
                                {children}
                            </code>
                        )
                    },
                    pre: ({ children }) => (
                        <pre style={{
                            backgroundColor: colorScheme === 'dark' ? 'var(--mantine-color-dark-6)' : 'var(--mantine-color-gray-0)',
                            padding: '1rem',
                            borderRadius: '6px',
                            overflow: 'auto',
                            marginBottom: '1rem',
                            border: `1px solid ${colorScheme === 'dark' ? 'var(--mantine-color-dark-4)' : 'var(--mantine-color-gray-3)'}`
                        }}>
                            {children}
                        </pre>
                    ),
                    a: ({ href, children }) => {
                        // Détecter les liens vers la section factory
                        const isFactoryLink = href?.startsWith('/factory/')

                        return (
                            <a
                                href={href}
                                target={isFactoryLink ? undefined : "_blank"}
                                rel={isFactoryLink ? undefined : "noopener noreferrer"}
                                style={{
                                    color: isFactoryLink ? 'var(--mantine-color-violet-6)' : 'var(--mantine-color-blue-6)',
                                    textDecoration: 'none',
                                    fontWeight: isFactoryLink ? 600 : 400,
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '0.25rem',
                                    padding: isFactoryLink ? '0.125rem 0.5rem' : '0',
                                    borderRadius: isFactoryLink ? '4px' : '0',
                                    backgroundColor: isFactoryLink ? (colorScheme === 'dark' ? 'var(--mantine-color-violet-9)' : 'var(--mantine-color-violet-0)') : 'transparent',
                                    transition: 'all 0.2s ease'
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.textDecoration = 'underline'
                                    if (isFactoryLink) {
                                        e.currentTarget.style.backgroundColor = colorScheme === 'dark' ? 'var(--mantine-color-violet-8)' : 'var(--mantine-color-violet-1)'
                                    }
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.textDecoration = 'none'
                                    if (isFactoryLink) {
                                        e.currentTarget.style.backgroundColor = colorScheme === 'dark' ? 'var(--mantine-color-violet-9)' : 'var(--mantine-color-violet-0)'
                                    }
                                }}
                            >
                                {isFactoryLink && '🏭 '}
                                {children}
                            </a>
                        )
                    },
                    img: ({ src, alt }) => (
                        <img
                            src={src}
                            alt={alt}
                            style={{
                                maxWidth: '100%',
                                height: 'auto',
                                borderRadius: '6px',
                                margin: '1rem 0',
                                border: `1px solid ${colorScheme === 'dark' ? 'var(--mantine-color-dark-4)' : 'var(--mantine-color-gray-3)'}`
                            }}
                        />
                    ),
                    table: ({ children }) => (
                        <div style={{ overflowX: 'auto', marginBottom: '1rem' }}>
                            <table style={{
                                width: '100%',
                                borderCollapse: 'collapse',
                                border: `1px solid ${colorScheme === 'dark' ? 'var(--mantine-color-dark-4)' : 'var(--mantine-color-gray-3)'}`
                            }}>
                                {children}
                            </table>
                        </div>
                    ),
                    th: ({ children }) => (
                        <th style={{
                            padding: '0.75rem',
                            backgroundColor: colorScheme === 'dark' ? 'var(--mantine-color-dark-5)' : 'var(--mantine-color-gray-1)',
                            border: `1px solid ${colorScheme === 'dark' ? 'var(--mantine-color-dark-4)' : 'var(--mantine-color-gray-3)'}`,
                            fontWeight: 600,
                            textAlign: 'left',
                            color: 'var(--mantine-color-text)'
                        }}>
                            {children}
                        </th>
                    ),
                    td: ({ children }) => (
                        <td style={{
                            padding: '0.75rem',
                            border: `1px solid ${colorScheme === 'dark' ? 'var(--mantine-color-dark-4)' : 'var(--mantine-color-gray-3)'}`,
                            color: 'var(--mantine-color-text)'
                        }}>
                            {children}
                        </td>
                    ),
                    hr: () => (
                        <hr style={{
                            border: 'none',
                            borderTop: `1px solid ${colorScheme === 'dark' ? 'var(--mantine-color-dark-4)' : 'var(--mantine-color-gray-3)'}`,
                            margin: '2rem 0'
                        }} />
                    ),
                }}
            >
                {content}
            </ReactMarkdown>
        </Box>
    )
}
