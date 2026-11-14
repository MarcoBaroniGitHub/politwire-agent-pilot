# Pilote public sans compte — plan et spécification

Objectif : copier une mission dans une IA déjà utilisée, produire une modification réelle et la remettre sans compte GitHub/PolitWire. Aucun nouvel email avant présentation à Marco.

Architecture : page statique + fonctions Node.js sur Vercel ; file privée Postgres dédiée sur Neon gratuit. Aucun code soumis n'est exécuté par le service. L'intégration reste au mainteneur. Branche distincte, main et PR #2 inchangées.

Contrat : mission calculator-pct-v1, base 8ae7ae8bef5708b621d058dc155c793aeb43bee6 ; quatre chemins autorisés ; JSON 64 Kio maximum ; 16 Kio par fichier ; reçu aléatoire ; aucun nom/email requis. 10 tentatives/heure/IP, 100/jour globales, contrôle durable atomique. Doublon refusé sans divulguer le reçu original. Reçu accessible uniquement par sa capacité secrète, transmise dans le fragment du lien.

1. Écrire les tests de contrat, de taille, de version, de chemins, de doublons et de réception ; constater leur échec ; implémenter la validation et le service HTTP.
2. Créer le schéma versionné, les fonctions SQL atomiques et un rôle applicatif limité à ces fonctions ; vérifier la persistance, la concurrence et les limites contre la vraie base dédiée.
3. Construire la page et le prompt autonome avec tous les fichiers source. Tester copie/collage, dépôt, reçu et erreurs. Une IA sans outils rend le JSON à coller ; aucune promesse d'exécution universelle.
4. Publier une branche et déployer sur Vercel ; vérifier depuis un client anonyme et dans le navigateur. Lire la contribution persistée et la relier à la preuve de code PR #2. Conserver les limitations réelles dans le rapport et le registre.

Points de revue : requête trop grande même sans Content-Length ; faux résultat de tests ; traversée de chemins ; concurrence des doublons/limites ; absence de fuite entre reçus. Aucun secret dans GitHub ou le prompt. Aucune intégration automatique de code public.
