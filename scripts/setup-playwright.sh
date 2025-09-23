#!/bin/bash

echo "🎭 Installation de Playwright..."

# Vérifier si les navigateurs sont déjà installés
if [ -d "/home/fab/.cache/ms-playwright" ]; then
    echo "✅ Playwright déjà installé"
    pnpm exec playwright install --with-deps
else
    echo "📦 Installation complète de Playwright..."
    pnpm exec playwright install --with-deps
fi

echo "✅ Playwright prêt !"
