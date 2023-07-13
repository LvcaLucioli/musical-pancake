document.querySelector('.login form').addEventListener('submit', function(event) {
    event.preventDefault();
  
    var form = event.target;
    var formData = new FormData(form);
  
    fetch(form.action, {
      method: 'POST',
      body: formData
    })
    .then(function(response) {
      if (!response.ok) {
        throw new Error('Errore nella richiesta API: ' + response.status);
      }
      return response.json();
    })
    .then(function(data) {
      if (data.login) {
        window.location.href = 'user.php?username=' + data.username;
      } else {
        var errorDiv = document.querySelector('.error-message');
        errorDiv.textContent = data.error;
        errorDiv.classList.remove("d-none");
      }
    })
    .catch(function(error) {
      console.error('Errore nella richiesta API:', error);
    });
  });
  

