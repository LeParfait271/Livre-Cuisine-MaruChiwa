const CATEGORIES = ['Apéro', 'Entrées', 'Plats', 'Desserts', 'Petits-déjeuners'];
const SEASONS = ['Printemps', 'Été', 'Automne', 'Hiver', 'Toutes saisons'];
const DIFFICULTY = { easy: 'Facile', medium: 'Intermédiaire', hard: 'Technique' };

let recipes = {};
let activeId = null;
let mode = 'create';

const $ = selector => document.querySelector(selector);

const fields = {
  id: $('#field-id'),
  title: $('#field-title'),
  difficulty: $('#field-difficulty'),
  yield: $('#field-yield'),
  tags: $('#field-tags'),
  video: $('#field-video'),
  image: $('#field-image'),
  ingredients: $('#field-ingredients'),
  steps: $('#field-steps'),
  notes: $('#field-notes')
};

function message(text, isError = false) {
  const output = $('#admin-message');
  output.textContent = text;
  output.style.color = isError ? '#fca5a5' : '#fbbf24';
}

function normalizeText(value) {
  return String(value || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();
}

function slugify(value) {
  return normalizeText(value)
    .replace(/[^a-z0-9_-]+/g, '_')
    .replace(/^_+|_+$/g, '')
    .slice(0, 80);
}

function renderOptions() {
  $('#category-options').innerHTML = CATEGORIES.map(item => `
    <label><input type="checkbox" name="category" value="${escapeHtml(item)}"> ${escapeHtml(item)}</label>
  `).join('');
  $('#season-options').innerHTML = SEASONS.map(item => `
    <label><input type="checkbox" name="season" value="${escapeHtml(item)}"> ${escapeHtml(item)}</label>
  `).join('');
}

function escapeHtml(value) {
  return String(value ?? '').replace(/[&<>"']/g, char => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  }[char]));
}

async function api(path, options = {}) {
  const response = await fetch(path, {
    ...options,
    headers: options.body instanceof FormData
      ? options.headers
      : { 'content-type': 'application/json', ...(options.headers || {}) }
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data.error || `Erreur ${response.status}`);
  return data;
}

async function loadRecipes() {
  const data = await api('/api/admin/recipes');
  recipes = data.recipes || {};
  const first = Object.keys(recipes).sort()[0];
  renderList();
  if (activeId && recipes[activeId]) {
    selectRecipe(activeId);
  } else if (first) {
    selectRecipe(first);
  } else {
    newRecipe();
  }
}

function renderList() {
  const needle = normalizeText($('#recipe-search').value);
  const entries = Object.entries(recipes)
    .sort((a, b) => (a[1].title || a[0]).localeCompare(b[1].title || b[0], 'fr'))
    .filter(([id, recipe]) => !needle || normalizeText(`${id} ${recipe.title} ${(recipe.categories || []).join(' ')}`).includes(needle));

  $('#recipe-list').innerHTML = entries.map(([id, recipe]) => `
    <button type="button" class="admin-recipe-item ${id === activeId ? 'active' : ''}" data-id="${escapeHtml(id)}">
      <strong>${escapeHtml(recipe.title || id)}</strong>
      <small>${escapeHtml(id)} · ${escapeHtml((recipe.categories || []).join(', '))} · ${escapeHtml(DIFFICULTY[recipe.difficulty] || recipe.difficulty || '')}</small>
    </button>
  `).join('');
}

function setChecked(name, values) {
  document.querySelectorAll(`input[name="${name}"]`).forEach(input => {
    input.checked = values.includes(input.value);
  });
}

function getChecked(name) {
  return Array.from(document.querySelectorAll(`input[name="${name}"]:checked`)).map(input => input.value);
}

function ingredientsToText(groups = []) {
  return groups.map(group => [
    group.group || 'Base',
    ...(group.items || []).map(item => `- ${item}`)
  ].join('\n')).join('\n\n');
}

function textToIngredients(text) {
  return String(text || '')
    .split(/\n\s*\n/)
    .map(block => block.split('\n').map(line => line.trim()).filter(Boolean))
    .filter(lines => lines.length)
    .map(lines => {
      const group = lines[0].replace(/^-\s*/, '') || 'Base';
      const items = lines.slice(1).map(line => line.replace(/^-\s*/, '').trim()).filter(Boolean);
      return { group, items };
    })
    .filter(group => group.items.length);
}

function arrayToLines(items = []) {
  return items.join('\n');
}

function linesToArray(text) {
  return String(text || '').split('\n').map(line => line.trim()).filter(Boolean);
}

function csvToArray(text) {
  return String(text || '').split(',').map(item => item.trim()).filter(Boolean);
}

function selectRecipe(id) {
  activeId = id;
  mode = 'edit';
  const recipe = recipes[id];
  $('#editor-title').textContent = recipe.title || id;
  fields.id.value = id;
  fields.id.disabled = true;
  fields.title.value = recipe.title || '';
  fields.difficulty.value = recipe.difficulty || 'easy';
  fields.yield.value = recipe.yield || '';
  fields.tags.value = (recipe.tags || []).join(', ');
  fields.video.value = recipe.video || '';
  fields.image.value = recipe.image || '';
  fields.ingredients.value = ingredientsToText(recipe.ingredients || []);
  fields.steps.value = arrayToLines(recipe.steps || []);
  fields.notes.value = arrayToLines(recipe.notes || []);
  setChecked('category', recipe.categories || []);
  setChecked('season', recipe.seasons || []);
  updatePreview();
  renderList();
  message('');
}

function newRecipe() {
  activeId = null;
  mode = 'create';
  $('#editor-title').textContent = 'Nouvelle recette';
  fields.id.disabled = false;
  fields.id.value = '';
  fields.title.value = '';
  fields.difficulty.value = 'easy';
  fields.yield.value = '';
  fields.tags.value = '';
  fields.video.value = '';
  fields.image.value = '';
  fields.ingredients.value = 'Base\n- ';
  fields.steps.value = '';
  fields.notes.value = '';
  setChecked('category', []);
  setChecked('season', ['Toutes saisons']);
  updatePreview();
  renderList();
  message('');
}

function collectRecipe() {
  return {
    title: fields.title.value.trim(),
    categories: getChecked('category'),
    seasons: getChecked('season'),
    difficulty: fields.difficulty.value,
    yield: fields.yield.value.trim(),
    ingredients: textToIngredients(fields.ingredients.value),
    steps: linesToArray(fields.steps.value),
    notes: linesToArray(fields.notes.value),
    image: fields.image.value.trim(),
    video: fields.video.value.trim(),
    tags: csvToArray(fields.tags.value)
  };
}

function validateLocal(id, recipe) {
  const errors = [];
  if (!id) errors.push('Slug requis.');
  if (!/^[a-z0-9_-]+$/.test(id)) errors.push('Slug invalide.');
  if (mode === 'create' && recipes[id]) errors.push('Slug déjà utilisé.');
  if (!recipe.title) errors.push('Titre requis.');
  if (!recipe.categories.length) errors.push('Choisir au moins une catégorie.');
  if (!recipe.seasons.length) errors.push('Choisir au moins une saison.');
  if (!recipe.ingredients.length) errors.push('Ajouter au moins un groupe ingrédients avec items.');
  if (!recipe.steps.length) errors.push('Ajouter au moins une étape.');
  return errors;
}

async function saveRecipe() {
  const id = slugify(fields.id.value);
  fields.id.value = id;
  const recipe = collectRecipe();
  const errors = validateLocal(id, recipe);
  if (errors.length) {
    message(errors.join(' '), true);
    return;
  }

  const url = mode === 'create' ? '/api/admin/recipes' : `/api/admin/recipes/${encodeURIComponent(id)}`;
  const method = mode === 'create' ? 'POST' : 'PUT';
  const data = await api(url, { method, body: JSON.stringify({ id, recipe }) });
  recipes[id] = data.recipe;
  activeId = id;
  mode = 'edit';
  fields.id.disabled = true;
  renderList();
  message('Recette sauvegardée. Sauvegarde automatique créée.');
}

async function deleteRecipe() {
  if (!activeId || mode !== 'edit') return;
  const recipe = recipes[activeId];
  if (!confirm(`Supprimer "${recipe.title || activeId}" ? Une sauvegarde sera créée avant suppression.`)) return;
  await api(`/api/admin/recipes/${encodeURIComponent(activeId)}`, { method: 'DELETE' });
  delete recipes[activeId];
  message('Recette supprimée.');
  const next = Object.keys(recipes).sort()[0];
  if (next) selectRecipe(next);
  else newRecipe();
}

function duplicateRecipe() {
  if (!activeId || !recipes[activeId]) return;
  const source = recipes[activeId];
  newRecipe();
  fields.id.value = `${activeId}_copie`;
  fields.title.value = `${source.title || activeId} (copie)`;
  fields.difficulty.value = source.difficulty || 'easy';
  fields.yield.value = source.yield || '';
  fields.tags.value = (source.tags || []).join(', ');
  fields.video.value = source.video || '';
  fields.image.value = source.image || '';
  fields.ingredients.value = ingredientsToText(source.ingredients || []);
  fields.steps.value = arrayToLines(source.steps || []);
  fields.notes.value = arrayToLines(source.notes || []);
  setChecked('category', source.categories || []);
  setChecked('season', source.seasons || []);
  updatePreview();
  message('Copie prête à sauvegarder.');
}

function updatePreview() {
  const preview = $('#image-preview');
  const url = fields.image.value.trim();
  preview.style.backgroundImage = url ? `url("${url}")` : '';
  preview.textContent = url ? '' : 'Aperçu';
}

async function uploadImage(file) {
  if (!file) return;
  const slug = slugify(fields.id.value || fields.title.value || 'recette') || 'recette';
  const form = new FormData();
  form.append('image', file);
  message('Upload image...');
  const data = await api(`/api/admin/upload?slug=${encodeURIComponent(slug)}`, {
    method: 'POST',
    body: form
  });
  fields.image.value = data.url;
  updatePreview();
  message('Image uploadée.');
}

function bind() {
  $('#recipe-list').addEventListener('click', event => {
    const button = event.target.closest('[data-id]');
    if (button) selectRecipe(button.dataset.id);
  });
  $('#recipe-search').addEventListener('input', renderList);
  $('#new-btn').addEventListener('click', newRecipe);
  $('#save-btn').addEventListener('click', () => saveRecipe().catch(error => message(error.message, true)));
  $('#delete-btn').addEventListener('click', () => deleteRecipe().catch(error => message(error.message, true)));
  $('#duplicate-btn').addEventListener('click', duplicateRecipe);
  $('#logout-btn').addEventListener('click', async () => {
    await api('/api/admin/logout', { method: 'POST', body: '{}' }).catch(() => {});
    window.location.href = '/admin-login.html';
  });
  fields.title.addEventListener('input', () => {
    if (mode === 'create' && !fields.id.value) fields.id.value = slugify(fields.title.value);
  });
  fields.image.addEventListener('input', updatePreview);
  $('#image-upload').addEventListener('change', event => {
    uploadImage(event.target.files[0]).catch(error => message(error.message, true));
  });
}

renderOptions();
bind();
loadRecipes().catch(error => message(error.message, true));
