function initializeMobileMenu() {
  // Check if we're on mobile (less than 1024px)
  const isMobile = window.innerWidth < 1024;

  // Handle window resize
  window.addEventListener('resize', () => {
    const newIsMobile = window.innerWidth < 1024;
    
    // If switching from desktop to mobile, close any open desktop menus
    if (newIsMobile && !isMobile) {
      const languageMenu = document.getElementById('language-menu');
      if (languageMenu) {
        languageMenu.classList.add('hidden');
      }
    }
  });
}

// Wait for DOM to be ready and then initialize
function waitForElements() {
  // Check if header elements are loaded
  const headerPlaceholder = document.getElementById('header-placeholder');
  
  if (headerPlaceholder && headerPlaceholder.children.length > 0) {
    // Header is loaded, initialize mobile menu
    initializeMobileMenu();
  } else {
    // Header not loaded yet, wait a bit and try again
    setTimeout(waitForElements, 100);
  }
}

document.addEventListener('DOMContentLoaded', waitForElements);