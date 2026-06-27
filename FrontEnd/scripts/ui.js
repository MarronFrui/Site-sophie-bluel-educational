const loginButton = document.querySelector('.login');
const logoutButton = document.querySelector('.logout');
const editionBand = document.querySelector('.edition-container');
const modifyButton = document.querySelector('.edition.black');
const categories = document.querySelector('.category');
const portfolioTitle = document.querySelector('.portfolio-title');
const edition = document.querySelector('.edition');
const galleryDialog = document.querySelector('#galleryDialog');
const AddPhotoDialog = document.querySelector('#addPhotoDialog');
const closeModal = document.querySelector('.modal-close');

function toggleClass(element, className, shouldAdd) {
  if (!element) return;
  if (shouldAdd) {
    element.classList.add(className);
  } else {
    element.classList.remove(className);
  }
}

function isLoggedIn() {
  const token = localStorage.getItem('token');
  if (token !== null && token !== '') {
    toggleClass(editionBand, 'hidden', false);
    toggleClass(modifyButton, 'hidden', false);
    toggleClass(categories, 'hidden', true);
    toggleClass(portfolioTitle, 'margin-bottom', true);
    toggleClass(loginButton, 'hidden', true);
    toggleClass(logoutButton, 'hidden', false);
  } else {
    toggleClass(editionBand, 'hidden', true);
    toggleClass(modifyButton, 'hidden', true);
    toggleClass(categories, 'hidden', false);
    toggleClass(portfolioTitle, 'margin-bottom', false);
    toggleClass(loginButton, 'hidden', false);
    toggleClass(logoutButton, 'hidden', true);
  }
}

logoutButton.addEventListener('click', (event) => {
  event.preventDefault();
  localStorage.removeItem('token');
  isLoggedIn();
});

if (edition && galleryDialog) {
  edition.addEventListener('click', () => {
    galleryDialog.showModal();
  });
  modifyButton.addEventListener('click', () => {
    galleryDialog.showModal();
  });
  closeModal.addEventListener('click', () => {
    galleryDialog.close();
  });
}

isLoggedIn();
