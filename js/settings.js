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