const loginButton = document.querySelector('.login');
const logoutButton = document.querySelector('.logout');
const editionBand = document.querySelector('.edition-container');
const modifyButton = document.querySelector('.edition.black');
const categories = document.querySelector('.category');
const portfolioTitle = document.querySelector('.portfolio-title');
const edition = document.querySelector('.edition');
const galleryDialog = document.querySelector('#galleryDialog');
const AddPhotoDialog = document.querySelector('#addPhotoDialog');
const closeGalleryModal = galleryDialog.querySelector('.modal-close');
const closeAddPhotoModal = AddPhotoDialog.querySelector('.modal-close');
const addWork = document.querySelector('.add-work');
const backArrow = document.querySelector('.back-arrow');
const addPhoto = document.querySelector('.add-photo-btn');
const filePicker = document.querySelector('#file-picker');
const previewImage = document.querySelector('.photo-preview');
const placeholderSvg = document.querySelector('.image-placeholder');
const filePickerText = document.querySelector('.file-picker-text');
const confirmButton = document.querySelector('#confirm');
const titleInput = document.querySelector('#title');
const categorySelect = document.querySelector('#category');
let selectedFile = null;

function toggleClass(element, className, shouldAdd) {
  if (!element) return;
  if (shouldAdd) {
    element.classList.add(className);
  } else {
    element.classList.remove(className);
  }
}

function isFormValid() {
  return selectedFile && titleInput.value.trim() !== '' && categorySelect.value !== '';
}

function updateButtonState() {
  const valid = isFormValid();

  confirmButton.disabled = !valid;

  if (valid) {
    confirmButton.classList.remove('grey');
  } else {
    confirmButton.classList.add('grey');
  }
}

function sendData() {
  if (!isFormValid()) return;

  const formData = new FormData();
  formData.append('image', selectedFile);
  formData.append('title', titleInput.value);
  formData.append('category', categorySelect.value);

  fetch('http://localhost:5678/api/works', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
    body: formData,
  })
    .then((response) => {
      if (!response.ok) {
        console.error('Error:', response.statusText);
        return;
      }
      return response.json();
    })
    .then((data) => {
      console.log('Success:', data);
      AddPhotoDialog.close();
    })
    .catch((error) => {
      console.error('Network error:', error);
    });
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
  closeGalleryModal.addEventListener('click', () => {
    galleryDialog.close();
  });
  closeAddPhotoModal.addEventListener('click', () => {
    AddPhotoDialog.close();
  });
  addWork.addEventListener('click', () => {
    galleryDialog.close();
    AddPhotoDialog.showModal();
  });
  backArrow.addEventListener('click', () => {
    AddPhotoDialog.close();
    galleryDialog.showModal();
  });
  addPhoto.addEventListener('click', () => {
    filePicker.click();
  });

  filePicker.addEventListener('change', () => {
    selectedFile = filePicker.files[0];
    const imageUrl = URL.createObjectURL(selectedFile);
    previewImage.src = imageUrl;
    placeholderSvg.classList.add('hidden');
    addPhoto.classList.add('hidden');
    filePicker.classList.add('hidden');
    previewImage.classList.remove('hidden');
    filePickerText.classList.add('hidden');
    updateButtonState();
  });

  titleInput.addEventListener('input', updateButtonState);

  categorySelect.addEventListener('change', updateButtonState);

  confirmButton.addEventListener('click', () => {
    sendData();
  });
}

isLoggedIn();
updateButtonState();
