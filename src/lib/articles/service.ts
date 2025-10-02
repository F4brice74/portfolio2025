/**
 * Service - Interface publique pour les articles
 * 
 * C'est LA couche que toute l'application doit utiliser.
 * 
 * Responsabilités :
 * - Coordonner Repository + Mapper
 * - Ajouter la logique métier
 * - Gérer les erreurs de manière user-friendly
 * - TOUJOURS retourner les types unifiés
 * 
 * Usage :
 * - Server Components : import direct
 * - API Routes : import direct
 * - Client Components : via API Routes
 */

import 'server-only'; // Empêche l'import côté client

import { ArticleRepository, CategoryRepository } from './repository';
import { toArticle, toArticles, toCategory, toCategoryWithCount } from './mapper';
import type { 
  Article, 
  Category, 
  CategoryWithCount, 
  CreateArticleDto, 
  UpdateArticleDto 
} from './types';

/**
 * Service principal pour les articles
 */
export class ArticleService {
  /**
   * Récupère tous les articles (admin)
   */
  static async getAll(): Promise<Article[]> {
    try {
      const dbArticles = await ArticleRepository.findAll();
      return toArticles(dbArticles);
    } catch (error) {
      console.error('[ArticleService] Error fetching all articles:', error);
      throw new Error('Impossible de récupérer les articles');
    }
  }

  /**
   * Récupère uniquement les articles publiés (public)
   */
  static async getPublished(): Promise<Article[]> {
    try {
      const dbArticles = await ArticleRepository.findPublished();
      return toArticles(dbArticles);
    } catch (error) {
      console.error('[ArticleService] Error fetching published articles:', error);
      throw new Error('Impossible de récupérer les articles publiés');
    }
  }

  /**
   * Récupère un article par ID
   */
  static async getById(id: number): Promise<Article | null> {
    try {
      const dbArticle = await ArticleRepository.findById(id);
      return dbArticle ? toArticle(dbArticle) : null;
    } catch (error) {
      console.error(`[ArticleService] Error fetching article ${id}:`, error);
      throw new Error('Impossible de récupérer l\'article');
    }
  }

  /**
   * Récupère un article par slug
   */
  static async getBySlug(slug: string): Promise<Article | null> {
    try {
      const dbArticle = await ArticleRepository.findBySlug(slug);
      return dbArticle ? toArticle(dbArticle) : null;
    } catch (error) {
      console.error(`[ArticleService] Error fetching article by slug ${slug}:`, error);
      throw new Error('Impossible de récupérer l\'article');
    }
  }

  /**
   * Récupère les articles d'une catégorie par slug
   */
  static async getByCategorySlug(categorySlug: string): Promise<Article[]> {
    try {
      const dbArticles = await ArticleRepository.findByCategorySlug(categorySlug);
      return toArticles(dbArticles);
    } catch (error) {
      console.error(`[ArticleService] Error fetching articles for category ${categorySlug}:`, error);
      throw new Error('Impossible de récupérer les articles de cette catégorie');
    }
  }

  /**
   * Crée un nouvel article
   */
  static async create(data: CreateArticleDto): Promise<Article> {
    try {
      // Validate slug doesn't exist
      const slugExists = await ArticleRepository.slugExists(data.slug);
      if (slugExists) {
        throw new Error('Un article avec ce slug existe déjà');
      }

      // Prepare data
      const articleData = {
        ...data,
        publishedAt: data.published ? new Date() : null,
      };

      const dbArticle = await ArticleRepository.create(articleData);
      return toArticle(dbArticle);
    } catch (error) {
      console.error('[ArticleService] Error creating article:', error);
      if (error instanceof Error) {
        throw error; // Preserve validation errors
      }
      throw new Error('Impossible de créer l\'article');
    }
  }

  /**
   * Met à jour un article
   */
  static async update(id: number, data: UpdateArticleDto): Promise<Article | null> {
    try {
      // If slug is being changed, validate it doesn't exist
      if (data.slug) {
        const slugExists = await ArticleRepository.slugExists(data.slug, id);
        if (slugExists) {
          throw new Error('Un article avec ce slug existe déjà');
        }
      }

      const dbArticle = await ArticleRepository.update(id, data);
      return dbArticle ? toArticle(dbArticle) : null;
    } catch (error) {
      console.error(`[ArticleService] Error updating article ${id}:`, error);
      if (error instanceof Error) {
        throw error; // Preserve validation errors
      }
      throw new Error('Impossible de mettre à jour l\'article');
    }
  }

  /**
   * Supprime un article
   */
  static async delete(id: number): Promise<boolean> {
    try {
      return await ArticleRepository.delete(id);
    } catch (error) {
      console.error(`[ArticleService] Error deleting article ${id}:`, error);
      throw new Error('Impossible de supprimer l\'article');
    }
  }

  /**
   * Vérifie si un slug existe
   */
  static async slugExists(slug: string, excludeId?: number): Promise<boolean> {
    try {
      return await ArticleRepository.slugExists(slug, excludeId);
    } catch (error) {
      console.error('[ArticleService] Error checking slug:', error);
      return false;
    }
  }
}

/**
 * Service pour les catégories
 */
export class CategoryService {
  /**
   * Récupère toutes les catégories avec le nombre d'articles
   */
  static async getAll(): Promise<CategoryWithCount[]> {
    try {
      const result = await CategoryRepository.findAll();
      return result.map(({ category, articleCount }) => 
        toCategoryWithCount(category, articleCount)
      );
    } catch (error) {
      console.error('[CategoryService] Error fetching categories:', error);
      throw new Error('Impossible de récupérer les catégories');
    }
  }

  /**
   * Récupère une catégorie par slug
   */
  static async getBySlug(slug: string): Promise<CategoryWithCount | null> {
    try {
      const result = await CategoryRepository.findBySlug(slug);
      return result ? toCategoryWithCount(result.category, result.articleCount) : null;
    } catch (error) {
      console.error(`[CategoryService] Error fetching category ${slug}:`, error);
      throw new Error('Impossible de récupérer la catégorie');
    }
  }

  /**
   * Récupère une catégorie par ID
   */
  static async getById(id: number): Promise<CategoryWithCount | null> {
    try {
      const result = await CategoryRepository.findById(id);
      return result ? toCategoryWithCount(result.category, result.articleCount) : null;
    } catch (error) {
      console.error(`[CategoryService] Error fetching category ${id}:`, error);
      throw new Error('Impossible de récupérer la catégorie');
    }
  }
}

