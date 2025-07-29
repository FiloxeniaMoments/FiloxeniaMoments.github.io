function initializeLanguageSwitcher() {
  const languageSwitcher = document.getElementById("language-switcher");
  const languageMenu = document.getElementById("language-menu");
  const languageText = document.getElementById("language-text");
  const mobileLanguageSwitcher = document.getElementById("mobile-language-switcher");
  const mobileLanguageMenu = document.getElementById("mobile-language-menu");
  const mobileLanguageText = document.getElementById("mobile-language-text");
  const planEventButton = document.getElementById("plan-event-button");
  const planEventButtonSpan = document.querySelector("#plan-event-button span");

  // Language codes mapping
  const languageCodes = {
    en: "EN",
    de: "DE",
    el: "EL"
  };

  // Mobile button translations
  const mobileButtonTranslations = {
    en: {
      plan_your_event_button_mobile: "Plan"
    },
    de: {
      plan_your_event_button_mobile: "Planung"
    },
    el: {
      plan_your_event_button_mobile: "Σχεδιάστε"
    }
  };

  // If no elements are found, don't proceed
  if (!languageSwitcher && !mobileLanguageSwitcher) {
    console.warn("Language switcher elements not found.");
    return;
  }

  const setLanguage = (lang) => {
    document.querySelectorAll("[data-translate]").forEach((element) => {
      const key = element.getAttribute("data-translate");
      // Check for mobile button translations first
      if (key === "plan_your_event_button_mobile" && mobileButtonTranslations[lang] && mobileButtonTranslations[lang][key]) {
        element.textContent = mobileButtonTranslations[lang][key];
      }
      // Then check regular translations
      else if (translations[lang] && translations[lang][key]) {
        // If it's a language code element, use the short code
        if (key === "language_code") {
          element.textContent = languageCodes[lang];
        } else {
          element.textContent = translations[lang][key];
        }
      }
    });

    document.querySelectorAll("[data-translate-placeholder]").forEach((element) => {
      const key = element.getAttribute("data-translate-placeholder");
      if (translations[lang] && translations[lang][key]) {
        element.placeholder = translations[lang][key];
      }
    });

    // Update language text for desktop if available
    if (languageText) {
      if (lang === "en") {
        languageText.textContent = translations.en.language_english_menu;
      } else if (lang === "de") {
        languageText.textContent = translations.de.language_german_menu;
      } else if (lang === "el") {
        languageText.textContent = translations.el.language_greek_menu;
      }
    }

    // Update mobile language text
    if (mobileLanguageText) {
      mobileLanguageText.textContent = languageCodes[lang];
    }

    // Handle plan event button text wrapping for different languages
    if (planEventButton && planEventButtonSpan) {
      if (lang === "en") {
        planEventButtonSpan.classList.add("truncate");
        planEventButtonSpan.classList.remove("button-text-wrap");
        planEventButton.classList.add("h-10");
        planEventButton.classList.remove("py-2");
      } else {
        planEventButtonSpan.classList.remove("truncate");
        planEventButtonSpan.classList.add("button-text-wrap");
        planEventButton.classList.remove("h-10");
        planEventButton.classList.add("py-2");
      }
    }

    localStorage.setItem("language", lang);
    
    // Close all language menus
    if (languageMenu) languageMenu.classList.add("hidden");
    if (mobileLanguageMenu) mobileLanguageMenu.classList.add("hidden");
  };

  // Desktop language switcher
  if (languageSwitcher && languageMenu) {
    languageSwitcher.addEventListener("click", (event) => {
      event.stopPropagation();
      languageMenu.classList.toggle("hidden");
      // Hide mobile menu if open
      if (mobileLanguageMenu) mobileLanguageMenu.classList.add("hidden");
    });

    // Close desktop language menu when clicking outside
    document.addEventListener("click", (event) => {
      if (!languageSwitcher.contains(event.target) && !languageMenu.contains(event.target)) {
        languageMenu.classList.add("hidden");
      }
    });

    // Handle language selection from desktop menu
    languageMenu.addEventListener("click", (event) => {
      event.preventDefault();
      const lang = event.target.getAttribute("data-lang");
      if (lang) {
        setLanguage(lang);
      }
    });
  }

  // Mobile language switcher
  if (mobileLanguageSwitcher && mobileLanguageMenu) {
    mobileLanguageSwitcher.addEventListener("click", (event) => {
      event.stopPropagation();
      mobileLanguageMenu.classList.toggle("hidden");
      // Hide desktop menu if open
      if (languageMenu) languageMenu.classList.add("hidden");
    });

    // Close mobile language menu when clicking outside
    document.addEventListener("click", (event) => {
      if (!mobileLanguageSwitcher.contains(event.target) && !mobileLanguageMenu.contains(event.target)) {
        mobileLanguageMenu.classList.add("hidden");
      }
    });

    // Handle language selection from mobile menu
    mobileLanguageMenu.addEventListener("click", (event) => {
      event.preventDefault();
      const lang = event.target.getAttribute("data-lang");
      if (lang) {
        setLanguage(lang);
      }
    });
  }

  // Handle window resize
  window.addEventListener('resize', () => {
    // Close all menus on resize
    if (languageMenu) languageMenu.classList.add("hidden");
    if (mobileLanguageMenu) mobileLanguageMenu.classList.add("hidden");
  });

  // Initialize with saved language
  const savedLang = localStorage.getItem("language") || "en";
  setLanguage(savedLang);
}

// Wait for DOM to be ready and then initialize
function waitForElements() {
  const languageSwitcher = document.getElementById("language-switcher");
  const mobileLanguageSwitcher = document.getElementById("mobile-language-switcher");
  
  // Initialize if either desktop or mobile switcher is found
  if (languageSwitcher || mobileLanguageSwitcher) {
    initializeLanguageSwitcher();
  } else {
    // Elements not found yet, wait a bit and try again
    setTimeout(waitForElements, 100);
  }
}

// Check if the script is loaded dynamically
if (document.readyState === 'loading') {
  document.addEventListener("DOMContentLoaded", waitForElements);
} else {
  waitForElements();
} 