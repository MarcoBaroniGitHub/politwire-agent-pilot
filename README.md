# PolitWire — Pilote de contribution par agent

Une petite calculatrice pour vérifier qu’une personne peut faire contribuer **son propre agent IA** à un projet GitHub public.

Le parcours : **un fork par participant → une branche par mission → une Pull Request vers le projet d’origine**. Aucun ajout comme collaborateur au dépôt d’origine n’est nécessaire.

## Participer

Première mission : [ticket #1 — Ajouter le calcul d’un pourcentage](https://github.com/MarcoBaroniGitHub/politwire-agent-pilot/issues/1).

1. Cliquez sur **Fork** en haut du dépôt pour créer votre copie sur votre compte GitHub.
2. Connectez votre agent de code à **votre fork**, avec les droits nécessaires uniquement sur celui-ci.
3. Suivez le [guide du test cloud](PILOTE.md), qui contient le prompt et la préparation d’une exécution planifiée unique depuis votre compte Claude Code.
4. L’agent réalise la [mission « Ajouter le calcul d’un pourcentage »](MISSION.md) sur une branche et propose une PR vers `MarcoBaroniGitHub/politwire-agent-pilot:main`.
5. Le mainteneur examine la contribution et décide de la fusion.

Le pilote est réussi quand la session démarre à l’heure prévue, produit une PR vers le dépôt d’origine et fournit le résultat des tests. Un fork ou une conversation seuls ne valident pas ce test.

Votre compte doit avoir accès aux sessions et tâches cloud de Claude Code. L’exécution consomme ses limites d’usage. Aucun mot de passe ou jeton n’est à transmettre par email.

## Essayer en local

Node.js 22 ou supérieur suffit, sans installation de dépendances.

```sh
node cli.mjs add 12 3
node cli.mjs sub 12 3
node cli.mjs mul 12 3
node cli.mjs div 12 3
node --test
```

L’opération `pct` est volontairement laissée au contributeur.

## Guides

- [Lancer le test cloud et copier le prompt](PILOTE.md)
- [Mission et critères de réussite](MISSION.md)
- [Contribuer et synchroniser son fork](CONTRIBUTING.md)
- [Consignes des agents](AGENTS.md)

La CI vérifie les tests sur Node.js 22 et 24 à chaque PR et mise à jour de `main`. Selon les réglages GitHub, le mainteneur peut devoir approuver la première exécution d’un contributeur externe. La fusion reste une décision humaine.

Ce dépôt contient uniquement la calculatrice du pilote technique.
