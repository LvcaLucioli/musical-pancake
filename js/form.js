const inputFields = document.querySelectorAll('.login input');
inputFields.forEach(inputField => {
    inputField.addEventListener('keyup', (e) => {
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

function uploadPropic() {
    let img = document.getElementById("img-to-save");
    if (img != null) {
        var url = img.src;

        fetch(url)
            .then(response => response.blob())
            .then(blob => {
                var reader = new FileReader();
                reader.readAsDataURL(blob);
                reader.onloadend = function () {
                    var base64data = reader.result;
                    const formData = new FormData();

                    formData.append("image", base64data);
                    axios.post('api/api-upload-profile-picture.php', formData, {
                        headers: {
                            'Content-Type': `multipart/form-data`
                        },
                        maxBodyLength: Infinity,
                        maxContentLength: Infinity,
                    });
                };
            });
    } else {
        axios.post('api/api-upload-profile-picture.php', {

        });
    }
}

function checkPassword() {
    var passwordField = document.querySelector('.login #password');
    var confirmPasswordField = document.querySelector('.login #confirm-password');

    if (confirmPasswordField.value == passwordField.value) {
        passwordField.parentElement.classList.remove('invalid-input');
        confirmPasswordField.parentElement.classList.remove('invalid-input');
    } else if (confirmPasswordField.value != ""){
        confirmPasswordField.parentElement.classList.add('invalid-input');
    }
        
}

function checkCredential(event) {
    event.preventDefault();

    var credential = event.target.value;
    var credentialType = event.target.id;
    var formData = new FormData();

    formData.append('credentialType', credentialType);
    formData.append('credential', credential);

    fetch('api/api-check-credential.php', {
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
            if (data.exists) {
                document.querySelector('.login form #' + credentialType).setCustomValidity(credentialType + " taken");
                document.querySelector('.login form #' + credentialType).parentElement.querySelector('.error-icon').classList.remove("d-none");
            } else {
                document.querySelector('.login form #' + credentialType).setCustomValidity("");
                document.querySelector('.login form #' + credentialType).parentElement.querySelector('.error-icon').classList.add("d-none");
            }
        })
        .catch(function (error) {
            console.error('error on api request:', error);
        });
}
