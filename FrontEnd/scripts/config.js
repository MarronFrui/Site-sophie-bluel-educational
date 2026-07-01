const BASE_URL_NAME = 'http://localhost:5678';

function showError(message, containerId) {
  const errorContainer = document.getElementById(containerId);
  errorContainer.textContent = message;
  errorContainer.classList.remove('hidden');
}

function hideError(containerId) {
  const errorContainer = document.getElementById(containerId);
  errorContainer.classList.add('hidden');
}
