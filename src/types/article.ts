export interface Article {
  id: string
  title: string
  slug: string
  content: string
  excerpt: string
  category: string
  publishedAt: string
  updatedAt: string
  featuredImage?: string
  author: {
    name: string
    email: string
  }
  tags: string[]
  readingTime: number
}

export interface Category {
  id: string
  name: string
  slug: string
  description?: string
  articleCount: number
}
