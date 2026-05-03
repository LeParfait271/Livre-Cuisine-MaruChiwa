document.addEventListener('DOMContentLoaded', () => {
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
      li.innerHTML = note;
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
