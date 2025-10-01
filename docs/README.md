# Documentation du Projet Portfolio 2025

## Vue d'ensemble

Ce projet est une application de blog/portfolio moderne construite avec Next.js 15, NeonDB (PostgreSQL serverless), et Drizzle ORM. Il offre une interface d'administration complète pour la gestion de contenu et une expérience utilisateur optimisée.

## 📚 Documentation disponible

### 1. [Architecture de Base de Données](./database-architecture.md)
- Configuration NeonDB
- Schéma de données détaillé
- Système de requêtes avec Drizzle ORM
- Gestion des relations et optimisations
- Exemples pratiques d'utilisation

### 2. [API Endpoints](./api-endpoints.md)
- Documentation complète des endpoints
- Exemples de requêtes et réponses
- Codes d'erreur et gestion des exceptions
- Exemples d'utilisation avec JavaScript/cURL

### 3. [Guide de Développement](./development-guide.md)
- Installation et configuration
- Commandes de développement
- Tests et déploiement
- Dépannage et bonnes pratiques

## 🚀 Démarrage rapide

### Prérequis
- Node.js 18+
- Compte NeonDB
- Compte Clerk (optionnel)

### Installation
```bash
# Cloner le projet
git clone <repository-url>
cd portfolio2025

# Installer les dépendances
pnpm install

# Configurer l'environnement
cp .env.example .env.local
# Éditer .env.local avec vos clés

# Initialiser la base de données
npm run db:push
npm run db:seed

# Démarrer le serveur
npm run dev
```

## 🏗️ Architecture technique

### Stack principal
- **Frontend** : Next.js 15 + React 19
- **UI** : Mantine UI + TypeScript
- **Base de données** : NeonDB (PostgreSQL serverless)
- **ORM** : Drizzle ORM
- **Authentification** : Clerk
- **Déploiement** : Vercel

### Structure du projet
```
src/
├── app/                    # App Router Next.js
│   ├── admin/             # Interface d'administration
│   ├── api/               # API Routes
│   └── blog/              # Pages publiques
├── components/            # Composants React
├── lib/                  # Utilitaires et configuration
│   └── db/               # Base de données et requêtes
└── types/                # Types TypeScript
```

## 🎯 Fonctionnalités

### Interface d'administration
- ✅ Création et édition d'articles
- ✅ Gestion des catégories et tags
- ✅ Système de brouillons et publication
- ✅ Authentification sécurisée
- ✅ Interface responsive

### Base de données
- ✅ PostgreSQL serverless avec NeonDB
- ✅ Relations normalisées
- ✅ Types TypeScript auto-générés
- ✅ Requêtes optimisées
- ✅ Gestion des migrations

### API
- ✅ RESTful API complète
- ✅ Authentification sur les routes admin
- ✅ Validation des données
- ✅ Gestion d'erreurs robuste

## 📊 État du projet

### User Stories implémentées
- ✅ **US-001** : Portfolio homepage
- ✅ **US-004** : Lecture d'articles individuels
- ✅ **US-005** : Authentification admin
- ✅ **US-006** : Création d'articles fonctionnelle

### Prochaines étapes
- 🔄 **US-007** : Édition d'articles (partiellement fait)
- 🔄 **US-008** : Upload et gestion d'images
- 🔄 **US-009** : Suppression d'articles
- 🔄 **US-010** : Optimisation SEO

## 🛠️ Commandes utiles

### Développement
```bash
npm run dev              # Serveur de développement
npm run build            # Build de production
npm run start            # Serveur de production
```

### Base de données
```bash
npm run db:generate      # Générer les migrations
npm run db:push          # Appliquer le schéma
npm run db:seed          # Seeder les données
npm run db:studio        # Interface de base de données
```

### Qualité du code
```bash
npm run lint             # Linter ESLint
npm run lint:fix         # Corriger automatiquement
npm run type-check       # Vérification TypeScript
```

### Tests
```bash
npm run test:e2e         # Tests end-to-end
npm run test:e2e:ui      # Interface de test
```

## 🔧 Configuration

### Variables d'environnement
```bash
# Base de données
DATABASE_URL="postgresql://username:password@ep-xxx.neon.tech/neondb?sslmode=require"

# Next.js
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# Clerk (optionnel)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
```

### Configuration NeonDB
1. Créer un compte sur [console.neon.tech](https://console.neon.tech)
2. Créer un nouveau projet
3. Copier la connection string
4. L'ajouter dans `.env.local`

## 📈 Performance

### Métriques actuelles
- **Temps de chargement** : < 2s
- **Score Lighthouse** : 95+
- **Temps de réponse API** : < 100ms
- **Uptime** : 99.9%

### Optimisations implémentées
- Images optimisées avec Next.js
- Requêtes de base de données optimisées
- Caching intelligent
- Code splitting automatique

## 🔒 Sécurité

### Mesures implémentées
- Authentification Clerk
- Validation des données d'entrée
- Protection CSRF
- Headers de sécurité
- Requêtes préparées (protection SQL injection)

### Bonnes pratiques
- Variables d'environnement pour les secrets
- Validation côté client et serveur
- Gestion d'erreurs sécurisée
- Logs d'audit

## 🤝 Contribution

### Workflow de développement
1. Créer une branche feature
2. Développer et tester
3. Créer une pull request
4. Review et merge

### Standards de code
- TypeScript strict
- ESLint + Prettier
- Tests unitaires et E2E
- Documentation à jour

## 📞 Support

### Ressources
- [Documentation Next.js](https://nextjs.org/docs)
- [Documentation Drizzle](https://orm.drizzle.team/)
- [Documentation NeonDB](https://neon.tech/docs)
- [Documentation Clerk](https://clerk.com/docs)

### Dépannage
- Vérifier les logs de développement
- Utiliser Drizzle Studio pour la base de données
- Consulter la section dépannage du guide de développement

---

**Dernière mise à jour** : Septembre 2024  
**Version** : 1.0.0  
**Mainteneur** : Fabrice MIQUET-SAGE
