/**
 * Portfolio Page Functionality
 * Handles gallery filtering, modal, and other interactions
 */

document.addEventListener('DOMContentLoaded', () => {
    initGalleryFilters();
    initGalleryModal();
    initLoadMore();
});

/**
 * Initialize gallery filtering functionality
 */
function initGalleryFilters() {
    const filterButtons = document.querySelectorAll('.filter-button');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    if (!filterButtons.length || !portfolioItems.length) return;
    
    // Add click event to filter buttons
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.dataset.filter;

            filterButtons.forEach((btn) => {
                btn.classList.remove("active");
                btn.classList.add("inactive");
            });

            button.classList.add("active");
            button.classList.remove("inactive");

            portfolioItems.forEach((item) => {
                if (filter === "all" || item.dataset.category === filter) {
                    item.style.display = "flex";
                } else {
                    item.style.display = "none";
                }
            });
        });
    });
}

/**
 * Initialize gallery modal functionality
 */
function initGalleryModal() {
    const galleryLinks = document.querySelectorAll('.gallery-link');
    const modal = document.getElementById('portfolioModal');
    const modalClose = modal ? modal.querySelector('.modal-close') : null;
    const modalBody = modal ? modal.querySelector('.modal-body') : null;
    
    if (!galleryLinks.length || !modal || !modalClose || !modalBody) return;
    
    // Project data - in a real application, this would come from a database or API
    const projectData = {
        'wedding-1': {
            title: 'Sarah & Michael\'s Beachside Wedding',
            date: 'June 15, 2024',
            location: 'Oceanside Resort, Miami',
            category: 'Wedding',
            description: 'A beautiful beachside wedding ceremony and reception for Sarah and Michael. The couple wanted a relaxed yet elegant atmosphere with a coastal theme featuring soft blues and sandy neutrals.',
            services: ['Full Planning', 'Design', 'Coordination', 'Vendor Management'],
            testimonial: 'Filoxenia Moments turned our dream beach wedding into reality. Every detail was perfect, from the ceremony setup to the reception décor. They handled everything with such professionalism and care, allowing us to fully enjoy our special day.',
            testimonialAuthor: 'Sarah & Michael',
            images: [
                'assets/images/portfolio/wedding-1.jpg',
                'assets/images/portfolio/wedding-1-detail1.jpg',
                'assets/images/portfolio/wedding-1-detail2.jpg',
                'assets/images/portfolio/wedding-1-detail3.jpg',
                'assets/images/portfolio/wedding-1-detail4.jpg'
            ]
        },
        'wedding-2': {
            title: 'Emily & John\'s Garden Wedding',
            date: 'May 22, 2024',
            location: 'Botanical Gardens, Boston',
            category: 'Wedding',
            description: 'A romantic garden wedding for Emily and John, surrounded by lush greenery and colorful flowers. The couple wanted a natural, organic feel with touches of vintage elegance.',
            services: ['Partial Planning', 'Design', 'Day-of Coordination'],
            testimonial: 'Our garden wedding was absolutely magical. Filoxenia Moments understood our vision perfectly and added creative touches we hadn\'t even thought of. The day flowed seamlessly, and we received so many compliments from our guests.',
            testimonialAuthor: 'Emily & John',
            images: [
                'assets/images/portfolio/wedding-2.jpg',
                'assets/images/portfolio/wedding-2-detail1.jpg',
                'assets/images/portfolio/wedding-2-detail2.jpg',
                'assets/images/portfolio/wedding-2-detail3.jpg',
                'assets/images/portfolio/wedding-2-detail4.jpg'
            ]
        },
        // Additional projects would be defined here
    };
    
    // Add click event to gallery links
    galleryLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Get project ID
            const projectId = link.getAttribute('data-item');
            const project = projectData[projectId];
            
            // If project exists, show modal with project details
            if (project) {
                // Create modal content
                const modalContent = `
                    <div class="project-details">
                        <div class="project-images">
                            <div class="project-main-image">
                                <img src="${project.images[0]}" alt="${project.title}">
                            </div>
                            ${project.images.length > 1 ? `
                                <div class="project-thumbnails">
                                    ${project.images.map((image, index) => `
                                        <div class="project-thumbnail ${index === 0 ? 'active' : ''}" data-index="${index}">
                                            <img src="${image}" alt="${project.title} - Image ${index + 1}">
                                        </div>
                                    `).join('')}
                                </div>
                            ` : ''}
                        </div>
                        <div class="project-info">
                            <h2>${project.title}</h2>
                            <div class="project-meta">
                                <span class="project-meta-item">${project.date}</span>
                                <span class="project-meta-item">${project.location}</span>
                                <span class="project-meta-item">${project.category}</span>
                            </div>
                            <div class="project-description">
                                <p>${project.description}</p>
                            </div>
                            <div class="project-services">
                                <h3>Services Provided</h3>
                                <div class="services-list">
                                    ${project.services.map(service => `
                                        <span class="service-tag">${service}</span>
                                    `).join('')}
                                </div>
                            </div>
                            ${project.testimonial ? `
                                <div class="project-testimonial">
                                    <p>${project.testimonial}</p>
                                    <div class="testimonial-author">${project.testimonialAuthor}</div>
                                </div>
                            ` : ''}
                        </div>
                    </div>
                `;
                
                // Update modal content
                modalBody.innerHTML = modalContent;
                
                // Show modal
                modal.classList.add('active');
                document.body.style.overflow = 'hidden'; // Prevent scrolling
                
                // Initialize thumbnail gallery if it exists
                if (project.images.length > 1) {
                    const thumbnails = modalBody.querySelectorAll('.project-thumbnail');
                    const mainImage = modalBody.querySelector('.project-main-image img');
                    
                    thumbnails.forEach(thumbnail => {
                        thumbnail.addEventListener('click', () => {
                            // Get image index
                            const index = thumbnail.getAttribute('data-index');
                            
                            // Update main image
                            mainImage.src = project.images[index];
                            
                            // Update active thumbnail
                            thumbnails.forEach(thumb => {
                                thumb.classList.remove('active');
                            });
                            thumbnail.classList.add('active');
                        });
                    });
                }
            }
        });
    });
    
    // Close modal when clicking the close button
    modalClose.addEventListener('click', () => {
        modal.classList.remove('active');
        document.body.style.overflow = ''; // Restore scrolling
    });
    
    // Close modal when clicking outside the content
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
            document.body.style.overflow = ''; // Restore scrolling
        }
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            modal.classList.remove('active');
            document.body.style.overflow = ''; // Restore scrolling
        }
    });
}

/**
 * Initialize load more functionality
 * In a real application, this would load more items from the server
 */
function initLoadMore() {
    const loadMoreBtn = document.querySelector('.load-more-btn');
    
    if (!loadMoreBtn) return;
    
    // Simulate loading more items
    loadMoreBtn.addEventListener('click', () => {
        // Change button text to show loading state
        loadMoreBtn.textContent = 'Loading...';
        loadMoreBtn.disabled = true;
        
        // Simulate network delay
        setTimeout(() => {
            // In a real application, you would fetch more items from the server
            // For this demo, we'll just hide the button to simulate end of content
            loadMoreBtn.textContent = 'No More Items';
            loadMoreBtn.disabled = true;
            
            // Optional: Remove button after delay
            setTimeout(() => {
                loadMoreBtn.style.display = 'none';
            }, 2000);
        }, 1500);
    });
} 