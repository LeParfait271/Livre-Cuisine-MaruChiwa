document.addEventListener('DOMContentLoaded', () => {
  function sanitizeNoteHtml(value) {
    const template = document.createElement('template');
    template.innerHTML = String(value || '');
    const allowedTags = new Set(['SPAN', 'STRONG', 'EM', 'B', 'I', 'BR']);
    const clean = node => {
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
    };
    clean(template.content);
    return template.innerHTML;
  }

  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');
  const recipe = id && window.RECIPES ? window.RECIPES[id] : null;

  const title = document.getElementById('title');
  const ingredients = document.getElementById('ingredients');
  const steps = document.getElementById('steps');
  const notes = document.getElementById('notes');

  if (!title || !ingredients || !steps || !notes) return;

  if (!recipe) {
    title.textContent = 'Recette introuvable';
    ingredients.textContent = 'Retournez à la liste des recettes.';
    return;
  }

  document.title = recipe.title;
  title.textContent = recipe.title;
  document.querySelector('meta[name="description"]')?.setAttribute('content', `${recipe.title} sur Cook Note : ingrédients, étapes et astuces.`);
  const jsonLd = document.createElement('script');
  jsonLd.type = 'application/ld+json';
  jsonLd.textContent = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'Recipe',
    name: recipe.title,
    image: recipe.image ? new URL(recipe.image, window.location.origin).href : undefined,
    recipeYield: recipe.yield || undefined,
    recipeCategory: (recipe.categories || []).join(', ') || undefined,
    recipeIngredient: (recipe.ingredients || []).flatMap(group => group.items || []),
    recipeInstructions: (recipe.steps || []).map(step => ({ '@type': 'HowToStep', text: step }))
  });
  document.head.appendChild(jsonLd);

  ingredients.replaceChildren(
    ...(recipe.ingredients || []).map(group => {
      const section = document.createElement('section');
      section.className = 'recipe-panel';

      const heading = document.createElement('h3');
      heading.textContent = group.group || 'Base';
      section.appendChild(heading);

      const list = document.createElement('ul');
      (group.items || []).forEach(item => {
        const li = document.createElement('li');
        li.textContent = item;
        list.appendChild(li);
      });
      section.appendChild(list);

      return section;
    })
  );

  steps.replaceChildren(
    ...(recipe.steps || []).map(step => {
      const li = document.createElement('li');
      li.textContent = step;
      return li;
    })
  );

  notes.replaceChildren(
    ...(recipe.notes || []).map(note => {
      const li = document.createElement('li');
      li.innerHTML = sanitizeNoteHtml(note);
      return li;
    })
  );

  document.addEventListener('click', event => {
    const target = event.target.closest('[data-goto]');
    if (!target) return;
    event.preventDefault();
    window.location.href = `index.html#recipe=${encodeURIComponent(target.dataset.goto)}`;
  });
});
