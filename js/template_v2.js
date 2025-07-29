document.addEventListener("DOMContentLoaded", () => {
  console.log("Template v2 script loaded!");
  // Embedded fallback content
  const fallbackHeader = `
    <header class="flex items-center justify-between whitespace-nowrap border-b border-solid border-b-[#f4f1f1] px-4 md:px-10 py-3">
      <div class="flex items-center gap-4 text-[#171213]">
        <img class="h-8 md:h-10" src="assets/images/filoxenia-moments.jpg" alt="Filoxenia Moments Logo" />
        <h2 class="hidden md:block text-[#caa810] text-lg font-bold leading-tight tracking-[-0.015em]" data-translate="filoxenia_moments_header">Filoxenia Moments</h2>
      </div>
      <div class="flex flex-1 items-center justify-end gap-2 md:gap-8">
        <div class="hidden md:flex items-center gap-9">
          <a class="text-[#caa810] text-sm font-medium leading-normal" href="index.html" data-translate="home_link">Home</a>
          <a class="text-[#caa810] text-sm font-medium leading-normal" href="services.html" data-translate="services_link">Services</a>
          <a class="text-[#caa810] text-sm font-medium leading-normal" href="portfolio.html" data-translate="portfolio_link">Portfolio</a>
          <a class="text-[#caa810] text-sm font-medium leading-normal" href="about.html" data-translate="about_us_link">About Us</a>
          <a class="text-[#caa810] text-sm font-medium leading-normal" href="contact.html" data-translate="contact_link">Contact</a>
        </div>
        <div class="relative">
          <button id="language-switcher" class="flex items-center justify-center rounded-full h-10 px-4 bg-[#d34585] text-[#f6e7ea] text-xs md:text-sm">
            <svg id="language-icon" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM4.332 7.643a6.5 6.5 0 118.336 8.714 8.02 8.02 0 00-2.332-1.503A6.472 6.472 0 014.332 7.643zm11.336-1.286a6.5 6.5 0 00-8.336 8.714 8.02 8.02 0 012.332-1.503A6.472 6.472 0 0015.668 6.357z" clip-rule="evenodd" />
            </svg>
            <span id="language-text" class="ml-2" data-translate="language_english">English</span>
          </button>
          <div id="language-menu" class="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg hidden">
            <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" data-lang="en" data-translate="language_english_menu">English</a>
            <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" data-lang="de" data-translate="language_german_menu">German</a>
            <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" data-lang="el" data-translate="language_greek_menu">Greek</a>
          </div>
        </div>
        <a
          id="plan-event-button"
          href="contact.html"
          class="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 px-4 bg-[#d34585] text-[#f6e7ea] text-xs md:text-sm font-bold leading-normal tracking-[0.015em]"
        >
          <span class="truncate" data-translate="plan_your_event_button">Plan Your Event</span>
        </a>
        <div class="md:hidden">
          <button id="menu-toggle" class="p-2 text-[#d34585]">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7"></path>
            </svg>
          </button>
        </div>
      </div>
    </header>
    <div id="mobile-menu" class="hidden md:hidden px-10 pb-3">
      <a href="index.html" class="block py-2 text-[#caa810]" data-translate="home_link">Home</a>
      <div class="relative">
        <button id="mobile-menu-toggle" class="block w-full text-left py-2 text-[#caa810]" data-translate="menu_link">Menu</button>
        <div id="mobile-submenu" class="hidden pl-4">
          <a href="services.html" class="block py-2 text-[#caa810]" data-translate="services_link">Services</a>
          <a href="portfolio.html" class="block py-2 text-[#caa810]" data-translate="portfolio_link">Portfolio</a>
          <a href="about.html" class="block py-2 text-[#caa810]" data-translate="about_us_link">About Us</a>
        </div>
      </div>
      <a href="contact.html" class="block py-2 text-[#caa810]" data-translate="contact_link">Contact</a>
    </div>
    <script src="js/mobile-menu.js"></script>
    <script src="js/language-switcher.js"></script>
  `;

  const fallbackFooter = `
    <footer class="flex justify-center">
      <div class="flex max-w-[960px] flex-1 flex-col">
        <div class="flex flex-col items-center gap-6 px-5 py-10 text-center @container">
          <img class="h-16" src="assets/images/filoxenia-moments.jpg" alt="Filoxenia Moments Logo" />
          <div class="flex flex-wrap items-center justify-center gap-6 @[480px]:flex-row @[480px]:justify-around">
            <a class="text-[#83676d] text-base font-normal leading-normal min-w-40" href="contact.html" data-translate="contact_us_footer_link">Contact Us</a>
            <a class="text-[#83676d] text-base font-normal leading-normal min-w-40" href="privacy.html" data-translate="privacy_policy_footer_link">Privacy Policy</a>
            <a class="text-[#83676d] text-base font-normal leading-normal min-w-40" href="terms.html" data-translate="terms_of_service_footer_link">Terms of Service</a>
          </div>
          <div class="flex flex-wrap justify-center gap-4">
            <a href="https://www.instagram.com/filoxenia.moments?igsh=OGVoc3AwNmFvdDhk">
              <div class="text-[#83676d] hover:text-[#d34585] transition-colors duration-300" data-icon="InstagramLogo" data-size="24px" data-weight="regular">
                <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                  <path
                    d="M128,80a48,48,0,1,0,48,48A48.05,48.05,0,0,0,128,80Zm0,80a32,32,0,1,1,32-32A32,32,0,0,1,128,160ZM176,24H80A56.06,56.06,0,0,0,24,80v96a56.06,56.06,0,0,0,56,56h96a56.06,56.06,0,0,0,56-56V80A56.06,56.06,0,0,0,176,24Zm40,152a40,40,0,0,1-40,40H80a40,40,0,0,1-40-40V80A40,40,0,0,1,80,40h96a40,40,0,0,1,40,40ZM192,76a12,12,0,1,1-12-12A12,12,0,0,1,192,76Z"
                  ></path>
                </svg>
              </div>
            </a>
            <a href="https://www.threads.com/@filoxenia.moments">
              <div class="text-[#83676d] hover:text-[#d34585] transition-colors duration-300" data-icon="ThreadsLogo" data-size="24px" data-weight="regular">
                <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 192 192">
                  <path
                    d="M141.537 88.9883C140.71 88.5919 139.87 88.2104 139.019 87.8451C137.537 60.5382 122.616 44.905 97.5619 44.745C97.4484 44.7443 97.3355 44.7443 97.222 44.7443C82.2364 44.7443 69.7731 51.1409 62.102 62.7807L75.881 72.2328C81.6116 63.5383 90.6052 61.6848 97.2286 61.6848C97.3051 61.6848 97.3819 61.6848 97.4576 61.6855C105.707 61.7381 111.932 64.1366 115.961 68.814C118.893 72.2193 120.854 76.925 121.825 82.8638C114.511 81.6207 106.601 81.2385 98.2388 81.7233C74.9234 83.0954 59.0048 98.9467 60.2541 119.021C60.8843 129.253 65.5578 138.051 73.442 143.896C80.076 148.82 88.8556 151.433 98.2458 151.433C111.354 151.433 122.786 147.385 131.661 139.422C138.159 133.667 142.934 126.007 145.771 116.236C148.374 107.235 148.374 97.8495 148.374 88.9952L141.537 88.9883ZM130.685 130.368C124.289 135.972 115.544 139.093 105.247 139.093C98.3374 139.093 92.2735 137.367 87.6231 134.087C83.0451 130.854 80.1701 125.966 79.7923 120.267C79.0601 108.575 89.0889 98.2319 103.719 97.3051C110.607 96.9223 117.166 97.2269 123.213 98.3137C123.234 99.7144 123.245 101.124 123.245 102.534C123.245 110.533 122.903 117.89 121.269 124.523C119.761 130.658 116.435 136.279 111.176 140.756L124.917 150.189C135.033 141.326 141.615 128.062 141.615 111.844C141.615 107.88 141.395 103.957 140.958 100.093C141.86 100.506 142.752 100.934 143.636 101.377L141.537 88.9883C141.537 88.9883 141.537 88.9883 141.537 88.9883L130.685 130.368ZM98.2458 151.433L98.2458 151.433L98.2458 151.433L98.2458 151.433L98.2458 151.433L98.2458 151.433L98.2458 151.433L98.2458 151.433L98.2458 151.433L98.2458 151.433C98.2458 151.433 98.2458 151.433 98.2458 151.433L98.2458 151.433z"
                  ></path>
                </svg>
              </div>
            </a>
          </div>
          <p class="text-[#83676d] text-base font-normal leading-normal" data-translate="copyright_footer">© 2025 Filoxenia Moments. All rights reserved.</p>
          <p class="text-[#83676d] text-sm font-light leading-normal mt-2">Built and maintained with ❤️ by <a href="https://theaureliaedge.com/" class="hover:text-[#d34585] transition-colors duration-300">Aurelia Edge LLC</a></p>
        </div>
      </div>
    </footer>
  `;

  const loadComponent = (url, placeholderId) => {
    return fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.text();
      })
      .then((data) => {
        const placeholder = document.getElementById(placeholderId);
        if (placeholder) {
          placeholder.outerHTML = data;
          console.log(`Successfully loaded ${url}`);
        } else {
          console.error(`Placeholder element with id '${placeholderId}' not found`);
        }
      })
      .catch((error) => {
        console.error(`Error loading ${url}:`, error);
        // Use embedded fallback content
        const placeholder = document.getElementById(placeholderId);
        if (placeholder) {
          if (placeholderId === 'header-placeholder') {
            placeholder.innerHTML = fallbackHeader;
            console.log('Using embedded header fallback');
          } else if (placeholderId === 'footer-placeholder') {
            placeholder.innerHTML = fallbackFooter;
            console.log('Using embedded footer fallback');
          }
        }
      });
  };

  // Try multiple paths for the header and footer files
  const tryLoadComponent = (urls, placeholderId) => {
    const tryNext = (index) => {
      if (index >= urls.length) {
        console.error(`Failed to load component for ${placeholderId} from all attempted URLs:`, urls);
        // Use embedded fallback as last resort
        const placeholder = document.getElementById(placeholderId);
        if (placeholder) {
          if (placeholderId === 'header-placeholder') {
            placeholder.innerHTML = fallbackHeader;
            console.log('Using embedded header fallback as last resort');
          } else if (placeholderId === 'footer-placeholder') {
            placeholder.innerHTML = fallbackFooter;
            console.log('Using embedded footer fallback as last resort');
          }
        }
        return Promise.resolve(); // Resolve instead of reject to continue
      }
      
      return loadComponent(urls[index], placeholderId)
        .catch(() => tryNext(index + 1));
    };
    
    return tryNext(0);
  };

  Promise.all([
    tryLoadComponent(["_header.html", "./_header.html", "/_header.html"], "header-placeholder"),
    tryLoadComponent(["_footer_v2.html", "./_footer_v2.html", "/_footer_v2.html"], "footer-placeholder"),
  ]).then(() => {
    // After loading the header, initialize the language switcher
    if (typeof initializeLanguageSwitcher === "function") {
      initializeLanguageSwitcher();
    }
    console.log("All components loaded successfully");
  }).catch((error) => {
    console.error("Error loading components:", error);
  });
});