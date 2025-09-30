import { loadEnvConfig } from '@next/env';

// Load environment variables
const projectDir = process.cwd();
loadEnvConfig(projectDir);

import { db } from './index';
import { categories, articles, articleTags } from './schema';

export async function seedDatabase() {
  console.log('🌱 Starting database seeding...');

  try {
    // Clear existing data
    await db.delete(articleTags);
    await db.delete(articles);
    await db.delete(categories);

    // Seed categories
    console.log('📁 Seeding categories...');
    const seedCategories = await db.insert(categories).values([
      { name: 'Développement', slug: 'developpement', description: 'Articles sur le développement web et mobile' },
      { name: 'Architecture', slug: 'architecture', description: 'Conception et architecture de systèmes' },
      { name: 'Performance', slug: 'performance', description: 'Optimisation et performances' },
      { name: 'Sécurité', slug: 'securite', description: 'Sécurité des applications' },
      { name: 'DevOps', slug: 'devops', description: 'DevOps et automatisation' },
    ]).returning();

    console.log(`✅ Created ${seedCategories.length} categories`);

    // Get category IDs for articles
    const devCategory = seedCategories.find(c => c.slug === 'developpement')!;
    const archCategory = seedCategories.find(c => c.slug === 'architecture')!;
    const perfCategory = seedCategories.find(c => c.slug === 'performance')!;
    const secCategory = seedCategories.find(c => c.slug === 'securite')!;
    const devopsCategory = seedCategories.find(c => c.slug === 'devops')!;

    // Seed articles
    console.log('📝 Seeding articles...');
    const seedArticles = await db.insert(articles).values([
      {
        title: 'Introduction à Next.js 15 et React 19',
        slug: 'introduction-nextjs-15-react-19',
        excerpt: 'Découvrez les nouvelles fonctionnalités de Next.js 15 et React 19, et comment elles transforment le développement d\'applications web modernes.',
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
        featuredImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=200&fit=crop&crop=center',
        published: true,
        publishedAt: new Date('2024-01-15T10:00:00Z'),
        categoryId: devCategory.id,
        authorName: 'Fabrice MIQUET-SAGE',
        authorEmail: 'fabrice@example.com',
        readingTime: 8,
      },
      {
        title: 'Architecture microservices avec Docker',
        slug: 'architecture-microservices-docker',
        excerpt: 'Apprenez à concevoir et déployer une architecture microservices robuste en utilisant Docker et les meilleures pratiques du domaine.',
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
        featuredImage: 'https://images.unsplash.com/photo-1605745341112-85968b19335a?w=400&h=200&fit=crop&crop=center',
        published: true,
        publishedAt: new Date('2024-01-10T14:30:00Z'),
        categoryId: archCategory.id,
        authorName: 'Fabrice MIQUET-SAGE',
        authorEmail: 'fabrice@example.com',
        readingTime: 12,
      },
      {
        title: 'Optimisation des performances web',
        slug: 'optimisation-performances-web',
        excerpt: 'Découvrez les techniques et outils essentiels pour optimiser les performances de votre site web et améliorer l\'expérience utilisateur.',
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
        featuredImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=200&fit=crop&crop=center',
        published: true,
        publishedAt: new Date('2024-01-05T09:15:00Z'),
        categoryId: perfCategory.id,
        authorName: 'Fabrice MIQUET-SAGE',
        authorEmail: 'fabrice@example.com',
        readingTime: 10,
      },
    ]).returning();

    console.log(`✅ Created ${seedArticles.length} articles`);

    // Seed article tags
    console.log('🏷️ Seeding article tags...');
    const articleTagsData = [
      // Article 1 tags
      { articleId: seedArticles[0].id, tag: 'Next.js' },
      { articleId: seedArticles[0].id, tag: 'React' },
      { articleId: seedArticles[0].id, tag: 'JavaScript' },
      { articleId: seedArticles[0].id, tag: 'Web Development' },
      // Article 2 tags
      { articleId: seedArticles[1].id, tag: 'Docker' },
      { articleId: seedArticles[1].id, tag: 'Microservices' },
      { articleId: seedArticles[1].id, tag: 'DevOps' },
      { articleId: seedArticles[1].id, tag: 'Architecture' },
      // Article 3 tags
      { articleId: seedArticles[2].id, tag: 'Performance' },
      { articleId: seedArticles[2].id, tag: 'Web Vitals' },
      { articleId: seedArticles[2].id, tag: 'Optimization' },
      { articleId: seedArticles[2].id, tag: 'SEO' },
    ];

    await db.insert(articleTags).values(articleTagsData);
    console.log(`✅ Created ${articleTagsData.length} article tags`);

    console.log('🎉 Database seeding completed successfully!');
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    throw error;
  }
}

// Script to run seeding
if (require.main === module) {
  seedDatabase()
    .then(() => {
      console.log('✅ Seeding completed');
      process.exit(0);
    })
    .catch((error) => {
      console.error('❌ Seeding failed:', error);
      process.exit(1);
    });
}
