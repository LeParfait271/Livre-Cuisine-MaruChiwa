Cook Note
=========

LANCER EN LOCAL
---------------

1. Installer Node.js 18+ si besoin.
2. Depuis ce dossier :

   npm run dev

3. Ouvrir :

   Site public : http://127.0.0.1:8080
   Admin       : http://127.0.0.1:8080/admin

Le serveur Node remplace Mongoose pour le mode dev/admin.
Mongoose peut toujours servir les fichiers statiques, mais il ne permet pas
d'ecrire les recettes depuis le back-office.

MOT DE PASSE ADMIN
------------------

Option recommandee :

1. Copier admin.local.example.json vers admin.local.json.
2. Mettre le mot de passe voulu :

   {
     "password": "mon-mot-de-passe"
   }

admin.local.json est ignore par Git.

Alternative :

   set COOK_NOTE_ADMIN_PASSWORD=mon-mot-de-passe
   npm run dev

Ancienne variable encore acceptee pour compatibilite :

   MC_FOOD_ADMIN_PASSWORD

Si rien n'est configure, le mot de passe dev temporaire est :

   changeme

AJOUTER DES RECETTES
--------------------

Chemin recommande : http://127.0.0.1:8080/admin

Le back-office permet :

- creation, modification, duplication, suppression ;
- categories, saisons, difficulte, rendement, tags, video ;
- ingredients groupes, etapes, notes ;
- upload local d'images vers assets/uploads/ ;
- sauvegarde automatique de recipes.js dans backups/ avant chaque ecriture.

Le fichier public reste recipes.js avec le schema :

  recette_id: {
    title: 'Titre',
    categories: ['Plats'],
    seasons: ['Toutes saisons'],
    difficulty: 'easy',
    yield: '4 portions',
    ingredients: [
      { group: 'Base', items: ['100 g farine', '2 oeufs'] }
    ],
    steps: ['Etape 1', 'Etape 2'],
    notes: ['Astuce ou lien HTML data-goto'],
    image: '/assets/uploads/photo.webp',
    video: 'https://youtube.com/...',
    tags: ['rapide', 'italien']
  }

FEATURES PUBLIQUES
------------------

- theme noir/dore Cook Note ;
- saison courante automatique Europe/Paris ;
- rangement par saison ;
- recherche simple et recherche avancee ;
- filtres actifs supprimables individuellement ;
- favoris et recettes recentes ;
- tags cliquables ;
- fiches recettes avec checklist ingredients/etapes ;
- undo/redo checklist avec Ctrl+Z / Ctrl+Y ;
- quantites x1, x1.5, x2, x3 ;
- liste de courses copiable ;
- partage lien, WhatsApp, email, QR code ;
- badge video et lien video ;
- confettis quand toutes les etapes sont cochees ;
- impression propre via le bouton Imprimer ;
- PWA/offline pour les assets publics.

RACCOURCIS
----------

Ctrl/Cmd + K : focus recherche
H            : retour accueil
Esc          : fermer modal ou revenir de fiche
Fleches      : recette precedente/suivante en fiche
Ctrl+Z/Y     : annuler/retablir checklist

VERIFICATION
------------

   npm run check

Puis tester :

- http://127.0.0.1:8080
- http://127.0.0.1:8080/admin
