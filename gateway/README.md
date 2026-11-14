# Réception publique — pilote sans compte

Page : https://politwire-contribute.vercel.app

Le participant copie `public/mission.txt` dans l’IA qu’il utilise déjà. Le code initial est inclus à la version immuable `8ae7ae8bef5708b621d058dc155c793aeb43bee6`. Une IA outillée peut coder, tester et faire un POST. Sinon elle rend un JSON que le participant colle dans la page. Aucune création de compte GitHub/PolitWire ni adresse email demandée.

## État de livraison

La page et la validation HTTP peuvent être testées. La réception durable reste FERMÉE tant que la création du schéma SQL de la base dédiée n’est pas explicitement autorisée. Le contrôle automatique d’approbation a refusé cette mutation le 14/11/2026. Aucun SQL n’a été appliqué ni aucune contribution publique enregistrée. Ne pas confondre les tests unitaires (stockage simulé) avec une vérification de persistance réelle.

## Architecture

Fonctions Node.js 24 Vercel, pilote Neon dédié sur le plan gratuit. Le service stocke des propositions en attente de revue, et n’exécute jamais leur code. Aucun accès GitHub n’est embarqué. La reprise mainteneur de code connu est démontrée séparément dans la PR #2, encore en brouillon et non fusionnée.

Le contrat exige mission/version, quatre chemins de fichiers autorisés, JSON 64 Kio maximum, 16 Kio par fichier, et résultat de tests explicitement déclaré. Les résultats déclarés ne sont pas des preuves de tests exécutés côté projet.

Le schéma prévu utilise des fonctions SQL avec recherche de schéma fixe, des compteurs atomiques persistants (100 tentatives valides/jour globales et 10/heure par IP pseudonymisée) et une empreinte unique du code. L’IP brute n’est pas stockée dans la file ; seul un HMAC journalier sert au quota. Les logs d’infrastructure peuvent néanmoins traiter des adresses réseau. Pas de liste publique des propositions. Le reçu est une capacité aléatoire de 256 bits, seul son hash est stocké ; le lien garde le jeton dans un fragment et le transmet au serveur dans le corps d’une requête. Le code des autres participants n’est jamais servi par le reçu.

Un plafond global peut être épuisé par un abus : ce pilote ne prétend pas être un service résistant à toute attaque. Avant une ouverture large : vérification du stockage réel, limites, opérations de revue, politique de conservation et protections d’exploitation.

## Configuration à terminer après autorisation

1. Appliquer `schema.sql` dans le projet dédié `politwire-contribution-pilot` (aucun autre projet).
2. Créer un rôle `pilot_app` sans droits sur les tables, avec seulement CONNECT et EXECUTE sur `pilot_submit` et `pilot_status`. Ne pas utiliser le compte propriétaire dans le runtime.
3. Définir les variables chiffrées Vercel `DATABASE_URL` (rôle applicatif, URL poolée) et `RATE_SECRET` aléatoire. `PUBLIC_ORIGIN=https://politwire-contribute.vercel.app`. `RECEIVER_ENABLED=true` seulement après vérification réelle de la base et du contrat.
4. Vérifier sans cookie/identifiant : envoi 201, reçu accessible, doublon 409 sans reçu original, mauvaise version/chemin 400, limite 429 ; lire le résultat dans la file via le compte mainteneur.
5. Reprendre une proposition dans un environnement isolé sans secrets, examiner puis tester. Aucun merge automatique.

Tests locaux : `npm ci --ignore-scripts && npm test` dans `gateway`. Tests du dépôt complet : `node --test` à la racine. Ne placer aucun secret dans ce dossier ou dans un prompt.
