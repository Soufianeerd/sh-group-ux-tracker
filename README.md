# Foyer UX Tracker

Démo métier pour Business Analyst Digital – Foyer Groupe Luxembourg

---

## Présentation du projet

**Foyer UX Tracker** est une application web de démonstration permettant de simuler et d’analyser le parcours utilisateur digital lors de la souscription à différents produits d’assurance ou de gestion de patrimoine. Elle met en avant le rôle du Business Analyst dans l’optimisation de l’expérience client et le suivi des KPI clés.

## Contexte Foyer Groupe

Foyer Groupe Luxembourg est un acteur majeur de l’assurance, de la prévoyance et de la gestion de patrimoine. Dans un contexte de digitalisation croissante, l’analyse des parcours clients digitaux est essentielle pour améliorer la conversion, limiter l’abandon et optimiser l’expérience utilisateur.

## Fonctionnalités principales
- Simulation de parcours clients pour plusieurs produits (auto, santé, vie, habitation, patrimoine)
- Simulation sur un échantillon de 437 500 clients représentatifs (étudiant, famille, retraité, etc.)
- Tracking comportemental et calcul automatique des KPI (conversion, abandon, durée, engagement)
- Visualisation dynamique des KPI et tableaux décisionnels (courbes, donuts, radar, tableaux croisés)
- Génération de recommandations UX en fonction des KPI
- Export CSV/JSON pour exploitation directe dans Power BI
- Section Business Analyst Toolkit : conseils d’analyse, exemple Jira
- Maquette Kanban / user stories

## Description des KPI suivis
- **Taux de conversion** par parcours (taux élevés, reflet d’une expérience client optimisée)
- **Taux d’abandon** par étape et par profil (faibles, preuve de la solidité des parcours)
- **Durée moyenne** d’un parcours (optimisée pour chaque produit)
- **Engagement** par produit et type de client (vision globale et par segment)

---

## Mode d’emploi
1. Ouvrir `index.html` pour simuler un parcours client.
2. Accéder à `dashboard.html` pour visualiser les KPI, recommandations et exporter les données.
3. Utiliser la section Business Analyst Toolkit pour des conseils Power BI et un exemple Jira.

---

## Business Analyst Toolkit
### Exploiter les données dans Power BI
- Exporter les données via le dashboard (CSV ou JSON)
- Importer dans Power BI
- Analyser les taux d’abandon, conversion, engagement par profil/produit
- Créer des dashboards interactifs pour le management

### Exemple de ticket Jira / user story
```
En tant que Business Analyst,
Je veux visualiser le taux d’abandon par étape
Afin de prioriser les optimisations UX sur les parcours critiques.
Critères d’acceptation :
- Le taux d’abandon est affiché par produit et profil
- Les recommandations UX sont générées automatiquement
- Les données sont exportables pour Power BI
```

---

## Structure du projet

```
foyer-ux-tracker/
├── index.html
├── dashboard.html
├── css/style.css
├── js/
│   ├── logic.js
│   ├── reco.js
│   ├── chart.js
│   └── data.js
├── assets/
│   └── images, icônes, etc.
└── README.md
```

---

## À propos
Projet démo pour entretien Business Analyst Digital – Juillet 2025.
---
Le BA analyse les parcours, identifie les points de friction, propose des optimisations, rédige des user stories, et structure la donnée pour l’exploitation (Power BI, Jira, etc.).

## Mode d’emploi
1. Lancez `index.html` pour simuler un parcours client.
2. Accédez à `dashboard.html` pour visualiser les KPI, recommandations et exporter les données.
3. Utilisez la section Business Analyst Toolkit pour des conseils Power BI et un exemple Jira.

---

## Business Analyst Toolkit
### Exploiter les données dans Power BI
- Exportez les données via le dashboard (CSV ou JSON)
- Importez-les dans Power BI
- Analysez les taux d’abandon, conversion, engagement par profil/produit
- Créez des dashboards interactifs pour le management

### Exemple de ticket Jira / user story
```
En tant que Business Analyst,
Je veux visualiser le taux d’abandon par étape
Afin de prioriser les optimisations UX sur les parcours critiques.
Critères d’acceptation :
- Le taux d’abandon est affiché par produit et profil
- Les recommandations UX sont générées automatiquement
- Les données sont exportables pour Power BI
```

---

## Structure du projet

```
foyer-ux-tracker/
├── index.html
├── dashboard.html
├── css/style.css
├── js/
│   ├── logic.js
│   ├── reco.js
│   ├── chart.js
│   └── data.js
├── assets/
│   └── images, icônes, etc.
└── README.md
```

---

## À propos
Projet démo pour entretien Business Analyst Digital – Juillet 2025.

---

