/* global React, ReactDOM, QRCode */

const { useEffect, useMemo, useRef, useState } = React;
const h = React.createElement;

const HERO_IMAGE = '/assets/base-principale-fond-site.jpg';
const COOK_NOTE_LOGO = '/assets/cook-note.png';

const SEASONS = ['Printemps', 'Été', 'Automne', 'Hiver'];
const DIFFICULTY_LABELS = { easy: 'Facile', medium: 'Intermédiaire', hard: 'Technique' };
const CATEGORY_ACCENTS = {
  'Apéro': '#8d6343',
  'Entrées': '#425320',
  'Plats': '#762e0c',
  'Desserts': '#976937',
  'Petits-déjeuners': '#db6507',
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
  shoppingFactors: 'cook_note_shopping_factors',
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

function sortVariantRefs(variantRefs, recipesById = {}) {
  return [...variantRefs].sort((a, b) => {
    const left = a.label || recipesById[a.id]?.title || a.id;
    const right = b.label || recipesById[b.id]?.title || b.id;
    return left.localeCompare(right, 'fr', { sensitivity: 'base' });
  });
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

function scaleYield(text, factor) {
  const value = String(text || '');
  if (factor === 1 || !value) return value;
  let scaledCount = 0;
  return value.replace(/(\d+(?:[.,]\d+)?(?:\/\d+)?)(\s*(?:[–-]|à|a)\s*(\d+(?:[.,]\d+)?(?:\/\d+)?))?/gi, (match, firstRaw, rangeSep, secondRaw, offset, fullText) => {
    const after = fullText.slice(offset + match.length).trimStart().toLowerCase();
    const isDetailAmount = scaledCount > 0 && /^(?:g|kg|mg|ml|cl|cm|mm)\b/.test(after);
    if (isDetailAmount) return match;
    const first = parseAmount(firstRaw);
    const second = secondRaw ? parseAmount(secondRaw) : null;
    if (!Number.isFinite(first)) return match;
    scaledCount += 1;
    if (second !== null && Number.isFinite(second)) {
      return `${formatNumber(first * factor)}${rangeSep}${formatNumber(second * factor)}`;
    }
    return formatNumber(first * factor);
  });
}

function scaleYieldDisplay(text, factor) {
  const value = String(text || '');
  if (factor === 1 || !value) return value;
  const amountPattern = String.raw`\d+(?:[.,]\d+)?(?:\/\d+)?`;
  const rangeSeparatorPattern = String.raw`\s*(?:[\u2013\u2014-]|\u00e0|a)\s*`;
  const quantityPattern = new RegExp(String.raw`(^|pour\s+|ou\s+)(${amountPattern})(${rangeSeparatorPattern}(${amountPattern}))?`, 'gi');
  const detailUnitPattern = /^(?:\D*\d+(?:[.,]\d+)?(?:\/\d+)?\s*)?(?:g|kg|mg|ml|cl|cm|mm)\b/;
  let scaledCount = 0;
  return value.replace(quantityPattern, (match, prefix, firstRaw, rangeFull, secondRaw, offset, fullText) => {
    const after = fullText.slice(offset + match.length).trimStart().toLowerCase();
    if (scaledCount > 0 && detailUnitPattern.test(after)) return match;
    const first = parseAmount(firstRaw);
    const second = secondRaw ? parseAmount(secondRaw) : null;
    if (!Number.isFinite(first)) return match;
    scaledCount += 1;
    if (second !== null && Number.isFinite(second)) {
      const separator = rangeFull.slice(0, rangeFull.length - secondRaw.length);
      return `${prefix}${formatNumber(first * factor)}${separator}${formatNumber(second * factor)}`;
    }
    return `${prefix}${formatNumber(first * factor)}`;
  });
}

function recipeShoppingLines(recipe, factor = 1) {
  return (recipe.ingredients || []).flatMap(group => [
    group.group ? `# ${group.group}` : '# Base',
    ...(group.items || []).map(item => `- ${scaleIngredient(item, factor)}`)
  ]);
}

function shoppingListText(recipes, factorById = {}) {
  const groups = new Map();
  recipes.forEach(recipe => {
    recipeShoppingLines(recipe, factorById[recipe.id] || 1).forEach(line => {
      if (line.startsWith('# ')) return;
      const item = line.replace(/^-\s*/, '');
      const rayon = shoppingAisleFor(item);
      if (!groups.has(rayon)) groups.set(rayon, []);
      groups.get(rayon).push(`${item} (${recipe.title})`);
    });
  });
  const order = ['Fruits & légumes', 'Crèmerie', 'Boucherie & poisson', 'Épicerie', 'Boulangerie', 'Surgelé', 'Autre'];
  const blocks = order
    .filter(group => groups.has(group))
    .map(group => [`## ${group}`, ...groups.get(group).sort((a, b) => a.localeCompare(b, 'fr')).map(item => `- ${item}`)].join('\n'));
  return ['Liste de courses Cook Note', '', ...blocks].join('\n\n');
}

function shoppingAisleFor(item) {
  const text = normalizeText(item);
  if (/(tomate|avocat|epinard|salade|citron|orange|poire|fraise|framboise|abricot|oignon|ail|persil|basilic|thym|legume|pomme|carotte|courgette)/.test(text)) return 'Fruits & légumes';
  if (/(lait|creme|beurre|oeuf|oeufs|mascarpone|ricotta|fromage|parmesan|yaourt|babeurre)/.test(text)) return 'Crèmerie';
  if (/(porc|cochon|lardon|poisson|viande|poulet|jambon|saumon)/.test(text)) return 'Boucherie & poisson';
  if (/(farine|sucre|sel|poivre|huile|vinaigre|chocolat|cacao|vanille|levure|bicarbonate|poudre|amande|noisette|praline|pistache|chapelure|cranberr|speculoos|riz|pate|miel|sirop)/.test(text)) return 'Épicerie';
  if (/(pain|brioche|croissant|tortilla|wrap)/.test(text)) return 'Boulangerie';
  if (/(surgele|glacon|glace)/.test(text)) return 'Surgelé';
  return 'Autre';
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

function TopBar({ onHome, shoppingCount, showFavorites, openShoppingBasket, query, setQuery, searchRef }) {
  return h('header', { className: 'topbar' },
    h('div', { className: 'top-left' },
      h(Button, { variant: 'subtle', onClick: onHome }, 'Accueil')
    ),
    h('nav', { className: 'top-actions', 'aria-label': 'Actions rapides' },
      h('a', {
        className: 'btn btn-subtle',
        href: 'mailto:cooknote271@gmail.com?subject=Demande%20d%27ajout%20de%20recette%20Cook%20Note&body=Bonjour%2C%0A%0AJ%27aimerais%20demander%20l%27ajout%20de%20cette%20recette%20dans%20Cook%20Note%20%3A%0A%0ANom%20de%20la%20recette%20%3A%0AIngr%C3%A9dients%20%3A%0A%C3%89tapes%20%3A%0A%0AMerci.'
      }, 'Demander une recette'),
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

function Hero() {
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

function ActiveChips({ chips }) {
  if (!chips.length) return null;
  return h('div', { className: 'active-chips', 'aria-label': 'Filtres actifs' },
    chips.map(chip => h('button', { key: chip.key, type: 'button', onClick: chip.clear }, `${chip.label} ×`))
  );
}

function RecipeCard({ recipe, isFavorite, toggleFavorite, openRecipe, setTagFilter }) {
  const master = isMasterRecipe(recipe);
  const color = getCategoryColor(recipe);
  const categories = recipe.categories || [];
  const style = { '--card-accent': color };
  const imageStyle = recipe.image
    ? { backgroundImage: `url("${recipe.image}")` }
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
      !master && h('div', { className: 'tag-line' }, categories.slice(0, 1).map(cat => h('span', { key: cat }, cat))),
      h('h3', null, recipe.title),
      h('p', { className: 'card-meta' },
        master
          ? h('span', null, `${getVariantRefs(recipe).length} recette${getVariantRefs(recipe).length > 1 ? 's' : ''}`)
          : h('span', null, `${countIngredients(recipe)} ingrédients`)
      ),
      !master && h('div', { className: 'mini-tags card-overlay-tags' },
        (recipe.tagsExtracted || []).slice(0, 2).map(tag => h('button', {
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
    h(Hero),
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

function ShoppingBasketPanel({ open, onClose, recipes, factorById, removeRecipe, clearShopping }) {
  const [copied, setCopied] = useState(false);
  const text = recipes.length ? shoppingListText(recipes, factorById) : 'Liste de courses Cook Note\n\nAucune recette cochee.';
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

function VariantPickerPanel({ parent, variantRefs, recipesById, selectedVariantId, onSelect, factor = 1 }) {
  const sortedVariantRefs = sortVariantRefs(variantRefs, recipesById);
  if (!sortedVariantRefs.length) return null;
  const selectedVariant = selectedVariantId ? sortedVariantRefs.find(variant => variant.id === selectedVariantId) : null;
  const selectedRecipe = selectedVariant ? recipesById[selectedVariant.id] : null;
  if (selectedVariant && selectedRecipe) {
    const image = selectedRecipe.image || parent.image;
    const panelStyle = image
      ? { backgroundImage: `linear-gradient(90deg, rgba(4,4,5,.86), rgba(4,4,5,.58) 48%, rgba(4,4,5,.30)), url("${image}")` }
      : {};
    return h('section', { className: 'recipe-panel variant-picker-panel variant-picker-panel-selected', style: panelStyle },
      h('div', { className: 'panel-heading' },
        h('div', null,
          h('p', { className: 'eyebrow' }, 'Recette sélectionnée'),
          h('h2', null, selectedVariant.label || selectedRecipe.title),
          h('p', { className: 'selected-recipe-meta' },
            difficultyText(selectedRecipe),
            selectedRecipe.yield && h(React.Fragment, null, ' · ', scaleYieldDisplay(selectedRecipe.yield, factor))
          )
        ),
        h(Button, { variant: 'subtle', onClick: () => onSelect('') }, 'Changer de recette')
      )
    );
  }
  return h('section', { className: 'recipe-panel variant-picker-panel' },
    h('div', { className: 'panel-heading' },
      h('div', null,
        h('p', { className: 'eyebrow' }, 'Recettes'),
        h('h2', null, 'Choisir une recette')
      ),
      h('span', { className: 'progress-label' }, `${sortedVariantRefs.length} variante${sortedVariantRefs.length > 1 ? 's' : ''}`)
    ),
    h('div', { className: 'variant-card-grid' },
      sortedVariantRefs.map(variant => {
        const item = recipesById[variant.id];
        if (!item) return null;
        const image = item.image || parent.image;
        return h('button', {
          key: variant.id,
          type: 'button',
          className: selectedVariantId === variant.id ? 'variant-card active' : 'variant-card',
          onClick: () => onSelect(variant.id)
        },
          image && h('span', { className: 'variant-card-bg', style: { backgroundImage: `url("${image}")` } }),
          h('span', { className: 'variant-card-body' },
            h('strong', null, variant.label || item.title)
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
  const variantRefs = useMemo(() => sortVariantRefs(getVariantRefs(recipe), recipesById), [recipe.id, recipesById]);
  const showVariants = variantRefs.length > 0;
  const [selectedVariantId, setSelectedVariantId] = useState(() => initialSelectedVariantId || (showVariants ? '' : recipe.id));
  const selectedVariantRecipe = selectedVariantId ? recipesById[selectedVariantId] : null;
  const hasSelectedVariant = !showVariants || Boolean(selectedVariantRecipe);
  const selectedRecipe = showVariants ? (selectedVariantRecipe || recipe) : recipe;
  const inlineTargets = useMemo(() => buildInlineRecipeTargets(recipes), [recipes]);
  const detailKey = hasSelectedVariant ? selectedRecipe.id : recipe.id;
  const [shareOpen, setShareOpen] = useState(false);
  const [cookMode, setCookMode] = useState(false);
  const [mobileDetailTab, setMobileDetailTab] = useState('ingredients');
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
    setMobileDetailTab('ingredients');
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

  const heroUsesHomeImage = showVariants;
  const heroImage = heroUsesHomeImage ? HERO_IMAGE : (selectedRecipe.image || recipe.image);
  const heroStyle = heroImage
    ? {
      backgroundImage: heroUsesHomeImage
        ? `linear-gradient(110deg, rgba(4,4,5,.92), rgba(4,4,5,.54) 48%, rgba(4,4,5,.84)), url("${heroImage}")`
        : `linear-gradient(90deg, rgba(4,4,5,.92), rgba(4,4,5,.50)), url("${heroImage}")`
    }
    : {};

  return h('main', { className: cookMode ? 'recipe-view cook-mode' : 'recipe-view' },
    h('section', {
      className: heroImage ? (heroUsesHomeImage ? 'recipe-detail-hero has-photo parent-hero' : 'recipe-detail-hero has-photo') : 'recipe-detail-hero',
      style: heroStyle
    },
      h('div', { className: 'detail-hero-copy' },
        h('button', { type: 'button', className: 'back-link', onClick: goHome }, 'Retour aux recettes'),
        heroUsesHomeImage && h('img', { className: 'detail-hero-logo', src: COOK_NOTE_LOGO, alt: 'Cook Note' }),
        h('p', { className: 'eyebrow' }, primaryCategory(recipe)),
        h('h1', null, recipe.title),
        h('div', { className: 'detail-meta' },
          showVariants && !hasSelectedVariant
            ? h('span', null, `${variantRefs.length} variante${variantRefs.length > 1 ? 's' : ''}`)
            : [
              h('span', { key: 'difficulty' }, difficultyText(selectedRecipe)),
              selectedRecipe.yield && h('span', { key: 'yield' }, scaleYieldDisplay(selectedRecipe.yield, factor)),
              h('span', { key: 'ingredients' }, `${countIngredients(selectedRecipe)} ingrédients`),
              h('span', { key: 'steps' }, `${stepTotal} étapes`)
            ]
        ),
        h('div', { className: 'detail-actions' },
          h(Button, { variant: isInShopping ? 'primary' : 'ghost', disabled: !hasSelectedVariant, onClick: () => hasSelectedVariant && toggleShopping(detailKey, factor) }, isInShopping ? 'Dans les courses' : 'Ajouter aux courses'),
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
      onSelect: chooseVariant,
      factor
    }),
    hasSelectedVariant && h('div', { className: 'recipe-tabs', 'aria-label': 'Sections de la recette' },
      [
        ['ingredients', 'Ingrédients'],
        ['steps', 'Étapes'],
        ['notes', 'Notes']
      ].map(([key, label]) => h('button', {
        key,
        type: 'button',
        className: mobileDetailTab === key ? 'active' : '',
        onClick: () => setMobileDetailTab(key)
      }, label))
    ),
    hasSelectedVariant && h('div', { className: 'recipe-detail-grid' },
      h('section', { className: mobileDetailTab === 'ingredients' ? 'recipe-panel ingredients-panel active-tab-panel' : 'recipe-panel ingredients-panel' },
        h('div', { className: 'panel-heading' },
          h('div', null, h('p', { className: 'eyebrow' }, 'Mise en place'), h('h2', null, 'Ingrédients')),
          hasSelectedVariant && h('div', { className: 'factor-control', 'aria-label': 'Multiplier les quantités' },
            [0.25, 0.5, 1, 2].map(value => h('button', {
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
      hasSelectedVariant && h('section', { className: mobileDetailTab === 'steps' ? 'recipe-panel steps-panel active-tab-panel' : 'recipe-panel steps-panel' },
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
      hasSelectedVariant && h('aside', { className: mobileDetailTab === 'notes' ? 'recipe-panel notes-panel active-tab-panel' : 'recipe-panel notes-panel' },
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
  const catalogRecipes = useMemo(() => recipes.filter(recipe => !recipe.master), [recipes]);
  const allSeasons = useMemo(() => uniq([...SEASONS, ...catalogRecipes.flatMap(recipe => recipe.seasons || [])]).filter(item => item !== 'Toutes saisons'), [catalogRecipes]);
  const currentSeason = useMemo(() => getCurrentSeason(), []);

  const [query, setQuery] = useState('');
  const [season, setSeason] = useState('');
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
  const [shoppingFactors, setShoppingFactors] = useState(() => readJson(STORAGE_KEYS.shoppingFactors, {}));
  const [checked, setChecked] = useState({});
  const [historyVersion, setHistoryVersion] = useState(0);
  const [shoppingOpen, setShoppingOpen] = useState(false);
  const searchRef = useRef(null);
  const homeScrollRef = useRef(0);
  const restoreHomeScrollRef = useRef(false);
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
      if (season && !(recipe.seasons || []).includes(season)) return false;
      if (tagFilter && !(recipe.tagsExtracted || []).includes(tagFilter)) return false;
      if (onlyFavorites && !favorites.includes(recipe.id)) return false;
      return true;
    });

    list = [...list].sort((a, b) => {
      const order = homeCardOrder(a) - homeCardOrder(b);
      if (order) return order;
      return a.title.localeCompare(b.title, 'fr');
    });
    return list;
  }, [catalogRecipes, query, season, tagFilter, onlyFavorites, favorites]);

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
    season && { key: 'season', label: season, clear: () => setSeason('') },
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

  function persistShoppingFactors(next) {
    setShoppingFactors(next);
    writeJson(STORAGE_KEYS.shoppingFactors, next);
  }

  function toggleShopping(id, factor = 1) {
    if (shoppingIds.includes(id)) {
      persistShopping(shoppingIds.filter(item => item !== id));
      const nextFactors = { ...shoppingFactors };
      delete nextFactors[id];
      persistShoppingFactors(nextFactors);
      return;
    }
    persistShopping([id, ...shoppingIds]);
    persistShoppingFactors({ ...shoppingFactors, [id]: factor });
  }

  function removeShopping(id) {
    persistShopping(shoppingIds.filter(item => item !== id));
    const nextFactors = { ...shoppingFactors };
    delete nextFactors[id];
    persistShoppingFactors(nextFactors);
  }

  function clearShopping() {
    persistShopping([]);
    persistShoppingFactors({});
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
    restoreHomeScrollRef.current = Boolean(activeRecipe);
    setActiveId(null);
    history.pushState('', document.title, window.location.pathname + window.location.search);
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
      if (!recipe) restoreHomeScrollRef.current = true;
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
    if (activeRecipe || !restoreHomeScrollRef.current) return;
    restoreHomeScrollRef.current = false;
    const top = homeScrollRef.current || 0;
    requestAnimationFrame(() => requestAnimationFrame(() => window.scrollTo({ top, behavior: 'auto' })));
  }, [activeRecipe]);

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
        if (activeRecipe && !isTypingTarget(event.target)) goHome();
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
  }, [activeRecipe, catalogRecipes, canUndo, canRedo]);

  if (!recipes.length) {
    return h('div', { className: 'mc-shell' },
      h('main', { className: 'fatal-state' },
        h('h1', null, 'Recettes introuvables'),
        h('p', null, 'Le fichier recipes.js doit définir window.RECIPES avant app.js.')
      )
    );
  }

  const filterProps = {
    seasons: allSeasons,
    season,
    setSeason
  };

  return h('div', { className: 'mc-shell' },
    h(TopBar, {
      onHome: goHome,
      shoppingCount: shoppingRecipes.length,
      showFavorites,
      openShoppingBasket: () => setShoppingOpen(true),
      query,
      setQuery,
      searchRef
    }),
    h('nav', { className: 'mobile-bottom-nav', 'aria-label': 'Navigation mobile' },
      h('button', { type: 'button', onClick: goHome }, h('span', null, '⌂'), 'Accueil'),
      h('button', { type: 'button', onClick: () => searchRef.current?.focus() }, h('span', null, '⌕'), 'Recherche'),
      h('button', { type: 'button', onClick: showFavorites }, h('span', null, '♥'), 'Favoris'),
      h('button', { type: 'button', onClick: () => setShoppingOpen(true) }, h('span', null, '🛒'), 'Courses')
    ),
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
          favorites,
          sections,
          onlyFavorites,
          activeChips,
          filterProps,
          toggleFavorite,
          openRecipe,
          clearFavoriteView: () => setOnlyFavorites(false),
          setTagFilter
        }),
    h(ShoppingBasketPanel, {
      open: shoppingOpen,
      onClose: () => setShoppingOpen(false),
      recipes: shoppingRecipes,
      factorById: shoppingFactors,
      removeRecipe: removeShopping,
      clearShopping
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
