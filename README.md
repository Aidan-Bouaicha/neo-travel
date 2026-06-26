# 🚍 NeoTravel Backend

Backend REST développé avec **Node.js**, **Express** et **TypeScript** permettant de générer automatiquement des devis de transport en autocar.

---

# Fonctionnalités

* Création des prospects (Leads)
* Création des trajets (Trips)
* Calcul automatique des devis
* Génération automatique des PDF
* Envoi automatique des devis par email
* API REST prête à être consommée par le frontend

---

# Technologies

* Node.js
* Express
* TypeScript
* Supabase
* Nodemailer
* PDF-lib
* REST Client

---

# Architecture

```
src/
│
├── config/
├── controllers/
├── routes/
├── services/
├── types/
├── app.ts
└── server.ts
```

---

# Base de données

Le projet utilise Supabase avec trois tables principales :

* Leads
* Trips
* Quotes

Les relations entre les tables sont gérées directement dans PostgreSQL.

---

# API disponible

| Méthode | Endpoint              | Description            |
| ------- | --------------------- | ---------------------- |
| POST    | `/api/leads`          | Création d'un prospect |
| POST    | `/api/trips`          | Création d'un trajet   |
| POST    | `/api/quotes`         | Création d'un devis    |
| POST    | `/api/generate-quote` | Workflow complet       |

---

# Workflow

```
Client

↓

Lead

↓

Trip

↓

Calcul du devis

↓

Quote

↓

PDF

↓

Email
```

---

# Installation

Voir le fichier **INSTALL.md**

---

# Statut

Backend MVP terminé.

Le projet est prêt à être connecté au frontend.

---

# Équipe

Projet réalisé dans le cadre de NeoTravel.
