function isLoggedin() {
  const token = getToken();
  return token !== null && token !== '';
}

function getToken() {
  return localStorage.getItem('token');
}

function logout() {
  return localStorage.clear('token');
}

function updateHeader() {
  const loginButton = document.querySelector('nav a[href="login.html"]');
  if (isLoggedin()) {
    loginButton.textContent = 'logout';
    loginButton.href = '#';
    loginButton.addEventListener('click', (event) => {
      event.preventDefault();
      logout();
    });
  } else {
    return;
  }
}

updateHeader();
