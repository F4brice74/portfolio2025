# CI/CD Pipeline

Ce dossier contient les workflows GitHub Actions pour l'automatisation du déploiement et des tests.

## Workflows disponibles

### 1. `ci.yml` - Pipeline principal
- **Déclenchement** : Push/PR sur `main`
- **Étapes** :
  - Vérifications de qualité (ESLint, TypeScript, Build)
  - Tests E2E avec Playwright
  - Déploiement automatique sur Vercel (branche main uniquement)

### 2. `database-tests.yml` - Tests de base de données
- **Déclenchement** : Push/PR sur `main` + déclenchement manuel
- **Étapes** :
  - Tests de connexion PostgreSQL
  - Exécution des migrations
  - Tests d'API (quand disponibles)

### 3. `preview-deploy.yml` - Déploiements de prévisualisation
- **Déclenchement** : Pull Request sur `main`
- **Étapes** :
  - Déploiement sur Vercel Preview
  - Commentaire automatique sur la PR avec l'URL de prévisualisation

## Configuration requise

### Secrets GitHub
- `VERCEL_TOKEN` : Token d'API Vercel
- `VERCEL_ORG_ID` : ID de l'organisation Vercel
- `VERCEL_PROJECT_ID` : ID du projet Vercel

### Variables d'environnement
- `DATABASE_URL` : URL de connexion PostgreSQL
- `NEXT_PUBLIC_SITE_URL` : URL du site (développement/production)

## Services utilisés
- **PostgreSQL 13** : Base de données pour les tests
- **Node.js 18** : Runtime pour les tests et le build
- **Playwright** : Tests E2E
- **Vercel** : Plateforme de déploiement
