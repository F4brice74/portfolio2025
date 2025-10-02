# Module Articles - Architecture en couches

Ce module implémente une architecture en couches pour la gestion des articles du blog.

## 📁 Structure

```
src/lib/articles/
├── index.ts          # Point d'entrée principal (exports publics)
├── types.ts          # Types unifiés pour toute l'application
├── service.ts        # Interface publique (Business Layer)
├── repository.ts     # Accès aux données (Data Layer)
├── mapper.ts         # Transformations DB ↔ DTO
└── README.md         # Cette documentation
```

## 🎯 Principes

### 1. Séparation des responsabilités

Chaque couche a un rôle précis :

- **Types** : Définit le contrat de données
- **Mapper** : Transforme les formats
- **Repository** : Accède aux données brutes
- **Service** : Expose l'interface métier

### 2. Types unifiés

Un seul type `Article` utilisé partout dans l'application :
- ✅ Server Components
- ✅ Client Components (via API)
- ✅ API Routes
- ✅ Tests

Plus de confusion entre `ApiArticle`, `ArticleWithCategory`, `MockArticle`, etc.

### 3. Isolation de la DB

Les détails Drizzle sont cachés dans le Repository.
Changement de DB ou d'ORM = modification du Repository uniquement.

## 🚀 Usage

### Dans les Server Components

```typescript
import { ArticleService, type Article } from '@/lib/articles';

export default async function Page() {
  const articles = await ArticleService.getAll();
  return <ArticleList articles={articles} />;
}
```

### Dans les API Routes

```typescript
import { ArticleService } from '@/lib/articles';

export async function GET() {
  const articles = await ArticleService.getPublished();
  return Response.json({ articles });
}
```

### Dans les Client Components

❌ **Ne pas importer directement le Service** (marqué `server-only`)

✅ **Passer par une API Route**

```typescript
// Client Component
const response = await fetch('/api/articles');
const { articles } = await response.json();
```

## 📊 Flux de données

### Lecture (GET)

```
Page → Service → Repository → DB
                    ↓
                 Mapper
                    ↓
      ← Article unifié (string dates, null normalized)
```

### Écriture (POST/PUT)

```
API Route → Service → Validation
                         ↓
                    Repository → DB
                         ↓
                      Mapper
                         ↓
           ← Article créé/modifié
```

## 🎨 Avantages de cette architecture

### 1. Changement de source transparent

**Avant** : Mock → DB = changer tous les fichiers  
**Après** : Mock → DB = changer le Repository uniquement

### 2. Types cohérents

**Avant** :
```typescript
// Page admin
const articles: ArticleWithCategory[] = ...
// Page publique  
const articles: ApiArticle[] = ...
// Composant
const article: Article = ... // ❌ Incompatible !
```

**Après** :
```typescript
// Partout
const articles: Article[] = await ArticleService.getAll();
```

### 3. Testabilité

```typescript
// Mock facile du Service pour les tests
jest.mock('@/lib/articles', () => ({
  ArticleService: {
    getAll: jest.fn(() => Promise.resolve(mockArticles))
  }
}));
```

### 4. Maintenance

Un changement de schéma DB impacte :
- ❌ **Avant** : Schéma + Queries + API Routes + Pages + Composants
- ✅ **Après** : Schéma + Mapper (+ Repository si changement majeur)

## 📝 Exemples complets

### Créer un article

```typescript
import { ArticleService } from '@/lib/articles';

const newArticle = await ArticleService.create({
  title: 'Mon article',
  slug: 'mon-article',
  excerpt: 'Un super article',
  content: 'Le contenu...',
  categoryId: 1,
  tags: ['Next.js', 'React'],
  published: true,
  authorName: 'Fabrice',
  authorEmail: 'fabrice@example.com',
});
```

### Mettre à jour un article

```typescript
const updated = await ArticleService.update(articleId, {
  title: 'Nouveau titre',
  published: true,
});
```

### Récupérer les articles d'une catégorie

```typescript
const articles = await ArticleService.getByCategorySlug('developpement');
```

## ⚠️ Bonnes pratiques

### DO ✅

- Toujours importer depuis `@/lib/articles` (pas les sous-modules)
- Utiliser les types exportés (`Article`, `Category`, etc.)
- Passer par le Service dans les Server Components
- Gérer les erreurs du Service

### DON'T ❌

- Importer `ArticleRepository` ou `mapper` directement
- Utiliser `ArticleQueries` (déprécié)
- Appeler le Service depuis un Client Component
- Court-circuiter les couches

## 🔄 Migration depuis l'ancien code

### Avant

```typescript
import { ArticleQueries } from '@/lib/db/queries';
import type { ArticleWithCategory } from '@/lib/db/schema';

const articles: ArticleWithCategory[] = await ArticleQueries.getAll();
```

### Après

```typescript
import { ArticleService, type Article } from '@/lib/articles';

const articles: Article[] = await ArticleService.getAll();
```

## 🧪 Tests

```typescript
import { ArticleService } from '@/lib/articles';

describe('ArticleService', () => {
  it('should return all articles', async () => {
    const articles = await ArticleService.getAll();
    expect(articles).toBeInstanceOf(Array);
    expect(articles[0]).toHaveProperty('title');
  });
});
```

## 📚 Ressources

- [Next.js Server Components](https://nextjs.org/docs/app/building-your-application/rendering/server-components)
- [Clean Architecture](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html)
- [Repository Pattern](https://martinfowler.com/eaaCatalog/repository.html)

---

**Note** : Ce pattern peut être étendu aux autres entités (catégories, utilisateurs, etc.)

