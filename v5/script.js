// script.js — grille de recettes (page statique fallback)
// Utilisé si recipe.html est chargé hors de l'app React principale.

document.addEventListener('DOMContentLoaded', () => {
  const grid = document.getElementById('recipe-grid');
  if (!grid) return;

  if (!window.RECIPES || typeof window.RECIPES !== 'object') {
    grid.textContent = 'Impossible de charger les recettes.';
    return;
  }

  Object.entries(window.RECIPES).forEach(([key, recipe]) => {
    const card = document.createElement('div');
    card.className = 'card';

    // Titre — textContent pour éviter toute injection HTML
    const h2 = document.createElement('h2');
    h2.textContent = recipe.title || key;
    card.appendChild(h2);

    // Badges catégories
    const badges = document.createElement('div');
    badges.className = 'badges';
    (recipe.categories || []).forEach(cat => {
      const span = document.createElement('span');
      span.className = 'badge';
      span.textContent = cat;
      badges.appendChild(span);
    });
    card.appendChild(badges);

    card.addEventListener('click', () => {
      window.location.href = `recipe.html?id=${encodeURIComponent(key)}`;
    });

    grid.appendChild(card);
  });
});
