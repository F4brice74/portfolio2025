# Ossawayas - Vitrine Agence IA & Automatisation

Site vitrine professionnel pour une agence d'automatisation IA destinée aux TPE et PME.

## 🚀 Démarrage rapide

```bash
# Installation des dépendances
npm install

# Développement
npm run dev

# Build de production
npm run build

# Démarrer en production
npm start
```

Le site sera accessible sur [http://localhost:3000](http://localhost:3000)

## 📐 Architecture

Le site est une Single Page Application (SPA) avec navigation par ancres vers les différentes sections:

- **Header** - Navigation sticky avec logo et CTA
- **Hero Section** - H1, sous-titre, 2 CTA, badge social proof
- **Impact Metrics** - 4 chiffres clés en ligne
- **Offres** - 3 cartes (Diagnostic, Automatisation, Agent IA)
- **Processus** - 4 étapes horizontales du workflow
- **Cas d'usage** - 3 blocs avant/après
- **Témoignages** - Structure pour les retours clients (à compléter)
- **CTA Final** - Formulaire de contact
- **Footer** - Liens et informations

## 🎨 Design System

### Couleurs
- **Primary**: #3B82F6 (Bleu pour CTA)
- **Secondary**: #8B5CF6 (Violet accent)
- **Accent**: #10B981 (Vert pour social proof)
- **Background**: #FFFFFF
- **Text**: #1F2937

### Typographie
- **Police**: Inter
- **Titres**: Bold 700
- **Corps**: Regular 400, 16px
- **CTA**: Semibold 600

### Composants
- Border-radius: 12px (cartes), 8px (boutons)
- Ombres: `0 2px 12px rgba(0,0,0,0.06)`
- Espacement sections: 80px top/bottom

## 📁 Structure des fichiers

```
src/
├── app/
│   ├── page.tsx          # Page principale (landing)
│   ├── layout.tsx        # Layout global avec métadonnées SEO
│   └── globals.css       # Styles globaux et design system
├── components/
│   └── landing/          # Composants de la page d'accueil
│       ├── Header.tsx
│       ├── Hero.tsx
│       ├── ImpactMetrics.tsx
│       ├── OffersSection.tsx
│       ├── ProcessSection.tsx
│       ├── UseCasesSection.tsx
│       ├── TestimonialsSection.tsx
│       ├── FinalCTA.tsx
│       ├── ContactForm.tsx
│       └── Footer.tsx
└── ...
```

## ✅ Ce qui a été fait

- [x] Design system complet (couleurs, typographie, composants)
- [x] Création de tous les composants de la landing page
- [x] Hero section avec H1, sous-titre, 2 CTA, badge social proof
- [x] Section Offres avec 3 cartes (dont une mise en avant)
- [x] Section Processus avec 4 étapes horizontales
- [x] Section Cas d'usage avec 3 blocs avant/après
- [x] Section Témoignages (structure prête)
- [x] CTA Final avec formulaire de contact
- [x] Header sticky avec navigation
- [x] Footer avec liens
- [x] Responsive mobile/desktop
- [x] Métadonnées SEO optimisées

## 🔄 Prochaines étapes

### 1. Contenu
- [ ] Remplacer les témoignages placeholder par de vrais retours clients
- [ ] Compléter les chiffres d'impact avec des données réelles
- [ ] Ajouter des visuels/illustrations professionnelles

### 2. Fonctionnalités
- [ ] Intégrer un vrai service d'envoi d'email pour le formulaire de contact
  - Options: Resend, SendGrid, Formspree, ou API Route Next.js + Nodemailer
- [ ] Ajouter un calendrier de réservation (Calendly, Cal.com, ou custom)
- [ ] Implémenter Google Analytics ou alternative pour le tracking

### 3. Assets
- [ ] Créer/obtenir le logo Ossawayas (texte + icône robot/IA)
- [ ] Ajouter illustrations pour la hero section (flux automatisé)
- [ ] Optimiser les images et icônes
- [ ] Créer un favicon

### 4. SEO & Performance
- [ ] Configurer `metadataBase` dans les métadonnées
- [ ] Ajouter un sitemap.xml
- [ ] Optimiser les images avec next/image
- [ ] Configurer robots.txt
- [ ] Tester les Core Web Vitals

### 5. Déploiement
- [ ] Configurer les variables d'environnement pour la production
- [ ] Déployer sur Vercel ou autre plateforme
- [ ] Configurer le domaine ossawayas.com
- [ ] Tester en production

## 🛠️ Technologies

- **Framework**: Next.js 15.5.2 (App Router)
- **React**: 19.1.0
- **TypeScript**: 5
- **UI Library**: Mantine 8.2.8
- **Styling**: CSS personnalisé avec variables CSS

## 📖 Documentation de référence

- [Next.js Documentation](https://nextjs.org/docs)
- [Mantine UI](https://mantine.dev/)
- [PRD Notion](https://app.notion.com/p/PRD-Refonte-ossawayas-com-37a2fbad2a3b8164924ee654b8b76119)

## 🎯 Référence de design

Le design s'inspire de [artisan-ia.fr](https://artisan-ia.fr) :
- Style clair, simple, rassurant, professionnel
- Beaucoup d'espace blanc
- Pas de style "startup hype"
- Preuves sociales visibles

## 📝 Notes importantes

1. **Formulaire de contact** : Actuellement simulé côté client. Il faut implémenter l'envoi réel d'emails.
2. **Témoignages** : Section prête mais avec du contenu placeholder à remplacer.
3. **Blog existant** : Les anciennes pages blog/admin sont toujours présentes mais non liées à la page d'accueil. À conserver si besoin d'un blog futur.
4. **Middleware Clerk** : Clerk est désactivé sur la landing mais le code existe toujours si besoin de back-office.

## 📞 Contact

Pour toute question sur l'implémentation, consultez le PRD Notion ou les commentaires dans le code.
