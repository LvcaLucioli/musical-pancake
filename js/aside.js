function showNotifications(notifications) {
    let result = '';
    for (let i = 0; i < notifications.length; i++) {
        let notification = `<section>
                <div>
                    <p>${notifications[i]["content"]}</p>    
                </div>
            </section>`;
        result += notification;
    }
    return result;
}

function displaySearchResult(searchResult) {
    let result = '';
    for (let i = 0; i < searchResult.length; i++) {
        let singleResult = `<section>
                <div>
                    <p>${searchResult[i]["username"]}</p> 
                    <img src="${searchResult[i]["propic"]}" alt="${searchResult[i]["username"]} profile pic"> 
                </div>
            </section>`;
        result += singleResult;
    }
    return result;
}

function setIconActive(target) {
    let substring = "-active";
    let buttons = document.querySelectorAll('[aria-label="profile-nav"] ul li button');
    buttons.forEach(button => {
        let icon = button.querySelector('img');
        let path = icon.getAttribute('src');
        let new_path = path;
        let offset = path.length - 4;
        if (button === target) {
            new_path = path.slice(0, offset) + substring + path.slice(offset);
        } else {
            new_path = path.slice(0, offset - substring.length) + path.slice(offset);
        }
        icon.setAttribute('src', new_path);
    });

}

function switchNotificationSearch(targetButton, target) {
    if (!targetButton.classList.contains("active")) {
        let buttons = document.querySelectorAll('[aria-label="profile-nav"] ul li button');

        buttons.forEach(button => {
            if (button === targetButton) {
                button.classList.add("active");
            } else {
                button.classList.remove("active");
            }
        });

        document.querySelectorAll('.profile-aside>section').forEach(function(section) {
            section.classList.add('d-none');
        });
        document.querySelector('#' + target).classList.remove('d-none');
        setIconActive(targetButton);
    }
}

function displayNotification(notifications) {
    let notificationSection = document.querySelector("#notifications-section");
    if (window.innerWidth <= 768) {
        // TODO:
    }
    notificationSection.innerHTML = notificationSection.innerHTML + showNotifications(notifications);
}

axios.post('api/api-notification.php').then(response => {
    displayNotification(response.data);
});