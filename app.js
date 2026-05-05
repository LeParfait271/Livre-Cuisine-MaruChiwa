/* global React, ReactDOM, QRCode */

const { useEffect, useMemo, useRef, useState } = React;
const h = React.createElement;

const HERO_IMAGE = '/assets/hero-fond.png';
const COOK_NOTE_LOGO = '/assets/cook-note.png';

const SEASONS = ['Printemps', 'Été', 'Automne', 'Hiver'];
const DIFFICULTY_LABELS = { easy: 'Facile', medium: 'Intermédiaire', hard: 'Technique' };
const DIFFICULTY_ORDER = { easy: 1, medium: 2, hard: 3 };
const DIFFICULTY_RANGES = [
  { value: '1-3', label: '1 à 3', min: 1, max: 3 },
  { value: '3-6', label: '3 à 6', min: 3, max: 6 },
  { value: '6-9', label: '6 à 9', min: 6, max: 9 },
  { value: '10', label: '10', min: 10, max: 10 }
];
const CATEGORY_ACCENTS = {
  'Apéro': '#ff8a3d',
  'Entrées': '#22c55e',
  'Plats': '#fbbf24',
  'Desserts': '#f472b6',
  'Petits-déjeuners': '#60a5fa',
  'Recettes de base': '#a78bfa'
};
const HOME_CARD_ORDER = {
  petit_dejeuner_maitre: 1,
  apero_maitre: 2,
  entrees_maitre: 3,
  plats_maitre: 4,
  desserts_maitre: 5
};
const STORAGE_KEYS = {
  favorites: 'cook_note_favorites',
  recents: 'cook_note_recents',
  shopping: 'cook_note_shopping_basket',
  legacyFavorites: ['mc_food_favorites', 'cuisine_favs'],
  legacyRecents: ['mc_food_recents', 'cuisine_recents']
};

function readJson(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function writeJson(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* ignore private browsing restrictions */
  }
}

function readStoredList(key, legacyKeys) {
  const current = readJson(key, null);
  if (Array.isArray(current)) return current;
  for (const legacyKey of legacyKeys) {
    const value = readJson(legacyKey, null);
    if (Array.isArray(value)) return value;
  }
  return [];
}

function normalizeText(value) {
  return String(value || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();
}

function uniq(values) {
  return Array.from(new Set(values.filter(Boolean))).sort((a, b) => a.localeCompare(b, 'fr'));
}

function getCurrentSeason(date = new Date()) {
  const month = Number(new Intl.DateTimeFormat('fr-FR', {
    timeZone: 'Europe/Paris',
    month: 'numeric'
  }).format(date));
  if ([3, 4, 5].includes(month)) return 'Printemps';
  if ([6, 7, 8].includes(month)) return 'Été';
  if ([9, 10, 11].includes(month)) return 'Automne';
  return 'Hiver';
}

function primaryCategory(recipe) {
  return (recipe.categories || [])[0] || 'Recette';
}

function getCategoryColor(recipe) {
  return CATEGORY_ACCENTS[primaryCategory(recipe)] || '#fbbf24';
}

function homeCardOrder(recipe) {
  return HOME_CARD_ORDER[recipe.id] || 99;
}

function countIngredients(recipe) {
  return (recipe.ingredients || []).reduce((sum, group) => sum + (group.items || []).length, 0);
}

function difficultyText(recipe) {
  return Number.isFinite(recipe?.difficultyScore)
    ? `Difficulté ${recipe.difficultyScore}/10`
    : (DIFFICULTY_LABELS[recipe?.difficulty] || 'Recette');
}

function getVariantRefs(recipe) {
  return Array.isArray(recipe.variants) ? recipe.variants.filter(variant => variant && variant.id) : [];
}

function isMasterRecipe(recipe) {
  return getVariantRefs(recipe).length > 0;
}

function parseAmount(raw) {
  const normalized = raw.replace(',', '.');
  if (normalized.includes('/')) {
    const [left, right] = normalized.split('/');
    const num = Number(left);
    const den = Number(right);
    return den ? num / den : Number.NaN;
  }
  return Number(normalized);
}

function formatNumber(value) {
  if (!Number.isFinite(value)) return '';
  if (Math.abs(value - Math.round(value)) < 0.01) return String(Math.round(value));
  return value.toLocaleString('fr-FR', { maximumFractionDigits: 1 });
}

function scaleIngredient(text, factor) {
  if (factor === 1) return text;
  const match = String(text).match(/^(\d+(?:[.,]\d+)?(?:\/\d+)?)(\s*[–-]\s*(\d+(?:[.,]\d+)?(?:\/\d+)?))?(.*)$/);
  if (!match) return text;
  const first = parseAmount(match[1]);
  const second = match[3] ? parseAmount(match[3]) : null;
  if (!Number.isFinite(first)) return text;
  if (second !== null && Number.isFinite(second)) {
    return `${formatNumber(first * factor)}-${formatNumber(second * factor)}${match[4]}`;
  }
  return `${formatNumber(first * factor)}${match[4]}`;
}

function recipeShoppingLines(recipe, factor = 1) {
  return (recipe.ingredients || []).flatMap(group => [
    group.group ? `# ${group.group}` : '# Base',
    ...(group.items || []).map(item => `- ${scaleIngredient(item, factor)}`)
  ]);
}

function shoppingListText(recipes, factorById = {}) {
  const blocks = recipes.map(recipe => [
    `## ${recipe.title}`,
    ...recipeShoppingLines(recipe, factorById[recipe.id] || 1)
  ].join('\n'));
  return ['Liste de courses Cook Note', '', ...blocks].join('\n\n');
}

function getStepMinutes(step) {
  const text = normalizeText(step);
  const hourMatch = text.match(/(\d+(?:[.,]\d+)?)\s*h/);
  if (hourMatch) return Math.round(parseAmount(hourMatch[1]) * 60);
  const minuteMatch = text.match(/(\d+(?:[.,]\d+)?)\s*(?:min|minute)/);
  if (minuteMatch) return Math.round(parseAmount(minuteMatch[1]));
  return 0;
}

function formatRemaining(ms) {
  const seconds = Math.max(0, Math.ceil(ms / 1000));
  const minutes = Math.floor(seconds / 60);
  const rest = seconds % 60;
  return `${String(minutes).padStart(2, '0')}:${String(rest).padStart(2, '0')}`;
}

function getRecipeSearchText(recipe, tags) {
  const ingredients = (recipe.ingredients || [])
    .flatMap(group => [group.group, ...(group.items || [])])
    .join(' ');
  return normalizeText([
    recipe.title,
    recipe.yield,
    recipe.difficulty,
    ...(recipe.categories || []),
    ...(recipe.seasons || []),
    ...tags,
    ...(recipe.variants || []).flatMap(variant => [variant.id, variant.label]),
    ingredients,
    ...(recipe.steps || []),
    ...(recipe.notes || [])
  ].join(' '));
}

function extractTags(recipe) {
  const tags = new Set((recipe.tags || []).map(tag => normalizeText(tag)).filter(Boolean));
  const blocked = new Set([
    'avec', 'sans', 'pour', 'dans', 'base', 'sel', 'poivre', 'repos', 'entier', 'entiere',
    'fondu', 'fondue', 'chimique', 'minutes', 'minute', 'grammes', 'gramme', 'cuisson',
    'froid', 'froide', 'chaud', 'chaude', 'recette', 'preparation'
  ]);
  (recipe.ingredients || []).forEach(group => {
    (group.items || []).forEach(item => {
      normalizeText(item).split(/\s+/).forEach(word => {
        const clean = word.replace(/[^a-z0-9]/g, '');
        if (clean.length > 3 && !/^\d/.test(clean) && !blocked.has(clean)) {
          tags.add(clean);
        }
      });
    });
  });
  return Array.from(tags).slice(0, 18);
}

function buildInlineRecipeTargets(recipes) {
  const aliases = [];
  const add = (term, id) => {
    const normalized = normalizeText(term).trim();
    if (normalized.length >= 4 && id) aliases.push({ term, normalized, id });
  };
  recipes.forEach(recipe => {
    if (isMasterRecipe(recipe)) return;
    add(recipe.title, recipe.id);
    (recipe.aliases || []).forEach(alias => add(alias, recipe.id));
  });
  return aliases.sort((a, b) => b.normalized.length - a.normalized.length);
}

function renderLinkedText(text, targets, openRecipe) {
  const value = String(text || '');
  const normalized = normalizeText(value);
  const target = targets.find(item => normalized.includes(item.normalized));
  if (!target) return value;
  const index = normalized.indexOf(target.normalized);
  const label = value.slice(index, index + target.term.length) || target.term;
  return h(React.Fragment, null,
    value.slice(0, index),
    h('button', { type: 'button', className: 'inline-recipe-link', onClick: () => openRecipe(target.id) }, label),
    value.slice(index + label.length)
  );
}

function getInitialHashRecipe() {
  const params = new URLSearchParams(window.location.hash.replace(/^#/, ''));
  return params.get('recipe');
}

function getInitialHashVariant() {
  const params = new URLSearchParams(window.location.hash.replace(/^#/, ''));
  return params.get('variant');
}

function isTypingTarget(target) {
  return ['INPUT', 'TEXTAREA', 'SELECT'].includes(target?.tagName);
}

function copyText(text) {
  if (navigator.clipboard?.writeText) return navigator.clipboard.writeText(text);
  const area = document.createElement('textarea');
  area.value = text;
  area.style.position = 'fixed';
  area.style.opacity = '0';
  document.body.appendChild(area);
  area.select();
  document.execCommand('copy');
  area.remove();
  return Promise.resolve();
}

function sanitizeNoteHtml(value) {
  const template = document.createElement('template');
  template.innerHTML = String(value || '');
  const allowedTags = new Set(['SPAN', 'STRONG', 'EM', 'B', 'I', 'BR']);

  function clean(node) {
    Array.from(node.childNodes).forEach(child => {
      if (child.nodeType === Node.TEXT_NODE) return;
      if (child.nodeType !== Node.ELEMENT_NODE || !allowedTags.has(child.tagName)) {
        child.replaceWith(document.createTextNode(child.textContent || ''));
        return;
      }
      Array.from(child.attributes).forEach(attribute => {
        if (!(child.tagName === 'SPAN' && attribute.name === 'data-goto')) {
          child.removeAttribute(attribute.name);
        }
      });
      clean(child);
    });
  }

  clean(template.content);
  return template.innerHTML;
}

function Button(props) {
  const className = ['btn', props.variant ? `btn-${props.variant}` : '', props.className || '']
    .filter(Boolean)
    .join(' ');
  return h('button', {
    type: props.type || 'button',
    className,
    onClick: props.onClick,
    disabled: props.disabled,
    title: props.title,
    'aria-label': props.ariaLabel,
    'aria-pressed': props.pressed
  }, props.children);
}

function TopBar({ onHome, shoppingCount, activeFilterCount, showFavorites, openAdvancedSearch, openShoppingBasket, query, setQuery, searchRef }) {
  return h('header', { className: 'topbar' },
    h('div', { className: 'top-left' },
      h(Button, { variant: 'subtle', onClick: onHome }, 'Accueil')
    ),
    h('nav', { className: 'top-actions', 'aria-label': 'Actions rapides' },
      h('a', {
        className: 'btn btn-subtle',
        href: 'mailto:cooknote271@gmail.com?subject=Demande%20d%27ajout%20de%20recette%20Cook%20Note&body=Bonjour%2C%0A%0AJ%27aimerais%20demander%20l%27ajout%20de%20cette%20recette%20dans%20Cook%20Note%20%3A%0A%0ANom%20de%20la%20recette%20%3A%0AIngr%C3%A9dients%20%3A%0A%C3%89tapes%20%3A%0A%0AMerci.'
      }, 'Demander une recette'),
      h(Button, { variant: 'subtle', className: 'filter-trigger', onClick: openAdvancedSearch, title: 'Ouvrir les filtres avances' }, [
        'Filtres',
        activeFilterCount > 0 && h('span', { className: 'filter-badge', key: 'count' }, activeFilterCount)
      ]),
      h(Button, { variant: 'subtle', className: 'cart-icon-btn icon-square', onClick: openShoppingBasket, title: `${shoppingCount} course${shoppingCount > 1 ? 's' : ''}`, ariaLabel: 'Panier courses' }, [
        '\u{1F6D2}',
        shoppingCount > 0 && h('span', { className: 'cart-count', key: 'count' }, shoppingCount)
      ])
    ),
    h('div', { className: 'top-right' },
      h(Button, {
        variant: 'ghost',
        className: 'top-fav-btn icon-square',
        onClick: showFavorites,
        title: 'Voir les favoris',
        ariaLabel: 'Voir les favoris'
      }, '\u2665'),
      h('div', { className: 'field top-search' },
        h('label', { className: 'sr-only' }, 'Recherche'),
        h('input', {
          ref: searchRef,
          value: query,
          onChange: event => setQuery(event.target.value),
          placeholder: 'Rechercher une recette...'
        })
      )
    )
  );
}

function buildAuditReport(recipes) {
  const imageMap = new Map();
  const masterIds = new Set(recipes.filter(isMasterRecipe).map(recipe => recipe.id));
  const ids = new Set(recipes.map(recipe => recipe.id));
  const issues = [];

  recipes.forEach(recipe => {
    if (recipe.image) {
      const list = imageMap.get(recipe.image) || [];
      list.push(recipe);
      imageMap.set(recipe.image, list);
    } else {
      issues.push({ type: 'Image', recipe: recipe.title, detail: 'Image manquante' });
    }

    const notes = (recipe.notes || []).join(' ').toLowerCase();
    if (!isMasterRecipe(recipe) && !notes.includes('stockage') && !notes.includes('conservation') && !notes.includes('péremption')) {
      issues.push({ type: 'Conservation', recipe: recipe.title, detail: 'Méthode de stockage absente ou trop faible' });
    }

    (recipe.variants || []).forEach(variant => {
      if (!ids.has(variant.id)) issues.push({ type: 'Lien fiche', recipe: recipe.title, detail: `Variante introuvable : ${variant.id}` });
      if (masterIds.has(variant.id)) issues.push({ type: 'Structure', recipe: recipe.title, detail: `Fiche parent imbriquée : ${variant.id}` });
    });

    const text = JSON.stringify(recipe);
    if (text.includes('?')) issues.push({ type: 'Texte', recipe: recipe.title, detail: 'Caractère ? suspect' });
    (recipe.tags || []).forEach(tag => {
      if (/^\d|signature|1tarte/i.test(tag)) issues.push({ type: 'Tag', recipe: recipe.title, detail: `Tag suspect : ${tag}` });
    });
  });

  imageMap.forEach((list, image) => {
    if (list.length > 1) {
      issues.push({
        type: 'Image doublon',
        recipe: list.map(item => item.title).join(', '),
        detail: image
      });
    }
  });

  return {
    total: recipes.length,
    recipes: recipes.filter(recipe => !isMasterRecipe(recipe)).length,
    masters: recipes.filter(isMasterRecipe).length,
    issues
  };
}

function AuditPanel({ open, onClose, recipes }) {
  const report = useMemo(() => buildAuditReport(recipes), [recipes]);
  if (!open) return null;
  const visibleIssues = report.issues.slice(0, 80);
  return h('div', { className: 'modal-backdrop', onMouseDown: onClose },
    h('section', { className: 'modal-panel audit-modal', role: 'dialog', 'aria-modal': 'true', onMouseDown: event => event.stopPropagation() },
      h('div', { className: 'modal-head' },
        h('div', null,
          h('p', { className: 'eyebrow' }, 'Contrôle qualité'),
          h('h2', null, report.issues.length ? `${report.issues.length} point${report.issues.length > 1 ? 's' : ''} à vérifier` : 'Carnet propre')
        ),
        h('button', { type: 'button', className: 'icon-btn', onClick: onClose, 'aria-label': 'Fermer' }, '×')
      ),
      h('div', { className: 'audit-summary' },
        h('span', null, h('strong', null, report.recipes), ' recettes'),
        h('span', null, h('strong', null, report.masters), ' fiches parents'),
        h('span', null, h('strong', null, report.total), ' fiches totales')
      ),
      report.issues.length
        ? h('div', { className: 'audit-list' },
          visibleIssues.map((issue, index) => h('article', { key: `${issue.type}:${issue.recipe}:${index}` },
            h('strong', null, issue.type),
            h('span', null, issue.recipe),
            h('p', null, issue.detail)
          )),
          report.issues.length > visibleIssues.length && h('p', { className: 'muted' }, `${report.issues.length - visibleIssues.length} autres points masqués.`)
        )
        : h('p', { className: 'empty-line' }, 'Aucun problème bloquant détecté sur les images, liens, tags et conservations.'),
      h('div', { className: 'modal-actions' },
        h(Button, { variant: 'primary', onClick: onClose }, 'Fermer')
      )
    )
  );
}

function Hero({ currentSeason }) {
  return h('section', {
    className: 'hero',
    style: {
      backgroundImage: `linear-gradient(110deg, rgba(4,4,5,.92), rgba(4,4,5,.54) 48%, rgba(4,4,5,.84)), url("${HERO_IMAGE}")`
    }
  },
    h('div', { className: 'hero-inner' },
      h('img', { className: 'hero-logo', src: COOK_NOTE_LOGO, alt: 'Cook Note' })
    )
  );
}

function FilterBar(props) {
  const showSearch = props.showSearch !== false;
  return h('section', { className: showSearch ? 'filters-panel' : 'filters-panel filters-panel-compact', 'aria-label': 'Filtres de recettes' },
    showSearch && h('div', { className: 'field wide' },
      h('label', null, 'Recherche'),
      h('input', {
        ref: props.searchRef,
        value: props.query,
        onChange: event => props.setQuery(event.target.value),
        placeholder: 'Carbonara, citron, dessert, four...'
      })
    ),
    h('div', { className: 'field' },
      h('label', null, 'Saison'),
      h('select', { value: props.season, onChange: event => props.setSeason(event.target.value) },
        h('option', { value: '' }, 'Toutes'),
        props.seasons.map(item => h('option', { key: item, value: item }, item))
      )
    ),
    h('div', { className: 'field' },
      h('label', null, 'Difficulté'),
      h('select', { value: props.difficulty, onChange: event => props.setDifficulty(event.target.value) },
        h('option', { value: '' }, 'Toutes'),
        DIFFICULTY_RANGES.map(item => h('option', { key: item.value, value: item.value }, item.label))
      )
    ),
    h('div', { className: 'field' },
      h('label', null, 'Tri'),
      h('select', { value: props.sort, onChange: event => props.setSort(event.target.value) },
        h('option', { value: 'title' }, 'Titre'),
        h('option', { value: 'difficulty' }, 'Difficulté'),
        h('option', { value: 'ingredients' }, 'Ingrédients'),
        h('option', { value: 'season' }, 'Saison')
      )
    ),
    h('div', { className: 'category-row' },
      h('button', { type: 'button', className: props.category === '' ? 'chip active' : 'chip', onClick: () => props.setCategory('') }, 'Tout'),
      props.categories.map(item =>
        h('button', {
          key: item,
          type: 'button',
          className: props.category === item ? 'chip active' : 'chip',
          onClick: () => props.setCategory(item)
        }, item)
      )
    ),
    h(Button, { variant: 'subtle', className: 'reset-btn', onClick: props.onReset }, 'Réinitialiser')
  );
}

function ActiveChips({ chips }) {
  if (!chips.length) return null;
  return h('div', { className: 'active-chips', 'aria-label': 'Filtres actifs' },
    chips.map(chip => h('button', { key: chip.key, type: 'button', onClick: chip.clear }, `${chip.label} ×`))
  );
}

function AdvancedSearchModal({ open, onClose, allTags, props }) {
  if (!open) return null;
  return h('div', { className: 'modal-backdrop', role: 'presentation', onMouseDown: onClose },
    h('section', { className: 'modal-panel advanced-modal', role: 'dialog', 'aria-modal': 'true', 'aria-labelledby': 'advanced-title', onMouseDown: event => event.stopPropagation() },
      h('div', { className: 'modal-head' },
        h('div', null, h('p', { className: 'eyebrow' }, 'Filtres combinés'), h('h2', { id: 'advanced-title' }, 'Recherche avancée')),
        h('button', { type: 'button', className: 'icon-btn', onClick: onClose, 'aria-label': 'Fermer' }, '×')
      ),
      h(FilterBar, props),
      h('div', { className: 'tag-cloud' },
        h('p', { className: 'eyebrow' }, 'Tags rapides'),
        allTags.slice(0, 42).map(tag => h('button', {
          key: tag,
          type: 'button',
          className: props.tagFilter === tag ? 'chip active' : 'chip',
          onClick: () => props.setTagFilter(props.tagFilter === tag ? '' : tag)
        }, tag))
      ),
      h('div', { className: 'modal-actions' },
        h(Button, { variant: 'subtle', onClick: props.onReset }, 'Réinitialiser'),
        h(Button, { variant: 'primary', onClick: onClose }, 'Voir les résultats')
      )
    )
  );
}

function RecipeCard({ recipe, isFavorite, toggleFavorite, openRecipe, setTagFilter }) {
  const master = isMasterRecipe(recipe);
  const color = getCategoryColor(recipe);
  const categories = recipe.categories || [];
  const seasons = recipe.seasons || [];
  const style = { '--card-accent': color };
  const imageStyle = recipe.image
    ? { backgroundImage: `linear-gradient(180deg, rgba(0,0,0,.08), rgba(0,0,0,.46)), url("${recipe.image}")` }
    : style;

  return h('article', {
    className: recipe.image ? 'recipe-card has-image' : 'recipe-card',
    style,
    tabIndex: 0,
    role: 'button',
    onClick: () => openRecipe(recipe.id),
    onKeyDown: event => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        openRecipe(recipe.id);
      }
    }
  },
    h('div', { className: 'card-media', style: imageStyle },
      !recipe.image && h('span', { className: 'card-letter' }, recipe.title.slice(0, 1)),
      recipe.video && h('span', { className: 'video-badge' }, 'Vidéo'),
      !master && h('button', {
        type: 'button',
        className: isFavorite ? 'fav-btn active' : 'fav-btn',
        onClick: event => {
          event.stopPropagation();
          toggleFavorite(recipe.id);
        },
        'aria-label': isFavorite ? 'Retirer des favoris' : 'Ajouter aux favoris'
      }, isFavorite ? '\u2665' : '\u2661')
    ),
    h('div', { className: 'card-body' },
      h('div', { className: 'tag-line' }, categories.slice(0, 2).map(cat => h('span', { key: cat }, cat))),
      h('h3', null, recipe.title),
      h('p', { className: 'card-meta' },
        master
          ? h('span', null, `${getVariantRefs(recipe).length} variante${getVariantRefs(recipe).length > 1 ? 's' : ''}`)
          : [
            h('span', { key: 'difficulty' }, difficultyText(recipe)),
            h('span', { key: 'ingredients' }, `${countIngredients(recipe)} ingrédients`)
          ]
      ),
      h('div', { className: 'season-line' }, seasons.slice(0, 3).map(item => h('span', { key: item }, item))),
      h('div', { className: 'mini-tags' },
        (recipe.tagsExtracted || []).slice(0, 4).map(tag => h('button', {
          key: tag,
          type: 'button',
          onClick: event => {
            event.stopPropagation();
            setTagFilter(tag);
          }
        }, tag))
      )
    )
  );
}

function RecipeGrid({ recipes, favorites, toggleFavorite, openRecipe, setTagFilter }) {
  if (!recipes.length) {
    return h('div', { className: 'empty-state' },
      h('h2', null, 'Aucune recette ne matche'),
      h('p', null, 'Les filtres sont trop serrés pour le contenu actuel.')
    );
  }
  return h('div', { className: 'recipe-grid' },
    recipes.map(recipe => h(RecipeCard, {
      key: recipe.id,
      recipe,
      isFavorite: favorites.includes(recipe.id),
      toggleFavorite,
      openRecipe,
      setTagFilter
    }))
  );
}

function SeasonSections({ sections, favorites, toggleFavorite, openRecipe, setTagFilter, onlyFavorites, clearFavoriteView, selectedSeason, setSeason }) {
  const seasonOptions = ['Toutes', ...SEASONS];
  return h('section', { className: 'season-sections', id: 'recettes' },
    h('div', { className: 'section-title list-title' },
      h('div', null,
        h('p', { className: 'eyebrow' }, onlyFavorites ? 'Favoris' : 'Rangement saisonnier'),
        h('h2', null, onlyFavorites ? 'Mes recettes favorites' : 'Recettes par saison')
      ),
      onlyFavorites
        ? h('button', { type: 'button', onClick: clearFavoriteView }, 'Quitter les favoris')
        : h('div', { className: 'season-tabs', 'aria-label': 'Filtrer par saison' },
          seasonOptions.map(item => {
            const value = item === 'Toutes' ? '' : item;
            const active = selectedSeason === value;
            return h('button', {
              key: item,
              type: 'button',
              className: active ? 'active' : '',
              onClick: () => setSeason(value)
            }, item);
          })
        )
    ),
    sections.map(section => h('section', { key: section.key, className: 'season-block' },
      h('div', { className: 'season-block-head' },
        h('div', null, h('p', { className: 'eyebrow' }, section.kicker), h('h3', null, section.title)),
        h('span', null, `${section.recipes.length} fiche${section.recipes.length > 1 ? 's' : ''}`)
      ),
      h(RecipeGrid, { recipes: section.recipes, favorites, toggleFavorite, openRecipe, setTagFilter })
    ))
  );
}

function HomeView(props) {
  return h('main', { className: 'home-view' },
    h(Hero, {
      currentSeason: props.currentSeason
    }),
    h('div', { className: 'content-wrap' },
      h(ActiveChips, { chips: props.activeChips }),
      h(SeasonSections, {
        sections: props.sections,
        favorites: props.favorites,
        toggleFavorite: props.toggleFavorite,
        openRecipe: props.openRecipe,
        setTagFilter: props.setTagFilter,
        onlyFavorites: props.onlyFavorites,
        clearFavoriteView: props.clearFavoriteView,
        selectedSeason: props.filterProps.season,
        setSeason: props.filterProps.setSeason
      })
    )
  );
}

function SharePanel({ open, onClose, recipe }) {
  const [copied, setCopied] = useState(false);
  const canvasRef = useRef(null);
  const url = `${window.location.origin}${window.location.pathname}#recipe=${encodeURIComponent(recipe.id)}`;
  const text = `${recipe.title}\n${url}`;

  useEffect(() => {
    if (!open || !canvasRef.current || !window.QRCode) return;
    window.QRCode.toCanvas(canvasRef.current, url, {
      width: 180,
      margin: 1,
      color: { dark: '#111111', light: '#ffffff' }
    }).catch(() => {});
  }, [open, url]);

  if (!open) return null;
  return h('div', { className: 'modal-backdrop', onMouseDown: onClose },
    h('section', { className: 'modal-panel share-modal', role: 'dialog', 'aria-modal': 'true', onMouseDown: event => event.stopPropagation() },
      h('div', { className: 'modal-head' },
        h('div', null, h('p', { className: 'eyebrow' }, 'Partager'), h('h2', null, recipe.title)),
        h('button', { type: 'button', className: 'icon-btn', onClick: onClose, 'aria-label': 'Fermer' }, '×')
      ),
      h('canvas', { ref: canvasRef, className: 'qr-canvas', width: 180, height: 180 }),
      !window.QRCode && h('p', { className: 'muted' }, 'QR indisponible hors ligne tant que la librairie CDN n’a pas été chargée.'),
      h('div', { className: 'share-actions' },
        h(Button, { variant: 'primary', onClick: () => copyText(text).then(() => setCopied(true)) }, copied ? 'Copié' : 'Copier le lien'),
        h('a', { className: 'btn btn-subtle', href: `https://wa.me/?text=${encodeURIComponent(text)}`, target: '_blank', rel: 'noreferrer' }, 'WhatsApp'),
        h('a', { className: 'btn btn-subtle', href: `mailto:?subject=${encodeURIComponent(recipe.title)}&body=${encodeURIComponent(text)}` }, 'Email')
      )
    )
  );
}

function ShoppingBasketPanel({ open, onClose, recipes, removeRecipe, clearShopping }) {
  const [copied, setCopied] = useState(false);
  const text = recipes.length ? shoppingListText(recipes) : 'Liste de courses Cook Note\n\nAucune recette cochée.';
  const shareText = () => {
    if (navigator.share) {
      navigator.share({ title: 'Liste de courses Cook Note', text }).catch(() => {});
    } else {
      copyText(text).then(() => setCopied(true));
    }
  };

  useEffect(() => {
    if (open) setCopied(false);
  }, [open, recipes.length]);

  if (!open) return null;
  return h('div', { className: 'modal-backdrop', onMouseDown: onClose },
    h('section', { className: 'modal-panel shopping-modal', role: 'dialog', 'aria-modal': 'true', onMouseDown: event => event.stopPropagation() },
      h('div', { className: 'modal-head' },
        h('div', null,
          h('p', { className: 'eyebrow' }, 'Panier courses'),
          h('h2', null, recipes.length ? `${recipes.length} recette${recipes.length > 1 ? 's' : ''} cochée${recipes.length > 1 ? 's' : ''}` : 'Aucune recette')
        ),
        h('button', { type: 'button', className: 'icon-btn', onClick: onClose, 'aria-label': 'Fermer' }, '×')
      ),
      recipes.length
        ? h('div', { className: 'shopping-picked' },
            recipes.map(recipe => h('button', {
              key: recipe.id,
              type: 'button',
              onClick: () => removeRecipe(recipe.id),
              title: 'Retirer du panier courses'
            }, recipe.title, h('span', null, '×')))
          )
        : h('p', { className: 'muted' }, 'Ajoute une recette depuis sa fiche pour construire une liste groupée.'),
      h('pre', { className: 'cart-output combined-cart' }, text),
      h('div', { className: 'modal-actions' },
        h(Button, { variant: 'primary', disabled: !recipes.length, onClick: () => copyText(text).then(() => setCopied(true)) }, copied ? 'Copié' : 'Copier la liste complète'),
        h(Button, { variant: 'ghost', className: 'icon-square', disabled: !recipes.length, onClick: shareText, title: 'Partager la liste', ariaLabel: 'Partager la liste' }, '\u2197'),
        h(Button, { variant: 'ghost', className: 'icon-square', disabled: !recipes.length, onClick: () => window.print(), title: 'Imprimer la liste', ariaLabel: 'Imprimer la liste' }, '\u2399'),
        h(Button, { variant: 'subtle', disabled: !recipes.length, onClick: clearShopping }, 'Vider le panier')
      )
    )
  );
}

function VariantPickerPanel({ parent, variantRefs, recipesById, selectedVariantId, onSelect }) {
  if (!variantRefs.length) return null;
  const selectedVariant = selectedVariantId ? variantRefs.find(variant => variant.id === selectedVariantId) : null;
  const selectedRecipe = selectedVariant ? recipesById[selectedVariant.id] : null;
  if (selectedVariant && selectedRecipe) {
    const image = selectedRecipe.image || parent.image;
    return h('section', { className: 'recipe-panel variant-picker-panel variant-picker-panel-selected' },
      h('div', { className: 'panel-heading' },
        h('div', null,
          h('p', { className: 'eyebrow' }, 'Recette sélectionnée'),
          h('h2', null, selectedVariant.label || selectedRecipe.title)
        ),
        h(Button, { variant: 'subtle', onClick: () => onSelect('') }, 'Changer de recette')
      ),
      h('button', {
        type: 'button',
        className: 'variant-card active selected-variant-card',
        onClick: () => onSelect('')
      },
        h('span', {
          className: 'variant-card-media',
          style: image ? { backgroundImage: `linear-gradient(180deg, rgba(0,0,0,.06), rgba(0,0,0,.52)), url("${image}")` } : {}
        }),
        h('span', { className: 'variant-card-body' },
          h('strong', null, selectedVariant.label || selectedRecipe.title),
          h('small', null, difficultyText(selectedRecipe)),
          selectedRecipe.yield && h('small', null, selectedRecipe.yield)
        )
      )
    );
  }
  return h('section', { className: 'recipe-panel variant-picker-panel' },
    h('div', { className: 'panel-heading' },
      h('div', null,
        h('p', { className: 'eyebrow' }, 'Recettes'),
        h('h2', null, 'Choisir une recette')
      ),
      h('span', { className: 'progress-label' }, `${variantRefs.length} variante${variantRefs.length > 1 ? 's' : ''}`)
    ),
    h('div', { className: 'variant-card-grid' },
      variantRefs.map(variant => {
        const item = recipesById[variant.id];
        if (!item) return null;
        const image = item.image || parent.image;
        return h('button', {
          key: variant.id,
          type: 'button',
          className: selectedVariantId === variant.id ? 'variant-card active' : 'variant-card',
          onClick: () => onSelect(variant.id)
        },
          h('span', {
            className: 'variant-card-media',
            style: image ? { backgroundImage: `linear-gradient(180deg, rgba(0,0,0,.06), rgba(0,0,0,.52)), url("${image}")` } : {}
          }),
          h('span', { className: 'variant-card-body' },
            h('strong', null, variant.label || item.title),
            h('small', null, difficultyText(item))
          )
        );
      })
    )
  );
}

function RecipeView({
  recipe,
  isFavorite,
  toggleFavorite,
  shoppingIds,
  toggleShopping,
  openShoppingBasket,
  goHome,
  openRecipe,
  recipes,
  recipesById,
  checked,
  setCheckedWithHistory,
  canUndo,
  canRedo,
  undo,
  redo,
  setTagFilter,
  selectedVariantId: initialSelectedVariantId,
  onVariantChange
}) {
  const [factor, setFactor] = useState(1);
  const variantRefs = getVariantRefs(recipe);
  const showVariants = variantRefs.length > 0;
  const [selectedVariantId, setSelectedVariantId] = useState(() => initialSelectedVariantId || (showVariants ? '' : recipe.id));
  const selectedVariantRecipe = selectedVariantId ? recipesById[selectedVariantId] : null;
  const hasSelectedVariant = !showVariants || Boolean(selectedVariantRecipe);
  const selectedRecipe = showVariants ? (selectedVariantRecipe || recipe) : recipe;
  const inlineTargets = useMemo(() => buildInlineRecipeTargets(recipes), [recipes]);
  const detailKey = hasSelectedVariant ? selectedRecipe.id : recipe.id;
  const [shareOpen, setShareOpen] = useState(false);
  const [cookMode, setCookMode] = useState(false);
  const [timerEnd, setTimerEnd] = useState(0);
  const [timerLabel, setTimerLabel] = useState('');
  const [now, setNow] = useState(Date.now());
  const completedRef = useRef('');
  const stepTotal = hasSelectedVariant ? (selectedRecipe.steps || []).length : 0;
  const doneSteps = Object.keys(checked).filter(key => key.startsWith(`${detailKey}:step:`) && checked[key]).length;
  const progress = stepTotal ? Math.round((doneSteps / stepTotal) * 100) : 0;
  const isInShopping = hasSelectedVariant && shoppingIds.includes(detailKey);
  const canFavorite = hasSelectedVariant && !isMasterRecipe(selectedRecipe);
  const remainingMs = timerEnd ? timerEnd - now : 0;

  useEffect(() => {
    setFactor(1);
    completedRef.current = '';
  }, [recipe.id, selectedVariantId]);

  useEffect(() => {
    if (!timerEnd) return undefined;
    const interval = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(interval);
  }, [timerEnd]);

  useEffect(() => {
    if (timerEnd && timerEnd <= now) {
      setTimerEnd(0);
      setTimerLabel('');
    }
  }, [timerEnd, now]);

  useEffect(() => {
    setSelectedVariantId(initialSelectedVariantId || (showVariants ? '' : recipe.id));
  }, [initialSelectedVariantId, recipe.id]);

  useEffect(() => {
    if (!stepTotal || doneSteps !== stepTotal || completedRef.current === detailKey) return;
    completedRef.current = detailKey;
    if (window.confetti) {
      window.confetti({ particleCount: 110, spread: 70, origin: { y: .65 } });
      setTimeout(() => window.confetti({ particleCount: 50, angle: 60, spread: 55, origin: { x: 0 } }), 220);
      setTimeout(() => window.confetti({ particleCount: 50, angle: 120, spread: 55, origin: { x: 1 } }), 380);
    }
  }, [detailKey, doneSteps, stepTotal]);

  function toggle(key) {
    setCheckedWithHistory(prev => ({ ...prev, [key]: !prev[key] }));
  }

  function chooseVariant(variantId) {
    setSelectedVariantId(variantId);
    onVariantChange?.(recipe.id, variantId);
  }

  return h('main', { className: cookMode ? 'recipe-view cook-mode' : 'recipe-view' },
    h('section', {
      className: recipe.image ? 'recipe-detail-hero has-photo' : 'recipe-detail-hero',
      style: (selectedRecipe.image || recipe.image) ? { backgroundImage: `linear-gradient(90deg, rgba(4,4,5,.92), rgba(4,4,5,.50)), url("${selectedRecipe.image || recipe.image}")` } : {}
    },
      h('div', { className: 'detail-hero-copy' },
        h('button', { type: 'button', className: 'back-link', onClick: goHome }, 'Retour aux recettes'),
        h('p', { className: 'eyebrow' }, primaryCategory(recipe)),
        h('h1', null, recipe.title),
        h('div', { className: 'detail-meta' },
          showVariants && !hasSelectedVariant
            ? h('span', null, `${variantRefs.length} variante${variantRefs.length > 1 ? 's' : ''}`)
            : [
              h('span', { key: 'difficulty' }, difficultyText(selectedRecipe)),
              selectedRecipe.yield && h('span', { key: 'yield' }, selectedRecipe.yield),
              h('span', { key: 'ingredients' }, `${countIngredients(selectedRecipe)} ingrédients`),
              h('span', { key: 'steps' }, `${stepTotal} étapes`)
            ]
        ),
        h('div', { className: 'detail-actions' },
          h(Button, { variant: isInShopping ? 'primary' : 'ghost', disabled: !hasSelectedVariant, onClick: () => hasSelectedVariant && toggleShopping(detailKey) }, isInShopping ? 'Dans les courses' : 'Ajouter aux courses'),
          h(Button, { variant: cookMode ? 'primary' : 'ghost', onClick: () => setCookMode(value => !value), pressed: cookMode }, 'Mode cuisine'),
          h(Button, { variant: 'ghost', className: 'icon-square', onClick: () => setShareOpen(true), title: 'Partager', ariaLabel: 'Partager' }, '\u2197'),
          selectedRecipe.video && h('a', { className: 'btn btn-ghost', href: selectedRecipe.video, target: '_blank', rel: 'noreferrer' }, 'Voir la vidéo'),
          h(Button, { variant: 'ghost', className: 'icon-square', onClick: () => window.print(), title: 'Imprimer', ariaLabel: 'Imprimer' }, '\u2399'),
          canFavorite && h(Button, { variant: 'ghost', className: isFavorite ? 'icon-square favorite-action active' : 'icon-square favorite-action', onClick: () => toggleFavorite(detailKey), title: isFavorite ? 'Retirer des favoris' : 'Ajouter aux favoris', ariaLabel: isFavorite ? 'Retirer des favoris' : 'Ajouter aux favoris' }, isFavorite ? '\u2665' : '\u2661')
        )
      )
    ),
    cookMode && h('div', { className: 'cook-mode-bar' },
      h('strong', null, 'Mode cuisine'),
      h('span', null, `${doneSteps}/${stepTotal} étapes cochées`),
      timerEnd && remainingMs > 0
        ? h('span', { className: 'timer-pill' }, `${timerLabel} · ${formatRemaining(remainingMs)}`)
        : h('span', null, 'Aucun minuteur actif')
    ),
    showVariants && h(VariantPickerPanel, {
      parent: recipe,
      variantRefs,
      recipesById,
      selectedVariantId,
      onSelect: chooseVariant
    }),
    hasSelectedVariant && h('div', { className: 'recipe-detail-grid' },
      h('section', { className: 'recipe-panel ingredients-panel' },
        h('div', { className: 'panel-heading' },
          h('div', null, h('p', { className: 'eyebrow' }, 'Mise en place'), h('h2', null, 'Ingrédients')),
          hasSelectedVariant && h('div', { className: 'factor-control', 'aria-label': 'Multiplier les quantités' },
            [0.25, 0.5, 1, 2, 4].map(value => h('button', {
              key: value,
              type: 'button',
              className: factor === value ? 'active' : '',
              onClick: () => setFactor(value)
            }, `${String(value).replace('.', ',')}x`))
          )
        ),
        (selectedRecipe.ingredients || []).map((group, groupIndex) =>
          h('div', { className: 'ingredient-group', key: `${detailKey}:group:${groupIndex}` },
            group.recipeId && recipesById[group.recipeId]
              ? h('button', { type: 'button', className: 'ingredient-group-link', onClick: () => openRecipe(group.recipeId) }, group.group || recipesById[group.recipeId].title)
              : h('h3', null, group.group || 'Base'),
            h('ul', null, (group.items || []).map((item, itemIndex) => {
              const key = `${detailKey}:ingredient:${groupIndex}:${itemIndex}`;
              return h('li', { key },
                h('label', null,
                  h('input', { type: 'checkbox', checked: Boolean(checked[key]), onChange: () => toggle(key) }),
                  h('span', null, renderLinkedText(scaleIngredient(item, factor), inlineTargets, openRecipe))
                )
              );
            }))
          )
        )
      ),
      hasSelectedVariant && h('section', { className: 'recipe-panel steps-panel' },
        h('div', { className: 'panel-heading' },
          h('div', null, h('p', { className: 'eyebrow' }, 'Exécution'), h('h2', null, 'Étapes')),
          hasSelectedVariant && h('div', { className: 'history-actions' },
            h('button', { type: 'button', onClick: undo, disabled: !canUndo, title: 'Ctrl+Z' }, 'Annuler'),
            h('button', { type: 'button', onClick: redo, disabled: !canRedo, title: 'Ctrl+Y' }, 'Rétablir'),
            h('span', { className: 'progress-label' }, `${doneSteps}/${stepTotal}`)
          )
        ),
        hasSelectedVariant && h('div', { className: 'progress-track' }, h('span', { style: { width: `${progress}%` } })),
        h('ol', { className: 'step-list' },
          (selectedRecipe.steps || []).map((step, index) => {
            const key = `${detailKey}:step:${index}`;
            const minutes = getStepMinutes(step);
            return h('li', { key, className: checked[key] ? 'done' : '' },
              h('label', null,
                h('input', { type: 'checkbox', checked: Boolean(checked[key]), onChange: () => toggle(key) }),
                h('span', { className: 'step-number' }, String(index + 1).padStart(2, '0')),
                h('span', { className: 'step-text' }, step)
              ),
              minutes > 0 && h('button', {
                type: 'button',
                className: 'step-timer',
                onClick: () => {
                  setNow(Date.now());
                  setTimerEnd(Date.now() + minutes * 60000);
                  setTimerLabel(`Étape ${index + 1}`);
                }
              }, `${minutes} min`)
            );
          })
        )
      ),
      hasSelectedVariant && h('aside', { className: 'recipe-panel notes-panel' },
        h('p', { className: 'eyebrow' }, 'Notes'),
        h('h2', null, 'Astuces et liens'),
        (selectedRecipe.notes || []).length
          ? h('ul', null, selectedRecipe.notes.map((note, index) => h('li', { key: `${detailKey}:note:${index}`, dangerouslySetInnerHTML: { __html: sanitizeNoteHtml(note) } })))
          : h('p', null, 'Aucune note pour cette recette.'),
        (selectedRecipe.technical || recipe.technical || []).length > 0 && h('div', { className: 'technical-card' },
          h('p', { className: 'eyebrow' }, 'Fiche technique'),
          h('dl', null, (selectedRecipe.technical || recipe.technical || []).map((item, index) =>
            h(React.Fragment, { key: `${detailKey}:technical:${index}` },
              h('dt', null, item.label || item.title || 'Point clé'),
              h('dd', null, item.value || item.text || '')
            )
          ))
        )
      )
    ),
    h(SharePanel, { open: shareOpen, onClose: () => setShareOpen(false), recipe: selectedRecipe })
  );
}

function App() {
  const rawRecipes = window.RECIPES && typeof window.RECIPES === 'object' ? window.RECIPES : {};
  const recipes = useMemo(() => Object.entries(rawRecipes).map(([id, recipe]) => {
    const tagsExtracted = extractTags(recipe);
    return { id, tagsExtracted, searchText: getRecipeSearchText(recipe, tagsExtracted), ...recipe };
  }).sort((a, b) => a.title.localeCompare(b.title, 'fr')), []);
  const recipesById = useMemo(() => Object.fromEntries(recipes.map(recipe => [recipe.id, recipe])), [recipes]);
  const contentRecipes = useMemo(() => recipes.filter(recipe => !isMasterRecipe(recipe)), [recipes]);
  const catalogRecipes = useMemo(() => recipes.filter(recipe => !recipe.master), [recipes]);
  const categories = useMemo(() => uniq(catalogRecipes.flatMap(recipe => recipe.categories || [])), [catalogRecipes]);
  const allSeasons = useMemo(() => uniq([...SEASONS, ...catalogRecipes.flatMap(recipe => recipe.seasons || [])]).filter(item => item !== 'Toutes saisons'), [catalogRecipes]);
  const allTags = useMemo(() => uniq(catalogRecipes.flatMap(recipe => recipe.tagsExtracted || [])), [catalogRecipes]);
  const currentSeason = useMemo(() => getCurrentSeason(), []);

  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('');
  const [season, setSeason] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [sort, setSort] = useState('title');
  const [tagFilter, setTagFilter] = useState('');
  const [onlyFavorites, setOnlyFavorites] = useState(false);
  const [activeId, setActiveId] = useState(() => getInitialHashRecipe());
  const [variantSelection, setVariantSelection] = useState(() => {
    const recipe = getInitialHashRecipe();
    const variant = getInitialHashVariant();
    return recipe && variant ? { [recipe]: variant } : {};
  });
  const [favorites, setFavorites] = useState(() => readStoredList(STORAGE_KEYS.favorites, STORAGE_KEYS.legacyFavorites));
  const [recents, setRecents] = useState(() => readStoredList(STORAGE_KEYS.recents, STORAGE_KEYS.legacyRecents));
  const [shoppingIds, setShoppingIds] = useState(() => readStoredList(STORAGE_KEYS.shopping, []));
  const [checked, setChecked] = useState({});
  const [historyVersion, setHistoryVersion] = useState(0);
  const [advancedOpen, setAdvancedOpen] = useState(false);
  const [shoppingOpen, setShoppingOpen] = useState(false);
  const [auditOpen, setAuditOpen] = useState(false);
  const searchRef = useRef(null);
  const homeScrollRef = useRef(0);
  const historyRef = useRef([{}]);
  const historyIndexRef = useRef(0);

  const activeRecipe = activeId ? recipesById[activeId] : null;
  const shoppingRecipes = useMemo(() => shoppingIds.map(id => recipesById[id]).filter(Boolean), [shoppingIds, recipesById]);

  useEffect(() => {
    if (!activeRecipe?.master || isMasterRecipe(activeRecipe)) return;
    setVariantSelection(prev => ({ ...prev, [activeRecipe.master]: activeRecipe.id }));
    setActiveId(activeRecipe.master);
  }, [activeRecipe?.id]);

  function setCheckedWithHistory(next) {
    setChecked(prev => {
      const resolved = typeof next === 'function' ? next(prev) : next;
      historyRef.current = [...historyRef.current.slice(0, historyIndexRef.current + 1), resolved];
      historyIndexRef.current = historyRef.current.length - 1;
      setHistoryVersion(value => value + 1);
      return resolved;
    });
  }

  function undo() {
    if (historyIndexRef.current <= 0) return;
    historyIndexRef.current -= 1;
    setChecked(historyRef.current[historyIndexRef.current]);
    setHistoryVersion(value => value + 1);
  }

  function redo() {
    if (historyIndexRef.current >= historyRef.current.length - 1) return;
    historyIndexRef.current += 1;
    setChecked(historyRef.current[historyIndexRef.current]);
    setHistoryVersion(value => value + 1);
  }

  const canUndo = historyVersion >= 0 && historyIndexRef.current > 0;
  const canRedo = historyVersion >= 0 && historyIndexRef.current < historyRef.current.length - 1;

  const filteredRecipes = useMemo(() => {
    const needle = normalizeText(query);
    let list = catalogRecipes.filter(recipe => {
      if (needle && !recipe.searchText.includes(needle)) return false;
      if (category && !(recipe.categories || []).includes(category)) return false;
      if (season && !(recipe.seasons || []).includes(season)) return false;
      if (difficulty) {
        const range = DIFFICULTY_RANGES.find(item => item.value === difficulty);
        const score = Number(recipe.difficultyScore);
        if (!range || !Number.isFinite(score) || score < range.min || score > range.max) return false;
      }
      if (tagFilter && !(recipe.tagsExtracted || []).includes(tagFilter)) return false;
      if (onlyFavorites && !favorites.includes(recipe.id)) return false;
      return true;
    });

    list = [...list].sort((a, b) => {
      const order = homeCardOrder(a) - homeCardOrder(b);
      if (order) return order;
      if (sort === 'difficulty') return (Number(a.difficultyScore) || 99) - (Number(b.difficultyScore) || 99) || a.title.localeCompare(b.title, 'fr');
      if (sort === 'ingredients') return countIngredients(a) - countIngredients(b) || a.title.localeCompare(b.title, 'fr');
      if (sort === 'season') return (a.seasons || ['']).join(',').localeCompare((b.seasons || ['']).join(','), 'fr') || a.title.localeCompare(b.title, 'fr');
      return a.title.localeCompare(b.title, 'fr');
    });
    return list;
  }, [catalogRecipes, query, category, season, difficulty, sort, tagFilter, onlyFavorites, favorites]);

  const sections = useMemo(() => {
    if (onlyFavorites) {
      return [{ key: 'favorites', kicker: 'Favoris', title: 'Recettes sauvegardées', recipes: filteredRecipes }];
    }
    if (season) {
      return [{ key: `season-${season}`, kicker: season === currentSeason ? 'Saison actuelle' : 'Saison', title: season, recipes: filteredRecipes }];
    }
    return [{ key: 'all-seasons', kicker: 'Toutes', title: 'Toutes les recettes', recipes: filteredRecipes }];
  }, [currentSeason, filteredRecipes, onlyFavorites, season]);
  const activeChips = [
    query && { key: 'query', label: `Recherche: ${query}`, clear: () => setQuery('') },
    category && { key: 'category', label: category, clear: () => setCategory('') },
    season && { key: 'season', label: season, clear: () => setSeason('') },
    difficulty && { key: 'difficulty', label: `Difficulté ${DIFFICULTY_RANGES.find(item => item.value === difficulty)?.label || difficulty}`, clear: () => setDifficulty('') },
    tagFilter && { key: 'tag', label: `Tag: ${tagFilter}`, clear: () => setTagFilter('') },
    onlyFavorites && { key: 'favorites', label: 'Favoris', clear: () => setOnlyFavorites(false) }
  ].filter(Boolean);

  function persistFavorites(next) {
    setFavorites(next);
    writeJson(STORAGE_KEYS.favorites, next);
  }

  function toggleFavorite(id) {
    persistFavorites(favorites.includes(id) ? favorites.filter(item => item !== id) : [id, ...favorites]);
  }

  function persistShopping(next) {
    setShoppingIds(next);
    writeJson(STORAGE_KEYS.shopping, next);
  }

  function toggleShopping(id) {
    persistShopping(shoppingIds.includes(id) ? shoppingIds.filter(item => item !== id) : [id, ...shoppingIds]);
  }

  function removeShopping(id) {
    persistShopping(shoppingIds.filter(item => item !== id));
  }

  function clearShopping() {
    persistShopping([]);
  }

  function openRecipe(id) {
    const target = recipesById[id];
    if (!target) return;
    if (!activeRecipe) homeScrollRef.current = window.scrollY || 0;
    const parentId = target.master && !isMasterRecipe(target) ? target.master : id;
    if (target.master && !isMasterRecipe(target)) {
      setVariantSelection(prev => ({ ...prev, [parentId]: id }));
    } else {
      setVariantSelection(prev => {
        const next = { ...prev };
        delete next[parentId];
        return next;
      });
    }
    setActiveId(parentId);
    setOnlyFavorites(false);
    const nextRecents = [parentId, ...recents.filter(item => item !== parentId)].slice(0, 12);
    setRecents(nextRecents);
    writeJson(STORAGE_KEYS.recents, nextRecents);
    const nextHash = target.master
      ? `#recipe=${encodeURIComponent(parentId)}&variant=${encodeURIComponent(id)}`
      : `#recipe=${encodeURIComponent(parentId)}`;
    if (window.location.hash !== nextHash) {
      window.location.hash = nextHash.slice(1);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function selectVariant(parentId, variantId) {
    if (!variantId) {
      setVariantSelection(prev => {
        const next = { ...prev };
        delete next[parentId];
        return next;
      });
      const parentHash = `#recipe=${encodeURIComponent(parentId)}`;
      if (window.location.hash !== parentHash) window.location.hash = parentHash.slice(1);
      return;
    }
    setVariantSelection(prev => ({ ...prev, [parentId]: variantId }));
    const nextHash = `#recipe=${encodeURIComponent(parentId)}&variant=${encodeURIComponent(variantId)}`;
    if (window.location.hash !== nextHash) window.location.hash = nextHash.slice(1);
  }

  function goHome() {
    setActiveId(null);
    history.pushState('', document.title, window.location.pathname + window.location.search);
    requestAnimationFrame(() => window.scrollTo({ top: homeScrollRef.current || 0, behavior: 'auto' }));
  }

  function resetFilters() {
    setQuery('');
    setCategory('');
    setSeason('');
    setDifficulty('');
    setSort('title');
    setTagFilter('');
    setOnlyFavorites(false);
  }

  function showFavorites() {
    setOnlyFavorites(true);
    setActiveId(null);
    history.pushState('', document.title, window.location.pathname + window.location.search);
    setTimeout(() => document.getElementById('recettes')?.scrollIntoView({ behavior: 'smooth' }), 0);
  }

  useEffect(() => {
    const handleHash = () => {
      const recipe = getInitialHashRecipe();
      const variant = getInitialHashVariant();
      if (recipe && !activeId) homeScrollRef.current = window.scrollY || homeScrollRef.current || 0;
      setActiveId(recipe);
      if (!recipe) requestAnimationFrame(() => window.scrollTo({ top: homeScrollRef.current || 0, behavior: 'auto' }));
      if (recipe && variant) {
        setVariantSelection(prev => ({ ...prev, [recipe]: variant }));
      } else if (recipe) {
        setVariantSelection(prev => {
          const next = { ...prev };
          delete next[recipe];
          return next;
        });
      }
    };
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, [activeId]);

  useEffect(() => {
    const handleGoto = event => {
      const target = event.target.closest('[data-goto]');
      if (!target) return;
      const id = target.getAttribute('data-goto');
      if (!recipesById[id]) return;
      event.preventDefault();
      openRecipe(id);
    };
    document.addEventListener('click', handleGoto);
    return () => document.removeEventListener('click', handleGoto);
  }, [recipesById]);

  useEffect(() => {
    const handleKey = event => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        goHome();
        setTimeout(() => searchRef.current?.focus(), 0);
        return;
      }
      if (event.key === 'Escape') {
        if (advancedOpen) setAdvancedOpen(false);
        else if (activeRecipe && !isTypingTarget(event.target)) goHome();
        return;
      }
      if (isTypingTarget(event.target)) return;
      if (activeRecipe && (event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'z') {
        event.preventDefault();
        undo();
        return;
      }
      if (activeRecipe && (event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'y') {
        event.preventDefault();
        redo();
        return;
      }
      if (event.key.toLowerCase() === 'h') {
        goHome();
        return;
      }
      if (activeRecipe && (event.key === 'ArrowLeft' || event.key === 'ArrowRight')) {
        const index = catalogRecipes.findIndex(recipe => recipe.id === activeRecipe.id);
        if (index === -1 || !catalogRecipes.length) return;
        const nextIndex = event.key === 'ArrowLeft'
          ? (index - 1 + catalogRecipes.length) % catalogRecipes.length
          : (index + 1) % catalogRecipes.length;
        openRecipe(catalogRecipes[nextIndex].id);
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [activeRecipe, advancedOpen, catalogRecipes, canUndo, canRedo]);

  if (!recipes.length) {
    return h('div', { className: 'mc-shell' },
      h('main', { className: 'fatal-state' },
        h('h1', null, 'Recettes introuvables'),
        h('p', null, 'Le fichier recipes.js doit définir window.RECIPES avant app.js.')
      )
    );
  }

  const filterProps = {
    categories,
    seasons: allSeasons,
    category,
    setCategory,
    season,
    setSeason,
    difficulty,
    setDifficulty,
    sort,
    setSort,
    query,
    setQuery,
    tagFilter,
    setTagFilter,
    searchRef,
    onReset: resetFilters
  };

  return h('div', { className: 'mc-shell' },
    h(TopBar, {
      onHome: goHome,
      shoppingCount: shoppingRecipes.length,
      activeFilterCount: activeChips.length,
      showFavorites,
      openAdvancedSearch: () => setAdvancedOpen(true),
      openShoppingBasket: () => setShoppingOpen(true),
      query,
      setQuery,
      searchRef
    }),
    activeRecipe
      ? h(RecipeView, {
          recipe: activeRecipe,
          isFavorite: favorites.includes(variantSelection[activeRecipe.id] || activeRecipe.id),
          toggleFavorite,
          shoppingIds,
          toggleShopping,
          openShoppingBasket: () => setShoppingOpen(true),
          goHome,
          openRecipe,
          recipes,
          recipesById,
          checked,
          setCheckedWithHistory,
          canUndo,
          canRedo,
          undo,
          redo,
          setTagFilter,
          selectedVariantId: variantSelection[activeRecipe.id],
          onVariantChange: selectVariant
        })
      : h(HomeView, {
          recipes: catalogRecipes,
          totalRecipeCount: contentRecipes.length,
          filteredRecipes,
          favorites,
          currentSeason,
          sections,
          onlyFavorites,
          activeChips,
          filterProps,
          toggleFavorite,
          openRecipe,
          showFavorites,
          clearFavoriteView: () => setOnlyFavorites(false),
          setTagFilter
        }),
    h(AdvancedSearchModal, {
      open: advancedOpen,
      onClose: () => setAdvancedOpen(false),
      allTags,
      props: filterProps
    }),
    h(ShoppingBasketPanel, {
      open: shoppingOpen,
      onClose: () => setShoppingOpen(false),
      recipes: shoppingRecipes,
      removeRecipe: removeShopping,
      clearShopping
    }),
    h(AuditPanel, {
      open: auditOpen,
      onClose: () => setAuditOpen(false),
      recipes
    })
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(h(App));

requestAnimationFrame(() => {
  if (window.__cookNoteReady) {
    window.__cookNoteReady();
    return;
  }
  document.getElementById('loading-screen')?.remove();
});
