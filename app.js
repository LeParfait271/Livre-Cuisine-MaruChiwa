diff --git a/app.js b/app.js
index b7d008a958da11dc209610bce80a05b7b4448f18..a3c2ec3eb933f2f291436129db23ec7a86083f96 100644
--- a/app.js
+++ b/app.js
@@ -151,91 +151,91 @@ function copyText(text) {
   document.body.appendChild(area);
   area.select();
   document.execCommand('copy');
   area.remove();
   return Promise.resolve();
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
 
 function TopBar({ query, setQuery, onHome, favoriteCount, activeRecipe, searchRef, openAdvanced, activeFilterCount, showFavorites }) {
   return h('header', { className: 'topbar' },
     h('button', { className: 'brand', type: 'button', onClick: onHome, 'aria-label': 'Retour à l’accueil' },
-      h('span', { className: 'brand-mark' }, 'MC'),
+      h('img', { className: 'brand-logo', src: '/assets/cook-note-mark.svg', alt: 'Cook Note' }),
       h('span', { className: 'brand-copy' },
-        h('strong', null, 'Le Grimoire Culinaire'),
-        h('small', null, 'MaruChiwa')
+        h('strong', null, 'Cook Note'),
+        h('small', null, 'Cook Note')
       )
     ),
     h('label', { className: 'top-search' },
       h('span', null, 'Recherche'),
       h('input', {
         ref: searchRef,
         value: query,
         onChange: event => setQuery(event.target.value),
         placeholder: 'Nom, ingrédient, catégorie...',
         autoComplete: 'off'
       })
     ),
     h('nav', { className: 'top-actions', 'aria-label': 'Actions rapides' },
       h(Button, { variant: 'subtle', onClick: openAdvanced }, ['Recherche avancée', activeFilterCount ? h('span', { key: 'badge', className: 'filter-badge' }, activeFilterCount) : null]),
       h(Button, { variant: 'subtle', onClick: showFavorites }, `${favoriteCount} favoris`),
       h('a', { className: 'btn btn-subtle', href: '/admin' }, 'Admin')
     ),
     h('div', { className: 'topbar-status' }, activeRecipe ? 'Fiche ouverte' : 'Thème officiel')
   );
 }
 
 function Hero({ total, filteredCount, favoriteCount, currentSeason, onShowFavorites }) {
   const [slide, setSlide] = useState(0);
   useEffect(() => {
     const timer = setInterval(() => setSlide(value => (value + 1) % HERO_IMAGES.length), 6000);
     return () => clearInterval(timer);
   }, []);
 
   return h('section', {
     className: 'hero',
     style: {
       backgroundImage: `linear-gradient(110deg, rgba(4,4,5,.92), rgba(4,4,5,.54) 48%, rgba(4,4,5,.84)), url("${HERO_IMAGES[slide]}")`
     }
   },
     h('div', { className: 'hero-inner' },
       h('p', { className: 'eyebrow' }, `Saison actuelle · ${currentSeason}`),
-      h('h1', null, 'Le Grimoire Culinaire de MaruChiwa'),
+      h('h1', null, 'Cook Note'),
       h('p', { className: 'hero-lede' }, 'Recettes familiales, fiches cuisine, favoris, courses et rangement saisonnier dans une identité noir et or.'),
       h('div', { className: 'hero-actions' },
         h(Button, { variant: 'primary', onClick: onShowFavorites }, 'Voir les favoris'),
         h('a', { className: 'btn btn-ghost', href: '#recettes' }, 'Parcourir les recettes')
       ),
       h('div', { className: 'stats-row' },
         h('span', null, h('strong', null, total), ' recettes'),
         h('span', null, h('strong', null, filteredCount), ' affichées'),
         h('span', null, h('strong', null, favoriteCount), ' favoris')
       )
     )
   );
 }
 
 function FilterBar(props) {
   return h('section', { className: 'filters-panel', 'aria-label': 'Filtres de recettes' },
     h('div', { className: 'field wide' },
       h('label', null, 'Recherche'),
       h('input', {
         value: props.query,
         onChange: event => props.setQuery(event.target.value),
         placeholder: 'Carbonara, citron, dessert, four...'
       })
     ),
     h('div', { className: 'field' },
@@ -380,85 +380,62 @@ function RecipeGrid({ recipes, favorites, toggleFavorite, openRecipe, setTagFilt
       isFavorite: favorites.includes(recipe.id),
       toggleFavorite,
       openRecipe,
       setTagFilter
     }))
   );
 }
 
 function SeasonSections({ sections, favorites, toggleFavorite, openRecipe, setTagFilter, onlyFavorites, clearFavoriteView }) {
   return h('section', { className: 'season-sections', id: 'recettes' },
     h('div', { className: 'section-title list-title' },
       h('p', { className: 'eyebrow' }, onlyFavorites ? 'Favoris' : 'Rangement saisonnier'),
       h('h2', null, onlyFavorites ? 'Mes recettes favorites' : 'Recettes par saison'),
       onlyFavorites && h('button', { type: 'button', onClick: clearFavoriteView }, 'Quitter les favoris')
     ),
     sections.map(section => h('section', { key: section.key, className: 'season-block' },
       h('div', { className: 'season-block-head' },
         h('div', null, h('p', { className: 'eyebrow' }, section.kicker), h('h3', null, section.title)),
         h('span', null, `${section.recipes.length} recette${section.recipes.length > 1 ? 's' : ''}`)
       ),
       h(RecipeGrid, { recipes: section.recipes, favorites, toggleFavorite, openRecipe, setTagFilter })
     ))
   );
 }
 
-function Spotlight({ recipes, openRecipe }) {
-  if (!recipes.length) return null;
-  return h('section', { className: 'spotlight' },
-    h('div', { className: 'section-title' },
-      h('p', { className: 'eyebrow' }, 'Sélection rapide'),
-      h('h2', null, 'À cuisiner en premier')
-    ),
-    h('div', { className: 'spotlight-grid' },
-      recipes.slice(0, 3).map(recipe => h('button', {
-        key: recipe.id,
-        type: 'button',
-        className: 'spotlight-card',
-        onClick: () => openRecipe(recipe.id)
-      },
-        h('span', { className: 'spotlight-kicker' }, primaryCategory(recipe)),
-        h('strong', null, recipe.title),
-        h('small', null, `${countIngredients(recipe)} ingrédients · ${DIFFICULTY_LABELS[recipe.difficulty] || 'Recette'}`)
-      ))
-    )
-  );
-}
-
 function HomeView(props) {
   return h('main', { className: 'home-view' },
     h(Hero, {
       total: props.recipes.length,
       filteredCount: props.filteredRecipes.length,
       favoriteCount: props.favorites.length,
       currentSeason: props.currentSeason,
       onShowFavorites: props.showFavorites
     }),
     h('div', { className: 'content-wrap' },
       h(FilterBar, props.filterProps),
       h(ActiveChips, { chips: props.activeChips }),
-      h(Spotlight, { recipes: props.featuredRecipes, openRecipe: props.openRecipe }),
       h(SeasonSections, {
         sections: props.sections,
         favorites: props.favorites,
         toggleFavorite: props.toggleFavorite,
         openRecipe: props.openRecipe,
         setTagFilter: props.setTagFilter,
         onlyFavorites: props.onlyFavorites,
         clearFavoriteView: props.clearFavoriteView
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
