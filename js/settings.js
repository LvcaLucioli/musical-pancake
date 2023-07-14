window.addEventListener('load', (e) => {
    fetch('api/api-get-user-info.php', {
        method: 'POST'
    }).then(function(response){
        if(!response.ok){
            throw new Error('error in api request: ' + response.status);
        }else{
            return response.json();
        }
    }).then(function (response) {
        document.querySelector('.long-form form #username').value = response[0].username;
        document.querySelector('.long-form form #email').value = response[0].email;
        document.querySelector('.long-form form textarea').value = response[0].bio;
        
        if (response[0].is_in_disc == 1)
            document.querySelector('.long-form form input#discoverable').click();
        const newImg = document.createElement("img");
        newImg.src = response[0].propic + "?dummy=" + Math.random();
        newImg.alt = "previous profile image";
        document.querySelector('.long-form form .img-container').replaceChildren(newImg);
    })
});

document.querySelector('.long-form form').addEventListener('submit', function (event) {
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
                if (document.querySelector('#img-to-save')){
                    uploadPropic();
                }else{
                    window.location.href = 'user.php?username=' + data.username;
                }
            } else {
                var errorDiv = document.querySelector('.error-message');
                errorDiv.textContent = data.error;
                errorDiv.classList.remove("d-none");
            }
        })
});
document.querySelector('header[aria-label="primary-menu"]').style.boxShadow = "0 4px 4px -2px rgba(0, 0, 0, 0.2)";
document.querySelector('.long-form form input#discoverable').addEventListener('click', function (event) {
    event.target.value = Math.abs(event.target.value - 1);
    event.target.click();
});

function logout() {
    fetch('api/api-logout.php', {
        method: 'POST',
        credentials: 'same-origin' 
    })
        .then(response => {
            if (response.ok) {
                window.location.href = 'login.php';
            } else {
                console.error('error during logout');
            }
        })
        .catch(error => {
            console.error('error in logout request:', error);
        });
}
document.querySelector('form #username').addEventListener('keyup', checkCredential);
document.querySelector('form #email').addEventListener('keyup', checkCredential);