# Guide de Développement

## Table des matières
1. [Prérequis](#prérequis)
2. [Installation](#installation)
3. [Configuration](#configuration)
4. [Développement](#développement)
5. [Base de données](#base-de-données)
6. [Tests](#tests)
7. [Déploiement](#déploiement)
8. [Dépannage](#dépannage)

## Prérequis

### Logiciels requis
- **Node.js** : Version 18+ (recommandé : 20+)
- **pnpm** : Gestionnaire de paquets (ou npm/yarn)
- **Git** : Contrôle de version
- **Compte NeonDB** : Base de données serverless
- **Compte Clerk** : Authentification

### Outils recommandés
- **VS Code** : Éditeur de code
- **Postman/Insomnia** : Test d'API
- **Drizzle Studio** : Interface de base de données

## Installation

### 1. Cloner le projet
```bash
git clone <repository-url>
cd portfolio2025
```

### 2. Installer les dépendances
```bash
pnpm install
# ou
npm install
```

### 3. Configuration de l'environnement
```bash
cp .env.example .env.local
```

Éditer `.env.local` avec vos clés :
```bash
# Base de données
DATABASE_URL="postgresql://username:password@ep-xxx.neon.tech/neondb?sslmode=require"

# Next.js
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# Clerk (optionnel pour le développement)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
```

## Configuration

### 1. Base de données NeonDB

#### Créer un compte
1. Aller sur [console.neon.tech](https://console.neon.tech)
2. Créer un compte gratuit
3. Créer un nouveau projet
4. Copier la connection string

#### Initialiser la base
```bash
# Générer les migrations
npm run db:generate

# Appliquer le schéma
npm run db:push

# Seeder les données initiales
npm run db:seed
```

### 2. Authentification Clerk (optionnel)

#### Créer un compte
1. Aller sur [clerk.com](https://clerk.com)
2. Créer un compte
3. Créer une nouvelle application
4. Copier les clés dans `.env.local`

#### Configuration
```typescript
// src/middleware.ts
import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  publicRoutes: ["/", "/blog", "/blog/(.*)", "/contact"],
  ignoredRoutes: ["/api/webhooks/(.*)"],
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
```

## Développement

### 1. Démarrer le serveur
```bash
npm run dev
```

L'application sera disponible sur `http://localhost:3000`

### 2. Structure du projet
```
src/
├── app/                    # App Router Next.js
│   ├── admin/             # Interface d'administration
│   ├── api/               # API Routes
│   ├── blog/              # Pages publiques du blog
│   └── page.tsx           # Page d'accueil
├── components/            # Composants React
│   ├── admin/            # Composants admin
│   └── ...               # Autres composants
├── lib/                  # Utilitaires et configuration
│   └── db/               # Base de données
└── types/                # Types TypeScript
```

### 3. Commandes de développement

```bash
# Développement
npm run dev              # Serveur de développement
npm run build            # Build de production
npm run start            # Serveur de production

# Base de données
npm run db:generate      # Générer les migrations
npm run db:push          # Appliquer le schéma
npm run db:seed          # Seeder les données
npm run db:studio        # Interface de base de données

# Qualité du code
npm run lint             # Linter ESLint
npm run lint:fix         # Corriger automatiquement
npm run type-check       # Vérification TypeScript

# Tests
npm run test:e2e         # Tests end-to-end
npm run test:e2e:ui      # Interface de test
```

## Base de données

### 1. Schéma de données

#### Tables principales
- `categories` : Catégories d'articles
- `articles` : Articles du blog
- `article_tags` : Tags des articles (relation many-to-many)

#### Modifier le schéma
1. Éditer `src/lib/db/schema.ts`
2. Générer les migrations : `npm run db:generate`
3. Appliquer : `npm run db:push`

### 2. Requêtes

#### Utiliser les classes de requêtes
```typescript
import { ArticleQueries, CategoryQueries } from '@/lib/db/queries';

// Récupérer tous les articles
const articles = await ArticleQueries.getAll();

// Créer un article
const newArticle = await ArticleQueries.create({
  title: "Mon article",
  slug: "mon-article",
  // ...
});
```

#### Requêtes personnalisées
```typescript
import { db } from '@/lib/db';
import { articles, categories } from '@/lib/db/schema';
import { eq, desc } from 'drizzle-orm';

const customArticles = await db
  .select()
  .from(articles)
  .where(eq(articles.published, true))
  .orderBy(desc(articles.publishedAt));
```

### 3. Types TypeScript

Les types sont auto-générés à partir du schéma :
```typescript
import type { Article, Category, ArticleWithCategory } from '@/lib/db/schema';

const article: Article = {
  id: 1,
  title: "Mon article",
  // ...
};
```

## Tests

### 1. Tests end-to-end

Les tests E2E utilisent Playwright et testent les fonctionnalités complètes :

```bash
# Installer Playwright
npm run test:e2e:install

# Lancer les tests
npm run test:e2e

# Interface graphique
npm run test:e2e:ui
```

### 2. Tests unitaires

Pour ajouter des tests unitaires :
```typescript
// tests/unit/example.test.ts
import { describe, it, expect } from '@jest/globals';

describe('Example', () => {
  it('should work', () => {
    expect(true).toBe(true);
  });
});
```

### 3. Tests d'API

Tester les endpoints avec des outils comme Postman ou curl :

```bash
# Test de création d'article
curl -X POST "http://localhost:3000/api/admin/articles" \
  -H "Content-Type: application/json" \
  -d '{"title": "Test", "slug": "test", ...}'
```

## Déploiement

### 1. Vercel (recommandé)

#### Configuration
1. Connecter le repository GitHub à Vercel
2. Configurer les variables d'environnement
3. Déployer automatiquement

#### Variables d'environnement Vercel
```bash
DATABASE_URL=postgresql://...
NEXT_PUBLIC_SITE_URL=https://your-domain.com
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_live_...
CLERK_SECRET_KEY=sk_live_...
```

### 2. Autres plateformes

#### Netlify
- Build command : `npm run build`
- Publish directory : `.next`

#### Railway
- Configuration automatique détectée
- Ajouter les variables d'environnement

### 3. Base de données de production

#### NeonDB Production
1. Créer une nouvelle base de données de production
2. Mettre à jour `DATABASE_URL`
3. Appliquer le schéma : `npm run db:push`
4. Seeder si nécessaire : `npm run db:seed`

## Dépannage

### 1. Problèmes courants

#### Erreur de connexion à la base
```bash
Error: No database connection string was provided
```
**Solution :** Vérifier que `DATABASE_URL` est défini dans `.env.local`

#### Erreur de migration
```bash
Error: relation "articles" does not exist
```
**Solution :** Exécuter `npm run db:push` pour créer les tables

#### Erreur d'authentification
```bash
Error: Unauthorized
```
**Solution :** Vérifier la configuration Clerk et les clés

### 2. Logs et debugging

#### Logs de développement
```bash
# Activer les logs détaillés
DEBUG=* npm run dev
```

#### Logs de base de données
```typescript
// Dans drizzle.config.ts
export default {
  // ...
  verbose: true,
  strict: true,
} satisfies Config;
```

#### Interface de base de données
```bash
# Ouvrir Drizzle Studio
npm run db:studio
```

### 3. Performance

#### Optimiser les requêtes
- Utiliser des jointures efficaces
- Limiter les données récupérées
- Mettre en cache les requêtes fréquentes

#### Monitoring
- Utiliser les outils de monitoring Vercel
- Surveiller les métriques NeonDB
- Analyser les logs d'erreur

### 4. Sécurité

#### Bonnes pratiques
- Ne jamais commiter les clés secrètes
- Utiliser des variables d'environnement
- Valider toutes les entrées utilisateur
- Limiter les accès aux endpoints admin

#### Audit de sécurité
```bash
# Vérifier les vulnérabilités
npm audit

# Corriger automatiquement
npm audit fix
```

## Ressources utiles

### Documentation
- [Next.js App Router](https://nextjs.org/docs/app)
- [Drizzle ORM](https://orm.drizzle.team/)
- [NeonDB](https://neon.tech/docs)
- [Clerk Authentication](https://clerk.com/docs)
- [Mantine UI](https://mantine.dev/)

### Outils
- [Drizzle Studio](https://orm.drizzle.team/drizzle-studio/overview)
- [Postman](https://www.postman.com/)
- [VS Code Extensions](https://code.visualstudio.com/)

### Communauté
- [Next.js Discord](https://discord.gg/nextjs)
- [Drizzle Discord](https://discord.gg/drizzle)
- [Stack Overflow](https://stackoverflow.com/)

Ce guide vous accompagnera dans le développement et la maintenance de l'application de blog.
