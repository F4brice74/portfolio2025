# Guide de Dépannage

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
