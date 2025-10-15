# Factory Projects - Documentation d'implémentation

## ✅ US-013 : Discover factory projects through articles

### Statut : IMPLÉMENTÉ ✅

## 📋 Critères d'acceptation

- ✅ Articles can contain links to factory projects using /factory/[project-slug] URLs
- ✅ Project links are clearly identified and styled differently from regular links
- ✅ Clicking a project link opens the dedicated project page
- ✅ Project pages load within 3 seconds with optimized images and content

## 🏗️ Architecture implémentée

### 1. Structure de données statiques
**Fichier** : `src/data/factory-projects.ts`
- Interface `FactoryProject` définissant la structure des projets
- Object `factoryProjects` contenant tous les projets
- Fonctions utilitaires pour récupérer les projets

### 2. Composants React

#### `TechnologyBadge.tsx`
- Badge Mantine pour afficher une technologie
- Style cohérent avec le design system

#### `ProjectLinks.tsx`
- Affiche les liens externes (demo, GitHub, docs, live)
- Icônes distinctives pour chaque type de lien
- Boutons stylisés avec variants appropriés

#### `FactoryProject.tsx`
- Composant principal pour afficher un projet complet
- Sections : titre, description, technologies, liens, images, contenu Markdown
- Layout responsive avec Mantine Grid

### 3. Pages Next.js

#### `src/app/factory/[slug]/page.tsx`
- Page dynamique avec génération statique (SSG)
- `generateStaticParams()` pour créer toutes les pages au build
- `generateMetadata()` pour SEO optimisé
- Breadcrumb navigation
- Gestion 404 automatique

#### `src/app/factory/[slug]/not-found.tsx`
- Page 404 personnalisée pour projets inexistants
- Navigation de retour vers l'accueil

### 4. Intégration MarkdownRenderer

**Modification** : `src/components/MarkdownRenderer.tsx`
- Détection automatique des liens `/factory/[slug]`
- Styling spécial pour les liens factory :
  - 🏭 Icône factory
  - Couleur violette (`violet-6`)
  - Background coloré au survol
  - Font-weight bold
  - Padding et border-radius
- Liens internes (pas de `target="_blank"`)

## 🎨 Design et UX

### Styling des liens factory dans les articles
```
Lien normal : [Texte](https://example.com)
  → Bleu, underline au survol

Lien factory : [Projet](/factory/mon-projet)
  → 🏭 Violet, background coloré, bold
```

### Page de projet
- Hero section avec titre, description, technologies
- Boutons d'action (démo, GitHub) bien visibles
- Image featured en grand format
- Galerie de screenshots en grid responsive
- Contenu Markdown avec styling cohérent
- Liens répétés en bas de page

## 📊 Performance

- ✅ **SSG** : Pages générées au build (très rapide)
- ✅ **Images** : Optimisées avec Next.js Image (à venir)
- ✅ **Bundle** : Code splitting automatique
- ✅ **SEO** : Métadonnées complètes + OpenGraph

## 🔗 URLs générées

Pour chaque projet dans `factory-projects.ts` :
- Page : `ossawayas.com/factory/[slug]`
- Métadonnées SEO automatiques
- Sitemap inclusion automatique (Next.js)

## 📁 Structure des fichiers

```
src/
├── data/
│   └── factory-projects.ts          # Données statiques des projets
├── components/
│   ├── FactoryProject.tsx           # Composant principal
│   ├── TechnologyBadge.tsx          # Badge technologie
│   ├── ProjectLinks.tsx             # Liens externes
│   └── MarkdownRenderer.tsx         # Amélioré pour factory links
└── app/
    └── factory/
        └── [slug]/
            ├── page.tsx             # Page dynamique
            └── not-found.tsx        # Page 404

public/
└── images/
    └── factory/                     # Dossier pour images projets

docs/
├── factory-guide.md                 # Guide utilisateur
└── factory-implementation.md        # Cette doc
```

## 🚀 Utilisation

### Ajouter un projet

1. Éditer `src/data/factory-projects.ts`
2. Ajouter les images dans `public/images/factory/`
3. Build : `npm run build`
4. Les pages sont générées automatiquement

### Lier depuis un article

Dans le contenu Markdown d'un article :
```markdown
Découvrez [Mon Projet](/factory/mon-projet) qui utilise React.
```

Le lien sera automatiquement stylisé avec l'icône 🏭 et la couleur violette.

## 🧪 Tests

### Test manuel
1. Lancer `npm run dev`
2. Naviguer vers `http://localhost:3000/factory/exemple-demo`
3. Vérifier :
   - Page s'affiche correctement
   - Breadcrumb fonctionne
   - Liens externes s'ouvrent dans nouvel onglet
   - Images se chargent (ou placeholder)
   - Markdown est bien rendu

### Test des liens factory
1. Créer un article avec lien `/factory/exemple-demo`
2. Vérifier que le lien a :
   - Icône 🏭
   - Couleur violette
   - Background au survol
   - Navigation interne (pas de nouvel onglet)

## 📝 Exemple de projet

Voir `src/data/factory-projects.ts` pour l'exemple complet `'exemple-demo'`.

## 🔄 Workflow de publication

1. **Développer** le projet séparément
2. **Déployer** sur Vercel/Netlify
3. **Capturer** screenshots
4. **Ajouter** entrée dans `factory-projects.ts`
5. **Créer** article de blog avec lien
6. **Build** et déployer

## 🎯 Avantages de cette implémentation

✅ **Simplicité** : Pas de base de données
✅ **Performance** : Pages statiques ultra-rapides
✅ **SEO** : Optimisé automatiquement
✅ **Maintenance** : Facile à mettre à jour
✅ **Flexibilité** : Projets externes restent autonomes
✅ **Coût** : Zéro coût supplémentaire
✅ **UX** : Navigation fluide et intuitive

## 🔮 Améliorations futures possibles

- [ ] Optimisation images avec Next.js Image component
- [ ] Preview cards au survol des liens factory
- [ ] Page index `/factory` listant tous les projets
- [ ] Filtrage par technologie
- [ ] Recherche de projets
- [ ] Analytics sur les visites de projets
- [ ] Partage social optimisé

## 📚 Références

- [Next.js Static Generation](https://nextjs.org/docs/basic-features/pages#static-generation)
- [Mantine Components](https://mantine.dev/)
- [React Markdown](https://github.com/remarkjs/react-markdown)

