// =====================================================
//  Le Grimoire Culinaire de MaruChiwa — app.js
//  v5 — Correction écran noir + améliorations
// =====================================================

const { useState, useEffect, useRef, useMemo, useCallback } = React;

// ─── localStorage helpers ───────────────────────────────────────────
const ls = {
  get: (key, fallback) => { try { return JSON.parse(localStorage.getItem(key)) ?? fallback; } catch { return fallback; } },
  set: (key, val)      => { try { localStorage.setItem(key, JSON.stringify(val)); } catch {} },
};

const loadFavorites = () => ls.get('cuisine_favs', []);
const loadTheme     = () => localStorage.getItem('cuisine_theme') || 'auto';
const loadSort      = () => localStorage.getItem('cuisine_sort')  || 'default';
const loadRecents   = () => ls.get('cuisine_recents', []);
const loadNotes     = () => ls.get('cuisine_notes', {});

// ─── Portion helpers ────────────────────────────────────────────────
const parseNum = (s) => {
  s = s.trim().replace(',', '.');
  if (s.includes('/')) { const [a, b] = s.split('/'); return parseFloat(a) / parseFloat(b); }
  return parseFloat(s);
};

const fmtNum = (n) => {
  if (n <= 0) return '0';
  const fracs = [[1/4,'¼'],[1/3,'⅓'],[1/2,'½'],[2/3,'⅔'],[3/4,'¾']];
  for (const [val, sym] of fracs) if (Math.abs(n - val) < 0.04) return sym;
  if (n % 1 === 0) return n.toLocaleString('fr-FR');
  const r = Math.round(n * 10) / 10;
  return (r % 1 === 0 ? r : r.toFixed(1)).toLocaleString('fr-FR').replace('.', ',');
};

const parseIngr = (str) => {
  const m = str.match(/^(\d+(?:[.,]\d+)?(?:\/\d+)?)(\s*[–\-]\s*\d+(?:[.,]\d+)?)?([\s\S]*)$/);
  if (!m) return null;
  const n1 = parseNum(m[1]);
  let n2 = null;
  if (m[2]) { const r2 = m[2].match(/\d+(?:[.,]\d+)?/); if (r2) n2 = parseNum(r2[0]); }
  return { n1, n2, after: m[3] };
};

const multiplyIngr = (str, factor) => {
  if (factor === 1) return str;
  const p = parseIngr(str);
  if (!p) return str;
  return p.n2 !== null
    ? `${fmtNum(p.n1 * factor)}–${fmtNum(p.n2 * factor)}${p.after}`
    : `${fmtNum(p.n1 * factor)}${p.after}`;
};

const multiplyYield = (yieldStr, factor) => {
  if (factor === 1 || !yieldStr) return yieldStr;
  return yieldStr.replace(/\d+(?:[.,]\d+)?(?:\s*[–\-]\s*\d+(?:[.,]\d+)?)?/, (match) => {
    const p = parseIngr(match.trim() + ' ');
    if (!p) return match;
    return p.n2 !== null ? `${fmtNum(p.n1*factor)}–${fmtNum(p.n2*factor)}` : fmtNum(p.n1*factor);
  });
};

// ─── Timer extraction ────────────────────────────────────────────────
const extractMinutes = (step) => {
  const h = step.match(/(\d+)\s*h(?:eure)?s?(?:\s*(\d+)\s*(?:min|mn)?)?/i);
  if (h) return parseInt(h[1]) * 60 + (h[2] ? parseInt(h[2]) : 0);
  const m = step.match(/(\d+)\s*(?:min|mn|minute)/i);
  return m ? parseInt(m[1]) : null;
};

// ─── Tags ───────────────────────────────────────────────────────────
const extractTags = (recipe) => {
  const tags = new Set();
  (recipe.tags || []).forEach(t => tags.add(t.toLowerCase()));
  (recipe.ingredients || []).forEach(g =>
    (g.items || []).forEach(item =>
      item.toLowerCase().split(/\s+/).forEach(w => {
        w = w.replace(/[^a-zàâäéèêëïîôùûüç]/g, '');
        if (w.length > 3 && !['pour','avec','sans','dans'].includes(w)) tags.add(w);
      })
    )
  );
  return Array.from(tags);
};

// ─── Guard ──────────────────────────────────────────────────────────
if (!window.RECIPES || typeof window.RECIPES !== 'object') {
  console.error('[Grimoire] window.RECIPES est undefined');
  window.RECIPES = {};
}

const RECIPE_TAGS = Object.fromEntries(
  Object.entries(window.RECIPES).map(([id, r]) => [id, extractTags(r)])
);

// ─── Helpers divers ─────────────────────────────────────────────────
const launchConfetti = () => {
  if (!window.confetti) return;
  confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
  setTimeout(() => confetti({ particleCount: 50, angle: 60, spread: 55, origin: { x: 0 } }), 250);
  setTimeout(() => confetti({ particleCount: 50, angle: 120, spread: 55, origin: { x: 1 } }), 400);
};

const getDailySlide = (total) => {
  const now = new Date();
  return Math.floor((now - new Date(now.getFullYear(), 0, 0)) / 86400000) % total;
};

// ─── Couleurs ───────────────────────────────────────────────────────
const CAT_COLORS = { /* ... reste identique ... */ };
const CAT_CARD_ACCENT = { /* ... reste identique ... */ };
const getCatColor = (cat) => CAT_COLORS[cat] || { bg:'rgba(251,191,36,.1)', border:'rgba(251,191,36,.3)', text:'#d97706' };
const pretty = (id) => id.split('_').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');

const COLORS = { /* ... reste identique ... */ };

// ErrorBoundary, StepTimer, etc. restent identiques
// (je les ai gardés tels quels pour ne pas alourdir)

class ErrorBoundary extends React.Component {
  constructor(p) { super(p); this.state = { hasError: false }; }
  static getDerivedStateFromError() { return { hasError: true }; }
  componentDidCatch(e, i) { console.error('[Grimoire]', e, i); }
  render() {
    if (this.state.hasError)
      return React.createElement('div', { style: { background:'rgba(0,0,0,.65)', padding:16, borderRadius:12, color:'#fff' } },
        React.createElement('h3', { style:{margin:'0 0 10px'} }, "Oups, un souci d'affichage"),
        React.createElement('button', { onClick:()=>location.reload(), style:{padding:'6px 10px',borderRadius:8,cursor:'pointer'} }, 'Recharger')
      );
    return this.props.children;
  }
}

// StepTimer reste identique (je ne le recopie pas ici pour gagner de la place, garde le tien)

function LivreCuisineIndex() {

  // ─── State ──────────────────────────────────────────────
  const [view, setView]           = useState('index');
  const [q, setQ]                 = useState('');
  const [diffFilter, setDiff]     = useState('');
  const [tagFilter, setTag]       = useState('');
  const [seasonFilter, setSeason] = useState('');
  const [favorites, setFavorites] = useState(loadFavorites);
  const [checked, setChecked]     = useState({ ingredients: new Set(), steps: new Set() });
  const [factor, setFactor]       = useState(1);
  const [theme, setTheme]         = useState(loadTheme);
  const [sort, setSort]           = useState(loadSort);
  const [recents, setRecents]     = useState(loadRecents);
  const [notes, setNotes]         = useState(loadNotes);
  const [showShare, setShare]     = useState(false);
  const [showCart, setCart]       = useState(false);
  const [showSearch, setSearch]   = useState(false);
  const [showBackTop, setBackTop] = useState(false);

  // ─── Refs ────────────────────────────────────────────────
  const scrollRef  = useRef({});
  const bgRef      = useRef(null);
  const progRef    = useRef(null);
  const searchRef  = useRef(null);
  const [heroSlide] = useState(() => getDailySlide(3));

  // ─── Undo/Redo ───────────────────────────────────────────
  const ckHistoryRef = useRef([]);
  const ckHistIdxRef = useRef(-1);
  const [ckVersion, setCkVersion] = useState(0);

  const saveCheckpoint = useCallback((nc) => {
    ckHistoryRef.current = [...ckHistoryRef.current.slice(0, ckHistIdxRef.current + 1), nc];
    ckHistIdxRef.current = ckHistoryRef.current.length - 1;
    setCkVersion(v => v + 1);
  }, []);

  const undo = useCallback(() => {
    if (ckHistIdxRef.current <= 0) return;
    ckHistIdxRef.current -= 1;
    setChecked(ckHistoryRef.current[ckHistIdxRef.current]);
    setCkVersion(v => v + 1);
  }, []);

  const redo = useCallback(() => {
    if (ckHistIdxRef.current >= ckHistoryRef.current.length - 1) return;
    ckHistIdxRef.current += 1;
    setChecked(ckHistoryRef.current[ckHistIdxRef.current]);
    setCkVersion(v => v + 1);
  }, []);

  const canUndo = ckHistIdxRef.current > 0;
  const canRedo = ckHistIdxRef.current < ckHistoryRef.current.length - 1;

  // ─── Fonction go (déplacée plus haut) ─────────────────────
  const go = useCallback((to) => {
    scrollRef.current[view] = window.scrollY;
    window.history.pushState({ view: to }, '');
    setView(to); 
    setFactor(1);
    setShare(false); 
    setCart(false); 
    setSearch(false);

    if (to !== 'index') {
      setChecked({ ingredients: new Set(), steps: new Set() });
      ckHistoryRef.current = []; 
      ckHistIdxRef.current = -1;
      setCkVersion(0);

      if (to !== '__favs__') {
        setRecents(prev => {
          const next = [to, ...prev.filter(id => id !== to)];
          ls.set('cuisine_recents', next.slice(0, 20));
          return next;
        });
      }
    }
    setTimeout(() => window.scrollTo(0, to === 'index' ? (scrollRef.current['index'] || 0) : 0), 0);
  }, [view]);

  // ─── Liens data-goto (corrigé) ───────────────────────────
  useEffect(() => {
    const handleClick = (e) => {
      const el = e.target.closest('[data-goto]');
      if (el) {
        e.preventDefault();
        go(el.dataset.goto);
      }
    };
    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, [go]);

  // Le reste du code (useEffect scroll, thème, clavier, etc.) reste identique
  // ... (je peux te le renvoyer en plusieurs parties si besoin)

  // Pour gagner de la place ici, dis-moi si tu veux que je te donne le fichier **complet** en une seule fois ou par morceaux.

  return React.createElement(ErrorBoundary, null,
    React.createElement('div', { /* ... reste du return ... */ })
  );
}

// ─── Mount ───────────────────────────────────────────────────────────
const _root = ReactDOM.createRoot(document.getElementById('root'));

if (!window.RECIPES || Object.keys(window.RECIPES).length === 0) {
  console.error('[Grimoire] RECIPES non chargé');
} else {
  _root.render(React.createElement(LivreCuisineIndex));
}

requestAnimationFrame(() => window.__gremoireReady?.());