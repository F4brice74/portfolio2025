"use client";

import { Group, Text, Container, Box, Burger, Drawer, Stack } from "@mantine/core";
import { IconArticle, IconAddressBook, IconSettings } from "@tabler/icons-react";
import { useState, useEffect } from "react";
import Link from "next/link";
import { SignInButton, SignUpButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

export default function Navbar() {
  const [opened, setOpened] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  // Éviter l'erreur d'hydratation avec Clerk
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const navItems = [
    {
      href: "/",
      icon: IconArticle,
      label: "Accueil",
    },
    {
      href: "/contact",
      icon: IconAddressBook,
      label: "Contact",
    },
  ];

  const adminNavItems = [
    {
      href: "/admin",
      icon: IconSettings,
      label: "Admin",
    },
  ];

  const NavLinks = () => (
    <Group gap={32}>
      {navItems.map((item) => {
        const IconComponent = item.icon;
        return (
          <Link
            key={item.href}
            href={item.href}
            style={{
              textDecoration: "none",
              fontWeight: 500,
              transition: "color 0.2s ease",
              color: "var(--mantine-color-gray-7)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "var(--mantine-color-blue-6)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "var(--mantine-color-gray-7)";
            }}
          >
            <Group gap={8}>
              <IconComponent size={18} />
              <Text>{item.label}</Text>
            </Group>
          </Link>
        );
      })}
    </Group>
  );

  return (
    <>
      {/* Desktop Navbar */}
      <Box
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          backgroundColor: "rgba(255, 255, 255, 0.95)",
          backdropFilter: "blur(10px)",
          borderBottom: "1px solid var(--mantine-color-gray-2)",
          padding: "16px 0",
        }}
      >
        <Container size="xl">
          <Group justify="space-between" align="center">
            {/* Logo */}
            <Text
              size="xl"
              fw={700}
              c="var(--mantine-color-blue-6)"
              style={{ cursor: "pointer" }}
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            >
              Fabrice MIQUET-SAGE
            </Text>

            {/* Desktop Navigation */}
            <Box style={{ display: "flex" }} visibleFrom="md">
              <Group gap={32}>
                <NavLinks />

                {/* Authentication Buttons - Only render after mount to avoid hydration errors */}
                {isMounted && (
                  <>
                    <SignedOut>
                      <Group gap="sm">
                        <SignInButton mode="modal">
                          <Text
                            style={{
                              cursor: "pointer",
                              fontWeight: 500,
                              color: "var(--mantine-color-gray-7)",
                              transition: "color 0.2s ease",
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.color = "var(--mantine-color-blue-6)";
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.color = "var(--mantine-color-gray-7)";
                            }}
                          >
                            Connexion
                          </Text>
                        </SignInButton>
                        <SignUpButton mode="modal">
                          <Text
                            style={{
                              cursor: "pointer",
                              fontWeight: 500,
                              color: "var(--mantine-color-blue-6)",
                              transition: "color 0.2s ease",
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.color = "var(--mantine-color-blue-7)";
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.color = "var(--mantine-color-blue-6)";
                            }}
                          >
                            Inscription
                          </Text>
                        </SignUpButton>
                      </Group>
                    </SignedOut>

                    <SignedIn>
                      <Group gap="md">
                        {adminNavItems.map((item) => {
                          const IconComponent = item.icon;
                          return (
                            <Link
                              key={item.href}
                              href={item.href}
                              style={{
                                textDecoration: "none",
                                fontWeight: 500,
                                transition: "color 0.2s ease",
                                color: "var(--mantine-color-gray-7)",
                              }}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.color = "var(--mantine-color-blue-6)";
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.color = "var(--mantine-color-gray-7)";
                              }}
                            >
                              <Group gap={4}>
                                <IconComponent size={16} />
                                <Text size="sm">{item.label}</Text>
                              </Group>
                            </Link>
                          );
                        })}
                        <UserButton
                          appearance={{
                            elements: {
                              avatarBox: "w-8 h-8"
                            }
                          }}
                        />
                      </Group>
                    </SignedIn>
                  </>
                )}
              </Group>
            </Box>

            {/* Mobile Burger Menu */}
            <Box hiddenFrom="md">
              <Burger
                opened={opened}
                onClick={() => setOpened(true)}
                size="sm"
                color="var(--mantine-color-gray-7)"
              />
            </Box>
          </Group>
        </Container>
      </Box>

      {/* Mobile Drawer */}
      <Drawer
        opened={opened}
        onClose={() => setOpened(false)}
        title="Navigation"
        position="right"
        size="sm"
        styles={{
          content: {
            backgroundColor: "var(--mantine-color-gray-0)",
          },
          header: {
            backgroundColor: "var(--mantine-color-gray-0)",
            borderBottom: "1px solid var(--mantine-color-gray-2)",
          },
        }}
      >
        <Stack gap="lg" mt="xl">
          {navItems.map((item) => {
            const IconComponent = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                style={{
                  textDecoration: "none",
                  fontWeight: 500,
                  padding: "12px 16px",
                  borderRadius: "8px",
                  transition: "all 0.2s ease",
                  color: "var(--mantine-color-gray-7)",
                }}
                onClick={() => setOpened(false)}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "var(--mantine-color-gray-1)";
                  e.currentTarget.style.color = "var(--mantine-color-blue-6)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "transparent";
                  e.currentTarget.style.color = "var(--mantine-color-gray-7)";
                }}
              >
                <Group gap={12}>
                  <IconComponent size={20} />
                  <Text size="lg">{item.label}</Text>
                </Group>
              </Link>
            );
          })}

          {/* Mobile Authentication - Only render after mount to avoid hydration errors */}
          {isMounted && (
            <Box mt="md" pt="md" style={{ borderTop: "1px solid var(--mantine-color-gray-2)" }}>
              <SignedOut>
                <Stack gap="sm">
                  <SignInButton mode="modal">
                    <Text
                      style={{
                        cursor: "pointer",
                        fontWeight: 500,
                        padding: "12px 16px",
                        borderRadius: "8px",
                        transition: "all 0.2s ease",
                        color: "var(--mantine-color-gray-7)",
                        textAlign: "center",
                      }}
                      onClick={() => setOpened(false)}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = "var(--mantine-color-gray-1)";
                        e.currentTarget.style.color = "var(--mantine-color-blue-6)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = "transparent";
                        e.currentTarget.style.color = "var(--mantine-color-gray-7)";
                      }}
                    >
                      Connexion
                    </Text>
                  </SignInButton>
                  <SignUpButton mode="modal">
                    <Text
                      style={{
                        cursor: "pointer",
                        fontWeight: 500,
                        padding: "12px 16px",
                        borderRadius: "8px",
                        transition: "all 0.2s ease",
                        color: "var(--mantine-color-blue-6)",
                        textAlign: "center",
                      }}
                      onClick={() => setOpened(false)}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = "var(--mantine-color-blue-0)";
                        e.currentTarget.style.color = "var(--mantine-color-blue-7)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = "transparent";
                        e.currentTarget.style.color = "var(--mantine-color-blue-6)";
                      }}
                    >
                      Inscription
                    </Text>
                  </SignUpButton>
                </Stack>
              </SignedOut>

              <SignedIn>
                <Stack gap="sm" mt="md">
                  {adminNavItems.map((item) => {
                    const IconComponent = item.icon;
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        style={{
                          textDecoration: "none",
                          fontWeight: 500,
                          padding: "12px 16px",
                          borderRadius: "8px",
                          transition: "all 0.2s ease",
                          color: "var(--mantine-color-gray-7)",
                        }}
                        onClick={() => setOpened(false)}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = "var(--mantine-color-gray-1)";
                          e.currentTarget.style.color = "var(--mantine-color-blue-6)";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = "transparent";
                          e.currentTarget.style.color = "var(--mantine-color-gray-7)";
                        }}
                      >
                        <Group gap={12}>
                          <IconComponent size={20} />
                          <Text size="lg">{item.label}</Text>
                        </Group>
                      </Link>
                    );
                  })}
                  <Group justify="center" mt="md">
                    <UserButton
                      appearance={{
                        elements: {
                          avatarBox: "w-10 h-10"
                        }
                      }}
                    />
                  </Group>
                </Stack>
              </SignedIn>
            </Box>
          )}
        </Stack>
      </Drawer>
    </>
  );
}
