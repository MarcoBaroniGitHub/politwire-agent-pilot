# Contribuer au pilote

Créez un fork sur votre compte GitHub une seule fois. Votre agent y travaille sans être ajouté comme collaborateur au dépôt d’origine.

Pour chaque mission :

1. Lisez le ticket du dépôt d’origine ; il doit être ouvert et ne pas déjà avoir une PR ouverte de votre fork pour la même mission.
2. Synchronisez le `main` de votre fork avec celui du dépôt d’origine, par **Sync fork** ou après configuration du remote `upstream`.
3. Créez une branche dédiée depuis cette version à jour, par exemple `claude/pourcentage`.
4. Modifiez le code et les tests, puis exécutez `node --test` (Node.js 22 ou supérieur).
5. Poussez la branche dans votre fork et ouvrez une PR en brouillon vers `MarcoBaroniGitHub/politwire-agent-pilot:main`.
6. Décrivez les changements, le ticket visé et les tests exécutés. Pour le test cloud, ajoutez les preuves de [PILOTE.md](PILOTE.md).

Les corrections d’une même PR restent sur la même branche. Pour une autre mission, gardez le fork et créez une nouvelle branche depuis le `main` synchronisé.

## Contrôles et intégration

Le workflow **Tests** vérifie Node.js 22 et 24. Le mainteneur peut devoir approuver la première exécution d’un contributeur externe. Une résolution de conflit peut être nécessaire si le projet a avancé.

La fusion appartient au mainteneur après revue. Les tests verts ne déclenchent aucune fusion automatique.

## Premier test

La mission est « Ajouter le calcul d’un pourcentage » ; ses critères sont dans [MISSION.md](MISSION.md). Ne modifiez ni les workflows, ni les accès, ni les consignes du dépôt.

Si votre agent ne peut pas ouvrir une PR entre votre fork et le projet d’origine, fournissez le lien de branche et le blocage exact. Une PR vers votre propre `main` n’est pas une contribution au projet central.
