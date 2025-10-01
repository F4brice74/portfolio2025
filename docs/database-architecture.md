# Architecture de Base de Données - NeonDB & Drizzle ORM

## Table des matières
1. [Vue d'ensemble](#vue-densemble)
2. [Configuration NeonDB](#configuration-neondb)
3. [Schéma de données](#schéma-de-données)
4. [Système de requêtes](#système-de-requêtes)
5. [API Routes](#api-routes)
6. [Gestion des erreurs](#gestion-des-erreurs)
7. [Performance et optimisations](#performance-et-optimisations)
8. [Exemples pratiques](#exemples-pratiques)

## Vue d'ensemble

Ce projet utilise **NeonDB** (PostgreSQL serverless) avec **Drizzle ORM** pour gérer les données de l'application de blog. Cette architecture offre une solution moderne, scalable et type-safe.

### Stack technique
- **Base de données** : NeonDB (PostgreSQL serverless)
- **ORM** : Drizzle ORM
- **Client** : @neondatabase/serverless
- **TypeScript** : Types auto-générés
- **Migrations** : Drizzle Kit

## Configuration NeonDB

### Variables d'environnement
```bash
# .env.local
DATABASE_URL="postgresql://username:password@ep-xxx.neon.tech/neondb?sslmode=require"
```

### Connexion à la base
```typescript
// src/lib/db/index.ts
import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';
import * as schema from './schema';

const sql = neon(process.env.DATABASE_URL!);
export const db = drizzle(sql, { schema });
```

**Explication :**
- `neon()` : Client NeonDB qui gère la connexion serverless
- `drizzle()` : ORM qui traduit les requêtes TypeScript en SQL
- `schema` : Définition des tables et relations

## Schéma de données

### Tables principales

#### 1. Table `categories`
```typescript
export const categories = pgTable('categories', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 100 }).notNull(),
  slug: varchar('slug', { length: 100 }).notNull().unique(),
  description: text('description'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});
```

#### 2. Table `articles`
```typescript
export const articles = pgTable('articles', {
  id: serial('id').primaryKey(),
  title: varchar('title', { length: 255 }).notNull(),
  slug: varchar('slug', { length: 255 }).notNull().unique(),
  excerpt: text('excerpt').notNull(),
  content: text('content').notNull(),
  featuredImage: varchar('featured_image', { length: 500 }),
  published: boolean('published').default(false).notNull(),
  publishedAt: timestamp('published_at'),
  categoryId: integer('category_id').references(() => categories.id),
  authorName: varchar('author_name', { length: 100 }).notNull(),
  authorEmail: varchar('author_email', { length: 100 }).notNull(),
  readingTime: integer('reading_time').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});
```

#### 3. Table `article_tags` (relation many-to-many)
```typescript
export const articleTags = pgTable('article_tags', {
  id: serial('id').primaryKey(),
  articleId: integer('article_id').references(() => articles.id, { onDelete: 'cascade' }).notNull(),
  tag: varchar('tag', { length: 50 }).notNull(),
});
```

### Relations
```typescript
export const articlesRelations = relations(articles, ({ one, many }) => ({
  category: one(categories, {
    fields: [articles.categoryId],
    references: [categories.id],
  }),
  tags: many(articleTags),
}));
```

## Système de requêtes

### Classe `ArticleQueries`

#### Récupération d'articles
```typescript
// Récupérer tous les articles avec catégories et tags
static async getAll(): Promise<ArticleWithCategory[]> {
  const result = await db
    .select({
      article: articles,
      category: categories,
    })
    .from(articles)
    .leftJoin(categories, eq(articles.categoryId, categories.id))
    .orderBy(desc(articles.createdAt));

  // Récupérer les tags séparément
  const articleIds = result.map(r => r.article.id);
  const tags = articleIds.length > 0 
    ? await db.select().from(articleTags).where(sql`${articleTags.articleId} = ANY(${articleIds})`)
    : [];

  return result.map(({ article, category }) => ({
    ...article,
    category,
    tags: tags.filter(tag => tag.articleId === article.id).map(tag => tag.tag),
  }));
}
```

#### Création d'articles
```typescript
static async create(data: CreateArticleData): Promise<ArticleWithCategory> {
  const readingTime = Math.ceil(data.content.length / 200);

  // Créer l'article
  const [newArticle] = await db.insert(articles).values({
    title: data.title,
    slug: data.slug,
    excerpt: data.excerpt,
    content: data.content,
    featuredImage: data.featuredImage,
    published: data.published,
    publishedAt: data.publishedAt,
    categoryId: data.categoryId,
    authorName: data.authorName,
    authorEmail: data.authorEmail,
    readingTime,
  }).returning();

  // Ajouter les tags
  if (data.tags.length > 0) {
    await db.insert(articleTags).values(
      data.tags.map(tag => ({
        articleId: newArticle.id,
        tag,
      }))
    );
  }

  return this.getById(newArticle.id) as Promise<ArticleWithCategory>;
}
```

#### Mise à jour d'articles
```typescript
static async update(id: number, data: Partial<UpdateArticleData>): Promise<ArticleWithCategory | null> {
  const updateData: Record<string, unknown> = { ...data };
  
  if (data.content) {
    updateData.readingTime = Math.ceil(data.content.length / 200);
  }
  updateData.updatedAt = new Date();

  // Mettre à jour l'article
  const [updatedArticle] = await db
    .update(articles)
    .set(updateData)
    .where(eq(articles.id, id))
    .returning();

  if (!updatedArticle) return null;

  // Mettre à jour les tags si fournis
  if (data.tags !== undefined) {
    await db.delete(articleTags).where(eq(articleTags.articleId, id));
    
    if (data.tags.length > 0) {
      await db.insert(articleTags).values(
        data.tags.map(tag => ({
          articleId: id,
          tag,
        }))
      );
    }
  }

  return this.getById(id);
}
```

### Classe `CategoryQueries`

```typescript
static async getAll(): Promise<CategoryWithCount[]> {
  const result = await db
    .select({
      category: categories,
      articleCount: sql<number>`count(${articles.id})::int`,
    })
    .from(categories)
    .leftJoin(articles, and(eq(categories.id, articles.categoryId), eq(articles.published, true)))
    .groupBy(categories.id)
    .orderBy(categories.name);

  return result.map(({ category, articleCount }) => ({
    ...category,
    articleCount: articleCount || 0,
  }));
}
```

## API Routes

### Structure des routes
```
/api/admin/articles/
├── route.ts              # GET (liste), POST (création)
├── [id]/
│   ├── route.ts          # GET, PUT, DELETE (article spécifique)
│   └── publish/
│       └── route.ts      # PATCH (publication/dépublication)
```

### Exemple : Création d'article
```typescript
// POST /api/admin/articles
export async function POST(request: NextRequest) {
  try {
    // Authentification
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { title, slug, excerpt, content, category, tags, featuredImage, published } = body;

    // Validation
    if (!title || !slug || !excerpt || !content || !category) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Vérifier l'unicité du slug
    const slugExists = await ArticleQueries.slugExists(slug);
    if (slugExists) {
      return NextResponse.json({ error: 'Un article avec ce slug existe déjà' }, { status: 409 });
    }

    // Récupérer l'ID de la catégorie
    const categories = await CategoryQueries.getAll();
    const categoryObj = categories.find(cat => cat.name === category);
    if (!categoryObj) {
      return NextResponse.json({ error: 'Catégorie non trouvée' }, { status: 400 });
    }

    // Créer l'article
    const newArticle = await ArticleQueries.create({
      title,
      slug,
      excerpt,
      content,
      featuredImage: featuredImage || undefined,
      published: published || false,
      publishedAt: published ? new Date() : null,
      categoryId: categoryObj.id,
      authorName: 'Fabrice MIQUET-SAGE',
      authorEmail: 'fabrice@example.com',
      tags: tags || [],
    });

    return NextResponse.json(newArticle, { status: 201 });
  } catch (error) {
    console.error('Error creating article:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
```

## Gestion des erreurs

### Types d'erreurs
1. **Erreurs d'authentification** (401)
2. **Erreurs de validation** (400)
3. **Erreurs de conflit** (409)
4. **Erreurs de ressource non trouvée** (404)
5. **Erreurs serveur** (500)

### Pattern de gestion
```typescript
try {
  // Opération de base de données
  const result = await ArticleQueries.getById(id);
  
  if (!result) {
    return NextResponse.json({ error: 'Article not found' }, { status: 404 });
  }
  
  return NextResponse.json(result);
} catch (error) {
  console.error('Database error:', error);
  return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
}
```

## Performance et optimisations

### 1. Connection Pooling
NeonDB gère automatiquement le pooling des connexions, optimisant les performances.

### 2. Requêtes préparées
Drizzle génère automatiquement des requêtes préparées, protégeant contre les injections SQL.

### 3. Index automatiques
- Clés primaires (`id`)
- Contraintes uniques (`slug`)
- Clés étrangères (`category_id`)

### 4. Optimisations de requêtes
```typescript
// Récupération efficace avec jointures
const articles = await db
  .select({
    article: articles,
    category: categories,
  })
  .from(articles)
  .leftJoin(categories, eq(articles.categoryId, categories.id))
  .where(eq(articles.published, true))
  .orderBy(desc(articles.publishedAt));
```

## Exemples pratiques

### 1. Créer un nouvel article
```typescript
const newArticle = await ArticleQueries.create({
  title: "Mon nouvel article",
  slug: "mon-nouvel-article",
  excerpt: "Description courte",
  content: "Contenu complet...",
  categoryId: 1,
  authorName: "Fabrice MIQUET-SAGE",
  authorEmail: "fabrice@example.com",
  tags: ["Next.js", "React"],
  published: true,
  publishedAt: new Date(),
});
```

### 2. Récupérer les articles publiés
```typescript
const publishedArticles = await ArticleQueries.getPublished();
```

### 3. Rechercher un article par slug
```typescript
const article = await ArticleQueries.getBySlug("mon-nouvel-article");
```

### 4. Mettre à jour un article
```typescript
const updatedArticle = await ArticleQueries.update(1, {
  title: "Titre modifié",
  published: true,
  tags: ["Nouveau", "Tag"],
});
```

### 5. Supprimer un article
```typescript
const success = await ArticleQueries.delete(1);
```

## Scripts de maintenance

### Génération de migrations
```bash
npm run db:generate
```

### Application des migrations
```bash
npm run db:push
```

### Seeding de données
```bash
npm run db:seed
```

### Interface d'administration
```bash
npm run db:studio
```

## Bonnes pratiques

1. **Toujours valider les données** avant insertion
2. **Utiliser les transactions** pour les opérations complexes
3. **Gérer les erreurs** de manière appropriée
4. **Optimiser les requêtes** avec des jointures efficaces
5. **Utiliser les types TypeScript** pour la sécurité
6. **Tester les requêtes** avant déploiement

Cette architecture offre une base solide, scalable et maintenable pour la gestion des données de l'application de blog.
