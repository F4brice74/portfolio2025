# Workflow Notion → Neon — Articles de blog

Guide pour rédiger les articles dans Notion afin qu’une automatisation puisse les synchroniser vers Neon DB (site ossawayas.com).

**Prérequis images :** les images sont uploadées sur Cloudinary *avant* la rédaction. Notion ne contient que des URLs permanentes.

---

## Database Notion « Articles blog »

| Propriété | Type | Exemple | Obligatoire |
|---|---|---|---|
| **Title** | Title | `IA : le développeur augmenté` | Oui |
| **Slug** | Text | `developpeur-augmente` | Oui |
| **Excerpt** | Text | 2–3 phrases SEO | Oui |
| **Category** | Select | `Développement` | Oui |
| **Tags** | Multi-select | `IA`, `Cursor` | Non |
| **Featured Image** | URL | `https://res.cloudinary.com/...` | Recommandé |
| **Status** | Status / Select | `Brouillon` → `Publié` | Oui |
| **Author** | Text | `Fabrice MIQUET-SAGE` | Non (défaut possible côté auto) |

### Notes

- **Featured Image** : idéalement **1600×840 px** (ratio 1.91:1) pour LinkedIn et les cartes blog. Sans image → OG brandé généré automatiquement.
- **Slug** : unique, kebab-case, sans accents ni espaces.
- **Category** : doit correspondre à une catégorie existante côté site.
- **readingTime** : ne pas gérer dans Notion — calculé par l’app (`content.length / 600`).

---

## Images Cloudinary

| Rôle | Où dans Notion | Format |
|---|---|---|
| **À la une** | Propriété `Featured Image` | URL Cloudinary, **1600×840** (ratio 1.91:1) |
| **Dans l’article** | Corps Markdown | `![légende](https://res.cloudinary.com/...)` |

**Interdit :** coller / uploader une image directement dans Notion (URLs temporaires qui expirent).

---

## Corps de page = contenu Markdown (GFM)

Le corps de la page Notion devient le champ `content` en base. Le renderer du site accepte Markdown GFM + HTML léger.

### À utiliser

- Titres `##` / `###` (pas de H1 — le Title de la page le fait déjà)
- Paragraphes, **gras**, *italique*, `code inline`
- Listes `-` et `1.`
- Citations `>`
- Blocs de code :

\`\`\`ts
const example = true
\`\`\`

- Liens `[texte](https://...)` ou liens internes `/factory/...`
- Images `![alt](https://res.cloudinary.com/...)`
- Tableaux simples si besoin
- Séparateurs `---`

### À éviter

- Colonnes, callouts complexes, embeds
- Mentions `@page`, databases inline
- Images collées depuis Notion
- Mise en page « fancy » Notion (non exportable proprement en Markdown)

---

## Workflow rédaction

1. Uploader les images sur Cloudinary (une à la une 1600×840 + éventuelles images inline).
2. Créer la page dans la database Notion.
3. Remplir les propriétés (Title, Slug, Excerpt, Category, Tags, Featured Image).
4. Rédiger le corps en Markdown plat.
5. Passer **Status → Publié** → l’automatisation pousse vers Neon.

---

## Payload attendu côté Neon

Équivalent du `CreateArticleDto` :

```json
{
  "title": "...",
  "slug": "...",
  "excerpt": "...",
  "content": "## Markdown GFM du corps de page...",
  "featuredImage": "https://res.cloudinary.com/...",
  "published": true,
  "categoryId": 1,
  "tags": ["IA", "Cursor"],
  "authorName": "Fabrice MIQUET-SAGE",
  "authorEmail": "contact@ossawayas.com"
}
```

- `content` = export Markdown du **corps uniquement** (sans le titre de page).
- `categoryId` = résolu depuis la propriété Category.
- `readingTime` = calculé côté application.

---

## Checklist avant « Publié »

- [ ] Slug unique, kebab-case
- [ ] Excerpt rempli (2–3 phrases)
- [ ] Category = valeur existante côté site
- [ ] Featured Image = URL Cloudinary 1600×840
- [ ] Images du corps = URLs Cloudinary uniquement
- [ ] Pas de H1 dans le corps
- [ ] Markdown simple uniquement (pas de blocs Notion non exportables)

---

## Références techniques (site)

| Fichier | Rôle |
|---|---|
| `src/lib/articles/types.ts` | Contrat `CreateArticleDto` / `Article` |
| `src/lib/db/schema.ts` | Schéma Neon (articles, tags, categories) |
| `src/components/MarkdownRenderer.tsx` | Rendu Markdown GFM |
| `src/lib/images.ts` | Transforms Cloudinary + OG 1200×630 |
| `docs/notion-articles-workflow.md` | Ce guide |
