/**
 * Booking System JavaScript
 * Handles calendar, time slots, and form validation
 */

document.addEventListener('DOMContentLoaded', () => {
    initCalendar();
    initFAQToggle();
    initBookingForm();
});

/**
 * Initialize booking calendar
 */
function initCalendar() {
    const calendar = document.getElementById('calendar');
    const currentMonthElement = document.getElementById('currentMonth');
    const prevMonthButton = document.getElementById('prevMonth');
    const nextMonthButton = document.getElementById('nextMonth');
    const selectedDateElement = document.getElementById('selectedDate');
    const timeSlotsContainer = document.getElementById('timeSlots');
    const selectedDateTimeElement = document.getElementById('selectedDateTime');
    const submitButton = document.getElementById('submitBooking');
    
    if (!calendar || !currentMonthElement || !prevMonthButton || !nextMonthButton || 
        !selectedDateElement || !timeSlotsContainer || !selectedDateTimeElement || !submitButton) return;
    
    // Current date and selected date
    const today = new Date();
    let currentMonth = today.getMonth();
    let currentYear = today.getFullYear();
    let selectedDate = null;
    let selectedTimeSlot = null;
    
    // Generate calendar for current month
    generateCalendar(currentMonth, currentYear);
    
    // Event listener for previous month button
    prevMonthButton.addEventListener('click', () => {
        currentMonth--;
        if (currentMonth < 0) {
            currentMonth = 11;
            currentYear--;
        }
        generateCalendar(currentMonth, currentYear);
    });
    
    // Event listener for next month button
    nextMonthButton.addEventListener('click', () => {
        currentMonth++;
        if (currentMonth > 11) {
            currentMonth = 0;
            currentYear++;
        }
        generateCalendar(currentMonth, currentYear);
    });
    
    /**
     * Generate calendar for specified month and year
     */
    function generateCalendar(month, year) {
        // Update month display
        const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 
                            'July', 'August', 'September', 'October', 'November', 'December'];
        currentMonthElement.textContent = `${monthNames[month]} ${year}`;
        
        // Get first day of month and number of days in month
        const firstDay = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        
        // Clear calendar
        calendar.innerHTML = '';
        
        // Create calendar header (days of week)
        const calendarTable = document.createElement('table');
        const headerRow = document.createElement('tr');
        
        ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].forEach(day => {
            const th = document.createElement('th');
            th.textContent = day;
            headerRow.appendChild(th);
        });
        
        calendarTable.appendChild(headerRow);
        
        // Create calendar days
        let date = 1;
        for (let i = 0; i < 6; i++) {
            // Break if we've gone past the days in the month
            if (date > daysInMonth) break;
            
            const row = document.createElement('tr');
            
            for (let j = 0; j < 7; j++) {
                const cell = document.createElement('td');
                
                if (i === 0 && j < firstDay) {
                    // Empty cells for days before the start of the month
                    row.appendChild(cell);
                } else if (date > daysInMonth) {
                    // Empty cells for days after the end of the month
                    row.appendChild(cell);
                } else {
                    // Day cells
                    const dayElement = document.createElement('div');
                    dayElement.textContent = date;
                    dayElement.className = 'calendar-day';
                    
                    // Check if this date is in the past
                    const currentDate = new Date(year, month, date);
                    const isToday = currentDate.toDateString() === today.toDateString();
                    const isPast = currentDate < new Date(today.setHours(0, 0, 0, 0));
                    
                    // Check if this is a weekend (Saturday or Sunday)
                    const isWeekend = j === 0 || j === 6;
                    
                    // Set availability based on various conditions
                    if (isPast) {
                        dayElement.classList.add('unavailable');
                    } else if (isWeekend) {
                        // Weekends are unavailable for bookings
                        dayElement.classList.add('unavailable');
                    } else {
                        // For this demo, simulate some unavailable dates randomly
                        const isAvailable = date % 7 !== 0; // Example: every 7th day is unavailable
                        
                        if (isAvailable) {
                            dayElement.classList.add('available');
                            
                            // Add click event to select date
                            dayElement.addEventListener('click', () => {
                                // Remove selected class from previously selected date
                                const selectedDays = calendar.querySelectorAll('.calendar-day.selected');
                                selectedDays.forEach(day => {
                                    day.classList.remove('selected');
                                });
                                
                                // Add selected class to clicked date
                                dayElement.classList.add('selected');
                                
                                // Set selected date
                                selectedDate = new Date(year, month, date);
                                
                                // Update selected date display
                                selectedDateElement.textContent = selectedDate.toLocaleDateString('en-US', {
                                    weekday: 'long',
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                });
                                
                                // Generate time slots for selected date
                                generateTimeSlots(selectedDate);
                                
                                // Reset selected time slot and datetime display
                                selectedTimeSlot = null;
                                selectedDateTimeElement.textContent = 'None selected';
                                submitButton.disabled = true;
                            });
                        } else {
                            dayElement.classList.add('unavailable');
                        }
                    }
                    
                    // Highlight today's date
                    if (isToday) {
                        dayElement.style.fontWeight = 'bold';
                        dayElement.style.border = '1px solid ' + getComputedStyle(document.documentElement).getPropertyValue('--primary-color');
                    }
                    
                    cell.appendChild(dayElement);
                    date++;
                }
                
                row.appendChild(cell);
            }
            
            calendarTable.appendChild(row);
        }
        
        calendar.appendChild(calendarTable);
    }
    
    /**
     * Generate time slots for selected date
     */
    function generateTimeSlots(date) {
        // Clear time slots
        timeSlotsContainer.innerHTML = '';
        
        // Generate time slots from 9 AM to 5 PM
        const startHour = 9;
        const endHour = 17;
        
        for (let hour = startHour; hour < endHour; hour++) {
            // For this demo, create two time slots per hour (top and bottom of the hour)
            [0, 30].forEach(minutes => {
                // Format time as AM/PM
                const time = formatTime(hour, minutes);
                
                // Create time slot element
                const timeSlot = document.createElement('div');
                timeSlot.className = 'time-slot';
                timeSlot.textContent = time;
                
                // For this demo, simulate some unavailable time slots randomly
                const isAvailable = (hour !== 12) && (Math.random() > 0.3); // Example: lunch hour is unavailable, and 30% of other slots
                
                if (isAvailable) {
                    // Add click event to select time slot
                    timeSlot.addEventListener('click', () => {
                        // Remove selected class from previously selected time slot
                        const selectedTimeSlots = timeSlotsContainer.querySelectorAll('.time-slot.selected');
                        selectedTimeSlots.forEach(slot => {
                            slot.classList.remove('selected');
                        });
                        
                        // Add selected class to clicked time slot
                        timeSlot.classList.add('selected');
                        
                        // Set selected time slot
                        selectedTimeSlot = time;
                        
                        // Update selected datetime display
                        selectedDateTimeElement.textContent = `${selectedDate.toLocaleDateString('en-US', {
                            weekday: 'short',
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric'
                        })} at ${time}`;
                        
                        // Enable submit button
                        submitButton.disabled = false;
                    });
                } else {
                    timeSlot.classList.add('unavailable');
                }
                
                timeSlotsContainer.appendChild(timeSlot);
            });
        }
    }
    
    /**
     * Format time as AM/PM
     */
    function formatTime(hour, minutes) {
        const period = hour >= 12 ? 'PM' : 'AM';
        const hour12 = hour % 12 || 12;
        const minutesStr = minutes.toString().padStart(2, '0');
        
        return `${hour12}:${minutesStr} ${period}`;
    }
}

/**
 * Initialize FAQ accordion
 */
function initFAQToggle() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            // Toggle active class
            item.classList.toggle('active');
            
            // Close other FAQ items
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });
        });
    });
}

/**
 * Initialize booking form validation
 */
function initBookingForm() {
    const bookingForm = document.getElementById('bookingForm');
    
    if (!bookingForm) return;
    
    // Form fields and validation rules
    const formFields = {
        fullName: {
            element: document.getElementById('fullName'),
            errorElement: document.getElementById('fullNameError'),
            required: true,
            minLength: 2,
            validate: function(value) {
                if (!value && this.required) return 'Please enter your full name';
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
            required: true,
            validate: function(value) {
                if (!value && this.required) return 'Please enter your phone number';
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
        consultationType: {
            element: document.getElementById('consultationType'),
            errorElement: document.getElementById('consultationTypeError'),
            required: true,
            validate: function(value) {
                if (!value && this.required) return 'Please select a consultation type';
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
        
        field.element.addEventListener(eventType, () => {
            validateField(field);
        });
    });
    
    // Form submission
    bookingForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        let isValid = true;
        
        // Validate all fields
        Object.values(formFields).forEach(field => {
            if (!validateField(field)) {
                isValid = false;
            }
        });
        
        if (isValid) {
            // Submit form
            submitBookingForm();
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
    function submitBookingForm() {
        const bookingResponse = document.getElementById('bookingResponse');
        const submitButton = bookingForm.querySelector('button[type="submit"]');
        
        // Disable submit button and show loading state
        submitButton.disabled = true;
        submitButton.textContent = 'Processing...';
        
        // Simulate server request
        setTimeout(() => {
            // Success state
            bookingResponse.textContent = 'Your consultation has been booked successfully! We will send you a confirmation email shortly.';
            bookingResponse.classList.add('success');
            
            // Reset form
            bookingForm.reset();
            Object.values(formFields).forEach(field => {
                if (!field.element) return;
                const formGroup = field.element.closest('.form-group');
                formGroup.classList.remove('success', 'error');
            });
            
            // Update selected datetime display
            document.getElementById('selectedDateTime').textContent = 'None selected';
            
            // Reset button
            submitButton.disabled = true;
            submitButton.textContent = 'Complete Booking';
            
            // Scroll to response
            bookingResponse.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            
            // Hide success message after 10 seconds
            setTimeout(() => {
                bookingResponse.classList.remove('success');
                bookingResponse.textContent = '';
            }, 10000);
        }, 2000); // Simulate network delay
    }
} 