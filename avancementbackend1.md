# 🚀 Avancement du Backend NeoTravel

Bonjour à tous,

Petit point sur l'avancement du backend afin que tout le monde sache où on en est.

---

# ✅ 1. Initialisation du projet

Le projet backend a été créé avec :

- Node.js
- TypeScript
- Express
- Supabase
- Dotenv
- CORS

L'architecture du projet a également été mise en place.

Structure actuelle :

src/
├── config/
├── controllers/
├── mail/
├── middlewares/
├── pdf/
├── routes/
├── services/
├── types/
├── utils/
├── app.ts
└── server.ts

Cette architecture permet de séparer les responsabilités et de garder un projet propre.

---

# ✅ 2. Connexion à Supabase

Le backend est désormais connecté à notre projet Supabase.

Les variables d'environnement (.env) ont été configurées avec :

- URL du projet Supabase
- Clé API (Publishable Key)

Une connexion unique est créée dans :

src/config/supabase.ts

Tous les services utiliseront cette connexion.

---

# ✅ 3. Base de données

Les tables ont été créées dans Supabase.

Tables actuelles :

## Leads

Représente un prospect (personne demandant un devis).

Champs :

- id
- nom
- email
- telephone
- created_at

---

## Trips

Représente une demande de transport.

Champs :

- id
- lead_id
- depart
- arrivee
- date_trajet
- nb_passagers
- special_request
- special_request_comment
- status
- created_at

---

## Quotes

Représente le devis généré.

Champs :

- id
- trip_id
- quote_number
- prix
- pdf_url
- created_at

---

# ✅ 4. UML

La conception est terminée.

Nous avons :

- MCD
- MLD
- Diagramme de séquence principal

Ces documents serviront également pour le rapport.

---

# ✅ 5. Première API développée

La première fonctionnalité complète du backend est terminée.

Création d'un Lead (Prospect).

Architecture utilisée :

POST /api/leads

↓

Route

↓

Controller

↓

Service

↓

Supabase

---

## Route

Le fichier :

routes/lead.routes.ts

déclare l'endpoint :

POST /api/leads

---

## Controller

Le controller récupère les données envoyées par le frontend et appelle le service.

Il est responsable de la réponse HTTP.

---

## Service

Le service contient la logique métier.

Il communique directement avec Supabase afin d'insérer un nouveau Lead dans la base de données.

---

## Types

Une interface TypeScript "Lead" a été créée afin de typer les données dans toute l'application.

---

# ✅ 6. Tests

Les tests sont réalisés avec l'extension REST Client de VS Code.

Premier endpoint testé :

POST /api/leads

Exemple de requête :

{
    "nom": "Jean Dupont",
    "email": "jean@email.com",
    "telephone": "0601020304"
}

Résultat :

- Lead enregistré dans Supabase
- Réponse HTTP 201 Created
- Retour des informations créées

Le backend communique donc correctement avec la base de données.

---

# ✅ 7. Sécurité Supabase

Les tables utilisent Row Level Security (RLS).

Des Policies ont été ajoutées afin d'autoriser les opérations nécessaires pendant le développement.

---

# 📌 Où nous en sommes

Aujourd'hui, nous savons :

✔ créer un Lead

Le prochain objectif sera de créer :

- les Trips
- les Quotes
- le calculateur de devis
- la génération du PDF
- l'envoi automatique du devis par email

---

# 🎯 Objectif final

Le parcours complet sera :

Landing Page

↓

Chatbot Neo

↓

Qualification du besoin

↓

Création du Lead

↓

Création du Trip

↓

Calcul du devis

↓

Création du Quote

↓

Génération du PDF

↓

Envoi du devis par email

↓

(Plus tard : Dashboard + relances automatiques via n8n)
