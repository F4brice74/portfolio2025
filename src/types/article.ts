export interface Article {
  id: number
  title: string
  slug: string
  content: string
  excerpt: string
  category: Category | string // Can be either object or string for backward compatibility
  publishedAt: string
  updatedAt: string
  featuredImage?: string
  authorName: string
  authorEmail: string
  tags: string[]
  readingTime: number
  published: boolean
  categoryId?: number
  createdAt: string
}

export interface Category {
  id: number
  name: string
  slug: string
  description?: string
  createdAt: string
  updatedAt: string
}

// Type pour les articles de l'API (avec category comme objet)
export interface ApiArticle {
  id: number
  title: string
  slug: string
  content: string
  excerpt: string
  category: Category | null
  publishedAt: string | null
  updatedAt: string
  featuredImage?: string | null
  authorName: string
  authorEmail: string
  tags: string[]
  readingTime: number
  published: boolean
  categoryId?: number
  createdAt: string
}
