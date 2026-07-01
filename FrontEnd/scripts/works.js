function createGalleryFigure(work) {
  const figure = document.createElement('figure');
  const img = document.createElement('img');
  const figcaption = document.createElement('figcaption');

  img.src = work.imageUrl;
  img.alt = work.title;

  figcaption.textContent = work.title;
  figure.dataset.workId = work.id;
  figure.dataset.categoryId = work.categoryId;

  figure.appendChild(img);
  figure.appendChild(figcaption);

  return figure;
}

function createModalWorkCard(work) {
  const card = document.createElement('div');
  card.classList.add('modal-work');
  card.dataset.workId = work.id;

  const img = document.createElement('img');
  img.src = work.imageUrl;
  img.alt = work.title;

  const deleteBtn = document.createElement('button');
  deleteBtn.innerHTML = `
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">
            <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0"/>
          </svg>
        `;
  deleteBtn.classList.add('delete-work');

  deleteBtn.addEventListener('click', () => {
    fetch(`http://localhost:5678/api/works/${work.id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then((response) => {
        if (response.ok) {
          const figure = document.querySelector(`.gallery figure[data-work-id="${work.id}"]`);
          const card = document.querySelector(
            `.modal-gallery .modal-work[data-work-id="${work.id}"]`,
          );

          if (figure) figure.remove();
          if (card) card.remove();
        } else {
          if (response.status === 401) {
            throw new Error('Unauthorized');
          }
          if (response.status === 500) {
            throw new Error('Unexpected Behaviour');
          }
        }
      })
      .catch((error) => {
        console.error('Network error:', error);
      });
  });

  card.appendChild(img);
  card.appendChild(deleteBtn);
  return card;
}

function getWorks() {
  hideError('gallery-error');
  fetch('http://localhost:5678/api/works')
    .then((response) => {
      if (!response.ok) {
        throw new Error('Server not responding');
      }
      return response.json();
    })
    .then((works) => {
      const container = document.querySelector('.gallery');
      const modalContainer = document.querySelector('.modal-gallery');

      for (const work of works) {
        const figure = createGalleryFigure(work);
        const card = createModalWorkCard(work);
        container.appendChild(figure);
        modalContainer.appendChild(card);
      }
    })
    .catch((error) => {
      console.log(error);
      showError('Unable to connect to the server', 'gallery-error');
    });
}

getWorks();
