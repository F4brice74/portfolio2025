# Guide d'Optimisation des Performances

Ce document explique les optimisations appliquées au projet pour améliorer les performances de développement et de production.

## 🚀 Problème Initial

**Symptômes** : 
- Temps de compilation très long (3+ secondes par page)
- Rechargement lent en mode développement
- Expérience de développement dégradée

## ✅ Solutions Implémentées

### 1. Configuration Next.js Optimisée

**Fichier** : `next.config.ts`

```typescript
const nextConfig: NextConfig = {
  // Performance optimizations
  reactStrictMode: true,
  
  // Optimize builds with SWC
  swcMinify: true,
  
  // Reduce header overhead
  poweredByHeader: false,
  
  // Optimize package imports (tree-shaking)
  experimental: {
    optimizePackageImports: [
      '@mantine/core', 
      '@mantine/hooks', 
      '@tabler/icons-react'
    ],
  },
  
  // Reduce memory usage in dev
  onDemandEntries: {
    maxInactiveAge: 25 * 1000,
    pagesBufferLength: 2,
  },
};
```

**Bénéfices** :
- ✅ Tree-shaking automatique des packages Mantine et Tabler Icons
- ✅ Réduction de l'utilisation mémoire en développement
- ✅ Minification optimisée avec SWC

### 2. Cache avec Revalidation

**Avant** (❌ Lent) :
```typescript
const response = await fetch('/api/articles', {
  cache: 'no-store' // Désactive complètement le cache
})
```

**Après** (✅ Rapide) :
```typescript
const response = await fetch('/api/articles', {
  next: { revalidate: 60 } // Cache pendant 60 secondes
})
```

**Fichiers modifiés** :
- `src/app/page.tsx` - Liste des articles
- `src/app/blog/[slug]/page.tsx` - Page article
- `src/app/blog/[slug]/page.tsx` - generateMetadata

**Bénéfices** :
- ✅ Réduction drastique des appels API répétés
- ✅ Rechargements ultra-rapides (data en cache)
- ✅ Données fraîches toutes les 60 secondes

### 3. Désactivation de `generateStaticParams` en Dev

**Avant** (❌ Lent) :
```typescript
export async function generateStaticParams() {
  // Génère tous les paramètres statiques à chaque fois
  const response = await fetch('/api/articles')
  // ...
}
```

**Après** (✅ Rapide) :
```typescript
export async function generateStaticParams() {
  // Skip en développement
  if (process.env.NODE_ENV === 'development') {
    return []
  }
  
  // Utilisé seulement en production avec cache
  const response = await fetch('/api/articles', {
    next: { revalidate: 3600 } // 1 heure
  })
  // ...
}
```

**Bénéfices** :
- ✅ Pas de pré-génération en dev = démarrage instantané
- ✅ Génération statique optimisée en production
- ✅ Cache de 1h en production

### 4. Turbopack pour le Développement

**Avant** :
```json
"scripts": {
  "dev": "next dev"
}
```

**Après** :
```json
"scripts": {
  "dev": "next dev --turbo",
  "dev:normal": "next dev"
}
```

**Bénéfices** :
- ✅ Compilateur Rust ultra-rapide (5-10x plus rapide)
- ✅ Hot Module Replacement instantané
- ✅ Fallback disponible avec `npm run dev:normal`

## 📊 Résultats Attendus

| Métrique | Avant | Après | Amélioration |
|----------|-------|-------|--------------|
| Temps de compilation page | 3+ sec | < 500ms | **6x plus rapide** |
| Rechargement avec cache | 3+ sec | < 100ms | **30x plus rapide** |
| Démarrage serveur dev | Lent | Rapide | **Significatif** |
| Utilisation mémoire | Élevée | Réduite | **-30%** |

## 🛠️ Utilisation

### Mode Développement (Recommandé)

```bash
npm run dev
# Utilise Turbopack pour des performances maximales
```

### Mode Développement Normal (Fallback)

```bash
npm run dev:normal
# Utilise le compilateur Next.js standard
```

### Production

```bash
npm run build
npm start
```

Le build de production bénéficie de toutes les optimisations :
- Génération statique des pages articles
- Cache agressif avec revalidation
- Tree-shaking et minification optimisés

## 🔍 Diagnostic de Performance

### Vérifier les temps de compilation

Ouvrir les DevTools du navigateur et aller dans l'onglet Network :
- Rechercher les requêtes vers `/api/articles`
- Vérifier que le status est `200 (from cache)` après la première requête

### Vérifier l'utilisation du cache

Dans le terminal de développement, vous devriez voir :
```
✓ Compiled in XXXms (YYY modules)
```

Avec les optimisations, `XXX` devrait être < 500ms.

### Analyser le bundle

```bash
npm run build
```

Vérifier les tailles des chunks dans la sortie :
- Les packages Mantine doivent être tree-shaked
- Les icônes Tabler doivent être optimisées

## ⚠️ Limites et Considérations

### Cache de 60 secondes

Les données sont mises en cache pendant 60 secondes. Si vous :
- Créez un nouvel article
- Modifiez un article existant

**Il faudra attendre jusqu'à 60 secondes** ou faire un hard refresh (`Ctrl+Shift+R` / `Cmd+Shift+R`) pour voir les changements.

**Solution** : En admin, après modification, rediriger vers une nouvelle page force le rechargement.

### Turbopack (Expérimental)

Turbopack est encore en beta. Si vous rencontrez des problèmes :

1. Basculer sur le mode normal :
   ```bash
   npm run dev:normal
   ```

2. Rapporter le bug sur [Next.js GitHub](https://github.com/vercel/next.js/issues)

### generateStaticParams en Dev

Désactivé en développement pour la performance. Si vous avez besoin de tester la génération statique :

1. Commentez la condition :
   ```typescript
   // if (process.env.NODE_ENV === 'development') {
   //   return []
   // }
   ```

2. Ou testez en mode production :
   ```bash
   npm run build
   npm start
   ```

## 🚀 Optimisations Futures

### Court Terme
- [ ] Implémenter le streaming avec Suspense boundaries
- [ ] Ajouter un service worker pour le cache offline
- [ ] Optimiser les images avec next/image

### Moyen Terme
- [ ] Implémenter ISR (Incremental Static Regeneration) complet
- [ ] Ajouter un CDN pour les assets statiques
- [ ] Mettre en place Redis pour le cache serveur

### Long Terme
- [ ] Migration vers React Server Components exclusifs
- [ ] Partial Prerendering (PPR) expérimental
- [ ] Edge Runtime pour les API routes critiques

## 📚 Ressources

- [Next.js Performance Best Practices](https://nextjs.org/docs/app/building-your-application/optimizing)
- [Turbopack Documentation](https://turbo.build/pack/docs)
- [Next.js Caching Guide](https://nextjs.org/docs/app/building-your-application/caching)
- [SWC Compiler](https://swc.rs/)

---

**Dernière mise à jour** : Octobre 2024  
**Auteur** : Fabrice MIQUET-SAGE

