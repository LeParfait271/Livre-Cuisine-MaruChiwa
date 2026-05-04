const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const ROOT = path.resolve(__dirname, '..');
const recipesPath = path.join(ROOT, 'recipes.js');
const code = fs.readFileSync(recipesPath, 'utf8');
const context = { window: {} };
vm.createContext(context);
vm.runInContext(code, context, { filename: recipesPath });

const recipes = context.window.RECIPES;
const errors = [];

if (!recipes || typeof recipes !== 'object') {
  errors.push('window.RECIPES est introuvable.');
} else {
  const ids = new Set(Object.keys(recipes));
  const masterIds = new Set(Object.entries(recipes)
    .filter(([, recipe]) => Array.isArray(recipe.variants) && recipe.variants.length)
    .map(([id]) => id));

  for (const [id, recipe] of Object.entries(recipes)) {
    if (!recipe.title) errors.push(`${id}: titre manquant.`);
    if (!Array.isArray(recipe.ingredients) || !recipe.ingredients.length) errors.push(`${id}: ingredients manquants.`);
    if (!Array.isArray(recipe.steps) || !recipe.steps.length) errors.push(`${id}: etapes manquantes.`);

    if (recipe.master && !ids.has(recipe.master)) errors.push(`${id}: fiche parent introuvable (${recipe.master}).`);
    if (!masterIds.has(id) && !recipe.master) errors.push(`${id}: recette sans fiche parent.`);

    if (Array.isArray(recipe.variants)) {
      recipe.variants.forEach(variant => {
        if (!variant?.id || !ids.has(variant.id)) errors.push(`${id}: variante introuvable (${variant?.id || 'vide'}).`);
        if (variant?.id && recipes[variant.id]?.master !== id) errors.push(`${id}: variante ${variant.id} non rattachee au parent.`);
      });
    }

    if (!recipe.image) {
      errors.push(`${id}: image manquante.`);
    } else if (recipe.image.startsWith('/')) {
      const filePath = path.join(ROOT, recipe.image.replace(/^\/+/, ''));
      if (!fs.existsSync(filePath)) errors.push(`${id}: image locale introuvable (${recipe.image}).`);
    }

    const noteText = Array.isArray(recipe.notes) ? recipe.notes.join('\n') : '';
    for (const match of noteText.matchAll(/data-goto=["']([^"']+)["']/g)) {
      if (!ids.has(match[1])) errors.push(`${id}: lien interne data-goto introuvable (${match[1]}).`);
    }
  }
}

if (errors.length) {
  console.error(errors.join('\n'));
  process.exit(1);
}

console.log('Validation recettes OK.');
