const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const ROOT = path.resolve(__dirname, '..');
const recipesPath = path.join(ROOT, 'recipes.js');
const textFilesToCheck = [
  path.join(ROOT, 'index.html'),
  path.join(ROOT, 'app.js'),
  path.join(ROOT, 'style.css'),
  path.join(ROOT, 'manifest.json'),
  path.join(ROOT, 'service-worker.js')
];
const code = fs.readFileSync(recipesPath, 'utf8');
const context = { window: {} };
vm.createContext(context);
vm.runInContext(code, context, { filename: recipesPath });

const recipes = context.window.RECIPES;
const errors = [];

function checkTextEncoding(value, location) {
  if (typeof value === 'string') {
    if (/\uFFFD|\?|Ã|â€/.test(value)) {
      errors.push(`${location}: caractere suspect detecte (${value}).`);
    }
    return;
  }
  if (Array.isArray(value)) {
    value.forEach((item, index) => checkTextEncoding(item, `${location}[${index}]`));
    return;
  }
  if (value && typeof value === 'object') {
    Object.entries(value).forEach(([key, item]) => checkTextEncoding(item, `${location}.${key}`));
  }
}

function collectStrings(value, out = []) {
  if (typeof value === 'string') {
    out.push(value);
    return out;
  }
  if (Array.isArray(value)) {
    value.forEach(item => collectStrings(item, out));
    return out;
  }
  if (value && typeof value === 'object') {
    Object.values(value).forEach(item => collectStrings(item, out));
  }
  return out;
}

if (!recipes || typeof recipes !== 'object') {
  errors.push('window.RECIPES est introuvable.');
} else {
  checkTextEncoding(recipes, 'window.RECIPES');

  const ids = new Set(Object.keys(recipes));
  const masterIds = new Set(Object.entries(recipes)
    .filter(([, recipe]) => Array.isArray(recipe.variants) && recipe.variants.length)
    .map(([id]) => id));
  const leafImages = new Map();

  for (const [id, recipe] of Object.entries(recipes)) {
    const isMaster = masterIds.has(id);
    if (!recipe.title) errors.push(`${id}: titre manquant.`);
    if (!isMaster && (!Array.isArray(recipe.ingredients) || !recipe.ingredients.length)) errors.push(`${id}: ingredients manquants.`);
    if (!isMaster && (!Array.isArray(recipe.steps) || !recipe.steps.length)) errors.push(`${id}: etapes manquantes.`);

    if (recipe.master && !ids.has(recipe.master)) errors.push(`${id}: fiche parent introuvable (${recipe.master}).`);
    if (!masterIds.has(id) && !recipe.master) errors.push(`${id}: recette sans fiche parent.`);

    if (Array.isArray(recipe.variants)) {
      const labels = recipe.variants.map(variant => variant?.label || '');
      const sortedLabels = [...labels].sort((a, b) => a.localeCompare(b, 'fr', { sensitivity: 'base' }));
      if (labels.join('\n') !== sortedLabels.join('\n')) errors.push(`${id}: variantes non triees alphabetiquement.`);
      recipe.variants.forEach(variant => {
        if (!variant?.id || !ids.has(variant.id)) errors.push(`${id}: variante introuvable (${variant?.id || 'vide'}).`);
        const variantRecipe = recipes[variant?.id];
        if (variantRecipe && variant.label !== variantRecipe.title) errors.push(`${id}: label de variante incoherent (${variant.id}).`);
        const isNestedMaster = variantRecipe && masterIds.has(variant.id);
        const isAdditionalParent = Array.isArray(variantRecipe?.additionalMasters) && variantRecipe.additionalMasters.includes(id);
        if (variant?.id && !variantRecipe?.master && !isNestedMaster && !isAdditionalParent) errors.push(`${id}: variante ${variant.id} sans fiche parent.`);
      });
    }

    if (Array.isArray(recipe.tags)) {
      recipe.tags.forEach(tag => {
        if (!tag || /\d/.test(tag)) errors.push(`${id}: tag suspect (${tag}).`);
      });
    }

    if (Array.isArray(recipe.notes)) {
      recipe.notes.forEach(note => {
        if (/\bsource\b|https?:\/\/|href\s*=/i.test(String(note))) errors.push(`${id}: source externe presente dans les notes.`);
      });
    }

    if (!recipe.image) {
      errors.push(`${id}: image manquante.`);
    } else if (recipe.image.startsWith('/')) {
      const filePath = path.join(ROOT, recipe.image.replace(/^\/+/, ''));
      if (!fs.existsSync(filePath)) errors.push(`${id}: image locale introuvable (${recipe.image}).`);
    }

    if (!isMaster && recipe.image) {
      if (!leafImages.has(recipe.image)) leafImages.set(recipe.image, []);
      leafImages.get(recipe.image).push(id);
    }

    const linkableText = collectStrings({
      ingredients: recipe.ingredients || [],
      steps: recipe.steps || [],
      notes: recipe.notes || [],
      technical: recipe.technical || []
    }).join('\n');
    for (const match of linkableText.matchAll(/data-goto=\\?["']([^"']+)\\?["']/g)) {
      if (!ids.has(match[1])) errors.push(`${id}: lien interne data-goto introuvable (${match[1]}).`);
    }
  }

  for (const [image, recipeIds] of leafImages.entries()) {
    if (recipeIds.length > 1) {
      errors.push(`image dupliquee entre recettes (${image}): ${recipeIds.join(', ')}.`);
    }
  }
}

textFilesToCheck.forEach(filePath => {
  if (!fs.existsSync(filePath)) return;
  const text = fs.readFileSync(filePath, 'utf8');
  if (/\uFFFD|Ã|â€/.test(text)) {
    errors.push(`${path.relative(ROOT, filePath)}: caractere UTF-8 suspect detecte.`);
  }
});

if (errors.length) {
  console.error(errors.join('\n'));
  process.exit(1);
}

console.log('Validation recettes OK.');
