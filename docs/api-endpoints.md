# Documentation des API Endpoints

## Vue d'ensemble

Cette documentation décrit tous les endpoints API disponibles dans l'application de blog, organisés par fonctionnalité.

## Authentification

Tous les endpoints admin nécessitent une authentification Clerk valide.

### Headers requis
```http
Authorization: Bearer <clerk-token>
```

## Endpoints Articles

### 1. Lister tous les articles (Admin)

**Endpoint :** `GET /api/admin/articles`

**Description :** Récupère tous les articles avec leurs catégories et tags.

**Réponse :**
```json
{
  "articles": [
    {
      "id": 1,
      "title": "Introduction à Next.js 15",
      "slug": "introduction-nextjs-15",
      "excerpt": "Description courte...",
      "content": "Contenu complet...",
      "featuredImage": "https://example.com/image.jpg",
      "published": true,
      "publishedAt": "2024-01-15T10:00:00Z",
      "category": {
        "id": 1,
        "name": "Développement",
        "slug": "developpement"
      },
      "tags": ["Next.js", "React"],
      "authorName": "Fabrice MIQUET-SAGE",
      "authorEmail": "fabrice@example.com",
      "readingTime": 8,
      "createdAt": "2024-01-15T10:00:00Z",
      "updatedAt": "2024-01-15T10:00:00Z"
    }
  ]
}
```

### 2. Créer un nouvel article

**Endpoint :** `POST /api/admin/articles`

**Description :** Crée un nouvel article.

**Body :**
```json
{
  "title": "Mon nouvel article",
  "slug": "mon-nouvel-article",
  "excerpt": "Description courte de l'article",
  "content": "Contenu complet de l'article...",
  "category": "Développement",
  "tags": ["Next.js", "React", "TypeScript"],
  "featuredImage": "https://example.com/image.jpg",
  "published": true
}
```

**Réponse :**
```json
{
  "id": 2,
  "title": "Mon nouvel article",
  "slug": "mon-nouvel-article",
  "excerpt": "Description courte de l'article",
  "content": "Contenu complet de l'article...",
  "featuredImage": "https://example.com/image.jpg",
  "published": true,
  "publishedAt": "2024-01-15T10:00:00Z",
  "category": {
    "id": 1,
    "name": "Développement",
    "slug": "developpement"
  },
  "tags": ["Next.js", "React", "TypeScript"],
  "authorName": "Fabrice MIQUET-SAGE",
  "authorEmail": "fabrice@example.com",
  "readingTime": 5,
  "createdAt": "2024-01-15T10:00:00Z",
  "updatedAt": "2024-01-15T10:00:00Z"
}
```

**Codes de statut :**
- `201` : Article créé avec succès
- `400` : Données manquantes ou invalides
- `401` : Non authentifié
- `409` : Slug déjà existant
- `500` : Erreur serveur

### 3. Récupérer un article par ID

**Endpoint :** `GET /api/admin/articles/[id]`

**Description :** Récupère un article spécifique par son ID.

**Paramètres :**
- `id` (number) : ID de l'article

**Réponse :**
```json
{
  "id": 1,
  "title": "Introduction à Next.js 15",
  "slug": "introduction-nextjs-15",
  "excerpt": "Description courte...",
  "content": "Contenu complet...",
  "featuredImage": "https://example.com/image.jpg",
  "published": true,
  "publishedAt": "2024-01-15T10:00:00Z",
  "category": {
    "id": 1,
    "name": "Développement",
    "slug": "developpement"
  },
  "tags": ["Next.js", "React"],
  "authorName": "Fabrice MIQUET-SAGE",
  "authorEmail": "fabrice@example.com",
  "readingTime": 8,
  "createdAt": "2024-01-15T10:00:00Z",
  "updatedAt": "2024-01-15T10:00:00Z"
}
```

**Codes de statut :**
- `200` : Article trouvé
- `400` : ID invalide
- `401` : Non authentifié
- `404` : Article non trouvé
- `500` : Erreur serveur

### 4. Mettre à jour un article

**Endpoint :** `PUT /api/admin/articles/[id]`

**Description :** Met à jour un article existant.

**Paramètres :**
- `id` (number) : ID de l'article

**Body :**
```json
{
  "title": "Titre modifié",
  "slug": "titre-modifie",
  "excerpt": "Nouvelle description",
  "content": "Nouveau contenu...",
  "category": "Architecture",
  "tags": ["Docker", "Microservices"],
  "featuredImage": "https://example.com/new-image.jpg",
  "published": false
}
```

**Réponse :**
```json
{
  "id": 1,
  "title": "Titre modifié",
  "slug": "titre-modifie",
  "excerpt": "Nouvelle description",
  "content": "Nouveau contenu...",
  "featuredImage": "https://example.com/new-image.jpg",
  "published": false,
  "publishedAt": null,
  "category": {
    "id": 2,
    "name": "Architecture",
    "slug": "architecture"
  },
  "tags": ["Docker", "Microservices"],
  "authorName": "Fabrice MIQUET-SAGE",
  "authorEmail": "fabrice@example.com",
  "readingTime": 6,
  "createdAt": "2024-01-15T10:00:00Z",
  "updatedAt": "2024-01-15T11:30:00Z"
}
```

**Codes de statut :**
- `200` : Article mis à jour
- `400` : Données invalides
- `401` : Non authentifié
- `404` : Article non trouvé
- `409` : Slug déjà existant
- `500` : Erreur serveur

### 5. Supprimer un article

**Endpoint :** `DELETE /api/admin/articles/[id]`

**Description :** Supprime un article et tous ses tags associés.

**Paramètres :**
- `id` (number) : ID de l'article

**Réponse :**
```json
{
  "message": "Article deleted successfully"
}
```

**Codes de statut :**
- `200` : Article supprimé
- `400` : ID invalide
- `401` : Non authentifié
- `404` : Article non trouvé
- `500` : Erreur serveur

### 6. Publier/Dépublier un article

**Endpoint :** `PATCH /api/admin/articles/[id]/publish`

**Description :** Change le statut de publication d'un article.

**Paramètres :**
- `id` (number) : ID de l'article

**Body :**
```json
{
  "published": true
}
```

**Réponse :**
```json
{
  "id": 1,
  "title": "Introduction à Next.js 15",
  "slug": "introduction-nextjs-15",
  "published": true,
  "publishedAt": "2024-01-15T12:00:00Z",
  "message": "Article publié"
}
```

**Codes de statut :**
- `200` : Statut modifié
- `400` : ID invalide ou données manquantes
- `401` : Non authentifié
- `404` : Article non trouvé
- `500` : Erreur serveur

## Endpoints Publics (Futurs)

### 1. Articles publiés

**Endpoint :** `GET /api/articles`

**Description :** Récupère tous les articles publiés (sans authentification).

### 2. Article par slug

**Endpoint :** `GET /api/articles/[slug]`

**Description :** Récupère un article publié par son slug.

### 3. Articles par catégorie

**Endpoint :** `GET /api/articles/category/[categorySlug]`

**Description :** Récupère les articles d'une catégorie spécifique.

## Gestion des erreurs

### Format des erreurs
```json
{
  "error": "Description de l'erreur"
}
```

### Codes d'erreur courants

| Code | Description |
|------|-------------|
| 400 | Bad Request - Données invalides |
| 401 | Unauthorized - Authentification requise |
| 404 | Not Found - Ressource non trouvée |
| 409 | Conflict - Conflit (ex: slug existant) |
| 500 | Internal Server Error - Erreur serveur |

### Exemples d'erreurs

#### Slug déjà existant
```json
{
  "error": "Un article avec ce slug existe déjà"
}
```

#### Article non trouvé
```json
{
  "error": "Article not found"
}
```

#### Données manquantes
```json
{
  "error": "Missing required fields"
}
```

## Exemples d'utilisation

### JavaScript/Fetch
```javascript
// Créer un article
const response = await fetch('/api/admin/articles', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    title: 'Mon article',
    slug: 'mon-article',
    excerpt: 'Description',
    content: 'Contenu...',
    category: 'Développement',
    tags: ['Next.js'],
    published: true
  })
});

const article = await response.json();
```

### cURL
```bash
# Récupérer tous les articles
curl -X GET "http://localhost:3000/api/admin/articles" \
  -H "Authorization: Bearer <token>"

# Créer un article
curl -X POST "http://localhost:3000/api/admin/articles" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <token>" \
  -d '{
    "title": "Mon article",
    "slug": "mon-article",
    "excerpt": "Description",
    "content": "Contenu...",
    "category": "Développement",
    "published": true
  }'
```

## Sécurité

### Authentification
- Tous les endpoints admin nécessitent un token Clerk valide
- Les tokens sont vérifiés côté serveur
- Les sessions sont gérées par Clerk

### Validation
- Validation des données d'entrée
- Sanitisation des contenus
- Vérification des types et formats

### Autorisation
- Seuls les utilisateurs authentifiés peuvent accéder aux endpoints admin
- Pas de système de rôles (tous les utilisateurs authentifiés ont les mêmes droits)

## Rate Limiting

Actuellement, aucun rate limiting n'est implémenté. Pour la production, considérer :
- Limitation du nombre de requêtes par utilisateur
- Limitation du nombre de créations d'articles par jour
- Protection contre les attaques DDoS
