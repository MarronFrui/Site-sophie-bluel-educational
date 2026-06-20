function Auth() {
  const form = document.querySelector('form#login');

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const email = document.querySelector('#email').value;
    const password = document.querySelector('#password').value;
    fetch('http://localhost:5678/api/users/login', {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify({ email, password }),
    })
      .then((response) => {
        if (!response.ok) {
          if (response.status === 401) {
            throw new Error('Email ou mot de passe invalide');
          }
          if (response.status === 404) {
            throw new Error('Introuvable');
          }
        }

        return response.json();
      })
      .then((data) => {
        localStorage.setItem('token', data.token);
        console.log({ data });
      })
      .catch((error) => {
        console.error(error);
      });
  });
}

Auth();
