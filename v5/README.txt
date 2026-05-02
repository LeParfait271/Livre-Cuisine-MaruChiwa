GRIMOIRE CULINAIRE DE MARUCHIWA — v3
Déploiement rapide (NUC Windows ou tout autre serveur local)
=============================================================

DÉPLOIEMENT
-----------

Option 1 — Node.js (recommandé) :
  cd C:\chemin\vers\grimoire-culinaire
  npx serve -l 8080
  → Ouvrir http://localhost:8080

Option 2 — Python :
  python -m http.server 8080

Option 3 — Serveur portable Mongoose :
  Copier l'exe Mongoose dans le dossier, lancer.

Option 4 — IIS (Windows) :
  Activer IIS, pointer un site vers ce dossier.

AJOUTER DES RECETTES
---------------------
Modifier uniquement le fichier recipes.js.
Structure :

  nom_recette: {
    title: 'Titre de la recette',
    categories: ['Plats'],           // Apéro | Entrées | Plats | Desserts | Petits-déjeuners
    seasons: ['Toutes saisons'],     // Printemps | Été | Automne | Hiver | Toutes saisons
    difficulty: 'easy',             // easy | medium | hard
    yield: '4 portions',            // (optionnel)
    ingredients: [
      { group: 'Groupe', items: ['100 g farine', '2 œufs'] }
    ],
    steps: ['Étape 1.', 'Étape 2.'],
    notes: ['Astuce 1.'],
    image: 'https://...',           // (optionnel)
    video: 'https://...',           // (optionnel)
    tags: ['rapide', 'végé'],       // (optionnel)
  },

ICÔNES PWA
-----------
Le manifest.json attend 4 fichiers icônes distincts :
  icon-192.png          (192×192, fond transparent ou coloré)
  icon-192-maskable.png (192×192, avec zone de sécurité pour masque Android)
  icon-512.png          (512×512)
  icon-512-maskable.png (512×512, maskable)

Vous pouvez en générer avec : https://maskable.app/

CHANGEMENTS v3
--------------
app.js
  • Undo/Redo corrigé : utilisation de useRef pour éviter les
    closures stale (l'état était parfois lu à une version obsolète)
  • Barre de progression et parallax via mutation DOM directe
    (ref) — aucun re-render React à chaque pixel défilé
  • RECIPE_TAGS précalculé hors du composant (une seule fois
    au chargement, pas à chaque frappe clavier)
  • Thème automatique réactif : écoute l'événement OS change
  • Chips "filtres actifs" visibles sous les saisons avec
    bouton × pour retirer chaque filtre individuellement
  • Badge rouge sur le bouton 🔍 indiquant le nombre de filtres actifs
  • Modal Recherche avancée : bouton "Réinitialiser" + Entrée pour valider
  • Partager / Courses : retour visuel "✅ Copié !" après clipboard
  • Barre de progression des étapes (X/total) dans la vue recette
  • ls helper centralisé pour le localStorage (moins de répétition)

index.html
  • Écran de chargement retiré proprement par React au montage
    (via window.__gremoireReady) — plus de setTimeout hardcodé
  • og:image ajouté pour l'aperçu lors du partage de liens

style.css
  • Variables CSS consolidées
  • Meilleure gestion mobile : la toolbar ne chevauche pas le contenu
  • Section @media print améliorée pour l'impression des recettes

manifest.json
  • Icônes déclarées correctement (4 fichiers, purpose séparé)
  • "any maskable" remplacé par des entrées distinctes
    (conformité PWA Lighthouse)

service-worker.js
  • Ne met en cache que les réponses "basic" (même origine)
  • N'intercepte plus les requêtes externes (CDN, Unsplash…)
  • allSettled à l'installation : un asset manquant n'empêche
    plus toute l'installation

script.js
  • Titres écrits via textContent (pas innerHTML) — sécurité XSS
  • Garde contre window.RECIPES absent ou mal formé
