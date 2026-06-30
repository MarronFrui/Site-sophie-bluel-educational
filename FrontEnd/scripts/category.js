let allCategories = [];
const selectCategory = document.querySelector('#category');

function getCategories() {
  fetch('http://localhost:5678/api/categories')
    .then((response) => response.json())
    .then((categories) => {
      allCategories = categories;
      const container = document.querySelector('.category');

      for (const category of categories) {
        const button = document.createElement('button');

        button.setAttribute('data-category-id', category.id);
        button.classList.add('category-btn');
        button.textContent = category.name;
        container.appendChild(button);
      }

      if (selectCategory) {
        for (const category of allCategories) {
          const option = document.createElement('option');
          option.value = category.id;
          option.textContent = category.name;
          selectCategory.appendChild(option);
        }
      }

      const buttons = document.querySelectorAll('.category button');
      buttons.forEach((btn) => {
        btn.addEventListener('click', () => {
          const selectedId = btn.dataset.categoryId;
          const figures = document.querySelectorAll('.gallery figure');

          figures.forEach((figure) => {
            const figureCategory = figure.dataset.categoryId;

            if (selectedId === '0' || selectedId === figureCategory) {
              figure.classList.remove('hidden');
            } else {
              figure.classList.add('hidden');
            }
          });
        });
      });
    });
}

getCategories();
