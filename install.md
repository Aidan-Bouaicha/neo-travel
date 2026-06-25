# Installation du projet NeoTravel Backend

## 1. Cloner le projet

```bash
git clone <url-du-repository>
```

Puis entrer dans le projet :

```bash
cd neotravel-backend
```

---

# 2. Installer les dépendances

Installer tous les packages nécessaires :

```bash
npm install
```

Cela installera automatiquement toutes les dépendances définies dans le `package.json`.

---

# 3. Créer le fichier `.env`

Créer un fichier `.env` à la racine du projet.

Ajouter les variables suivantes :

```env
SUPABASE_URL=VOTRE_URL_SUPABASE
SUPABASE_ANON_KEY=VOTRE_ANON_KEY_SUPABASE

PORT=3000
```

Les clés Supabase sont disponibles dans :

```
Supabase
→ Project Settings
→ API
```

---

# 4. Vérifier la connexion Supabase

Lancer le serveur :

```bash
npm run dev
```

Le terminal doit afficher :

```text
🚀 Server running on port 3000
```

---

# 5. Tester l'API

Le projet contient des fichiers REST Client permettant de tester les endpoints.

Exemple :

```http
POST /api/generate-quote
```

---

# 6. Génération des PDF

Les devis PDF sont automatiquement enregistrés dans :

```
neotravel-backend/uploads/
```

Le dossier est créé automatiquement au premier devis.

---

# Commandes utiles

Installer les dépendances :

```bash
npm install
```

Lancer le serveur :

```bash
npm run dev
```

Compiler le projet :

```bash
npm run build
```

Lancer la version compilée :

```bash
npm start
```

---

# Dépendances principales

Le projet utilise notamment :

* Express
* TypeScript
* Supabase
* pdf-lib
* fs-extra
* dotenv
* cors

Toutes les dépendances sont installées automatiquement avec :

```bash
npm install
```

---

# Vérification

Le backend est correctement installé si les endpoints suivants fonctionnent :

* `POST /api/leads`
* `POST /api/trips`
* `POST /api/quotes`
* `POST /api/generate-quote`

Les données doivent être enregistrées dans Supabase et un fichier PDF doit être généré dans le dossier `uploads`.

---

# Remarques

* Le dossier `uploads/` est créé automatiquement lors de la génération du premier devis.
* Le fichier `.env` ne doit jamais être versionné sur GitHub.
* Avant de lancer le projet, vérifier que les clés Supabase sont correctement renseignées.
