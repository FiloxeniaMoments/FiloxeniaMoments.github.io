/**
 * Filoxenia Moments - Main JavaScript
 * Handles essential functionality for the site
 */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize components
    initMobileMenu();
    initScrollAnimations();
    initLazyLoading();
    initTestimonialSlider();
});

/**
 * Mobile Menu Toggle
 */
function initMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navList = document.querySelector('.nav-list');
    
    if (!menuToggle || !navList) return;
    
    menuToggle.addEventListener('click', () => {
        // Toggle active class on menu button
        menuToggle.classList.toggle('active');
        
        // Toggle menu visibility
        if (navList.style.display === 'flex') {
            // Close menu
            navList.style.display = 'none';
            menuToggle.setAttribute('aria-expanded', 'false');
            enableScroll();
            
            // Animate menu button
            const spans = menuToggle.querySelectorAll('span');
            spans[0].style.transform = 'rotate(0) translateY(0)';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'rotate(0) translateY(0)';
        } else {
            // Open menu
            navList.style.display = 'flex';
            menuToggle.setAttribute('aria-expanded', 'true');
            disableScroll();
            
            // Animate menu button to X
            const spans = menuToggle.querySelectorAll('span');
            spans[0].style.transform = 'rotate(45deg) translateY(6px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translateY(-6px)';
        }
    });
    
    // Close menu when window is resized above mobile breakpoint
    window.addEventListener('resize', () => {
        if (window.innerWidth >= 768) {
            navList.style.display = '';
            menuToggle.classList.remove('active');
            menuToggle.setAttribute('aria-expanded', 'false');
            enableScroll();
            
            // Reset menu button
            const spans = menuToggle.querySelectorAll('span');
            spans.forEach(span => {
                span.style = '';
            });
        }
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (window.innerWidth < 768 && 
            navList.style.display === 'flex' && 
            !navList.contains(e.target) && 
            !menuToggle.contains(e.target)) {
            
            navList.style.display = 'none';
            menuToggle.classList.remove('active');
            menuToggle.setAttribute('aria-expanded', 'false');
            enableScroll();
            
            // Reset menu button
            const spans = menuToggle.querySelectorAll('span');
            spans.forEach(span => {
                span.style = '';
            });
        }
    });
}

/**
 * Scroll Animations
 * Adds animations to elements when they enter the viewport
 */
function initScrollAnimations() {
    const fadeElements = document.querySelectorAll('.fade-in');
    
    if (fadeElements.length === 0) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('appear');
                // Stop observing after animation is triggered
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    fadeElements.forEach(element => {
        observer.observe(element);
    });
}

/**
 * Lazy Loading
 * Implements lazy loading for images
 */
function initLazyLoading() {
    // Check if IntersectionObserver is supported
    if (!('IntersectionObserver' in window)) return;
    
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    if (lazyImages.length === 0) return;
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                
                // Optional: Load high-res version after initial load
                if (img.dataset.srcset) {
                    img.srcset = img.dataset.srcset;
                }
                
                // Remove data attributes once loaded
                img.removeAttribute('data-src');
                img.removeAttribute('data-srcset');
                
                // Stop observing after image is loaded
                imageObserver.unobserve(img);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px 200px 0px' // Start loading before image enters viewport
    });
    
    lazyImages.forEach(img => {
        imageObserver.observe(img);
    });
}

/**
 * Testimonial Slider
 * Controls the testimonial carousel
 */
function initTestimonialSlider() {
    const testimonials = document.querySelectorAll('.testimonial-item');
    const dots = document.querySelectorAll('.testimonial-dots .dot');
    const prevButton = document.querySelector('.testimonial-prev');
    const nextButton = document.querySelector('.testimonial-next');
    
    if (!testimonials.length || !dots.length) return;
    
    let currentIndex = 0;
    
    // Show testimonial based on index
    function showTestimonial(index) {
        // Remove current class from all testimonials
        testimonials.forEach(testimonial => {
            testimonial.classList.remove('current');
        });
        
        // Remove active class from all dots
        dots.forEach(dot => {
            dot.classList.remove('active');
        });
        
        // Add current class to the selected testimonial
        testimonials[index].classList.add('current');
        
        // Add active class to the corresponding dot
        dots[index].classList.add('active');
        
        // Update currentIndex
        currentIndex = index;
    }
    
    // Event listeners for dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showTestimonial(index);
        });
    });
    
    // Event listener for prev button
    if (prevButton) {
        prevButton.addEventListener('click', () => {
            let newIndex = currentIndex - 1;
            if (newIndex < 0) {
                newIndex = testimonials.length - 1;
            }
            showTestimonial(newIndex);
        });
    }
    
    // Event listener for next button
    if (nextButton) {
        nextButton.addEventListener('click', () => {
            let newIndex = currentIndex + 1;
            if (newIndex >= testimonials.length) {
                newIndex = 0;
            }
            showTestimonial(newIndex);
        });
    }
    
    // Auto-rotate testimonials every 6 seconds
    let testimonialInterval = setInterval(() => {
        let newIndex = currentIndex + 1;
        if (newIndex >= testimonials.length) {
            newIndex = 0;
        }
        showTestimonial(newIndex);
    }, 6000);
    
    // Pause auto-rotation when user interacts with the slider
    const testimonialSlider = document.querySelector('.testimonial-slider');
    if (testimonialSlider) {
        testimonialSlider.addEventListener('mouseenter', () => {
            clearInterval(testimonialInterval);
        });
        
        testimonialSlider.addEventListener('mouseleave', () => {
            testimonialInterval = setInterval(() => {
                let newIndex = currentIndex + 1;
                if (newIndex >= testimonials.length) {
                    newIndex = 0;
                }
                showTestimonial(newIndex);
            }, 6000);
        });
    }
}

/**
 * Utility Functions
 */

// Disable page scrolling
function disableScroll() {
    document.body.style.overflow = 'hidden';
}

// Enable page scrolling
function enableScroll() {
    document.body.style.overflow = '';
}

// Throttle function to limit function calls
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
} 