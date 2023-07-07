const inputFields = document.querySelectorAll('.login input');
inputFields.forEach(inputField => {
    inputField.addEventListener('keydown', (e) => {
        var disabledButton = true;
        const parentElement = inputField.parentElement;
        if ($(e.target).is(':invalid')) {
            parentElement.classList.add('invalid-input');
        } else {
            parentElement.classList.remove('invalid-input');
        }
        inputFields.forEach(inputField => {
            if (!inputField.validity.valid) {
                disabledButton = false;
            }
        });
        parentElement.parentElement.querySelector("button").disabled = !disabledButton;
    })
});

function checkPassword() {
    var passwordField = document.querySelector('.login #password');
    var confirmPasswordField = document.querySelector('.login #confirm-password');

    if (confirmPasswordField.value == passwordField.value) {
        passwordField.parentElement.classList.remove('invalid-input');
        confirmPasswordField.parentElement.classList.remove('invalid-input');
    } else if (confirmPasswordField.value != "")
        confirmPasswordField.parentElement.classList.add('invalid-input');
}

document.querySelector('.login form').addEventListener('submit', function (event) {
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
                window.location.href = 'user.php?username=' + data.username;
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

document.querySelector('.login form #username').addEventListener('focusout', function (event) {
    event.preventDefault();

    var username = event.target.value;
    var formData = new FormData();
    formData.append('username', username);
    console.log(username);
    fetch('api/api-check-username.php', {
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
            console.log(data);
            if (data.exists) {
                document.querySelector('.login form #username').parentElement.classList.add('invalid-input');
                document.querySelector('.login form #username').setCustomValidity("username taken");
                document.querySelector('.login form .error-icon').classList.remove("d-none");
            } else {
                document.querySelector('.login form #username').parentElement.classList.remove('invalid-input');
                document.querySelector('.login form #username').setCustomValidity("");
                document.querySelector('.login form .error-icon').classList.add("d-none");
            }
        })
        .catch(function (error) {
            console.error('error on api request:', error);
        });
});


const password = document.querySelector('.login #password');
const confirmPassword = document.querySelector('.login #confirm-password');

password.addEventListener('keyup', checkPassword);
confirmPassword.addEventListener('keyup', checkPassword);