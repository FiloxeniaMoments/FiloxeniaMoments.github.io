document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('custom-form');

  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      const formData = new FormData(form);
      const action = form.getAttribute('action');

      fetch(action, {
        method: 'POST',
        body: formData,
      })
        .then(response => {
          if (response.ok) {
            window.location.href = 'thank-you.html';
          } else {
            throw new Error('Network response was not ok.');
          }
        })
        .catch(error => {
          console.error('Error:', error);
          const formResponse = document.getElementById('form-response');
          formResponse.innerHTML = '<p class="text-red-500">Sorry, there was an error sending your message. Please try again later.</p>';
          formResponse.style.display = 'block';
        });
    });
  }
});