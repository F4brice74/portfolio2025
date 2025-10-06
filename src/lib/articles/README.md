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

## 🏷️ Abstraction de la propriété `category`

### ⚠️ IMPORTANT : `category` est un objet, pas une string !

Le type `Article` contient une propriété `category` qui est un **objet** de type `Category | null`, pas une simple chaîne de caractères.

```typescript
export interface Article {
  // ... autres propriétés
  category: Category | null;  // ⚠️ C'est un objet !
  categoryId: number | null;
  // ...
}

export interface Category {
  id: number;
  name: string;          // ✅ Utilisez category.name pour afficher
  slug: string;
  description: string | null;
  createdAt: string;
  updatedAt: string;
}
```

### ✅ Utilisation correcte dans les composants React

#### ❌ MAUVAIS - Provoque une erreur React

```typescript
export default function ArticlePage({ article }: { article: Article }) {
  return (
    <Badge>
      {article.category}  {/* ❌ ERREUR: Objects are not valid as a React child */}
    </Badge>
  );
}
```

**Erreur retournée** :
```
Error: Objects are not valid as a React child (found: object with keys {id, name, slug, description, createdAt, updatedAt})
```

#### ✅ CORRECT - Accéder à la propriété `name`

```typescript
export default function ArticlePage({ article }: { article: Article }) {
  return (
    <Badge>
      {article.category?.name || 'Non catégorisé'}  {/* ✅ CORRECT */}
    </Badge>
  );
}
```

### 📋 Exemples d'utilisation

#### Afficher le nom de la catégorie

```typescript
<Text>{article.category?.name}</Text>
```

#### Afficher avec fallback

```typescript
<Badge>{article.category?.name || 'Sans catégorie'}</Badge>
```

#### Vérifier si une catégorie existe

```typescript
{article.category && (
  <Link href={`/blog/category/${article.category.slug}`}>
    {article.category.name}
  </Link>
)}
```

#### Utiliser plusieurs propriétés

```typescript
{article.category && (
  <div>
    <Badge>{article.category.name}</Badge>
    {article.category.description && (
      <Text size="sm" c="dimmed">{article.category.description}</Text>
    )}
  </div>
)}
```

#### Dans un composant liste

```typescript
export default function ArticleList({ articles }: { articles: Article[] }) {
  return (
    <div>
      {articles.map((article) => (
        <Card key={article.id}>
          <Title>{article.title}</Title>
          <Badge color="blue">
            {article.category?.name || 'Non catégorisé'}
          </Badge>
        </Card>
      ))}
    </div>
  );
}
```

### 🔍 Pourquoi cette abstraction ?

1. **Richesse de l'information** : Avoir l'objet complet permet d'accéder au slug, description, etc.
2. **Flexibilité** : Vous pouvez créer des liens vers les pages de catégorie
3. **Type safety** : TypeScript vous protège contre les erreurs
4. **Cohérence** : Même structure partout dans l'application

### 🎯 Récapitulatif

| Usage | Code | Résultat |
|-------|------|----------|
| ❌ Incorrect | `{article.category}` | Erreur React |
| ✅ Nom simple | `{article.category?.name}` | Affiche le nom |
| ✅ Avec fallback | `{article.category?.name \|\| 'Sans catégorie'}` | Affiche le nom ou fallback |
| ✅ Slug pour URL | `{article.category?.slug}` | Affiche le slug |
| ✅ Vérification | `{article.category && ...}` | Conditionnel |

## ⚠️ Bonnes pratiques

### DO ✅

- Toujours importer depuis `@/lib/articles` (pas les sous-modules)
- Utiliser les types exportés (`Article`, `Category`, etc.)
- Passer par le Service dans les Server Components
- Gérer les erreurs du Service
- **Toujours accéder à `category.name` pour afficher la catégorie** (voir section ci-dessous)

### DON'T ❌

- Importer `ArticleRepository` ou `mapper` directement
- Utiliser `ArticleQueries` (déprécié)
- Appeler le Service depuis un Client Component
- Court-circuiter les couches
- **❌ JAMAIS rendre directement `article.category` dans React** (c'est un objet !)

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

