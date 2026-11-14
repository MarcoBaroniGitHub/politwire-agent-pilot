# Lancer le pilote avec votre agent

Mission de ce test : [ticket #1 — Ajouter le calcul d’un pourcentage](https://github.com/MarcoBaroniGitHub/politwire-agent-pilot/issues/1).

## 1. Créer votre fork une seule fois

Ouvrez le dépôt d’origine `MarcoBaroniGitHub/politwire-agent-pilot`, cliquez sur **Fork**, choisissez votre compte personnel et copiez `main`.

Pour les prochaines contributions, gardez ce fork, synchronisez-le avec le projet d’origine et créez une nouvelle branche par mission.

## 2. Connecter Claude Code à votre fork

1. Ouvrez [Claude Code](https://claude.ai/code) sur votre propre compte.
2. Connectez GitHub si nécessaire et sélectionnez uniquement votre fork lorsque GitHub propose de limiter les dépôts autorisés.
3. Vérifiez que votre fork apparaît dans les dépôts disponibles.

Les sessions cloud et tâches planifiées dépendent de votre offre et des droits du compte. Si la fonction manque, signalez ce blocage au mainteneur ; une session locale ne valide pas le test cloud.

## 3. Programmer une seule exécution cloud

1. Ouvrez [les tâches cloud](https://claude.ai/code/routines). Le menu peut s’appeler **Scheduled tasks**, **Tâches planifiées** ou **Routines**.
2. Créez une tâche **Pilote PolitWire — Pourcentage**.
3. Sélectionnez uniquement **votre fork** et un environnement **Claude Code cloud**.
4. Retirez les connecteurs supplémentaires inutiles à cette mission.
5. Choisissez **Once / One-time / Une fois**, à une heure proche dans votre fuseau local. Notez l’heure prévue.
6. Collez le prompt ci-dessous et enregistrez. Pour vérifier le déclenchement automatique, ne cliquez pas sur « Run now ».

## Prompt à copier

```text
Réalise uniquement la mission MISSION.md du projet d’origine MarcoBaroniGitHub/politwire-agent-pilot : ajouter le calcul d’un pourcentage.

Lis AGENTS.md, CONTRIBUTING.md et MISSION.md. Vérifie que le dépôt de travail est mon fork du projet d’origine. Si le dépôt sélectionné est le dépôt d’origine, arrête-toi avant toute écriture et signale le mauvais dépôt sélectionné.

Consulte le ticket #1 « Ajouter le calcul d’un pourcentage » du dépôt d’origine MarcoBaroniGitHub/politwire-agent-pilot. S’il est fermé ou inaccessible, ne modifie rien et explique le blocage. Si une PR ouverte depuis mon fork répond déjà à ce ticket, donne son lien sans en créer une autre.

À partir du main à jour du projet d’origine, crée une branche dédiée dans mon fork avec le préfixe claude/. Implémente les critères de MISSION.md, ajoute les tests nécessaires et l’exemple demandé dans README.md, puis exécute node --test. Préserve les opérations existantes. Ne modifie ni les workflows, ni les accès, ni les fichiers de consignes.

Publie la branche dans mon fork et ouvre une seule PR en brouillon vers MarcoBaroniGitHub/politwire-agent-pilot:main. La cible doit être le projet d’origine, pas le main de mon fork. Indique le ticket d’origine, la commande de test, son résultat réel et le lien de session si disponible.

Ne pousse jamais sur main, n’utilise jamais de force-push et ne fusionne aucune PR. Si un outil ou une permission empêche l’ouverture de PR, conserve la branche, donne son lien et l’étape exacte qui manque. N’annonce pas de réussite sans preuve. Arrête-toi après cette contribution.
```

## 4. Transmettre les preuves

Après l’heure prévue, ouvrez la session depuis l’historique de la tâche. Si une autorisation est attendue, relevez cette intervention dans le résultat du pilote.

Transmettez au mainteneur :

- le lien de PR vers le projet d’origine, ou le lien de branche et le blocage ;
- le lien de session (accessible au mainteneur si vous choisissez de la partager) ;
- l’heure programmée, le fuseau et l’heure réelle du démarrage ;
- le résultat de `node --test` et les contrôles GitHub Actions disponibles ;
- les actions humaines effectuées après la programmation.

Le mainteneur vérifie ces preuves avant de déclarer le pilote réussi. Une CI verte ne prouve pas le déclenchement cloud. Si le démarrage a été automatique mais que l’ouverture de PR a nécessité un clic humain, indiquez-le.

## Références officielles

- [Sessions cloud Claude Code](https://code.claude.com/docs/en/claude-code-on-the-web)
- [Tâches cloud et exécutions uniques](https://code.claude.com/docs/en/routines)
- [Contribuer sur GitHub](https://docs.github.com/en/get-started/exploring-projects-on-github/contributing-to-a-project)
