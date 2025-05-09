/**
 * Social Media Integration
 * Handles social sharing and feed integration
 */

document.addEventListener('DOMContentLoaded', () => {
    initSocialSharing();
    initSocialFeed();
});

/**
 * Initialize social sharing functionality
 */
function initSocialSharing() {
    const shareButtons = document.querySelectorAll('.share-button');
    
    if (!shareButtons.length) return;
    
    // Current page info
    const pageUrl = encodeURIComponent(window.location.href);
    const pageTitle = encodeURIComponent(document.title);
    
    // Set up share links with current page info
    shareButtons.forEach(button => {
        if (button.classList.contains('share-facebook')) {
            button.href = `https://www.facebook.com/sharer/sharer.php?u=${pageUrl}`;
        }
        else if (button.classList.contains('share-twitter')) {
            button.href = `https://twitter.com/intent/tweet?url=${pageUrl}&text=${pageTitle}`;
        }
        else if (button.classList.contains('share-pinterest')) {
            // Try to get the first image on the page for Pinterest
            let firstImage = document.querySelector('meta[property="og:image"]');
            let imageUrl = '';
            
            if (firstImage) {
                imageUrl = encodeURIComponent(firstImage.content);
            } else {
                firstImage = document.querySelector('img');
                if (firstImage) {
                    imageUrl = encodeURIComponent(firstImage.src);
                }
            }
            
            button.href = `https://pinterest.com/pin/create/button/?url=${pageUrl}&media=${imageUrl}&description=${pageTitle}`;
        }
        else if (button.classList.contains('share-linkedin')) {
            button.href = `https://www.linkedin.com/sharing/share-offsite/?url=${pageUrl}`;
        }
        else if (button.classList.contains('share-email')) {
            button.href = `mailto:?subject=${pageTitle}&body=Check out this site: ${pageUrl}`;
        }
        else if (button.classList.contains('share-whatsapp')) {
            button.href = `https://api.whatsapp.com/send?text=${pageTitle} ${pageUrl}`;
        }
        
        // Open share links in a popup window
        if (!button.classList.contains('share-email') && !button.classList.contains('share-whatsapp')) {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                window.open(button.href, 'share-popup', 'height=500, width=600');
            });
        }
    });
}

/**
 * Initialize social feed functionality
 * In a real implementation, this would fetch actual data from social media APIs
 */
function initSocialFeed() {
    const socialFeedContainer = document.querySelector('.social-feed-grid');
    
    if (!socialFeedContainer) return;
    
    // Simulate loading state
    socialFeedContainer.innerHTML = '<div class="loading">Loading social feed...</div>';
    
    // In a real implementation, we would fetch data from social APIs
    // For demonstration, we'll simulate a network request with mock data
    setTimeout(() => {
        // Mock social media feed data
        const feedData = [
            {
                platform: 'instagram',
                image: 'assets/images/social/instagram1.jpg',
                text: 'Beautiful wedding ceremony at the Oceanside Resort. Congratulations to Jessica and Mark! #wedding #love',
                date: '2 days ago',
                likes: 145,
                comments: 12
            },
            {
                platform: 'instagram',
                image: 'assets/images/social/instagram2.jpg',
                text: 'Creating the perfect table settings for Emily and John\'s garden wedding. #weddingplanner #details',
                date: '5 days ago',
                likes: 203,
                comments: 24
            },
            {
                platform: 'facebook',
                image: 'assets/images/social/facebook1.jpg',
                text: 'We are excited to announce our new wedding planning packages for the upcoming season! Contact us for details.',
                date: '1 week ago',
                likes: 78,
                comments: 15
            },
            {
                platform: 'pinterest',
                image: 'assets/images/social/pinterest1.jpg',
                text: 'Elegant floral arrangements for your wedding ceremony. Find more inspiration on our Pinterest board.',
                date: '2 weeks ago',
                likes: 312,
                comments: 5
            },
            {
                platform: 'instagram',
                image: 'assets/images/social/instagram3.jpg',
                text: 'Corporate event planning at its finest. Swipe to see more photos from last night\'s gala. #eventplanner',
                date: '3 weeks ago',
                likes: 176,
                comments: 9
            },
            {
                platform: 'facebook',
                image: 'assets/images/social/facebook2.jpg',
                text: 'Congratulations to our team for winning "Best Wedding Planner" award for the third year in a row!',
                date: '1 month ago',
                likes: 421,
                comments: 53
            }
        ];
        
        // Generate HTML for the feed
        const feedHTML = feedData.map(item => {
            let platformIcon = '';
            
            switch (item.platform) {
                case 'instagram':
                    platformIcon = 'icon-instagram';
                    break;
                case 'facebook':
                    platformIcon = 'icon-facebook';
                    break;
                case 'pinterest':
                    platformIcon = 'icon-pinterest';
                    break;
                default:
                    platformIcon = 'icon-social';
            }
            
            return `
                <div class="social-feed-item fade-in">
                    <div class="social-feed-image">
                        <img data-src="${item.image}" alt="Social media post" src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1 1'%3E%3C/svg%3E">
                        <div class="social-feed-platform">
                            <i class="${platformIcon}"></i>
                        </div>
                    </div>
                    <div class="social-feed-content">
                        <p class="social-feed-text">${item.text}</p>
                        <div class="social-feed-meta">
                            <span class="social-feed-date">${item.date}</span>
                            <div class="social-feed-actions">
                                <span class="social-feed-action">
                                    <i class="icon-heart"></i> ${item.likes}
                                </span>
                                <span class="social-feed-action">
                                    <i class="icon-comment"></i> ${item.comments}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        }).join('');
        
        // Update the feed container
        socialFeedContainer.innerHTML = feedHTML;
        
        // Initialize lazy loading for the new images
        initLazyLoading();
        
        // Initialize fade-in animations
        initScrollAnimations();
    }, 1000); // Simulate network delay
}

/**
 * Lazy loading for social feed images
 * This is a simplified version of the main lazy loading function
 */
function initLazyLoading() {
    // Check if IntersectionObserver is supported
    if (!('IntersectionObserver' in window)) return;
    
    const lazyImages = document.querySelectorAll('.social-feed-image img[data-src]');
    
    if (lazyImages.length === 0) return;
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px 200px 0px'
    });
    
    lazyImages.forEach(img => {
        imageObserver.observe(img);
    });
} 