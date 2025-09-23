import { Article, Category } from "@/types/article"

// Données de test pour les articles
const mockArticles: Article[] = [
  {
    id: "1",
    title: "Introduction à Next.js 15 et React 19",
    slug: "introduction-nextjs-15-react-19",
    content: `Next.js 15 apporte de nombreuses améliorations significatives, notamment avec l'intégration de React 19. Dans cet article, nous explorons les nouvelles fonctionnalités et les meilleures pratiques pour développer des applications modernes.

## Les nouveautés de Next.js 15

Next.js 15 introduit plusieurs améliorations majeures :
- Support natif de React 19
- Amélioration des performances de rendu
- Nouvelles APIs pour la gestion d'état
- Optimisations du bundling

## React 19 et ses avantages

React 19 apporte des changements révolutionnaires :
- Actions et use() hook
- Amélioration du concurrent rendering
- Nouvelles optimisations de performance

Ces technologies permettent de créer des applications plus performantes et maintenables.`,
    excerpt: "Découvrez les nouvelles fonctionnalités de Next.js 15 et React 19, et comment elles transforment le développement d'applications web modernes.",
    category: "Développement",
    publishedAt: "2024-01-15T10:00:00Z",
    updatedAt: "2024-01-15T10:00:00Z",
    featuredImage: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=200&fit=crop&crop=center",
    author: {
      name: "Fabrice MIQUET-SAGE",
      email: "fabrice@example.com"
    },
    tags: ["Next.js", "React", "JavaScript", "Web Development"],
    readingTime: 8
  },
  {
    id: "2",
    title: "Architecture microservices avec Docker",
    slug: "architecture-microservices-docker",
    content: `L'architecture microservices est devenue un standard dans le développement d'applications modernes. Docker facilite grandement le déploiement et la gestion de ces services.

## Pourquoi les microservices ?

Les microservices offrent plusieurs avantages :
- Scalabilité indépendante
- Déploiement indépendant
- Technologies hétérogènes
- Résilience améliorée

## Docker et les microservices

Docker simplifie la gestion des microservices :
- Containerisation des services
- Orchestration avec Docker Compose
- Gestion des dépendances
- Environnements cohérents

## Bonnes pratiques

Voici quelques bonnes pratiques pour réussir avec les microservices :
- Design for failure
- Monitoring et observabilité
- Gestion des données distribuées
- Communication asynchrone`,
    excerpt: "Apprenez à concevoir et déployer une architecture microservices robuste en utilisant Docker et les meilleures pratiques du domaine.",
    category: "Architecture",
    publishedAt: "2024-01-10T14:30:00Z",
    updatedAt: "2024-01-10T14:30:00Z",
    featuredImage: "https://images.unsplash.com/photo-1605745341112-85968b19335a?w=400&h=200&fit=crop&crop=center",
    author: {
      name: "Fabrice MIQUET-SAGE",
      email: "fabrice@example.com"
    },
    tags: ["Docker", "Microservices", "DevOps", "Architecture"],
    readingTime: 12
  },
  {
    id: "3",
    title: "Optimisation des performances web",
    slug: "optimisation-performances-web",
    content: `Les performances web sont cruciales pour l'expérience utilisateur et le SEO. Voici un guide complet pour optimiser votre site web.

## Métriques importantes

Les Core Web Vitals sont essentiels :
- LCP (Largest Contentful Paint)
- FID (First Input Delay)
- CLS (Cumulative Layout Shift)

## Techniques d'optimisation

### Images
- Utilisation du format WebP
- Lazy loading
- Responsive images
- Compression optimale

### JavaScript
- Code splitting
- Tree shaking
- Minification
- Bundle analysis

### CSS
- Critical CSS
- Purge unused CSS
- CSS modules
- Optimisation des sélecteurs

## Outils de mesure

Plusieurs outils permettent de mesurer les performances :
- Lighthouse
- PageSpeed Insights
- WebPageTest
- Chrome DevTools`,
    excerpt: "Découvrez les techniques et outils essentiels pour optimiser les performances de votre site web et améliorer l'expérience utilisateur.",
    category: "Performance",
    publishedAt: "2024-01-05T09:15:00Z",
    updatedAt: "2024-01-05T09:15:00Z",
    featuredImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=200&fit=crop&crop=center",
    author: {
      name: "Fabrice MIQUET-SAGE",
      email: "fabrice@example.com"
    },
    tags: ["Performance", "Web Vitals", "Optimization", "SEO"],
    readingTime: 10
  },
  {
    id: "4",
    title: "Gestion d'état avec Zustand",
    slug: "gestion-etat-zustand",
    content: `Zustand est une bibliothèque de gestion d'état légère et puissante pour React. Elle offre une alternative simple et efficace à Redux.

## Pourquoi Zustand ?

Zustand présente plusieurs avantages :
- API simple et intuitive
- Bundle size minimal
- TypeScript support natif
- Pas de boilerplate

## Installation et configuration

Pour installer Zustand, utilisez la commande :
npm install zustand

## Création d'un store

Voici comment créer un store Zustand basique :

import { create } from 'zustand'

interface BearState {
  bears: number
  increase: (by: number) => void
}

const useBearStore = create<BearState>((set) => ({
  bears: 0,
  increase: (by) => set((state) => ({ bears: state.bears + by })),
}))

## Utilisation dans les composants

function BearCounter() {
  const bears = useBearStore((state) => state.bears)
  return <h1>{bears} around here ...</h1>
}

## Patterns avancés

- Persistence
- Middleware
- Devtools
- Testing`,
    excerpt: "Explorez Zustand, une solution moderne et légère pour la gestion d'état dans vos applications React.",
    category: "Développement",
    publishedAt: "2024-01-01T16:45:00Z",
    updatedAt: "2024-01-01T16:45:00Z",
    featuredImage: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=200&fit=crop&crop=center",
    author: {
      name: "Fabrice MIQUET-SAGE",
      email: "fabrice@example.com"
    },
    tags: ["React", "State Management", "Zustand", "JavaScript"],
    readingTime: 6
  },
  {
    id: "5",
    title: "Sécurité des applications web",
    slug: "securite-applications-web",
    content: `La sécurité des applications web est un enjeu majeur. Voici les principales menaces et les mesures de protection.

## OWASP Top 10

Les 10 vulnérabilités les plus critiques :
1. Injection
2. Broken Authentication
3. Sensitive Data Exposure
4. XML External Entities
5. Broken Access Control
6. Security Misconfiguration
7. Cross-Site Scripting (XSS)
8. Insecure Deserialization
9. Using Components with Known Vulnerabilities
10. Insufficient Logging & Monitoring

## Mesures de protection

### Authentification
- Mots de passe forts
- Authentification multi-facteurs
- Gestion des sessions
- Protection contre les attaques par force brute

### Validation des données
- Validation côté client et serveur
- Sanitisation des entrées
- Protection contre l'injection SQL
- Validation des fichiers uploadés

### HTTPS et chiffrement
- Certificats SSL/TLS
- Chiffrement des données sensibles
- Headers de sécurité
- Content Security Policy

## Outils de sécurité

- OWASP ZAP
- Burp Suite
- Snyk
- npm audit`,
    excerpt: "Apprenez les fondamentaux de la sécurité web et les meilleures pratiques pour protéger vos applications contre les menaces courantes.",
    category: "Sécurité",
    publishedAt: "2023-12-28T11:20:00Z",
    updatedAt: "2023-12-28T11:20:00Z",
    featuredImage: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400&h=200&fit=crop&crop=center",
    author: {
      name: "Fabrice MIQUET-SAGE",
      email: "fabrice@example.com"
    },
    tags: ["Sécurité", "OWASP", "Web Security", "Best Practices"],
    readingTime: 15
  },
  {
    id: "6",
    title: "Introduction à TypeScript",
    slug: "introduction-typescript",
    content: `TypeScript est un sur-ensemble de JavaScript qui ajoute le typage statique. Découvrez pourquoi et comment l'utiliser.

## Pourquoi TypeScript ?

TypeScript offre plusieurs avantages :
- Détection d'erreurs à la compilation
- Meilleure documentation du code
- Refactoring plus sûr
- IntelliSense amélioré

## Configuration de base

Pour installer TypeScript :
npm install -D typescript @types/node
npx tsc --init

## Types de base

let name: string = "Fabrice"
let age: number = 30
let isActive: boolean = true

## Interfaces et types

interface User {
  id: number
  name: string
  email: string
}

type Status = 'pending' | 'approved' | 'rejected'

## Fonctions typées

function greet(name: string): string {
  return \`Hello, \$\{name\}!\`
}

## Classes et génériques

class Repository<T> {
  private items: T[] = []
  
  add(item: T): void {
    this.items.push(item)
  }
}

TypeScript transforme le développement JavaScript en une expérience plus robuste et maintenable.`,
    excerpt: "Découvrez TypeScript, le sur-ensemble de JavaScript qui apporte le typage statique et améliore la robustesse de vos applications.",
    category: "Développement",
    publishedAt: "2023-12-20T14:15:00Z",
    updatedAt: "2023-12-20T14:15:00Z",
    featuredImage: "https://images.unsplash.com/photo-1516116216627-9e69edd6c379?w=400&h=200&fit=crop&crop=center",
    author: {
      name: "Fabrice MIQUET-SAGE",
      email: "fabrice@example.com"
    },
    tags: ["TypeScript", "JavaScript", "Programming", "Web Development"],
    readingTime: 7
  },
  {
    id: "7",
    title: "CI/CD avec GitHub Actions",
    slug: "cicd-github-actions",
    content: `GitHub Actions permet d'automatiser vos workflows de développement. Voici comment configurer un pipeline CI/CD efficace.

## Qu'est-ce que GitHub Actions ?

GitHub Actions est une plateforme d'intégration et de déploiement continu intégrée à GitHub.

## Configuration de base

Créez un fichier .github/workflows/ci.yml :

name: CI/CD Pipeline

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
      - name: Install dependencies
        run: npm ci
      - name: Run tests
        run: npm test

## Déploiement automatique

deploy:
  needs: test
  runs-on: ubuntu-latest
  if: github.ref == 'refs/heads/main'
  steps:
    - name: Deploy to Vercel
      uses: amondnet/vercel-action@v20
      with:
        vercel-token: \$\{\{ secrets.VERCEL_TOKEN \}\}

## Bonnes pratiques

- Utilisez des matrices pour tester plusieurs versions
- Cachez les dépendances
- Utilisez des secrets pour les tokens
- Configurez des notifications

## Monitoring et alertes

- Intégration avec Slack/Discord
- Notifications par email
- Dashboard de monitoring

GitHub Actions simplifie grandement l'automatisation de vos processus de développement.`,
    excerpt: "Apprenez à configurer un pipeline CI/CD efficace avec GitHub Actions pour automatiser vos tests et déploiements.",
    category: "DevOps",
    publishedAt: "2023-12-15T09:30:00Z",
    updatedAt: "2023-12-15T09:30:00Z",
    featuredImage: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=200&fit=crop&crop=center",
    author: {
      name: "Fabrice MIQUET-SAGE",
      email: "fabrice@example.com"
    },
    tags: ["GitHub Actions", "CI/CD", "DevOps", "Automation"],
    readingTime: 9
  },
  {
    id: "8",
    title: "Design Patterns en JavaScript",
    slug: "design-patterns-javascript",
    content: `Les design patterns sont des solutions réutilisables aux problèmes courants en programmation. Découvrez les plus utiles en JavaScript.

## Singleton Pattern

class DatabaseConnection {
  constructor() {
    if (DatabaseConnection.instance) {
      return DatabaseConnection.instance
    }
    this.connection = 'connected'
    DatabaseConnection.instance = this
  }
}

## Observer Pattern

class EventEmitter {
  constructor() {
    this.events = {}
  }
  
  on(event, callback) {
    if (!this.events[event]) {
      this.events[event] = []
    }
    this.events[event].push(callback)
  }
  
  emit(event, data) {
    if (this.events[event]) {
      this.events[event].forEach(callback => callback(data))
    }
  }
}

## Module Pattern

const MyModule = (() => {
  let privateVariable = 0
  
  return {
    publicMethod: () => {
      privateVariable++
      return privateVariable
    }
  }
})()

## Factory Pattern

class UserFactory {
  static createUser(type, data) {
    switch (type) {
      case 'admin':
        return new AdminUser(data)
      case 'user':
        return new RegularUser(data)
      default:
        throw new Error('Unknown user type')
    }
  }
}

## Strategy Pattern

class PaymentProcessor {
  constructor(strategy) {
    this.strategy = strategy
  }
  
  processPayment(amount) {
    return this.strategy.pay(amount)
  }
}

Ces patterns améliorent la maintenabilité et la lisibilité de votre code.`,
    excerpt: "Explorez les design patterns les plus utiles en JavaScript pour écrire du code plus maintenable et réutilisable.",
    category: "Développement",
    publishedAt: "2023-12-10T16:45:00Z",
    updatedAt: "2023-12-10T16:45:00Z",
    featuredImage: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=200&fit=crop&crop=center",
    author: {
      name: "Fabrice MIQUET-SAGE",
      email: "fabrice@example.com"
    },
    tags: ["Design Patterns", "JavaScript", "Programming", "Best Practices"],
    readingTime: 11
  },
  {
    id: "9",
    title: "Optimisation des bases de données",
    slug: "optimisation-bases-donnees",
    content: `L'optimisation des bases de données est cruciale pour les performances de vos applications. Voici les techniques essentielles.

## Indexation

Les index améliorent considérablement les performances :

-- Index simple
CREATE INDEX idx_user_email ON users(email)

-- Index composite
CREATE INDEX idx_user_status_created ON users(status, created_at)

-- Index partiel
CREATE INDEX idx_active_users ON users(email) WHERE status = 'active'

## Requêtes optimisées

### Éviter SELECT *
-- ❌ Mauvais
SELECT * FROM users

-- ✅ Bon
SELECT id, name, email FROM users

### Utiliser LIMIT
-- Pour la pagination
SELECT * FROM articles 
ORDER BY created_at DESC 
LIMIT 10 OFFSET 20

### Joins efficaces
-- Utiliser des clés étrangères indexées
SELECT u.name, p.title 
FROM users u
JOIN posts p ON u.id = p.user_id
WHERE u.status = 'active'

## Monitoring et profiling

- Utiliser EXPLAIN pour analyser les requêtes
- Monitorer les requêtes lentes
- Profiler les performances

## Caching

- Cache au niveau application
- Cache de requêtes fréquentes
- Invalidation intelligente du cache

## Normalisation vs Dénormalisation

- Normalisation pour l'intégrité des données
- Dénormalisation pour les performances
- Trouver le bon équilibre

L'optimisation des bases de données est un processus continu qui nécessite monitoring et ajustements réguliers.`,
    excerpt: "Découvrez les techniques essentielles pour optimiser les performances de vos bases de données et améliorer l'expérience utilisateur.",
    category: "Performance",
    publishedAt: "2023-12-05T11:10:00Z",
    updatedAt: "2023-12-05T11:10:00Z",
    featuredImage: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=400&h=200&fit=crop&crop=center",
    author: {
      name: "Fabrice MIQUET-SAGE",
      email: "fabrice@example.com"
    },
    tags: ["Database", "Performance", "SQL", "Optimization"],
    readingTime: 13
  },
  {
    id: "10",
    title: "Tests unitaires avec Jest",
    slug: "tests-unitaires-jest",
    content: `Les tests unitaires sont essentiels pour maintenir la qualité du code. Jest est un framework de test puissant et simple.

## Installation et configuration

npm install --save-dev jest @types/jest

Configuration dans package.json :
{
  "scripts": {
    "test": "jest",
    "test:watch": "jest --watch"
  },
  "jest": {
    "testEnvironment": "node"
  }
}

## Tests de base

// math.js
function add(a, b) {
  return a + b
}

// math.test.js
describe('Math functions', () => {
  test('adds 1 + 2 to equal 3', () => {
    expect(add(1, 2)).toBe(3)
  })
})

## Tests asynchrones

// api.js
async function fetchUser(id) {
  const response = await fetch(\`/api/users/\$\{id\}\`)
  return response.json()
}

// api.test.js
test('fetches user data', async () => {
  const user = await fetchUser(1)
  expect(user).toHaveProperty('id', 1)
  expect(user).toHaveProperty('name')
})

## Mocks et stubs

// Mock d'une fonction
jest.mock('./api', () => ({
  fetchUser: jest.fn()
}))

// Mock d'un module
jest.mock('axios', () => ({
  get: jest.fn(() => Promise.resolve({ data: {} }))
}))

## Coverage et reporting

# Générer un rapport de couverture
npm test -- --coverage

# Seuil de couverture minimum
npm test -- --coverage --coverageThreshold='\{"global":\{"branches":80,"functions":80,"lines":80,"statements":80\}\}'

## Bonnes pratiques

- Tester les cas limites
- Nommer les tests de manière descriptive
- Un test = une assertion
- Tests rapides et isolés

Les tests unitaires sont un investissement qui paie à long terme en réduisant les bugs et facilitant la maintenance.`,
    excerpt: "Apprenez à écrire des tests unitaires efficaces avec Jest pour améliorer la qualité et la fiabilité de votre code.",
    category: "Développement",
    publishedAt: "2023-11-30T13:25:00Z",
    updatedAt: "2023-11-30T13:25:00Z",
    featuredImage: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=200&fit=crop&crop=center",
    author: {
      name: "Fabrice MIQUET-SAGE",
      email: "fabrice@example.com"
    },
    tags: ["Testing", "Jest", "JavaScript", "Quality Assurance"],
    readingTime: 8
  }
]

const mockCategories: Category[] = [
  { id: "1", name: "Développement", slug: "developpement", description: "Articles sur le développement web et mobile", articleCount: 5 },
  { id: "2", name: "Architecture", slug: "architecture", description: "Conception et architecture de systèmes", articleCount: 1 },
  { id: "3", name: "Performance", slug: "performance", description: "Optimisation et performances", articleCount: 2 },
  { id: "4", name: "Sécurité", slug: "securite", description: "Sécurité des applications", articleCount: 1 },
  { id: "5", name: "DevOps", slug: "devops", description: "DevOps et automatisation", articleCount: 1 }
]

// Fonction pour récupérer tous les articles
export async function getArticles(): Promise<Article[]> {
  // Simuler un délai de chargement
  await new Promise(resolve => setTimeout(resolve, 100))
  
  // Trier par date de publication (plus récent en premier)
  return mockArticles.sort((a, b) => 
    new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  )
}

// Fonction pour récupérer les articles avec pagination et filtrage par catégorie
export async function getArticlesPaginated(
  page: number = 1, 
  limit: number = 6, 
  categorySlug?: string
): Promise<{
  articles: Article[]
  totalPages: number
  currentPage: number
  totalArticles: number
  filteredByCategory?: string
}> {
  await new Promise(resolve => setTimeout(resolve, 100))
  
  let filteredArticles = mockArticles
  
  // Filtrer par catégorie si spécifiée
  if (categorySlug) {
    const category = mockCategories.find(cat => cat.slug === categorySlug)
    if (category) {
      filteredArticles = mockArticles.filter(article => article.category === category.name)
    }
  }
  
  // Trier par date de publication (plus récent en premier)
  const sortedArticles = filteredArticles.sort((a, b) => 
    new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  )
  
  const totalArticles = sortedArticles.length
  const totalPages = Math.ceil(totalArticles / limit)
  const startIndex = (page - 1) * limit
  const endIndex = startIndex + limit
  const articles = sortedArticles.slice(startIndex, endIndex)
  
  return {
    articles,
    totalPages,
    currentPage: page,
    totalArticles,
    filteredByCategory: categorySlug
  }
}

// Fonction pour récupérer un article par slug
export async function getArticleBySlug(slug: string): Promise<Article | null> {
  await new Promise(resolve => setTimeout(resolve, 100))
  
  return mockArticles.find(article => article.slug === slug) || null
}

// Fonction pour récupérer tous les articles d'une catégorie
export async function getArticlesByCategory(categorySlug: string): Promise<Article[]> {
  await new Promise(resolve => setTimeout(resolve, 100))
  
  const category = mockCategories.find(cat => cat.slug === categorySlug)
  if (!category) return []
  
  return mockArticles
    .filter(article => article.category === category.name)
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
}

// Fonction pour récupérer toutes les catégories
export async function getCategories(): Promise<Category[]> {
  await new Promise(resolve => setTimeout(resolve, 100))
  
  return mockCategories
}

// Fonction pour rechercher des articles
export async function searchArticles(query: string): Promise<Article[]> {
  await new Promise(resolve => setTimeout(resolve, 100))
  
  const lowercaseQuery = query.toLowerCase()
  
  return mockArticles.filter(article => 
    article.title.toLowerCase().includes(lowercaseQuery) ||
    article.excerpt.toLowerCase().includes(lowercaseQuery) ||
    article.content.toLowerCase().includes(lowercaseQuery) ||
    article.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
  ).sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
}