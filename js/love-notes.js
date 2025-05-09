/**
 * Love Notes - Testimonials Functionality
 * Handles testimonial submission form validation and display
 */

document.addEventListener('DOMContentLoaded', function() {
    initTestimonialForm();
    initTestimonialDisplay();
});

/**
 * Initialize the testimonial submission form with validation
 */
function initTestimonialForm() {
    const testimonialForm = document.getElementById('testimonialForm');
    if (!testimonialForm) return;
    
    const formFields = testimonialForm.querySelectorAll('input, textarea, select');
    const successMessage = document.getElementById('submissionSuccess');
    
    // Form validation and submission
    testimonialForm.addEventListener('submit', function(e) {
        e.preventDefault();
        let isValid = true;
        
        // Validate all required fields
        formFields.forEach(field => {
            if (field.hasAttribute('required') && !field.value.trim()) {
                isValid = false;
                showError(field.id + 'Error', 'This field is required');
                field.classList.add('error');
            } else {
                hideError(field.id + 'Error');
                field.classList.remove('error');
            }
        });
        
        // Email validation
        const emailField = document.getElementById('email');
        if (emailField && emailField.value) {
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(emailField.value)) {
                isValid = false;
                showError('emailError', 'Please enter a valid email address');
                emailField.classList.add('error');
            }
        }
        
        // Check if any rating is selected
        const ratingInputs = document.querySelectorAll('input[name="rating"]');
        const isRatingSelected = Array.from(ratingInputs).some(input => input.checked);
        if (!isRatingSelected) {
            isValid = false;
            showError('ratingError', 'Please select a rating');
        }
        
        // If the form is valid, submit it
        if (isValid) {
            // In a real application, you would send the data to the server here
            // For demonstration purposes, we'll simulate a server response
            simulateFormSubmission(testimonialForm, successMessage);
        }
    });
    
    // Add input event listeners for real-time validation
    formFields.forEach(field => {
        field.addEventListener('input', function() {
            validateField(field);
        });
    });
}

/**
 * Validate an individual form field
 * @param {HTMLElement} field - The form field to validate
 */
function validateField(field) {
    if (field.hasAttribute('required') && !field.value.trim()) {
        showError(field.id + 'Error', 'This field is required');
        field.classList.add('error');
        return false;
    } else if (field.type === 'email' && field.value.trim()) {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(field.value)) {
            showError(field.id + 'Error', 'Please enter a valid email address');
            field.classList.add('error');
            return false;
        }
    }
    
    hideError(field.id + 'Error');
    field.classList.remove('error');
    return true;
}

/**
 * Simulate form submission with a loading delay
 * @param {HTMLFormElement} form - The form element
 * @param {HTMLElement} successMessage - The success message element
 */
function simulateFormSubmission(form, successMessage) {
    // Disable submit button and show loading state
    const submitButton = form.querySelector('button[type="submit"]');
    const originalButtonText = submitButton.textContent;
    submitButton.disabled = true;
    submitButton.textContent = 'Submitting...';
    
    // Simulate server request delay
    setTimeout(() => {
        // Reset form and show success message
        form.reset();
        successMessage.style.display = 'block';
        
        // Reset button state
        submitButton.disabled = false;
        submitButton.textContent = originalButtonText;
        
        // Hide success message after delay
        setTimeout(() => {
            successMessage.style.display = 'none';
        }, 5000);
    }, 1500);
}

/**
 * Initialize the display of existing testimonials
 */
function initTestimonialDisplay() {
    // This would typically load testimonials from a server
    // For now, we'll use the static examples in the HTML
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    
    // Add fade-in animation to testimonial cards
    if (testimonialCards.length) {
        testimonialCards.forEach((card, index) => {
            setTimeout(() => {
                card.classList.add('appear');
            }, index * 200);
        });
    }
}

/**
 * Display an error message for a form field
 * @param {string} errorId - ID of the error message element
 * @param {string} message - Error message to display
 */
function showError(errorId, message) {
    const errorElement = document.getElementById(errorId);
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.classList.add('active');
    }
}

/**
 * Hide the error message for a form field
 * @param {string} errorId - ID of the error message element
 */
function hideError(errorId) {
    const errorElement = document.getElementById(errorId);
    if (errorElement) {
        errorElement.textContent = '';
        errorElement.classList.remove('active');
    }
} 