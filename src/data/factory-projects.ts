/**
 * Factory Projects - Static Data
 * 
 * Cette structure contient tous les projets de la section factory.
 * Pas de base de données nécessaire - les projets sont définis ici.
 */

export interface FactoryProject {
  title: string;
  description: string;
  technologies: string[];
  images: string[];
  links: {
    demo?: string;
    github?: string;
    docs?: string;
    live?: string;
  };
  content: string; // Markdown
  featuredImage?: string;
}

export const factoryProjects: Record<string, FactoryProject> = {
  'exemple-demo': {
    title: 'Exemple de Démo',
    description: 'Un exemple de projet pour démontrer la section factory',
    technologies: ['React', 'TypeScript', 'Next.js'],
    images: [
      '/images/factory/exemple-demo-1.jpg',
      '/images/factory/exemple-demo-2.jpg',
    ],
    links: {
      demo: 'https://exemple-demo.vercel.app',
      github: 'https://github.com/username/exemple-demo',
    },
    featuredImage: '/images/factory/exemple-demo-featured.jpg',
    content: `
# Exemple de Démo

## 🎯 Présentation

Ceci est un exemple de projet dans la section factory. Cette section permet de présenter vos projets personnels de manière professionnelle.

## 🛠️ Technologies utilisées

- **React 18** : Framework JavaScript moderne
- **TypeScript** : Typage statique pour plus de robustesse
- **Next.js** : Framework React avec SSR et SSG

## 📸 Captures d'écran

Les images du projet sont affichées dans la galerie ci-dessus.

## 🚀 Fonctionnalités

- Feature 1 : Description de la fonctionnalité
- Feature 2 : Autre fonctionnalité importante
- Feature 3 : Encore une fonctionnalité

## 💡 Pourquoi ce projet ?

Expliquez ici la motivation derrière ce projet, les problèmes qu'il résout, et ce que vous avez appris en le développant.

## 🔗 Liens utiles

- [Voir la démo en ligne](https://exemple-demo.vercel.app)
- [Code source sur GitHub](https://github.com/username/exemple-demo)
`,
  },
};

/**
 * Récupère un projet par son slug
 */
export function getFactoryProject(slug: string): FactoryProject | undefined {
  return factoryProjects[slug];
}

/**
 * Récupère tous les slugs de projets (pour generateStaticParams)
 */
export function getAllFactoryProjectSlugs(): string[] {
  return Object.keys(factoryProjects);
}

/**
 * Récupère tous les projets
 */
export function getAllFactoryProjects(): Array<FactoryProject & { slug: string }> {
  return Object.entries(factoryProjects).map(([slug, project]) => ({
    ...project,
    slug,
  }));
}

