# Installation du Backend NeoTravel

## 1. Cloner le projet

```bash
git clone <url-du-repository>
```

Entrer dans le dossier :

```bash
cd neotravel-backend
```

---

## 2. Installer les dépendances

```bash
npm install
```

---

## 3. Créer le fichier `.env`

Créer un fichier `.env` à la racine du backend.

Ajouter :

```env
SUPABASE_URL=VOTRE_URL_SUPABASE
SUPABASE_ANON_KEY=VOTRE_ANON_KEY_SUPABASE

MAIL_USER=VOTRE_ADRESSE_GMAIL
MAIL_PASS=VOTRE_MOT_DE_PASSE_APPLICATION

PORT=3000
```

---

## 4. Configuration Gmail

Pour permettre l'envoi automatique des devis :

* Activer la validation en deux étapes sur le compte Gmail.
* Générer un **mot de passe d'application**.
* Copier ce mot de passe dans `MAIL_PASS`.

⚠️ Le mot de passe du compte Gmail ne fonctionne pas.

---

## 5. Lancer le projet

```bash
npm run dev
```

Le terminal doit afficher :

```text
🚀 Server running on port 3000
```

---

## 6. Tester l'API

Les requêtes REST Client permettent de tester les endpoints.

Le principal est :

```http
POST /api/generate-quote
```

---

## 7. Génération des PDF

Les devis sont automatiquement enregistrés dans :

```
neotravel-backend/uploads/
```

Le dossier est créé automatiquement lors du premier devis.

---

## Commandes utiles

Installer les dépendances :

```bash
npm install
```

Lancer le serveur :

```bash
npm run dev
```

Compiler :

```bash
npm run build
```

Lancer la version compilée :

```bash
npm start
```

---

## Dépendances principales

* Express
* TypeScript
* Supabase
* Nodemailer
* PDF-lib
* fs-extra
* dotenv

---

## Vérification

L'installation est correcte si :

* le serveur démarre ;
* la connexion à Supabase fonctionne ;
* un appel à `/api/generate-quote` :

  * crée les données en base ;
  * génère un PDF ;
  * envoie le devis par email.

---

## Remarques

* Le dossier `uploads/` est créé automatiquement.
* Le dossier `uploads/` ne doit pas être versionné.
* Le fichier `.env` ne doit jamais être versionné sur GitHub.
* Vérifier que les clés Supabase et Gmail sont correctement renseignées avant le lancement.
