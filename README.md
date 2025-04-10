# String Calculator

Un calculateur de chaînes de caractères développé selon les principes du Test-Driven Development (TDD).

## Description

Ce projet implémente un calculateur de chaînes de caractères qui peut prendre une chaîne contenant des nombres séparés par différents délimiteurs et retourner leur somme. Le développement suit une approche TDD stricte, avec chaque fonctionnalité ajoutée de manière incrémentale et validée par des tests.

## Fonctionnalités

- Addition de 0, 1, 2 ou plusieurs nombres
- Support des délimiteurs personnalisés
- Prise en charge des retours à la ligne comme délimiteurs
- Gestion des nombres négatifs (avec exceptions)
- Ignore les nombres supérieurs à 1000
- Support des délimiteurs de plusieurs caractères
- Support de multiples délimiteurs

## Prérequis

- Node.js (version 14 ou supérieure recommandée)
- npm ou yarn

## Installation

1. Clonez ce dépôt :
```
git clone https://github.com/Kevin-Ferraretto-Cours/2025-javascript-string-calculator.git
cd 2025-javascript-string-calculator
```

2. Installez les dépendances :
```
npm install
```

## Exécution des tests

Pour exécuter les tests avec Vitest :

```
npm run test
```

## Structure du projet

```
string-calculator/
├── src/
│   └── main.js
├── tests/
│   └── main.test.js
├── package.json
├── LICENSE
└── README.md
```

## Intégration continue

Le projet utilise GitHub Actions pour exécuter automatiquement les tests à chaque push ou merge sur le dépôt.

## Licence

Ce projet est sous licence MIT. Voir le fichier [LICENSE](LICENSE) pour plus de détails.
