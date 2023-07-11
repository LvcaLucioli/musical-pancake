window.addEventListener('load', (e) => {
    fetch('api/api-get-user-info.php', {
        method: 'POST'
    }).then(function(response){
        if(!response.ok){
            throw new Error('error in api request: ' + response.status);
        }else{
            return response.json();
        }
    }).then(function(response){
        document.querySelector('.login form #username').value = response[0].username;
        document.querySelector('.login form #email').value = response[0].email;
        document.querySelector('.login form textarea').value = response[0].bio;
    })
});

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
                throw new Error('Errore nella richiesta API: ' + response.status);
            }
            return response.json();
        }).then(function (data) {
            if (data.update) {
                if (document.getElementById("img-to-save")) {
                    uploadPropic();
                }
                window.location.href = 'user.php?username=' + data.username;
            } else {
                var errorDiv = document.querySelector('.error-message');
                errorDiv.textContent = data.error;
                errorDiv.classList.remove("d-none");
            }
        })
})