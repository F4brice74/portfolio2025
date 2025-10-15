# Guide Factory Projects

## 📋 Vue d'ensemble

La section **Factory** permet de présenter vos projets personnels sur `ossawayas.com/factory/[slug]` avec une approche hybride :
- Pages de présentation hébergées sur ossawayas.com
- Projets/démos autonomes déployés séparément
- Découverte via des liens dans les articles de blog

## 🚀 Ajouter un nouveau projet

### 1. Créer l'entrée du projet

Éditez le fichier `src/data/factory-projects.ts` et ajoutez votre projet :

```typescript
export const factoryProjects: Record<string, FactoryProject> = {
  // ... projets existants
  
  'mon-nouveau-projet': {
    title: 'Mon Nouveau Projet',
    description: 'Une description courte et accrocheuse du projet',
    technologies: ['React', 'TypeScript', 'Next.js', 'Tailwind'],
    images: [
      '/images/factory/mon-projet-1.jpg',
      '/images/factory/mon-projet-2.jpg',
    ],
    links: {
      demo: 'https://mon-projet.vercel.app',
      github: 'https://github.com/username/mon-projet',
      docs: 'https://mon-projet-docs.vercel.app', // optionnel
      live: 'https://mon-projet.com', // optionnel
    },
    featuredImage: '/images/factory/mon-projet-featured.jpg',
    content: `
# Mon Nouveau Projet

## 🎯 Présentation

Description détaillée du projet en Markdown...

## 🛠️ Technologies

- **React** : Framework JavaScript
- **TypeScript** : Typage statique
- etc.

## 📸 Fonctionnalités

- Feature 1
- Feature 2
- Feature 3

## 💡 Motivation

Pourquoi ce projet ? Qu'avez-vous appris ?
`,
  },
};
```

### 2. Ajouter les images

Placez vos images dans `public/images/factory/` :
- `mon-projet-featured.jpg` : Image principale (1200x600px recommandé)
- `mon-projet-1.jpg`, `mon-projet-2.jpg` : Screenshots (600x400px recommandé)

### 3. Déployer le projet autonome (optionnel)

Si votre projet est une démo interactive :
1. Créez un repo séparé pour le projet
2. Déployez sur Vercel/Netlify/autre
3. Ajoutez l'URL dans le champ `links.demo`

### 4. Créer un article de blog

Créez un article qui présente votre projet et incluez un lien :

```markdown
# Présentation de Mon Nouveau Projet

J'ai développé une application innovante...

Découvrez [Mon Nouveau Projet](/factory/mon-nouveau-projet) 
qui utilise React et TypeScript.
```

Le lien sera automatiquement stylisé avec :
- 🏭 Icône factory
- Couleur violette distinctive
- Background coloré au survol

## 📊 Structure d'un projet

### Champs obligatoires
- `title` : Titre du projet
- `description` : Description courte (1-2 phrases)
- `technologies` : Array de technologies utilisées
- `images` : Array d'URLs d'images
- `links` : Object avec au moins un lien (demo, github, docs, ou live)
- `content` : Contenu Markdown détaillé

### Champs optionnels
- `featuredImage` : Image principale du projet

## 🎨 Bonnes pratiques

### Images
- **Featured image** : 1200x600px (ratio 2:1)
- **Screenshots** : 600x400px (ratio 3:2)
- Format : JPG ou PNG optimisé
- Nommage : `nom-projet-descriptif.jpg`

### Content Markdown
- Utilisez des titres H2 (##) pour les sections principales
- Ajoutez des emojis pour rendre le contenu plus visuel
- Incluez des listes pour les fonctionnalités
- Expliquez le contexte et la motivation

### Technologies
- Listez les technologies principales (3-6 max)
- Utilisez les noms officiels (React, TypeScript, etc.)
- Ordre : Framework → Language → Tools

### Liens
- `demo` : Démo interactive du projet
- `github` : Code source
- `docs` : Documentation technique
- `live` : Version production (si différente de demo)

## 🔗 URLs générées

Chaque projet génère automatiquement :
- Page : `ossawayas.com/factory/[slug]`
- Métadonnées SEO optimisées
- OpenGraph pour partage social
- Breadcrumb navigation

## 📝 Exemple complet

```typescript
'portfolio-ia': {
  title: 'Portfolio IA - Générateur de CV',
  description: 'Application web qui génère des CV professionnels avec l\'aide de l\'IA',
  technologies: ['React', 'TypeScript', 'OpenAI', 'Tailwind CSS'],
  images: [
    '/images/factory/portfolio-ia-dashboard.jpg',
    '/images/factory/portfolio-ia-editor.jpg',
    '/images/factory/portfolio-ia-preview.jpg',
  ],
  links: {
    demo: 'https://portfolio-ia.vercel.app',
    github: 'https://github.com/fab/portfolio-ia',
  },
  featuredImage: '/images/factory/portfolio-ia-featured.jpg',
  content: `
# Portfolio IA - Générateur de CV

## 🎯 Concept

Application web qui permet de créer des CV professionnels en utilisant l'intelligence artificielle pour optimiser le contenu et la mise en page.

## 🛠️ Stack Technique

- **React 18** : Interface utilisateur réactive
- **TypeScript** : Typage statique pour plus de robustesse
- **OpenAI GPT-4** : Génération et optimisation du contenu
- **Tailwind CSS** : Styling moderne et responsive

## 📸 Fonctionnalités

- ✨ Génération automatique de contenu avec IA
- 🎨 Multiples templates professionnels
- 📱 Interface responsive mobile-first
- 💾 Sauvegarde locale et export PDF
- 🌐 Multilingue (FR/EN)

## 💡 Motivation

Ce projet est né du constat que créer un CV professionnel prend du temps. L'objectif était de combiner l'IA avec une UX intuitive pour simplifier ce processus.

## 🚀 Défis techniques

- Intégration de l'API OpenAI avec gestion des tokens
- Génération de PDF côté client avec jsPDF
- Optimisation des performances pour l'édition en temps réel

## 📚 Apprentissages

- Utilisation avancée de l'API OpenAI
- Gestion d'état complexe avec React Context
- Optimisation des performances React
`,
},
```

## 🎯 Workflow de publication

1. **Développer** → Créer votre projet dans un repo séparé
2. **Déployer** → Mettre en ligne sur Vercel/Netlify
3. **Screenshots** → Capturer des images de qualité
4. **Ajouter** → Créer l'entrée dans `factory-projects.ts`
5. **Article** → Écrire un article de blog avec lien factory
6. **Build** → `npm run build` pour générer les pages statiques
7. **Deploy** → Push sur GitHub → Déploiement automatique Vercel

## 🔍 SEO et Performance

- ✅ Pages générées statiquement (SSG)
- ✅ Métadonnées optimisées automatiquement
- ✅ OpenGraph pour partage social
- ✅ Images optimisées avec Next.js Image
- ✅ URLs SEO-friendly
- ✅ Breadcrumb navigation

## 🆘 Dépannage

### Le projet n'apparaît pas
- Vérifiez que le slug est bien dans `factory-projects.ts`
- Relancez `npm run dev` pour régénérer les pages
- Vérifiez la console pour les erreurs

### Les images ne s'affichent pas
- Vérifiez que les images sont dans `public/images/factory/`
- Vérifiez les chemins (doivent commencer par `/images/factory/`)
- Utilisez des formats supportés (JPG, PNG, WebP)

### Le lien dans l'article n'est pas stylisé
- Vérifiez que le lien commence par `/factory/`
- Le MarkdownRenderer détecte automatiquement ces liens
- Rechargez la page pour voir les changements

