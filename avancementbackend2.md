# Avancement Backend - NeoTravel

## Objectif

Créer un backend REST permettant de générer automatiquement un devis de transport en autocar.

Le backend doit :

* enregistrer un prospect (Lead)
* enregistrer un trajet (Trip)
* calculer automatiquement le prix
* créer un devis (Quote)
* générer un PDF
* (à venir) envoyer le PDF par email

---

# Architecture

Le backend est développé avec :

* Node.js
* Express
* TypeScript
* Supabase (PostgreSQL)

L'architecture est organisée en couches :

```
src/
│
├── config/
├── controllers/
├── routes/
├── services/
├── types/
```

Chaque ressource possède :

* un Type
* un Service
* un Controller
* une Route

---

# Base de données Supabase

Trois tables ont été créées.

## Leads

Contient les informations du client.

```
id
nom
email
telephone
created_at
```

---

## Trips

Contient les informations du trajet.

```
id
lead_id
depart
arrivee
date_trajet
nb_passagers
aller_retour
distance_km
special_request
special_request_comment
status
created_at
```

Ajouts réalisés :

* aller_retour
* distance_km

---

## Quotes

Contient les devis.

```
id
trip_id
quote_number
prix
pdf_url
created_at
```

---

# API développée

## Lead

```
POST /api/leads
```

Permet de créer un nouveau prospect.

---

## Trip

```
POST /api/trips
```

Permet de créer un trajet lié à un Lead.

---

## Quote

```
POST /api/quotes
```

Permet de créer un devis à partir d'un trajet existant.

---

## Endpoint principal

```
POST /api/generate-quote
```

C'est l'endpoint qui sera utilisé par le chatbot / frontend.

Il réalise automatiquement :

```
Création du Lead
        ↓
Création du Trip
        ↓
Calcul du prix
        ↓
Création du Quote
        ↓
Génération du PDF
```

Une seule requête suffit.

---

# Calculateur de devis

Un service dédié (`QuoteService`) calcule automatiquement le prix.

Les règles actuellement implémentées :

* grille tarifaire
* prix au kilomètre au-delà de 180 km
* aller / retour
* coefficient saisonnier
* coefficient selon la date de réservation
* coefficient selon le nombre de passagers
* marge commerciale

Le prix est entièrement calculé côté backend.

---

# Génération PDF

Un `PdfService` a été développé.

À chaque création d'un devis :

* un PDF est généré automatiquement
* il est enregistré dans le dossier :

```
neotravel-backend/uploads/
```

Le PDF contient actuellement :

* numéro du devis
* nom
* email
* départ
* arrivée
* date
* nombre de passagers
* prix

Le design est volontairement simple pour le MVP.

---

# Tests réalisés

Tous les endpoints ont été testés avec REST Client.

Tests validés :

* création Lead
* création Trip
* création Quote
* génération complète du devis
* génération automatique du PDF

Toutes les données sont correctement enregistrées dans Supabase.

---

# Fonctionnalités restantes

## Envoi du mail

À faire.

Objectif :

```
Generate Quote
      ↓
PDF
      ↓
Envoi automatique du mail
```

Le client recevra directement son devis en pièce jointe.

---

# Choix techniques

Nous avons volontairement privilégié une implémentation simple afin de respecter les délais du projet.

Certaines améliorations (refactoring, stockage cloud des PDF, calcul automatique des distances, etc.) pourront être réalisées dans une version ultérieure.

L'objectif principal est de disposer d'une application complète, fonctionnelle et facilement démontrable lors de la soutenance.

---

# État d'avancement

Backend :

**≈ 95 % terminé**

Fonctionnalité restante :

* Envoi automatique du devis par email.
