const loginButton = document.querySelector('.login');
const logoutButton = document.querySelector('.logout');
const editionBand = document.querySelector('.edition-container');
const modifyButton = document.querySelector('.edition.black');
const categories = document.querySelector('.category');
const portfolioTitle = document.querySelector('.portfolio-title');

function isLoggedIn() {
  const token = localStorage.getItem('token');
  if (token !== null && token !== '') {
    editionBand.classList.remove('hidden');
    modifyButton.classList.remove('hidden');
    categories.classList.add('hidden');
    portfolioTitle.classList.add('margin-bottom');
    loginButton.classList.add('hidden');
    logoutButton.classList.remove('hidden');
  } else {
    editionBand.classList.add('hidden');
    modifyButton.classList.add('hidden');
    categories.classList.add('hidden');
    portfolioTitle.classList.remove('margin-bottom');
    loginButton.classList.remove('hidden');
    logoutButton.classList.add('hidden');
  }
}

logoutButton.addEventListener('click', (event) => {
  event.preventDefault();
  localStorage.removeItem('token');
  isLoggedIn();
});

isLoggedIn();
