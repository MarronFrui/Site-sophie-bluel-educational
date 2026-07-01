let allCategories = [];
const selectCategory = document.querySelector('#category');

function getCategories() {
  hideError('category-error');

  fetch('http://localhost:5678/api/categories')
    .then((response) => {
      if (!response.ok) {
        throw new Error('Server is not responding');
      }
      return response.json();
    })
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
          buttons.forEach((button) => {
            button.classList.remove('active');
          });

          const selectedId = btn.dataset.categoryId;
          const figures = document.querySelectorAll('.gallery figure');

          figures.forEach((figure) => {
            const figureCategory = figure.dataset.categoryId;

            if (selectedId === '0' || selectedId === figureCategory) {
              figure.classList.remove('hidden');
              btn.classList.add('active');
            } else {
              figure.classList.add('hidden');
            }
          });
        });
      });
    })
    .catch((error) => {
      console.log(error);
      showError('Unable to connect to the server', 'category-error');
    });
}

getCategories();
