# 🔐 Configuration de l'Accès Admin

## Objectif

Restreindre l'accès à l'administration (`/admin`) à **votre seul compte Google**.

Par défaut, après la mise en place de Clerk, **n'importe qui peut créer un compte et accéder à l'admin**. Ce guide vous montre comment autoriser uniquement votre compte.

---

## ✅ Méthode Recommandée : Par Email

### 1. **Ajouter votre email dans les variables d'environnement**

#### En local (.env.local)
```bash
# Ajouter cette ligne dans .env.local
ADMIN_EMAIL=votre.email@gmail.com
```

#### En production (Vercel)
1. Aller sur [vercel.com](https://vercel.com)
2. Sélectionner votre projet
3. Aller dans **Settings** → **Environment Variables**
4. Ajouter :
   - **Name**: `ADMIN_EMAIL`
   - **Value**: `votre.email@gmail.com`
   - **Environment**: Cocher Production, Preview, Development
5. Cliquer sur **Save**
6. **Redéployer** le projet

### 2. **Tester**

1. Se connecter avec votre compte Google → ✅ Accès admin
2. Se connecter avec un autre compte → ❌ Message "Accès refusé"

---

## 🔒 Méthode Alternative : Par User ID Clerk

Plus sécurisé mais nécessite une étape supplémentaire.

### 1. **Récupérer votre User ID**

1. Se connecter une première fois sur votre site
2. Aller sur [dashboard.clerk.com](https://dashboard.clerk.com)
3. Aller dans **Users**
4. Cliquer sur votre compte
5. Copier votre **User ID** (format : `user_xxxxxxxxxxxxxxxxxxxxx`)

### 2. **Configurer**

#### En local (.env.local)
```bash
ADMIN_USER_ID=user_xxxxxxxxxxxxxxxxxxxxx
```

#### En production (Vercel)
Même procédure que pour l'email mais avec `ADMIN_USER_ID`

---

## 🚨 Configuration Actuelle

Le système est déjà en place dans le code. Il attend juste que vous configuriez **l'une des deux variables** :

```typescript
// src/lib/auth/admin-check.ts
const ADMIN_EMAILS = [
  process.env.ADMIN_EMAIL,        // ← Ajoutez votre email ici
];

const ADMIN_USER_IDS = [
  process.env.ADMIN_USER_ID,      // ← OU votre User ID ici
];
```

---

## 🧪 Tests

### Test 1 : Accès autorisé
```bash
# Vous connecter avec votre compte Google
1. Aller sur /admin
2. Vous devriez voir le dashboard admin ✅
```

### Test 2 : Accès refusé
```bash
# Se connecter avec un autre compte (ou demander à quelqu'un)
1. Aller sur /admin
2. Devrait afficher "Accès refusé" ❌
```

### Test 3 : API protégées
```bash
# Sans être admin
curl https://votre-site.com/api/admin/articles
# Devrait retourner: {"error":"Forbidden: Admin access required"}
```

---

## 🔧 Configuration Clerk (Important)

### Désactiver les inscriptions publiques

Pour empêcher n'importe qui de créer un compte :

1. Aller sur [dashboard.clerk.com](https://dashboard.clerk.com)
2. **User & Authentication** → **Email, Phone, Username**
3. Désactiver **"Allow sign up"** si vous voulez être le seul à pouvoir vous connecter

OU

### Limiter aux domaines Gmail spécifiques
1. **User & Authentication** → **Restrictions**
2. Activer **Email address restrictions**
3. Ajouter votre email exact

---

## 📋 Checklist Avant Production

- [ ] Variable `ADMIN_EMAIL` configurée en local
- [ ] Variable `ADMIN_EMAIL` configurée sur Vercel
- [ ] Testé : votre compte Google → accès admin ✅
- [ ] Testé : autre compte → accès refusé ❌
- [ ] Testé : API `/api/admin/articles` protégée
- [ ] (Optionnel) Inscriptions désactivées dans Clerk

---

## 🆘 Dépannage

### Problème : Même mon compte est refusé

**Vérifier** :
1. Variable d'environnement bien définie : `echo $ADMIN_EMAIL`
2. Email correspond exactement (attention aux majuscules)
3. Redémarrer le serveur dev : `npm run dev`
4. Vider le cache du navigateur

### Problème : Autre personne peut toujours accéder

**Vérifier** :
1. Code bien déployé en production
2. Variable d'environnement bien sur Vercel
3. Projet redéployé après ajout de la variable
4. Vérifier les logs Vercel pour erreurs

### Debug : Voir quel email est détecté

Ajouter temporairement dans `src/app/admin/layout.tsx` :
```typescript
console.log('User email detected:', userEmail);
console.log('Admin email expected:', process.env.ADMIN_EMAIL);
```

---

## 🔄 Pour Ajouter d'Autres Admins (Futur)

Si vous voulez ajouter d'autres personnes plus tard :

### Modifier `src/lib/auth/admin-check.ts`
```typescript
const ADMIN_EMAILS = [
  process.env.ADMIN_EMAIL,
  'admin2@example.com',    // ← Ajouter ici
  'admin3@example.com',
].filter(Boolean) as string[];
```

OU utiliser plusieurs variables d'environnement :
```bash
ADMIN_EMAIL=vous@gmail.com
ADMIN_EMAIL_2=collegue@gmail.com
```

---

**Date**: Octobre 2025  
**Auteur**: Configuration pour portfolio2025

