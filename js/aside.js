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