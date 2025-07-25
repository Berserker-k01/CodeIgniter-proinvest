# Guide d'installation de ProInvest

Ce guide vous explique comment installer et configurer l'application ProInvest avec PostgreSQL et Prisma.

## Prérequis

- PHP 8.0 ou plus récent
- PostgreSQL 12 ou plus récent
- Node.js 14 ou plus récent
- npm 6 ou plus récent
- Composer (pour les dépendances PHP)

## Installation locale

### 1. Cloner le dépôt

```bash
git clone <votre-dépôt-git>
cd CodeIgniter-proinvest
```

### 2. Configurer l'environnement

Créez un fichier `.env` en copiant le fichier `.env.example` :

```bash
cp .env.example .env
```

Puis modifiez le fichier `.env` avec vos configurations :
- Mettez à jour l'URL de connexion à la base de données PostgreSQL
- Configurez les paramètres SMTP pour l'envoi d'emails
- Ajoutez vos clés d'API pour les passerelles de paiement

### 3. Installer les dépendances

```bash
# Installer les dépendances Node.js
npm install

# Installer les dépendances PHP (si nécessaire)
composer install
```

### 4. Configurer la base de données PostgreSQL

```bash
# Créer une nouvelle base de données PostgreSQL
createdb proinvest

# Générer le client Prisma
npx prisma generate

# Appliquer les migrations Prisma
npx prisma migrate deploy
```

### 5. Migration depuis MySQL (si nécessaire)

Si vous avez des données existantes dans une base de données MySQL, utilisez le script de migration :

```bash
# Installez les dépendances nécessaires pour la migration
npm install mysql2

# Modifiez les paramètres de connexion MySQL dans le fichier .env
# MYSQL_HOST=localhost
# MYSQL_USER=root
# MYSQL_PASSWORD=
# MYSQL_DATABASE=testproinvest2.2

# Lancez le script de migration
node migration/mysql-to-postgres.js
```

### 6. Démarrer le serveur local

```bash
php -S localhost:8000
```

### 7. Accéder à l'application

Ouvrez votre navigateur et accédez à http://localhost:8000

Identifiants par défaut :
- Email : admin@proinvest.com
- Mot de passe : 12345678

## Déploiement sur Render

### 1. Créez un compte sur Render

Inscrivez-vous sur [Render](https://render.com) et connectez votre compte GitHub.

### 2. Déployer à partir du Blueprint

1. Dans votre tableau de bord Render, cliquez sur "New" puis "Blueprint"
2. Sélectionnez votre dépôt GitHub contenant le projet ProInvest
3. Render détectera automatiquement le fichier `render.yaml` et configurera les services nécessaires

### 3. Configurer les variables d'environnement

Après la création des services, vérifiez et complétez les variables d'environnement :
- Render configure automatiquement DATABASE_URL
- Ajoutez les paramètres SMTP, clés d'API, etc.

### 4. Surveiller le déploiement

- Le déploiement initial peut prendre quelques minutes
- Render exécutera automatiquement les commandes de build spécifiées dans le fichier `render.yaml`
- Une fois le déploiement terminé, accédez à votre application via l'URL fournie par Render

## Structure du projet

```
CodeIgniter-proinvest/
├── application/          # Code source CodeIgniter
├── prisma/              # Configuration Prisma
│   └── schema.prisma    # Schéma de la base de données
├── migration/           # Scripts de migration
├── .env                 # Variables d'environnement (ne pas committer)
├── .env.example         # Exemple de variables d'environnement
├── render.yaml          # Configuration pour Render
└── Dockerfile           # Configuration Docker
```

## Résolution des problèmes courants

### Erreur de connexion à la base de données
- Vérifiez que PostgreSQL est en cours d'exécution
- Vérifiez les informations de connexion dans le fichier `.env`
- Assurez-vous que l'utilisateur PostgreSQL a les permissions nécessaires

### Client Prisma non trouvé
- Exécutez `npx prisma generate` pour générer le client Prisma

### Erreur lors du déploiement sur Render
- Vérifiez les logs de build dans l'interface Render
- Assurez-vous que toutes les variables d'environnement requises sont définies
