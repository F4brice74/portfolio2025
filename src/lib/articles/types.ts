/**
 * Types unifiés pour les articles
 * Ces types sont utilisés dans TOUTE l'application (pages, composants, API)
 * Ils représentent le contrat stable entre la couche données et la présentation
 */

// ============================================================================
// TYPES PUBLICS - Utilisés par toute l'application
// ============================================================================

/**
 * Représentation unifiée d'un article
 * Tous les champs sont sérialisables (compatible Server Components)
 */
export interface Article {
  id: number;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  featuredImage: string | null;
  published: boolean;
  publishedAt: string | null;
  authorName: string;
  authorEmail: string;
  readingTime: number;
  createdAt: string;
  updatedAt: string;
  
  // Relations
  category: Category | null;
  categoryId: number | null;
  tags: string[];
}

/**
 * Représentation unifiée d'une catégorie
 */
export interface Category {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  createdAt: string;
  updatedAt: string;
}

/**
 * Catégorie avec compteur d'articles (pour les listings)
 */
export interface CategoryWithCount extends Category {
  articleCount: number;
}

// ============================================================================
// TYPES POUR CRÉATION/MODIFICATION
// ============================================================================

/**
 * Données nécessaires pour créer un nouvel article
 */
export interface CreateArticleDto {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featuredImage?: string;
  published: boolean;
  categoryId: number;
  tags: string[];
  authorName: string;
  authorEmail: string;
}

/**
 * Données pour mettre à jour un article
 * Tous les champs sont optionnels
 */
export interface UpdateArticleDto {
  title?: string;
  slug?: string;
  excerpt?: string;
  content?: string;
  featuredImage?: string;
  published?: boolean;
  publishedAt?: Date | null;
  categoryId?: number;
  tags?: string[];
}

// ============================================================================
// TYPES POUR FILTRES
// ============================================================================

export interface ArticleFilters {
  published?: boolean;
  categoryId?: number;
  categorySlug?: string;
  search?: string;
  tags?: string[];
}

export interface ArticleSortOptions {
  field: 'createdAt' | 'publishedAt' | 'updatedAt' | 'title';
  direction: 'asc' | 'desc';
}

