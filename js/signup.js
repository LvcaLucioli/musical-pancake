document.querySelector('form').addEventListener('submit', function (event) {
    event.preventDefault();

    var form = event.target;
    var formData = new FormData(form);

    fetch(form.action, {
        method: 'POST',
        body: formData
    })
        .then(function (response) {
            if (!response.ok) {
                throw new Error('error in api request: ' + response.status);
            }
            return response.json();
        })
        .then(function (data) {
            if (data.signup) {
                uploadPropic();
            } else {
                var errorDiv = document.querySelector('.error-message');
                errorDiv.textContent = data.error;
                errorDiv.classList.remove("d-none");
            }
        })
        .catch(function (error) {

            console.error('error in api request:', error);
        });
});

document.querySelector('form #username').addEventListener('keyup', checkCredential);
document.querySelector('form #email').addEventListener('keyup', checkCredential);

const password = document.querySelector('form #password');
const confirmPassword = document.querySelector('form #confirm-password');

password.addEventListener('keyup', checkPassword);
confirmPassword.addEventListener('keyup', checkPassword);