# Ajouter le calcul d’un pourcentage

## Objectif

Ajouter l’opération `pct` : le premier nombre est le **taux**, le second est la **valeur**.

## Critères d’acceptation

- `node cli.mjs pct 15 80` affiche `12`.
- `node cli.mjs pct 0 80` affiche `0`.
- `node cli.mjs pct -15 80` affiche `-12`.
- La fonction `calculate` prend en charge cette opération et conserve la validation des nombres finis ainsi que du résultat.
- Les opérations `add`, `sub`, `mul` et `div` conservent leur comportement.
- Des tests unitaires couvrent les taux positif, nul et négatif ; un test CLI vérifie le calcul `15 % de 80`.
- Un exemple `pct` est ajouté au README.
- `node --test` réussit.

## Livraison

Une seule PR en brouillon, depuis une branche du fork du contributeur vers `MarcoBaroniGitHub/politwire-agent-pilot:main`. La description mentionne le ticket d’origine et les tests exécutés.

Aucune fusion, modification de workflow ou écriture directe sur `main`. Pour le test planifié, relever aussi les heures prévue et réelle, le lien de session et les interventions humaines ; voir [PILOTE.md](PILOTE.md).
