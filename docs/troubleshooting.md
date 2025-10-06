# Guide de Dépannage

## Problème : Compilation et Rechargement Lents (3+ secondes)

### Symptômes
- Les pages mettent 3 secondes ou plus à compiler en mode développement
- Le rechargement après modification est très lent
- L'expérience de développement est dégradée
- Le serveur consomme beaucoup de mémoire

### Causes Communes
1. **Cache désactivé** : `cache: 'no-store'` désactive complètement le cache Next.js
2. **generateStaticParams en dev** : Pré-génère toutes les routes même en développement
3. **Pas d'optimisation des imports** : Les packages ne sont pas tree-shakés
4. **Compilateur standard** : N'utilise pas Turbopack (5-10x plus rapide)

### Solutions Implémentées

#### ✅ 1. Utiliser Turbopack

**Commande** :
```bash
npm run dev
```

Turbopack est maintenant activé par défaut. Si problème, utilisez :
```bash
npm run dev:normal  # Fallback sans Turbopack
```

#### ✅ 2. Cache avec Revalidation

Le cache est maintenant activé avec revalidation de 60 secondes :
```typescript
fetch('/api/articles', {
  next: { revalidate: 60 }  // ✅ Cache intelligent
})
```

**Note** : Les changements peuvent prendre jusqu'à 60s à apparaître. Pour un refresh immédiat : `Ctrl+Shift+R`

#### ✅ 3. generateStaticParams Optimisé

Désormais désactivé en développement :
```typescript
if (process.env.NODE_ENV === 'development') {
  return []  // Pas de pré-génération en dev
}
```

#### ✅ 4. Optimisation des Imports

Les packages sont maintenant tree-shakés automatiquement (voir `next.config.ts`).

### Vérification

Après les optimisations, vous devriez voir :
- ✅ Compilation < 500ms
- ✅ Rechargement avec cache < 100ms
- ✅ Messages "Compiled in XXXms" très rapides

### Documentation Complète

Pour plus de détails : [docs/performance-optimization.md](/docs/performance-optimization.md)

---

## Problème : Erreur "Objects are not valid as a React child"

### Symptômes
- Erreur dans la console : `Error: Objects are not valid as a React child (found: object with keys {id, name, slug, description, createdAt, updatedAt})`
- La page ne s'affiche pas correctement ou crash
- L'erreur apparaît généralement sur les pages affichant des articles

### Cause
Cette erreur se produit lorsqu'on essaie de rendre directement un objet JavaScript dans React au lieu d'une valeur primitive (string, number, etc.).

Dans notre cas, cela arrive le plus souvent avec **`article.category`** qui est un **objet `Category`**, pas une string.

### Solution

#### ❌ Code incorrect
```typescript
<Badge>
  {article.category}  {/* ❌ ERREUR : c'est un objet ! */}
</Badge>
```

#### ✅ Code correct
```typescript
<Badge>
  {article.category?.name || 'Non catégorisé'}  {/* ✅ Utiliser .name */}
</Badge>
```

### Structure de l'objet Category

```typescript
interface Category {
  id: number;
  name: string;        // ← Utilisez cette propriété pour l'affichage
  slug: string;
  description: string | null;
  createdAt: string;
  updatedAt: string;
}
```

### Exemples de correction

#### Dans une page article
```typescript
// src/app/blog/[slug]/page.tsx
<Badge color="blue" variant="light" size="lg">
  {article.category?.name || 'Non catégorisé'}
</Badge>
```

#### Dans une liste d'articles
```typescript
// src/components/ArticleCard.tsx
{article.category && (
  <Badge>{article.category.name}</Badge>
)}
```

#### Avec lien vers la catégorie
```typescript
{article.category && (
  <Link href={`/blog/category/${article.category.slug}`}>
    {article.category.name}
  </Link>
)}
```

### Prévention

1. **Toujours utiliser `category.name`** pour afficher le nom de la catégorie
2. **Utiliser l'opérateur optional chaining** (`?.`) car `category` peut être `null`
3. **Prévoir un fallback** avec l'opérateur OR (`||`) pour les articles sans catégorie
4. **Consulter la documentation** : [src/lib/articles/README.md](/src/lib/articles/README.md#-abstraction-de-la-propriété-category)

### Autres cas similaires

Cette erreur peut aussi se produire avec d'autres objets :

```typescript
// ❌ Incorrect
{article.tags}           // tags est un tableau
{article.publishedAt}    // OK si c'est une string, mais si c'est une Date...
{article}                // L'objet complet

// ✅ Correct
{article.tags.join(', ')}
{formatDate(article.publishedAt)}
{JSON.stringify(article)}  // Pour débogage uniquement
```

### Débogage

Pour identifier rapidement quel objet cause le problème :

```typescript
console.log('Article data:', article);
console.log('Category:', article.category);
console.log('Category type:', typeof article.category);
```

---

## Problème : Mise à jour d'articles non visible après modification

### Symptômes
- Les modifications d'articles sont bien sauvegardées en base de données
- Le formulaire d'édition affiche les bonnes données
- Mais après un refresh de la page, les modifications ne sont pas visibles
- Les données semblent "en cache" côté client

### Cause
Le composant `EditArticleClientPage` ne recharge pas automatiquement les données après une mise à jour. Les données sont mises en cache dans le state React et ne sont pas rafraîchies.

### Solution implémentée

#### 1. Callback de rafraîchissement
Ajout d'une prop `onArticleUpdated` au composant `ArticleForm` qui est appelée après une mise à jour réussie.

```typescript
// ArticleForm.tsx
interface ArticleFormProps {
    // ... autres props
    onArticleUpdated?: () => void;
}

// Dans handleSubmit, après une mise à jour réussie
if (isEditing && onArticleUpdated) {
    onArticleUpdated();
}
```

#### 2. Fonction de rechargement
Extraction de la logique de chargement dans une fonction `fetchArticle` avec `useCallback` pour éviter les re-renders inutiles.

```typescript
// EditArticleClientPage.tsx
const fetchArticle = useCallback(async () => {
    // Logique de chargement des données
}, [articleId]);

useEffect(() => {
    fetchArticle();
}, [articleId, fetchArticle]);
```

#### 3. Bouton de rafraîchissement manuel
Ajout d'un bouton "Actualiser" pour permettre un rechargement manuel des données.

```typescript
<Button
    variant="outline"
    leftSection={<IconRefresh size={16} />}
    onClick={fetchArticle}
    loading={loading}
>
    Actualiser
</Button>
```

### Comment tester la solution

1. **Modifier un article** :
   - Aller sur `/admin/articles`
   - Cliquer sur "Modifier" pour un article
   - Changer le titre, le contenu, ou d'autres champs
   - Sauvegarder

2. **Vérifier la persistance** :
   - Les données doivent être immédiatement visibles dans le formulaire
   - Cliquer sur "Actualiser" pour recharger depuis la base
   - Les modifications doivent être conservées

3. **Vérifier la cohérence** :
   - Aller sur la liste des articles (`/admin/articles`)
   - Les modifications doivent être visibles dans la liste
   - Revenir sur l'édition, les données doivent être à jour

### Prévention

Pour éviter ce type de problème à l'avenir :

1. **Toujours recharger les données** après une modification
2. **Utiliser des callbacks** pour communiquer entre composants
3. **Implémenter un système de cache** intelligent si nécessaire
4. **Tester les flux de données** complets (CRUD)

### Alternatives possibles

#### 1. State Management global
Utiliser Redux, Zustand, ou Context API pour gérer l'état global des articles.

#### 2. Optimistic Updates
Mettre à jour l'état local immédiatement, puis synchroniser avec le serveur.

#### 3. Real-time updates
Utiliser WebSockets ou Server-Sent Events pour les mises à jour en temps réel.

### Logs de débogage

Pour diagnostiquer le problème :

```typescript
// Dans fetchArticle
console.log('Fetching article:', articleId);
console.log('Article data:', articleData);

// Dans handleSubmit
console.log('Article updated:', result);
console.log('Calling onArticleUpdated callback');
```

### Vérification de la base de données

Utiliser Drizzle Studio pour vérifier que les données sont bien persistées :

```bash
npm run db:studio
```

Ouvrir l'interface et vérifier la table `articles` pour confirmer que les modifications sont bien sauvegardées.
