# Form Handling Documentation

This document explains how forms are handled on the Filoxenia Moments website.

## 1. Contact Form

The contact form allows visitors to send messages directly from the website.

### Files Involved:
- **`contact.html`**: Contains the HTML structure of the form.
- **`js/contact.js`**: Handles the form submission logic.
- **`thank-you.html`**: A confirmation page shown after a successful submission.

### Submission Process:

1.  A visitor fills out the fields in the contact form on the `contact.html` page and clicks "Submit".
2.  The `js/contact.js` script intercepts the form submission, preventing the browser's default behavior.
3.  The script sends the form data asynchronously to the configured webhook at `https://hook.eu2.make.com/wpfwzgvf3psr7jtoa7f26g3x4x4lg8dd`.
4.  **On Success**: If the submission is successful, the user is redirected to the `thank-you.html` page. This page confirms that their message was sent.
5.  **On Failure**: If there is an error during submission (e.g., a network issue or an error from the webhook), an error message is displayed directly on the `contact.html` page without a redirect.

## 2. Booking Form

The booking form on the `booking.html` page allows potential clients to schedule a consultation.

### Implementation:

This form is implemented using an `<iframe>` that embeds a booking widget from **LeadConnector**, a third-party service.

### Troubleshooting:

Since the booking form is an external service, any issues with its functionality (e.g., submissions not being received, errors within the iframe) should be diagnosed by:

- Checking the configuration in your LeadConnector account.
- Contacting LeadConnector support for assistance.

The code for this form is located in `booking.html` but the logic is handled entirely by LeadConnector. 