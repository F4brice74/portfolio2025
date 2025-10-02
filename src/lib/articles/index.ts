/**
 * Point d'entrée principal pour le module articles
 * 
 * Usage recommandé :
 * import { ArticleService, CategoryService, type Article } from '@/lib/articles';
 */

// Services (interface publique)
export { ArticleService, CategoryService } from './service';

// Types unifiés
export type {
  Article,
  Category,
  CategoryWithCount,
  CreateArticleDto,
  UpdateArticleDto,
  ArticleFilters,
  ArticleSortOptions,
} from './types';

// Note: Repository et Mapper sont volontairement non exportés
// Ils sont des détails d'implémentation internes
// Toute interaction doit passer par les Services

