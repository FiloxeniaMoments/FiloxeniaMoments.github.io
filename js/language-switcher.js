function initializeLanguageSwitcher() {
  const languageSwitcher = document.getElementById("language-switcher");
  const languageMenu = document.getElementById("language-menu");
  const languageText = document.getElementById("language-text");

  if (!languageSwitcher || !languageMenu || !languageText) {
    console.error("Language switcher elements not found.");
    return;
  }

  const setLanguage = (lang) => {
    document.querySelectorAll("[data-translate]").forEach((element) => {
      const key = element.getAttribute("data-translate");
      if (translations[lang] && translations[lang][key]) {
        element.textContent = translations[lang][key];
      }
    });

    document.querySelectorAll("[data-translate-placeholder]").forEach((element) => {
      const key = element.getAttribute("data-translate-placeholder");
      if (translations[lang] && translations[lang][key]) {
        element.placeholder = translations[lang][key];
      }
    });

    if (lang === "en") {
      languageText.textContent = translations.en.language_english_menu;
    } else if (lang === "de") {
      languageText.textContent = translations.de.language_german_menu;
    } else if (lang === "el") {
      languageText.textContent = translations.el.language_greek_menu;
    }
    localStorage.setItem("language", lang);
    languageMenu.classList.add("hidden");
  };

  languageSwitcher.addEventListener("click", (event) => {
    event.stopPropagation();
    languageMenu.classList.toggle("hidden");
  });

  document.addEventListener("click", (event) => {
    if (!languageSwitcher.contains(event.target)) {
      languageMenu.classList.add("hidden");
    }
  });

  languageMenu.addEventListener("click", (event) => {
    event.preventDefault();
    const lang = event.target.getAttribute("data-lang");
    if (lang) {
      setLanguage(lang);
    }
  });

  const savedLang = localStorage.getItem("language") || "en";
  setLanguage(savedLang);
}

// Check if the script is loaded dynamically
if (document.readyState === 'loading') {
  document.addEventListener("DOMContentLoaded", initializeLanguageSwitcher);
} else {
  initializeLanguageSwitcher();
} 