# 🗺️ Roadmap Portfolio 2025

## Vue d'ensemble du projet

```
┌─────────────────────────────────────────────────────────────────┐
│                    PORTFOLIO 2025                                │
│          Portfolio Personnel + Blog + Admin CMS                  │
│                                                                   │
│  Phase 1: Portfolio  │  Phase 2: Blog    │  Phase 3: Admin      │
│      [████░░] 70%    │   [████████] 85%  │   [███████░] 75%     │
└─────────────────────────────────────────────────────────────────┘
```

---

## 📅 Timeline & Phases

### ✅ Phase 1 - Setup & Foundation (Semaines 1) - 70% COMPLÉTÉ

**Statut**: Infrastructure en place, portfolio basique manquant

```
✅ Setup projet Next.js + TypeScript
✅ Configuration Mantine UI + Dark mode
✅ Routing et navigation
✅ Déploiement Vercel
🟡 Portfolio homepage (intro basique)
❌ Hero section dédiée
❌ About page
❌ Portfolio projets
❌ Contact form
```

**Reste à faire**:
- Créer sections portfolio complètes (Hero, About, Projets, Contact)
- Ajouter animations et transitions
- Optimiser images et performance

---

### ✅ Phase 2 - Blog System (Semaines 2-4) - 85% COMPLÉTÉ

**Statut**: Blog fonctionnel, manque gestion images

```
✅ Base de données NeonDB + Drizzle
✅ Schéma articles/categories/tags
✅ API publique (/api/articles)
✅ Page liste articles + pagination
✅ Page article individuelle
✅ Filtrage par catégorie
✅ Design responsive
✅ ISR (Incremental Static Regeneration)
🟡 SEO basique (meta tags)
❌ Upload d'images (Cloudinary)
❌ SEO avancé (sitemap, structured data)
❌ Recherche full-text
```

**Reste à faire**:
- Intégrer Cloudinary pour images
- Générer sitemap.xml dynamique
- Ajouter structured data (JSON-LD)
- Implémenter recherche

---

### ✅ Phase 3 - Admin CMS (Semaines 5-6) - 75% COMPLÉTÉ

**Statut**: Admin fonctionnel, éditeur basique

```
✅ Authentification Clerk
✅ Protection routes admin
✅ Dashboard avec stats
✅ CRUD articles complet
✅ Workflow draft/publish
✅ Tests E2E sécurité
🟡 Éditeur Textarea + Markdown
❌ WYSIWYG riche (Tiptap/TinyMCE)
❌ Upload d'images dans admin
❌ Bibliothèque d'images
❌ Preview en temps réel
```

**Reste à faire**:
- Intégrer éditeur WYSIWYG (Tiptap)
- Créer interface upload d'images
- Ajouter preview Markdown
- Améliorer UX admin

---

## 🎯 Sprints à Venir

### 🔴 Sprint 1 - Image Management (1-2 semaines) - PRIORITÉ HAUTE

**Objectif**: US-008 - Upload et gestion d'images

```
Tâches:
[ ] 1. Créer compte Cloudinary (free tier)
[ ] 2. Configurer env vars (CLOUDINARY_*)
[ ] 3. Installer cloudinary SDK
[ ] 4. Créer API /api/admin/images
    [ ] POST - Upload image
    [ ] GET - Liste images
    [ ] DELETE - Supprimer image
[ ] 5. Créer composant ImageUploader
    [ ] Drag & drop
    [ ] Preview
    [ ] Progress bar
[ ] 6. Intégrer dans ArticleForm
    [ ] Sélecteur featured image
    [ ] Insertion inline dans contenu
[ ] 7. Tests E2E upload
[ ] 8. Documentation

Estimation: 8-12 jours
Impact: 🔥 HIGH - Bloque création contenu avec images
```

---

### 🔴 Sprint 2 - Rich Text Editor (1 semaine) - PRIORITÉ HAUTE

**Objectif**: Améliorer expérience d'édition

```
Tâches:
[ ] 1. Choisir éditeur (Tiptap recommandé)
[ ] 2. Installer dépendances
[ ] 3. Créer RichTextEditor component
    [ ] Extensions: Bold, Italic, Lists, Links
    [ ] Heading levels
    [ ] Code blocks
    [ ] Images inline
[ ] 4. Remplacer Textarea dans ArticleForm
[ ] 5. Ajouter preview Markdown
[ ] 6. Styles personnalisés Mantine
[ ] 7. Tests
[ ] 8. Documentation

Estimation: 5-7 jours
Impact: 🔥 HIGH - Améliore productivité édition
```

---

### 🟡 Sprint 3 - Portfolio Sections (1-2 semaines) - PRIORITÉ MOYENNE

**Objectif**: US-001 - Compléter portfolio

```
Tâches:
[ ] 1. Hero Section
    [ ] Design compelling
    [ ] Photo professionnelle
    [ ] CTA buttons
    [ ] Animations scroll
[ ] 2. About Page
    [ ] Bio détaillée
    [ ] Skills avec icônes
    [ ] Timeline expérience
[ ] 3. Projects Portfolio
    [ ] Cards projets
    [ ] Images + descriptions
    [ ] Links demo/GitHub
    [ ] Filtres par techno
[ ] 4. Contact Section
    [ ] Formulaire validation
    [ ] Email delivery (Resend/SendGrid)
    [ ] Liens sociaux
[ ] 5. Footer complet
[ ] 6. Responsive + animations

Estimation: 8-12 jours
Impact: 🟡 MEDIUM - Important pour présentation pro
```

---

### 🟡 Sprint 4 - SEO & Search (1 semaine) - PRIORITÉ MOYENNE

**Objectif**: Optimiser découvrabilité

```
Tâches:
[ ] 1. Sitemap.xml dynamique
    [ ] Route /sitemap.xml
    [ ] Générer depuis DB
    [ ] Update auto
[ ] 2. Structured Data
    [ ] JSON-LD pour articles
    [ ] Schema.org BlogPosting
    [ ] Author info
[ ] 3. OpenGraph complet
    [ ] OG tags par article
    [ ] Twitter Cards
    [ ] Images preview
[ ] 4. Recherche Full-text
    [ ] Barre recherche header
    [ ] API endpoint search
    [ ] Page résultats
    [ ] Highlighting
[ ] 5. Tests Lighthouse
    [ ] Score SEO 90+
    [ ] Performance
    [ ] Accessibility

Estimation: 5-7 jours
Impact: 🟡 MEDIUM - Important pour traffic organique
```

---

### 🔵 Sprint 5 - Advanced Features (1 semaine) - PRIORITÉ BASSE

**Objectif**: Polish et features bonus

```
Tâches:
[ ] 1. Navigation articles
    [ ] Prev/Next buttons
    [ ] Articles similaires
    [ ] Breadcrumb amélioré
[ ] 2. Social Sharing
    [ ] Boutons Twitter/LinkedIn
    [ ] Share counts (optionnel)
[ ] 3. Analytics
    [ ] Google Analytics / Plausible
    [ ] Event tracking
    [ ] Dashboard analytics admin
[ ] 4. Performance
    [ ] Image lazy loading
    [ ] Bundle optimization
    [ ] Cache headers
[ ] 5. Monitoring
    [ ] Sentry error tracking
    [ ] Performance monitoring
    [ ] Uptime checks

Estimation: 5-7 jours
Impact: 🔵 LOW - Nice to have
```

---

## 📊 Métriques de Succès

### Phase 2 - Blog (Actuel)
- ✅ Temps chargement < 2s
- ✅ Responsive 100% mobile
- ✅ 0 erreurs console
- 🟡 Score Lighthouse SEO: 60/100 (target: 90+)
- ❌ Images optimisées auto (TODO)

### Phase 3 - Admin (Actuel)
- ✅ Auth 100% sécurisée
- ✅ CRUD complet fonctionnel
- ✅ Tests E2E passent
- 🟡 UX éditeur: 6/10 (target: 9/10)
- ❌ Upload images (TODO)

### Objectifs Finaux
- [ ] Score Lighthouse: 90+ (SEO, Performance, Accessibility)
- [ ] Temps chargement homepage: < 1.5s
- [ ] Mobile-first 100%
- [ ] Zero erreurs console
- [ ] Coverage tests: 80%+

---

## 🚀 Timeline Globale

```
Mois 1          Mois 2          Mois 3
│               │               │
├─ Phase 1 ✅   ├─ Sprint 3     ├─ Sprint 5
├─ Phase 2 ✅   │   Portfolio   │   Polish
├─ Phase 3 ✅   │               │
│               ├─ Sprint 4     └─ LAUNCH 🎉
├─ Sprint 1     │   SEO/Search
│   Images 🔥   │
│               │
├─ Sprint 2     │
│   Editor 🔥   │
│               │
```

**Date estimée de lancement complet**: +6-8 semaines

---

## 🎨 Stack Technique

### Frontend
- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript (strict mode)
- **UI**: Mantine UI v8
- **Styling**: CSS Modules + Mantine theme
- **State**: React hooks (minimal global state)
- **Forms**: Mantine useForm
- **Icons**: Tabler Icons

### Backend
- **Database**: NeonDB (PostgreSQL serverless)
- **ORM**: Drizzle ORM
- **API**: Next.js API Routes
- **Auth**: Clerk
- **Images**: Cloudinary (TODO)
- **Email**: Resend/SendGrid (TODO)

### DevOps
- **Hosting**: Vercel
- **CI/CD**: Vercel auto-deploy
- **Tests**: Playwright (E2E)
- **Linting**: ESLint + Prettier
- **Git hooks**: Husky
- **Monitoring**: TODO (Sentry)

---

## 📝 Checklist Avant Production

### 🔴 Critiques
- [ ] Upload d'images fonctionnel
- [ ] WYSIWYG editor performant
- [ ] Portfolio sections complètes
- [ ] SEO optimisé (sitemap, meta, structured data)
- [ ] Recherche fonctionnelle
- [ ] Tests E2E complets
- [ ] Performance Lighthouse 90+

### 🟡 Importantes
- [ ] Analytics configuré
- [ ] Monitoring erreurs (Sentry)
- [ ] Email contact fonctionnel
- [ ] Social sharing buttons
- [ ] Prev/Next navigation
- [ ] Articles similaires
- [ ] Backup DB automatique

### 🔵 Bonus
- [ ] Commentaires articles
- [ ] Newsletter subscription
- [ ] RSS feed
- [ ] Système de tags avancé
- [ ] A/B testing
- [ ] Dark mode animations

---

## 🔗 Liens Utiles

- **Repository**: (à ajouter)
- **Production**: (à ajouter)
- **Staging**: (à ajouter)
- **Documentation**: `/docs`
- **API Docs**: `/docs/api-endpoints.md`
- **DB Schema**: `/docs/database-architecture.md`

---

**Dernière mise à jour**: Octobre 2025  
**Maintenu par**: Fabrice MIQUET-SAGE

