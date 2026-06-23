const loginButton = document.querySelector('.login');
const logoutButton = document.querySelector('.logout');

function isLoggedIn() {
  const token = localStorage.getItem('token');
  if (token !== null && token !== '') {
    loginButton.classList.add('hidden');
    logoutButton.classList.remove('hidden');
  } else {
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
