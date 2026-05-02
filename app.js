// =====================================================
//  Le Grimoire Culinaire de MaruChiwa — app.js
//  v3 — Corrections & améliorations :
//    • Undo/Redo : useRef pour éviter les closures stale
//    • scrollPct via ref DOM (pas de re-render à chaque scroll)
//    • RECIPE_TAGS précalculé hors composant
//    • Thème auto réactif au changement d'OS
//    • Styles partagés extraits en constantes
//    • Titres échappés via textContent (sécurité XSS)
//    • Filtres actifs visibles + badge de comptage
//    • Meilleur affichage mobile (toolbar condensée)
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

// ─── Tags — précalculé UNE SEULE FOIS hors composant ────────────────
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

const RECIPE_TAGS = Object.fromEntries(
  Object.entries(window.RECIPES).map(([id, r]) => [id, extractTags(r)])
);

// ─── Misc helpers ────────────────────────────────────────────────────
const generateQR = (url) =>
  `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(url)}`;

const launchConfetti = () => {
  if (!window.confetti) return;
  confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
  setTimeout(() => confetti({ particleCount: 50, angle: 60,  spread: 55, origin: { x: 0 } }), 250);
  setTimeout(() => confetti({ particleCount: 50, angle: 120, spread: 55, origin: { x: 1 } }), 400);
};

const getDailySlide = (total) => {
  const now = new Date();
  return Math.floor((now - new Date(now.getFullYear(), 0, 0)) / 86400000) % total;
};

// ─── Couleurs catégories ─────────────────────────────────────────────
const CAT_COLORS = {
  'Apéro':            { bg:'rgba(168,85,247,.15)',  border:'rgba(168,85,247,.4)',  text:'#a855f7' },
  'Entrées':          { bg:'rgba(34,197,94,.15)',   border:'rgba(34,197,94,.4)',   text:'#16a34a' },
  'Plats':            { bg:'rgba(251,191,36,.15)',  border:'rgba(251,191,36,.4)',  text:'#d97706' },
  'Desserts':         { bg:'rgba(236,72,153,.15)',  border:'rgba(236,72,153,.4)',  text:'#db2777' },
  'Petits-déjeuners': { bg:'rgba(14,165,233,.15)',  border:'rgba(14,165,233,.4)',  text:'#0284c7' },
  'Favoris':          { bg:'rgba(239,68,68,.15)',   border:'rgba(239,68,68,.4)',   text:'#dc2626' },
};
const CAT_CARD_ACCENT = {
  'Apéro':'rgba(168,85,247,.07)', 'Entrées':'rgba(34,197,94,.07)',
  'Plats':'rgba(251,191,36,.07)', 'Desserts':'rgba(236,72,153,.07)',
  'Petits-déjeuners':'rgba(14,165,233,.07)',
};
const getCatColor  = (cat) => CAT_COLORS[cat] || { bg:'rgba(251,191,36,.1)', border:'rgba(251,191,36,.3)', text:'#d97706' };
const pretty       = (id)  => id.split('_').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');

// ─── Thème ───────────────────────────────────────────────────────────
const COLORS = {
  dark:  { bg:'rgba(0,0,0,0.55)',       bgGlass:'rgba(15,15,15,0.72)',   card:'rgba(25,25,25,.72)',
           text:'#fff',                  textSec:'rgba(255,255,255,.6)',  border:'rgba(255,255,255,.1)',
           accent:'#fbbf24',             accentSec:'#f59e0b',             progress:'#fbbf24' },
  light: { bg:'rgba(255,255,255,0.72)', bgGlass:'rgba(255,255,255,0.88)', card:'rgba(255,255,255,.82)',
           text:'#111',                  textSec:'rgba(0,0,0,.6)',        border:'rgba(0,0,0,.08)',
           accent:'#d97706',             accentSec:'#ea580c',             progress:'#d97706' },
};

// ─── Error Boundary ──────────────────────────────────────────────────
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

// ─── StepTimer ───────────────────────────────────────────────────────
const StepTimer = ({ minutes, C }) => {
  const [running, setRunning] = useState(false);
  const [left, setLeft]       = useState(minutes * 60);
  const intervalRef           = useRef(null);

  useEffect(() => {
    if (!running) return;
    intervalRef.current = setInterval(() => setLeft(p => {
      if (p <= 1) { clearInterval(intervalRef.current); setRunning(false); return 0; }
      return p - 1;
    }), 1000);
    return () => clearInterval(intervalRef.current);
  }, [running]);

  const reset = () => { clearInterval(intervalRef.current); setRunning(false); setLeft(minutes * 60); };
  const mm    = String(Math.floor(left / 60)).padStart(2, '0');
  const ss    = String(left % 60).padStart(2, '0');
  const pct   = left / (minutes * 60);
  const color = left === 0 ? '#ef4444' : pct < 0.25 ? '#f59e0b' : '#10b981';

  return React.createElement('div', {
    onClick: e => e.stopPropagation(),
    style: { display:'inline-flex', alignItems:'center', gap:6, marginTop:6,
             padding:'4px 10px', borderRadius:20, border:`1px solid ${color}40`,
             background:`${color}15`, userSelect:'none' }
  },
    React.createElement('span', { style:{ fontSize:13, fontWeight:700, color, fontVariantNumeric:'tabular-nums' } },
      left === 0 ? '⏰ Terminé !' : `⏱ ${mm}:${ss}`),
    React.createElement('button', {
      onClick: e => { e.stopPropagation(); left === 0 ? reset() : setRunning(p => !p); },
      style: { background:'none', border:'none', cursor:'pointer', fontSize:14, padding:'0 2px', color, fontFamily:'inherit' }
    }, running ? '⏸' : left === 0 ? '↺' : '▶'),
    !running && left < minutes * 60 && left > 0 &&
      React.createElement('button', {
        onClick: e => { e.stopPropagation(); reset(); },
        style: { background:'none', border:'none', cursor:'pointer', fontSize:11, padding:'0 2px', color:C.textSec, fontFamily:'inherit' }
      }, '↺')
  );
};

// ════════════════════════════════════════════════════════════
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

  // ─── Undo/Redo — CORRIGÉ : refs pour éviter stale closures ─
  const ckHistoryRef = useRef([]);
  const ckHistIdxRef = useRef(-1);
  const [ckVersion, setCkVersion] = useState(0); // déclenche re-render quand l'historique change

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

  // ─── Refs ────────────────────────────────────────────────
  const scrollRef  = useRef({});
  const bgRef      = useRef(null);
  const progRef    = useRef(null);
  const searchRef  = useRef(null);
  const [heroSlide] = useState(() => getDailySlide(3));

  const HERO_IMAGES = [
    'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1920&q=80',
    'https://images.unsplash.com/photo-1556912167-f556f1f39faa?w=1920&q=80',
    'https://images.unsplash.com/photo-1543362906-acfc16c67564?w=1920&q=80',
  ];

  // ─── Scroll : parallax + progress bar SANS re-render ────
  useEffect(() => {
    const handle = () => {
      const sy = window.scrollY;
      if (bgRef.current)
        bgRef.current.style.transform = `scale(1.04) translateY(${sy * 0.25}px)`;
      if (progRef.current) {
        const dh = document.documentElement.scrollHeight - window.innerHeight;
        progRef.current.style.width = dh > 0 ? `${Math.min(100, (sy / dh) * 100)}%` : '0%';
      }
      setBackTop(sy > 320);
    };
    window.addEventListener('scroll', handle, { passive: true });
    return () => window.removeEventListener('scroll', handle);
  }, []);

  // ─── Thème auto — réactif au changement d'OS ─────────────
  const [osDark, setOsDark] = useState(() =>
    window.matchMedia('(prefers-color-scheme: dark)').matches
  );
  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const h = (e) => setOsDark(e.matches);
    mq.addEventListener('change', h);
    return () => mq.removeEventListener('change', h);
  }, []);

  const actualTheme = theme === 'auto' ? (osDark ? 'dark' : 'light') : theme;
  const C = COLORS[actualTheme];

  // ─── Styles partagés — construits une fois par thème ─────
  const btnBase = {
    padding:'9px 12px', borderRadius:10, border:`1px solid ${C.border}`,
    background:C.bgGlass, backdropFilter:'blur(10px)', color:C.text,
    cursor:'pointer', transition:'all 0.2s', fontFamily:'inherit',
  };
  const cardStyle = {
    background:C.card, backdropFilter:'blur(12px)', border:`1px solid ${C.border}`,
    borderRadius:16, padding:'14px 16px', boxShadow:'0 2px 16px rgba(0,0,0,.12)',
    cursor:'pointer', transition:'all 0.25s', position:'relative', overflow:'hidden',
  };
  const modalBg = {
    position:'fixed', top:0, left:0, right:0, bottom:0,
    background:'rgba(0,0,0,.78)', zIndex:99999,
    display:'flex', alignItems:'center', justifyContent:'center',
    padding:20, animation:'fadeIn 0.2s',
  };
  const modalBox = {
    background:C.card, backdropFilter:'blur(24px)', borderRadius:18,
    padding:'24px 28px', width:'100%', border:`1px solid ${C.border}`,
    animation:'slideUp 0.3s ease-out',
  };

  // ─── History API ─────────────────────────────────────────
  useEffect(() => {
    window.history.replaceState({ view:'index' }, '');
    const handlePop = (e) => {
      const v = e.state?.view ?? 'index';
      setView(v); setFactor(1);
      setShare(false); setCart(false); setSearch(false);
      if (v !== 'index') setChecked({ ingredients:new Set(), steps:new Set() });
      setTimeout(() => window.scrollTo(0, scrollRef.current[v] || 0), 0);
    };
    window.addEventListener('popstate', handlePop);
    return () => window.removeEventListener('popstate', handlePop);
  }, []);

  const go = useCallback((to) => {
    scrollRef.current[view] = window.scrollY;
    window.history.pushState({ view:to }, '');
    setView(to); setFactor(1);
    setShare(false); setCart(false); setSearch(false);
    if (to !== 'index') {
      setChecked({ ingredients:new Set(), steps:new Set() });
      ckHistoryRef.current = []; ckHistIdxRef.current = -1;
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

  // ─── Clavier ─────────────────────────────────────────────
  useEffect(() => {
    const handle = (e) => {
      const inInput = ['INPUT','TEXTAREA','SELECT'].includes(document.activeElement.tagName);
      if (e.key === 'Escape') {
        if (showShare || showCart || showSearch) { setShare(false); setCart(false); setSearch(false); }
        else if (view !== 'index') window.history.back();
        return;
      }
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') { e.preventDefault(); searchRef.current?.focus(); return; }
      if (e.key === 'h' && !e.ctrlKey && !e.metaKey && !inInput && view !== 'index') { go('index'); return; }
      if ((e.ctrlKey || e.metaKey) && e.key === 'z' && !e.shiftKey) { e.preventDefault(); undo(); return; }
      if ((e.ctrlKey || e.metaKey) && (e.key === 'y' || (e.key === 'z' && e.shiftKey))) { e.preventDefault(); redo(); return; }
      if (!inInput && view !== 'index' && view !== '__favs__') {
        const ids = Object.keys(window.RECIPES), idx = ids.indexOf(view);
        if (e.key === 'ArrowLeft'  && idx > 0)              go(ids[idx - 1]);
        if (e.key === 'ArrowRight' && idx < ids.length - 1) go(ids[idx + 1]);
      }
    };
    window.addEventListener('keydown', handle);
    return () => window.removeEventListener('keydown', handle);
  }, [view, showShare, showCart, showSearch, undo, redo, go]);

  // ─── Confetti quand recette terminée ─────────────────────
  useEffect(() => {
    if (view === 'index' || view === '__favs__') return;
    const r = window.RECIPES[view];
    if (r && (r.steps || []).length > 0 && checked.steps.size === r.steps.length) launchConfetti();
  }, [checked.steps, view]);

  // ─── Favoris ─────────────────────────────────────────────
  const toggleFav = (id, e) => {
    e?.stopPropagation();
    setFavorites(prev => {
      const next = prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id];
      ls.set('cuisine_favs', next); return next;
    });
  };

  // ─── Coches ──────────────────────────────────────────────
  const toggleIngr = (key) => setChecked(prev => {
    const s = new Set(prev.ingredients);
    s.has(key) ? s.delete(key) : s.add(key);
    const ns = { ...prev, ingredients:s }; saveCheckpoint(ns); return ns;
  });
  const toggleStep = (i) => setChecked(prev => {
    const s = new Set(prev.steps);
    s.has(i) ? s.delete(i) : s.add(i);
    const ns = { ...prev, steps:s }; saveCheckpoint(ns); return ns;
  });

  // ─── Notes perso ─────────────────────────────────────────
  const updateNote = (id, val) => setNotes(prev => {
    const next = { ...prev, [id]:val }; ls.set('cuisine_notes', next); return next;
  });

  // ─── UI utils ────────────────────────────────────────────
  const diffColors = { easy:'#10b981', medium:'#f59e0b', hard:'#ef4444' };
  const diffLabels = { easy:'Facile', medium:'Moyen', hard:'Difficile' };

  const Pill = ({ level }) =>
    React.createElement('span', {
      title: diffLabels[level] || level,
      style: { display:'inline-block', width:10, height:10, borderRadius:5, flexShrink:0,
               background:diffColors[level] || '#9ca3af',
               boxShadow:`0 0 4px ${diffColors[level] || '#9ca3af'}70` }
    });

  // ─── Memos ───────────────────────────────────────────────
  const allTags = useMemo(() => {
    const t = new Set();
    Object.values(window.RECIPES).forEach(r => extractTags(r).forEach(x => t.add(x)));
    return Array.from(t).sort();
  }, []);

  const allSeasons = useMemo(() => {
    const s = new Set();
    Object.values(window.RECIPES).forEach(r => (r.seasons || []).forEach(x => s.add(x)));
    return Array.from(s).sort();
  }, []);

  const totalRecipes = Object.keys(window.RECIPES).length;
  const totalCats    = new Set(Object.values(window.RECIPES).flatMap(r => r.categories || [])).size;

  // ─── Filtres ─────────────────────────────────────────────
  const passQuery = (id, r) => {
    if (diffFilter && r.difficulty !== diffFilter) return false;
    if (tagFilter  && !RECIPE_TAGS[id]?.includes(tagFilter.toLowerCase())) return false;
    if (seasonFilter && !(r.seasons || []).includes(seasonFilter)) return false;
    if (!q) return true;
    const hay = [(r.title || pretty(id)), JSON.stringify(r.ingredients||''), JSON.stringify(r.steps||'')].join(' ').toLowerCase();
    return hay.includes(q.toLowerCase());
  };

  const activeFilterCount = [diffFilter, tagFilter, seasonFilter, q].filter(Boolean).length;

  // ─── Tri ─────────────────────────────────────────────────
  const sortRecipes = (list) => {
    const cp = [...list];
    if (sort === 'alpha')     return cp.sort((a,b) => (a[1].title||pretty(a[0])).localeCompare(b[1].title||pretty(b[0])));
    if (sort === 'alpha-rev') return cp.sort((a,b) => (b[1].title||pretty(b[0])).localeCompare(a[1].title||pretty(a[0])));
    if (sort === 'fav-first') return cp.sort((a,b) => {
      const af=favorites.includes(a[0])?0:1, bf=favorites.includes(b[0])?0:1;
      if (af!==bf) return af-bf;
      return (a[1].title||pretty(a[0])).localeCompare(b[1].title||pretty(b[0]));
    });
    if (sort === 'recent') return cp.sort((a,b) => {
      const ai=recents.indexOf(a[0]), bi=recents.indexOf(b[0]);
      if (ai===-1&&bi===-1) return 0; if (ai===-1) return 1; if (bi===-1) return -1;
      return ai-bi;
    });
    return cp.sort((a,b) => (a[1].title||pretty(a[0])).localeCompare(b[1].title||pretty(b[0])));
  };

  const categoriesOrder = ['Favoris','Petits-déjeuners','Apéro','Entrées','Plats','Desserts'];

  // ════════════════════════════════════════════════════════
  // TOOLBAR
  // ════════════════════════════════════════════════════════
  const renderToolbar = () => ReactDOM.createPortal(
    React.createElement('div', {
      style: { position:'fixed', top:10, right:10, zIndex:10001,
               display:'flex', gap:6, alignItems:'center', flexWrap:'wrap', maxWidth:'calc(100vw - 20px)' }
    },
      // Thème
      React.createElement('button', {
        onClick: () => { const n=theme==='dark'?'light':theme==='light'?'auto':'dark'; setTheme(n); localStorage.setItem('cuisine_theme',n); },
        title:`Thème: ${theme}`, style:{ ...btnBase, fontSize:14, fontWeight:600 }
      }, theme==='dark'?'🌙':theme==='light'?'☀️':'🌗'),

      // Recherche avancée (avec badge si filtres actifs)
      view==='index' && React.createElement('button', {
        onClick: ()=>setSearch(true), title:'Recherche avancée',
        style: { ...btnBase, fontSize:14, position:'relative' }
      },
        '🔍',
        activeFilterCount > 0 && React.createElement('span', {
          style: { position:'absolute', top:-5, right:-5, width:16, height:16, borderRadius:'50%',
                   background:'#ef4444', color:'#fff', fontSize:10, fontWeight:700,
                   display:'flex', alignItems:'center', justifyContent:'center' }
        }, activeFilterCount)
      ),

      // Tri
      view==='index' && React.createElement('select', {
        value:sort, onChange:e=>{ setSort(e.target.value); ls.set('cuisine_sort',e.target.value); },
        style: { padding:'8px 10px', borderRadius:10, border:`1px solid ${C.border}`,
                 background:C.bgGlass, backdropFilter:'blur(10px)', color:C.text,
                 cursor:'pointer', fontSize:13, fontWeight:600, fontFamily:'inherit' }
      },
        React.createElement('option', { value:'default' }, 'Tri : Défaut'),
        React.createElement('option', { value:'alpha'   }, 'A → Z'),
        React.createElement('option', { value:'alpha-rev'}, 'Z → A'),
        React.createElement('option', { value:'fav-first'}, 'Favoris'),
        React.createElement('option', { value:'recent'  }, 'Récentes')
      ),

      // Favoris
      favorites.length > 0 && React.createElement('button', {
        onClick:()=>go('__favs__'), title:'Mes favoris',
        style:{ ...btnBase, color:'#ef4444', fontSize:14, fontWeight:700 }
      }, `❤️ ${favorites.length}`),

      // Barre de recherche
      React.createElement('input', {
        ref:searchRef, value:q, onChange:e=>setQ(e.target.value),
        placeholder:'Rechercher… (⌘K)',
        style: { width:160, padding:'9px 12px', borderRadius:10, border:`1px solid ${C.border}`,
                 background:C.bgGlass, backdropFilter:'blur(10px)', color:C.text,
                 outline:'none', fontSize:13, fontFamily:'inherit' }
      })
    ),
    document.body
  );

  // ════════════════════════════════════════════════════════
  // CHIPS FILTRES ACTIFS
  // ════════════════════════════════════════════════════════
  const renderActiveFilters = () => {
    const chips = [];
    if (q)            chips.push({ label:`"${q}"`,        clear:()=>setQ('') });
    if (diffFilter)   chips.push({ label:diffLabels[diffFilter], clear:()=>setDiff('') });
    if (tagFilter)    chips.push({ label:`#${tagFilter}`, clear:()=>setTag('') });
    if (seasonFilter) chips.push({ label:seasonFilter,    clear:()=>setSeason('') });
    if (!chips.length) return null;
    return React.createElement('div', {
      style: { display:'flex', gap:6, flexWrap:'wrap', marginBottom:16, alignItems:'center' }
    },
      React.createElement('span', { style:{ fontSize:12, color:C.textSec, opacity:.7 } }, 'Filtres actifs :'),
      ...chips.map(({label,clear},i) =>
        React.createElement('span', { key:i,
          style: { display:'inline-flex', alignItems:'center', gap:5, fontSize:12, padding:'3px 10px',
                   borderRadius:20, background:`${C.accent}20`, color:C.accent,
                   border:`1px solid ${C.accent}40`, cursor:'default' }
        },
          label,
          React.createElement('button', { onClick:clear,
            style:{ background:'none', border:'none', color:C.accent, cursor:'pointer', fontSize:13, lineHeight:1, padding:'0 0 0 2px', fontFamily:'inherit' }
          }, '×')
        )
      ),
      React.createElement('button', {
        onClick:()=>{ setQ(''); setDiff(''); setTag(''); setSeason(''); },
        style:{ fontSize:12, color:C.textSec, background:'none', border:'none', cursor:'pointer', textDecoration:'underline', fontFamily:'inherit' }
      }, 'Tout effacer')
    );
  };

  // ════════════════════════════════════════════════════════
  // MODALES
  // ════════════════════════════════════════════════════════
  const ShareModal = () => {
    const url   = window.location.href;
    const title = window.RECIPES[view]?.title || 'Recette';
    const copied = useRef(false);
    const [didCopy, setDidCopy] = useState(false);
    return ReactDOM.createPortal(
      React.createElement('div', { onClick:()=>setShare(false), style:modalBg },
        React.createElement('div', { onClick:e=>e.stopPropagation(), style:{ ...modalBox, maxWidth:440 } },
          React.createElement('h3', { style:{ margin:'0 0 18px', fontSize:18, color:C.text } }, '📤 Partager cette recette'),
          React.createElement('div', { style:{ display:'flex', flexDirection:'column', gap:10 } },
            React.createElement('button', {
              onClick: () => { navigator.clipboard?.writeText(url); setDidCopy(true); setTimeout(()=>setDidCopy(false),2000); },
              style:{ ...btnBase, textAlign:'left', padding:'12px 16px' }
            }, didCopy ? '✅ Lien copié !' : '📋 Copier le lien'),
            React.createElement('a', {
              href:`mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent('Recette : '+url)}`,
              style:{ ...btnBase, textAlign:'left', padding:'12px 16px', textDecoration:'none', display:'block' }
            }, '📧 Par email'),
            React.createElement('a', {
              href:`https://wa.me/?text=${encodeURIComponent(title+' : '+url)}`,
              target:'_blank', rel:'noopener noreferrer',
              style:{ ...btnBase, textAlign:'left', padding:'12px 16px', textDecoration:'none', display:'block' }
            }, '💬 WhatsApp'),
            React.createElement('button', { onClick:()=>setShare(false), style:{ ...btnBase, marginTop:4 } }, 'Fermer')
          )
        )
      ),
      document.body
    );
  };

  const ShoppingModal = () => {
    const r = window.RECIPES[view];
    if (!r) return null;
    const items = (r.ingredients || []).flatMap(g => (g.items||[]).map(item => multiplyIngr(item, factor)));
    const [copied, setCopied] = useState(false);
    return ReactDOM.createPortal(
      React.createElement('div', { onClick:()=>setCart(false), style:modalBg },
        React.createElement('div', { onClick:e=>e.stopPropagation(),
          style:{ ...modalBox, maxWidth:480, maxHeight:'80vh', overflowY:'auto' } },
          React.createElement('h3', { style:{ margin:'0 0 16px', fontSize:18, color:C.text } }, '🛒 Liste de courses'),
          React.createElement('div', { style:{ marginBottom:16 } },
            items.map((item,i) =>
              React.createElement('div', { key:i,
                style:{ padding:'7px 0', borderBottom:`1px solid ${C.border}`, fontSize:14, color:C.text }
              }, '• '+item)
            )
          ),
          React.createElement('div', { style:{ display:'flex', gap:8 } },
            React.createElement('button', {
              onClick:()=>{ navigator.clipboard?.writeText(items.join('\n')); setCopied(true); setTimeout(()=>setCopied(false),2000); },
              style:{ ...btnBase, flex:1 }
            }, copied ? '✅ Copié !' : '📋 Copier'),
            React.createElement('button', { onClick:()=>setCart(false), style:{ ...btnBase, flex:1 } }, 'Fermer')
          )
        )
      ),
      document.body
    );
  };

  const AdvSearchModal = () => {
    const [tQ, setTQ]         = useState(q);
    const [tDiff, setTDiff]   = useState(diffFilter);
    const [tTag, setTTag]     = useState(tagFilter);
    const [tSeason, setTSeason] = useState(seasonFilter);
    const apply = () => { setQ(tQ); setDiff(tDiff); setTag(tTag); setSeason(tSeason); setSearch(false); };
    const reset = () => { setTQ(''); setTDiff(''); setTTag(''); setTSeason(''); };
    return ReactDOM.createPortal(
      React.createElement('div', { onClick:()=>setSearch(false), style:modalBg },
        React.createElement('div', { onClick:e=>e.stopPropagation(), style:{ ...modalBox, maxWidth:500 } },
          React.createElement('h3', { style:{ margin:'0 0 20px', fontSize:18, color:C.text } }, '🔍 Recherche avancée'),
          // Mots-clés
          labelField('Mots-clés', C,
            React.createElement('input', { value:tQ, onChange:e=>setTQ(e.target.value),
              placeholder:'Nom, ingrédients, étapes…',
              onKeyDown:e=>e.key==='Enter'&&apply(),
              style:{ width:'100%', padding:'10px 12px', borderRadius:10, border:`1px solid ${C.border}`,
                      background:C.bg, color:C.text, fontSize:14, outline:'none', boxSizing:'border-box', fontFamily:'inherit' }
            })
          ),
          // Difficulté
          labelField('Difficulté', C,
            React.createElement('div', { style:{ display:'flex', gap:8 } },
              ['','easy','medium','hard'].map(d =>
                React.createElement('button', { key:d, onClick:()=>setTDiff(d),
                  style:{ flex:1, padding:'8px', borderRadius:8, fontFamily:'inherit',
                          border:tDiff===d?`2px solid ${d?diffColors[d]:C.accent}`:`1px solid ${C.border}`,
                          background:tDiff===d?(d?diffColors[d]+'25':C.accent+'25'):C.bg,
                          color:tDiff===d?(d?diffColors[d]:C.accent):C.text,
                          cursor:'pointer', fontSize:12, fontWeight:700, transition:'0.15s' }
                }, d===''?'Toutes':diffLabels[d])
              )
            )
          ),
          // Saison
          allSeasons.length > 0 && labelField('Saison', C,
            React.createElement('div', { style:{ display:'flex', gap:8, flexWrap:'wrap' } },
              ['', ...allSeasons].map(s =>
                React.createElement('button', { key:s, onClick:()=>setTSeason(s),
                  style:{ padding:'6px 12px', borderRadius:8, fontFamily:'inherit',
                          border:tSeason===s?`2px solid ${C.accent}`:`1px solid ${C.border}`,
                          background:tSeason===s?C.accent+'25':C.bg,
                          color:tSeason===s?C.accent:C.text,
                          cursor:'pointer', fontSize:12, fontWeight:600, transition:'0.15s' }
                }, s===''?'Toutes':s)
              )
            )
          ),
          // Tag
          labelField('Tag ingrédient', C,
            React.createElement('select', { value:tTag, onChange:e=>setTTag(e.target.value),
              style:{ width:'100%', padding:'10px 12px', borderRadius:10, border:`1px solid ${C.border}`,
                      background:C.bg, color:C.text, fontSize:14, cursor:'pointer', boxSizing:'border-box', fontFamily:'inherit' }
            },
              React.createElement('option', { value:'' }, 'Tous les tags'),
              allTags.slice(0,100).map(t => React.createElement('option', { key:t, value:t }, t))
            )
          ),
          // Actions
          React.createElement('div', { style:{ display:'flex', gap:10, marginTop:4 } },
            React.createElement('button', { onClick:apply,
              style:{ flex:1, padding:'12px', borderRadius:10, border:'none', background:C.accentSec,
                      color:'#fff', cursor:'pointer', fontWeight:700, fontSize:14, fontFamily:'inherit' }
            }, '🔍 Rechercher'),
            React.createElement('button', { onClick:reset,
              style:{ padding:'12px 16px', borderRadius:10, border:`1px solid ${C.border}`,
                      background:C.bg, color:C.textSec, cursor:'pointer', fontSize:13, fontFamily:'inherit' }
            }, '↺ Réinitialiser'),
            React.createElement('button', { onClick:()=>setSearch(false),
              style:{ padding:'12px 16px', borderRadius:10, border:`1px solid ${C.border}`,
                      background:C.bg, color:C.text, cursor:'pointer', fontSize:14, fontFamily:'inherit' }
            }, 'Annuler')
          )
        )
      ),
      document.body
    );
  };

  // ════════════════════════════════════════════════════════
  // INDEX VIEW
  // ════════════════════════════════════════════════════════
  const renderIndex = () => {
    const isFavView = view === '__favs__';
    let entries = Object.entries(window.RECIPES);
    if (isFavView) entries = entries.filter(([id]) => favorites.includes(id));
    const filtered = entries.filter(([id, r]) => passQuery(id, r));
    const sorted   = sortRecipes(filtered);

    const groups = {};
    sorted.forEach(([id, r]) => {
      const cats = isFavView ? ['Favoris'] : (r.categories || ['Autres']);
      cats.forEach(cat => { if (!groups[cat]) groups[cat] = []; groups[cat].push([id, r]); });
    });
    const orderedCats = categoriesOrder.filter(c => groups[c])
      .concat(Object.keys(groups).filter(c => !categoriesOrder.includes(c)));

    return React.createElement(React.Fragment, null,

      // ── Hero ──
      React.createElement('div', {
        style:{ display:'flex', alignItems:'center', justifyContent:'center', gap:20,
                marginBottom:32, animation:'fadeIn 0.6s ease-out', flexWrap:'wrap' }
      },
        // Filtres difficulté (panneau gauche)
        React.createElement('div', {
          style:{ padding:'10px 14px', background:C.bgGlass, backdropFilter:'blur(12px)',
                  borderRadius:12, lineHeight:1.7, border:`1px solid ${C.border}`,
                  flexShrink:0, boxShadow:'0 2px 12px rgba(0,0,0,.12)' }
        },
          React.createElement('div', { style:{ fontSize:10, fontWeight:700, textTransform:'uppercase',
            letterSpacing:1, opacity:.5, marginBottom:4, color:C.textSec } }, 'Difficulté'),
          ['easy','medium','hard'].map(d =>
            React.createElement('div', { key:d, onClick:()=>setDiff(p=>p===d?'':d), role:'button',
              style:{ display:'flex', alignItems:'center', gap:8, cursor:'pointer', padding:'2px 7px',
                      borderRadius:6, marginBottom:1,
                      background:diffFilter===d?`${diffColors[d]}20`:'transparent',
                      border:diffFilter===d?`1px solid ${diffColors[d]}60`:'1px solid transparent',
                      transition:'0.15s' }
            },
              React.createElement('span', { style:{ width:9, height:9, borderRadius:'50%',
                background:diffColors[d], display:'inline-block', flexShrink:0,
                boxShadow:diffFilter===d?`0 0 6px ${diffColors[d]}`:'none' } }),
              React.createElement('span', { style:{ color:C.text, fontSize:12,
                fontWeight:diffFilter===d?700:400 } }, diffLabels[d])
            )
          )
        ),

        // Titre + stats
        React.createElement('div', { style:{ textAlign:'center' } },
          React.createElement('h1', {
            style:{ fontSize:46, fontWeight:800, margin:0, lineHeight:1.1,
                    background:'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)',
                    WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent',
                    backgroundClip:'text', animation:'slideDown 0.6s ease-out' }
          }, isFavView ? '❤️ Mes Favoris' : 'Le Grimoire Culinaire'),
          !isFavView && React.createElement('div', { style:{ fontSize:15, opacity:.7, margin:'4px 0 0', color:C.text, fontStyle:'italic' } },
            'de MaruChiwa'),
          !isFavView && React.createElement('div', {
            style:{ display:'flex', gap:8, justifyContent:'center', marginTop:12, flexWrap:'wrap' }
          },
            pill(`📖 ${totalRecipes} recettes`, C),
            pill(`🏷 ${totalCats} catégories`, C),
            favorites.length > 0 && pillAccent(`❤️ ${favorites.length} favoris`)
          ),
          isFavView && React.createElement('p', { style:{ fontSize:15, opacity:.8, margin:'8px 0 0', color:C.text } },
            `${favorites.length} recette${favorites.length>1?'s':''} sauvegardée${favorites.length>1?'s':''}`)
        )
      ),

      // ── Chips saison ──
      allSeasons.length > 0 && React.createElement('div', {
        style:{ display:'flex', gap:8, flexWrap:'wrap', marginBottom:20, justifyContent:'center', alignItems:'center' }
      },
        ['', ...allSeasons].map(s =>
          React.createElement('button', { key:s, onClick:()=>setSeason(s),
            style:{ padding:'4px 12px', borderRadius:20, fontSize:12, fontWeight:600, cursor:'pointer', transition:'0.15s',
                    border:seasonFilter===s?`1px solid ${C.accent}`:`1px solid ${C.border}`,
                    background:seasonFilter===s?`${C.accent}25`:C.bgGlass,
                    backdropFilter:'blur(8px)', color:seasonFilter===s?C.accent:C.textSec, fontFamily:'inherit' }
          }, s===''?'🗓 Toutes saisons':'🗓 '+s)
        )
      ),

      // ── Chips filtres actifs ──
      renderActiveFilters(),

      // ── Résultats vides ──
      filtered.length===0 && React.createElement('div', {
        style:{ textAlign:'center', padding:60, color:C.text, fontSize:18, opacity:.6 }
      }, '🔎 Aucune recette trouvée. Essayez d\'autres filtres.'),

      // ── Groupes ──
      ...orderedCats.map(cat => {
        const cc = getCatColor(cat);
        return React.createElement('div', { key:cat, style:{ marginBottom:36 } },
          React.createElement('div', { style:{ display:'flex', alignItems:'center', gap:10, marginBottom:14 } },
            React.createElement('h2', { style:{ fontSize:15, fontWeight:800, margin:0, padding:'5px 14px',
              borderRadius:20, background:cc.bg, color:cc.text, border:`1px solid ${cc.border}`, letterSpacing:.3 } }, cat),
            React.createElement('div', { style:{ flex:1, height:1, background:cc.border, opacity:.5 } }),
            React.createElement('span', { style:{ fontSize:12, color:C.textSec, opacity:.6 } },
              `${groups[cat].length} recette${groups[cat].length>1?'s':''}`)
          ),
          React.createElement('div', {
            style:{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(230px, 1fr))', gap:14 }
          },
            groups[cat].map(([id, r], idx) => {
              const isFav   = favorites.includes(id);
              const mainCat = (r.categories||['Plats'])[0];
              const accent  = CAT_CARD_ACCENT[mainCat] || 'transparent';
              return React.createElement('div', { key:id,
                onClick:()=>go(id),
                onMouseEnter:e=>{ e.currentTarget.style.transform='translateY(-5px)'; e.currentTarget.style.boxShadow='0 12px 36px rgba(0,0,0,.22)'; },
                onMouseLeave:e=>{ e.currentTarget.style.transform='translateY(0)'; e.currentTarget.style.boxShadow='0 2px 16px rgba(0,0,0,.12)'; },
                style:{ ...cardStyle, display:'flex', flexDirection:'column', gap:8, minHeight:100,
                        animation:`slideUp 0.4s ease-out ${idx*0.04}s backwards`,
                        background:`linear-gradient(135deg, ${C.card} 60%, ${accent})` }
              },
                React.createElement('div', { style:{ position:'absolute', top:0, left:0, right:0, height:3,
                  borderRadius:'16px 16px 0 0', background:getCatColor(mainCat).text, opacity:.75 } }),
                r.image && React.createElement('div', { style:{ width:'100%', height:130, borderRadius:10,
                  overflow:'hidden', background:`url(${r.image}) center/cover`, marginBottom:2, flexShrink:0 } }),
                React.createElement('div', { style:{ display:'flex', alignItems:'flex-start', justifyContent:'space-between', gap:8, marginTop:4 } },
                  React.createElement('div', { style:{ fontWeight:700, flex:1, fontSize:14, color:C.text, lineHeight:1.35 } }, r.title || pretty(id)),
                  React.createElement('div', { style:{ display:'flex', alignItems:'center', gap:6, flexShrink:0, paddingTop:1 } },
                    React.createElement(Pill, { level:r.difficulty }),
                    React.createElement('span', { onClick:e=>toggleFav(id,e), role:'button',
                      style:{ fontSize:14, cursor:'pointer', opacity:isFav?1:0.22, transition:'0.2s', userSelect:'none' }
                    }, '❤️')
                  )
                ),
                React.createElement('div', { style:{ display:'flex', flexWrap:'wrap', gap:4 } },
                  (r.categories||[]).slice(0,2).map(c => {
                    const ccc = getCatColor(c);
                    return React.createElement('span', { key:c, style:{ fontSize:10, padding:'2px 8px', borderRadius:20,
                      background:ccc.bg, color:ccc.text, fontWeight:700, border:`1px solid ${ccc.border}` } }, c);
                  }),
                  (r.seasons||[]).slice(0,1).map(s =>
                    React.createElement('span', { key:s, style:{ fontSize:10, padding:'2px 8px', borderRadius:20,
                      background:'rgba(255,255,255,.06)', color:C.textSec, border:`1px solid ${C.border}` } }, '🗓 '+s)
                  )
                ),
                r.video && React.createElement('div', { style:{ fontSize:11, opacity:.55, display:'flex', alignItems:'center', gap:4, color:C.text } }, '🎥 Vidéo')
              );
            })
          )
        );
      })
    );
  };

  // ════════════════════════════════════════════════════════
  // RECIPE VIEW
  // ════════════════════════════════════════════════════════
  const renderRecipe = () => {
    const r = window.RECIPES[view];
    if (!r) return React.createElement('div', { style:{ color:C.text, padding:40, textAlign:'center' } },
      React.createElement('p', null, 'Recette introuvable.'),
      React.createElement('button', { onClick:()=>go('index'), style:{ ...btnBase, marginTop:16 } }, '← Retour')
    );

    const allIds  = Object.keys(window.RECIPES);
    const idx     = allIds.indexOf(view);
    const mainCat = (r.categories||['Plats'])[0];
    const catColor = getCatColor(mainCat);
    const noteVal  = notes[view] || '';
    const doneSteps = checked.steps.size;
    const totalSteps = (r.steps||[]).length;
    const progress   = totalSteps > 0 ? Math.round((doneSteps / totalSteps) * 100) : 0;

    return React.createElement(React.Fragment, null,

      // ── Breadcrumb ──
      React.createElement('nav', { 'aria-label':'fil d\'Ariane',
        style:{ display:'flex', alignItems:'center', gap:6, marginBottom:14, fontSize:13, color:C.textSec, flexWrap:'wrap' }
      },
        React.createElement('span', { onClick:()=>go('index'), role:'button', tabIndex:0,
          style:{ cursor:'pointer', color:C.accent, fontWeight:600 } }, '🏠 Accueil'),
        React.createElement('span', { style:{ opacity:.4 } }, '›'),
        ...(r.categories||[mainCat]).slice(0,1).map(cat =>
          React.createElement('span', { key:cat, style:{ color:getCatColor(cat).text, fontWeight:600 } }, cat)
        ),
        React.createElement('span', { style:{ opacity:.4 } }, '›'),
        React.createElement('span', { style:{ color:C.text, fontWeight:600 } }, r.title)
      ),

      // ── Nav + actions ──
      React.createElement('div', {
        style:{ display:'flex', alignItems:'center', gap:8, marginBottom:20, flexWrap:'wrap' }
      },
        React.createElement('button', { onClick:()=>go('index'), style:btnBase }, '← Accueil'),
        idx > 0 && React.createElement('button', { onClick:()=>go(allIds[idx-1]), style:btnBase }, '‹ Préc.'),
        idx < allIds.length-1 && React.createElement('button', { onClick:()=>go(allIds[idx+1]), style:btnBase }, 'Suiv. ›'),
        React.createElement('span', { style:{ flex:1 } }),
        React.createElement('button', { onClick:undo, disabled:!canUndo, title:'Annuler (⌘Z)',
          style:{ ...btnBase, opacity:canUndo?1:0.35 } }, '↩'),
        React.createElement('button', { onClick:redo, disabled:!canRedo, title:'Rétablir (⌘⇧Z)',
          style:{ ...btnBase, opacity:canRedo?1:0.35 } }, '↪'),
        React.createElement('button', { onClick:e=>toggleFav(view,e),
          style:{ ...btnBase, color:favorites.includes(view)?'#ef4444':C.text }
        }, favorites.includes(view)?'❤️ Favori':'🤍 Favori'),
        React.createElement('button', { onClick:()=>setShare(true), style:btnBase }, '📤 Partager'),
        React.createElement('button', { onClick:()=>setCart(true),  style:btnBase }, '🛒 Courses'),
        React.createElement('button', { onClick:()=>window.print(),  style:btnBase, title:'Imprimer' }, '🖨️')
      ),

      // ── En-tête recette ──
      React.createElement('div', { style:{ ...cardStyle, marginBottom:18, cursor:'default', borderTop:`3px solid ${catColor.text}` } },
        React.createElement('h1', { style:{ fontSize:26, fontWeight:800, margin:'0 0 10px', color:C.text, lineHeight:1.25 } }, r.title),
        React.createElement('div', { style:{ display:'flex', flexWrap:'wrap', gap:8, alignItems:'center' } },
          React.createElement('span', { style:{ padding:'4px 12px', borderRadius:20, fontSize:12, fontWeight:700,
            background:diffColors[r.difficulty]+'25', color:diffColors[r.difficulty],
            border:`1px solid ${diffColors[r.difficulty]}50` }
          }, diffLabels[r.difficulty] || r.difficulty),
          ...(r.categories||[]).map(cat => {
            const cc = getCatColor(cat);
            return React.createElement('span', { key:cat, style:{ fontSize:12, padding:'3px 10px', borderRadius:20,
              background:cc.bg, color:cc.text, fontWeight:700, border:`1px solid ${cc.border}` } }, cat);
          }),
          ...(r.seasons||[]).map(s =>
            React.createElement('span', { key:s, style:{ fontSize:12, color:C.textSec,
              background:C.bgGlass, padding:'3px 8px', borderRadius:20, border:`1px solid ${C.border}` } }, '🗓 '+s)
          ),
          r.yield && React.createElement('span', { style:{ fontSize:12, color:C.textSec } }, '🍽 '+multiplyYield(r.yield,factor))
        )
      ),

      // ── Portions ──
      React.createElement('div', { style:{ ...cardStyle, marginBottom:18, cursor:'default',
        display:'flex', alignItems:'center', gap:12, flexWrap:'wrap' } },
        React.createElement('span', { style:{ fontWeight:700, color:C.text, fontSize:14 } }, '× Portions :'),
        [0.5,1,2,3,4].map(f =>
          React.createElement('button', { key:f, onClick:()=>setFactor(f),
            style:{ padding:'6px 14px', borderRadius:8, fontFamily:'inherit',
                    border:factor===f?`2px solid ${C.accent}`:`1px solid ${C.border}`,
                    background:factor===f?C.accent+'30':C.bg,
                    color:factor===f?C.accent:C.text,
                    cursor:'pointer', fontWeight:factor===f?700:400, transition:'all 0.2s' }
          }, f===0.5?'½':`×${f}`)
        )
      ),

      // ── Ingrédients ──
      React.createElement('div', { style:{ ...cardStyle, marginBottom:18, cursor:'default' } },
        React.createElement('h2', { style:{ fontSize:17, fontWeight:700, margin:'0 0 14px', color:C.text } }, '🥕 Ingrédients'),
        ...(r.ingredients||[]).map((grp, gi) =>
          React.createElement('div', { key:gi, style:{ marginBottom:14 } },
            grp.group && React.createElement('div', { style:{ fontSize:11, fontWeight:700, textTransform:'uppercase',
              letterSpacing:1, opacity:.5, marginBottom:8, color:C.textSec,
              borderBottom:`1px solid ${C.border}`, paddingBottom:4 } }, grp.group),
            ...(grp.items||[]).map((item, ii) => {
              const key  = `${gi}-${ii}`;
              const done = checked.ingredients.has(key);
              return React.createElement('div', { key, onClick:()=>toggleIngr(key),
                style:{ display:'flex', alignItems:'flex-start', gap:10, padding:'7px 0',
                        cursor:'pointer', borderBottom:`1px solid ${C.border}`,
                        opacity:done?0.4:1, textDecoration:done?'line-through':'none', transition:'all 0.2s' }
              },
                React.createElement('span', { style:{ width:18, height:18, borderRadius:4,
                  border:`2px solid ${done?C.accent:C.border}`,
                  background:done?C.accent:'transparent', display:'flex', alignItems:'center',
                  justifyContent:'center', flexShrink:0, marginTop:1, transition:'all 0.2s',
                  color:'#fff', fontSize:11, fontWeight:700 } }, done?'✓':''),
                React.createElement('span', { style:{ fontSize:14, color:C.text } }, multiplyIngr(item, factor))
              );
            })
          )
        )
      ),

      // ── Étapes avec timers + barre de progression ──
      React.createElement('div', { style:{ ...cardStyle, marginBottom:18, cursor:'default' } },
        React.createElement('div', { style:{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:14, flexWrap:'wrap', gap:8 } },
          React.createElement('h2', { style:{ fontSize:17, fontWeight:700, margin:0, color:C.text } }, '👨‍🍳 Étapes'),
          totalSteps > 0 && React.createElement('div', { style:{ display:'flex', alignItems:'center', gap:8 } },
            React.createElement('div', { style:{ width:100, height:6, borderRadius:3, background:C.border, overflow:'hidden' } },
              React.createElement('div', { style:{ height:'100%', borderRadius:3,
                width:`${progress}%`, background:C.accent, transition:'width 0.3s ease' } })
            ),
            React.createElement('span', { style:{ fontSize:12, color:C.accent, fontWeight:700 } },
              `${doneSteps}/${totalSteps}`)
          )
        ),
        ...(r.steps||[]).map((step, i) => {
          const done = checked.steps.has(i);
          const mins = extractMinutes(step);
          return React.createElement('div', { key:i,
            style:{ display:'flex', gap:12, padding:'12px 0',
                    borderBottom:`1px solid ${C.border}`, transition:'all 0.2s' }
          },
            React.createElement('div', { onClick:()=>toggleStep(i),
              style:{ width:28, height:28, borderRadius:14,
                      border:`2px solid ${done?C.accent:C.border}`,
                      background:done?C.accent:'transparent', display:'flex', alignItems:'center',
                      justifyContent:'center', flexShrink:0, color:done?'#fff':C.textSec,
                      fontSize:13, fontWeight:700, transition:'all 0.2s', cursor:'pointer', marginTop:2 }
            }, done?'✓':i+1),
            React.createElement('div', { style:{ flex:1 } },
              React.createElement('div', { onClick:()=>toggleStep(i),
                style:{ fontSize:14, color:C.text, textDecoration:done?'line-through':'none',
                        opacity:done?0.4:1, cursor:'pointer', lineHeight:1.55 } }, step),
              mins && React.createElement(StepTimer, { key:`timer-${i}-${view}`, minutes:mins, C })
            )
          );
        })
      ),

      // ── Notes recette ──
      r.notes && r.notes.length > 0 && React.createElement('div', { style:{ ...cardStyle, marginBottom:18, cursor:'default' } },
        React.createElement('h2', { style:{ fontSize:17, fontWeight:700, margin:'0 0 12px', color:C.text } }, '📝 Notes'),
        React.createElement('ul', { style:{ margin:0, paddingLeft:20 } },
          r.notes.map((note,i) =>
            React.createElement('li', { key:i, style:{ fontSize:14, color:C.textSec, marginBottom:6, lineHeight:1.6 } }, note)
          )
        )
      ),

      // ── Notes personnelles ──
      React.createElement('div', { style:{ ...cardStyle, marginBottom:18, cursor:'default' } },
        React.createElement('h2', { style:{ fontSize:17, fontWeight:700, margin:'0 0 10px', color:C.text } }, '✏️ Mes notes'),
        React.createElement('textarea', {
          value:noteVal, onChange:e=>updateNote(view, e.target.value),
          placeholder:'Vos remarques, variantes, astuces…',
          rows:4,
          style:{ width:'100%', padding:'10px 12px', borderRadius:10, border:`1px solid ${C.border}`,
                  background:C.bg, color:C.text, fontSize:13, resize:'vertical', outline:'none',
                  fontFamily:'inherit', lineHeight:1.5, boxSizing:'border-box' }
        }),
        noteVal && React.createElement('div', { style:{ fontSize:11, color:C.textSec, marginTop:5, textAlign:'right', opacity:.7 } },
          `${noteVal.length} caractère${noteVal.length>1?'s':''} · sauvegardé automatiquement`)
      ),

      // ── QR Code ──
      React.createElement('div', { style:{ ...cardStyle, cursor:'default', textAlign:'center', marginBottom:20 } },
        React.createElement('p', { style:{ fontSize:12, opacity:.55, marginBottom:10, color:C.textSec } },
          'QR Code — partager cette recette'),
        React.createElement('img', { src:generateQR(window.location.href),
          alt:'QR Code de partage', width:130, height:130, style:{ borderRadius:8 } })
      )
    );
  };

  // ════════════════════════════════════════════════════════
  // RENDER PRINCIPAL
  // ════════════════════════════════════════════════════════
  return React.createElement(ErrorBoundary, null,
    React.createElement('div', {
      style:{ minHeight:'100vh', color:C.text,
              fontFamily:'Inter, system-ui, -apple-system, Segoe UI, Roboto',
              position:'relative', overflow:'hidden', transition:'color 0.3s' }
    },
      // Barre de progression scroll
      React.createElement('div', { ref:progRef,
        style:{ position:'fixed', top:0, left:0, height:3, zIndex:100000, width:'0%',
                background:`linear-gradient(90deg, ${C.progress}, #f59e0b, #fbbf24)`,
                boxShadow:`0 0 8px ${C.progress}80`, transition:'width 0.1s linear', pointerEvents:'none' }
      }),

      // Fond parallax
      React.createElement('div', { ref:bgRef,
        style:{ position:'fixed', top:0, left:0, right:0, bottom:0,
                backgroundImage:`url(${HERO_IMAGES[heroSlide]})`,
                backgroundSize:'cover', backgroundPosition:'center',
                filter:'blur(2px) brightness(0.62)',
                transform:'scale(1.04) translateY(0px)', zIndex:0 }
      }),

      // Dégradé bas
      React.createElement('div', { style:{ position:'fixed', bottom:0, left:0, right:0, height:'40vh', zIndex:0,
        background:'linear-gradient(to top, rgba(0,0,0,0.52), transparent)', pointerEvents:'none' } }),

      // Contenu
      React.createElement('div', {
        style:{ position:'relative', zIndex:1, maxWidth:1160, margin:'0 auto',
                padding:view==='index'||view==='__favs__'?'140px 16px 120px':'86px 16px 120px' }
      },
        view==='index'||view==='__favs__' ? renderIndex() : renderRecipe()
      ),

      renderToolbar(),
      showShare  && React.createElement(ShareModal),
      showCart   && React.createElement(ShoppingModal),
      showSearch && React.createElement(AdvSearchModal),

      // Retour en haut
      showBackTop && React.createElement('button', {
        onClick:()=>window.scrollTo({ top:0, behavior:'smooth' }),
        title:'Retour en haut',
        style:{ position:'fixed', bottom:24, right:24, zIndex:9999, width:44, height:44, borderRadius:22,
                border:`1px solid ${C.border}`, background:C.bgGlass, backdropFilter:'blur(12px)',
                color:C.text, cursor:'pointer', fontSize:18, display:'flex', alignItems:'center',
                justifyContent:'center', boxShadow:'0 4px 16px rgba(0,0,0,.28)',
                transition:'all 0.2s', animation:'slideUp 0.3s ease-out', fontFamily:'inherit' }
      }, '↑')
    )
  );
}

// ─── Fonctions utilitaires UI (hors composant) ───────────────────────
function labelField(label, C, field) {
  return React.createElement('div', { style:{ marginBottom:14 } },
    React.createElement('label', { style:{ display:'block', fontSize:11, fontWeight:700, marginBottom:5,
      color:C.textSec, textTransform:'uppercase', letterSpacing:.6 } }, label),
    field
  );
}
function pill(text, C) {
  return React.createElement('span', { style:{ fontSize:12, color:C.textSec, background:C.bgGlass,
    backdropFilter:'blur(8px)', padding:'3px 10px', borderRadius:20, border:`1px solid ${C.border}` } }, text);
}
function pillAccent(text) {
  return React.createElement('span', { style:{ fontSize:12, color:'#ef4444',
    background:'rgba(239,68,68,.12)', padding:'3px 10px', borderRadius:20,
    border:'1px solid rgba(239,68,68,.3)' } }, text);
}

// ─── CSS impression ──────────────────────────────────────────────────
(function(){
  const s = document.createElement('style');
  s.textContent = `
@media print {
  body { background:white !important; color:black !important; font-family:serif; }
  div[style*="position:fixed"],div[style*="position: fixed"] { display:none !important; }
  h1 { color:black !important; -webkit-text-fill-color:black !important; font-size:22pt; }
  h2 { color:#333 !important; font-size:14pt; }
  button,select,input { display:none !important; }
  textarea { border:1px solid #ccc !important; background:white !important; color:black !important; }
}`;
  document.head.appendChild(s);
})();

// ─── Mount ───────────────────────────────────────────────────────────
const _root = ReactDOM.createRoot(document.getElementById('root'));
_root.render(React.createElement(LivreCuisineIndex));
// Signale à index.html que React est monté → retire l'écran de chargement
requestAnimationFrame(() => window.__gremoireReady?.());
