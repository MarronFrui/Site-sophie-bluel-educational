function getWorks() {
  fetch('http://localhost:5678/api/works')
    .then((response) => response.json())
    .then((works) => {
      const container = document.querySelector('.gallery');
      const modalContainer = document.querySelector('.modal-gallery');

      for (const work of works) {
        const figure = document.createElement('figure');
        const img = document.createElement('img');
        const figcaption = document.createElement('figcaption');

        img.src = work.imageUrl;
        img.alt = work.title;
        figcaption.textContent = work.title;

        figure.dataset.categoryId = work.categoryId;

        figure.appendChild(img);
        figure.appendChild(figcaption);
        container.appendChild(figure);
      }

      for (const work of works) {
        const card = document.createElement('div');
        card.classList.add('modal-work');

        const img = document.createElement('img');
        img.src = work.imageUrl;
        img.alt = work.title;

        const deleteBtn = document.createElement('button');
        deleteBtn.innerHTML = `
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
            <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
          </svg>
        `;
        deleteBtn.classList.add('delete-work');

        card.appendChild(img);
        card.appendChild(deleteBtn);
        modalContainer.appendChild(card);
      }
    });
}

getWorks();
