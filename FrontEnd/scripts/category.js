function getCategories() {
  fetch("http://localhost:5678/api/categories")
  .then((response) => response.json())
  .then((categories) => {

    const container = document.querySelector(".category")

    for (const category of categories) {

      const button = document.createElement("button");

      button.setAttribute("data-category-id", category.id);
      button.classList.add("category-btn")
      button.textContent  = category.name;
    }
  });
}

getCategories();
