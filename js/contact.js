/**
 * Contact Form Validation and Submission
 */

document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) return;
    
    const formFields = {
        name: {
            element: document.getElementById('name'),
            errorElement: document.getElementById('nameError'),
            required: true,
            minLength: 2,
            validate: function(value) {
                if (!value && this.required) return 'Please enter your name';
                if (value.length < this.minLength) return `Name must be at least ${this.minLength} characters`;
                return '';
            }
        },
        email: {
            element: document.getElementById('email'),
            errorElement: document.getElementById('emailError'),
            required: true,
            validate: function(value) {
                if (!value && this.required) return 'Please enter your email address';
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(value)) return 'Please enter a valid email address';
                return '';
            }
        },
        phone: {
            element: document.getElementById('phone'),
            errorElement: document.getElementById('phoneError'),
            required: false,
            validate: function(value) {
                if (!value && !this.required) return '';
                const phoneRegex = /^[\d\s+\-().]+$/;
                if (!phoneRegex.test(value)) return 'Please enter a valid phone number';
                return '';
            }
        },
        eventType: {
            element: document.getElementById('eventType'),
            errorElement: document.getElementById('eventTypeError'),
            required: true,
            validate: function(value) {
                if (!value && this.required) return 'Please select an event type';
                return '';
            }
        },
        eventDate: {
            element: document.getElementById('eventDate'),
            errorElement: document.getElementById('eventDateError'),
            required: false,
            validate: function(value) {
                if (!value && !this.required) return '';
                const today = new Date().toISOString().split('T')[0];
                if (value < today) return 'Please select a future date';
                return '';
            }
        },
        message: {
            element: document.getElementById('message'),
            errorElement: document.getElementById('messageError'),
            required: true,
            minLength: 10,
            validate: function(value) {
                if (!value && this.required) return 'Please enter your message';
                if (value.length < this.minLength) return `Message must be at least ${this.minLength} characters`;
                return '';
            }
        },
        privacy: {
            element: document.getElementById('privacy'),
            errorElement: document.getElementById('privacyError'),
            required: true,
            validate: function(checked) {
                if (!checked && this.required) return 'You must agree to the privacy policy';
                return '';
            }
        }
    };
    
    // Add input event listeners for real-time validation
    Object.values(formFields).forEach(field => {
        if (!field.element || !field.errorElement) return;
        
        const isCheckbox = field.element.type === 'checkbox';
        const eventType = isCheckbox ? 'change' : 'input';
        const fieldValue = isCheckbox ? field.element.checked : field.element.value;
        
        field.element.addEventListener(eventType, () => {
            validateField(field);
        });
    });
    
    // Form submission
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        let isValid = true;
        
        // Validate all fields
        Object.values(formFields).forEach(field => {
            if (!validateField(field)) {
                isValid = false;
            }
        });
        
        if (isValid) {
            // Normally this would submit to a server
            submitForm();
        }
    });
    
    // Individual field validation
    function validateField(field) {
        if (!field.element || !field.errorElement) return true;
        
        const fieldValue = field.element.type === 'checkbox' ? field.element.checked : field.element.value.trim();
        const errorMessage = field.validate(fieldValue);
        const formGroup = field.element.closest('.form-group');
        
        if (errorMessage) {
            field.errorElement.textContent = errorMessage;
            field.errorElement.classList.add('active');
            formGroup.classList.add('error');
            formGroup.classList.remove('success');
            return false;
        } else {
            field.errorElement.textContent = '';
            field.errorElement.classList.remove('active');
            formGroup.classList.remove('error');
            if (fieldValue) {
                formGroup.classList.add('success');
            } else {
                formGroup.classList.remove('success');
            }
            return true;
        }
    }
    
    // Form submission function - this would normally send data to a server
    function submitForm() {
        const formResponse = document.getElementById('formResponse');
        const submitButton = contactForm.querySelector('button[type="submit"]');
        
        // Disable submit button and show loading state
        submitButton.disabled = true;
        submitButton.textContent = 'Sending...';
        
        // Simulate server request
        setTimeout(() => {
            // Success state
            formResponse.textContent = 'Thank you for your message! We will get back to you soon.';
            formResponse.classList.add('success');
            
            // Reset form
            contactForm.reset();
            Object.values(formFields).forEach(field => {
                if (!field.element) return;
                const formGroup = field.element.closest('.form-group');
                formGroup.classList.remove('success', 'error');
            });
            
            // Reset button
            submitButton.disabled = false;
            submitButton.textContent = 'Send Message';
            
            // Scroll to response
            formResponse.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            
            // Hide success message after 5 seconds
            setTimeout(() => {
                formResponse.classList.remove('success');
                formResponse.textContent = '';
            }, 5000);
        }, 1500); // Simulate network delay
    }
}); 