document.addEventListener("DOMContentLoaded", () => {
  const loadComponent = (url, placeholderId) => {
    return fetch(`./${url}`)
      .then((response) => response.text())
      .then((data) => {
        const placeholder = document.getElementById(placeholderId);
        if (placeholder) {
          placeholder.outerHTML = data;
        }
      })
      .catch((error) => console.error(`Error loading ${url}:`, error));
  };

  Promise.all([
    loadComponent("_header.html", "header-placeholder"),
    loadComponent("_footer.html", "footer-placeholder"),
  ]).then(() => {
    // After loading the header, initialize the language switcher
    if (typeof initializeLanguageSwitcher === "function") {
      initializeLanguageSwitcher();
    }
  });
}); 